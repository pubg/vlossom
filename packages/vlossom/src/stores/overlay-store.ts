import { computed, ComputedRef, reactive, Ref } from 'vue';
import { OverlayCallbacks, VS_OVERLAY_CLOSE, VS_OVERLAY_OPEN } from '@/declaration';

export class OverlayStore {
    // overlay tuple: [id, { [eventName: callback }]
    public readonly overlays: [string, Ref<OverlayCallbacks>][] = reactive([]);
    public readonly keyedOverlays: ComputedRef<{ [key: string]: string[] }> = computed(() => {
        const keyedOverlays: { [key: string]: string[] } = {};
        this.overlays.forEach(([id, callbacks]) => {
            Object.keys(callbacks.value).forEach((eventName) => {
                if (!eventName.startsWith('key-')) {
                    return;
                }

                if (!keyedOverlays[eventName]) {
                    keyedOverlays[eventName] = [];
                }
                keyedOverlays[eventName].push(id);
            });
        });
        return keyedOverlays;
    });

    constructor() {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (this.overlays.length === 0) {
                return;
            }

            const keyEventName = `key-${event.key}`;
            const targetOverlayIds = this.keyedOverlays.value[keyEventName] || [];
            if (targetOverlayIds.length === 0) {
                return;
            }

            // Prevent default action for registered key event (ex. enter, esc)
            event.preventDefault();

            const lastOverlayId = targetOverlayIds[targetOverlayIds.length - 1];
            this.run(lastOverlayId, keyEventName, event);
        });
    }

    getLastOverlayId() {
        return this.overlays.length > 0 ? this.overlays[this.overlays.length - 1][0] : '';
    }

    async run<T = void>(id: string, eventName: string, ...args: any[]): Promise<T | void> {
        const index = this.overlays.findIndex(([overlayId]) => overlayId === id);
        if (index === -1) {
            return;
        }
        const [, callbacks] = this.overlays[index];
        return await callbacks.value[eventName]?.(...args);
    }

    push(id: string, callbacks: Ref<OverlayCallbacks>) {
        this.overlays.push([id, callbacks]);
        this.run(id, VS_OVERLAY_OPEN);
        return this.run(id, 'open');
    }

    pop(...args: any[]) {
        const popped = this.overlays.pop();
        if (!popped) {
            return;
        }
        const [poppedId] = popped;
        this.run(poppedId, VS_OVERLAY_CLOSE, ...args);
        return this.run(poppedId, 'close', ...args);
    }

    remove(id: string, ...args: any[]) {
        const index = this.overlays.findIndex(([stackId]) => stackId === id);
        if (index === -1) {
            return;
        }
        const [popped] = this.overlays.splice(index, 1);
        if (!popped) {
            return;
        }
        const [poppedId] = popped;
        this.run(poppedId, VS_OVERLAY_CLOSE, ...args);
        return this.run(poppedId, 'close', ...args);
    }

    clear(...args: any[]) {
        while (this.overlays.length > 0) {
            this.pop(...args);
        }
    }
}
