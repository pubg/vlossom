import { computed, ComputedRef, reactive, Ref } from 'vue';
import { OverlayCallbacks, VS_OVERLAY_CLOSE, VS_OVERLAY_OPEN } from '@/declaration';

export class OverlayStore {
    // overlay tuple: [id, { [eventName: callback }]
    private overlays: [string, Ref<OverlayCallbacks>][] = reactive([]);
    private keyedOverlays: ComputedRef<{ [key: string]: string[] }> = computed(() => {
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
            const lastOverlayId = targetOverlayIds[targetOverlayIds.length - 1];
            this.run(lastOverlayId, keyEventName, event);
        });
    }

    async run(id: string, eventName: string, ...args: any[]) {
        const index = this.overlays.findIndex(([stackId]) => stackId === id);
        if (index === -1) {
            return;
        }
        const [, callbacks] = this.overlays[index];
        return await callbacks.value[eventName]?.(...args);
    }

    push(id: string, callbacks: Ref<OverlayCallbacks>) {
        this.overlays.push([id, callbacks]);
        return this.run(id, VS_OVERLAY_OPEN);
    }

    pop(...args: any[]) {
        const popped = this.overlays.pop();
        if (!popped) {
            return;
        }
        const [poppedId] = popped;
        return this.run(poppedId, VS_OVERLAY_CLOSE, ...args);
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
        return this.run(poppedId, VS_OVERLAY_CLOSE, ...args);
    }

    empty(...args: any[]) {
        while (this.overlays.length > 0) {
            this.pop(...args);
        }
    }
}
