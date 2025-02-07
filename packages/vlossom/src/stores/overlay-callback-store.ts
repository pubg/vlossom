import { ref, Ref } from 'vue';
import { OverlayCallbacks, VS_OVERLAY_CLOSE, VS_OVERLAY_OPEN } from '@/declaration';

export class OverlayCallbackStore {
    // overlay tuple: [id, { [eventName: callback }]
    public overlays: Ref<[string, Ref<OverlayCallbacks>][]> = ref([]);

    constructor() {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (this.overlays.value.length === 0) {
                return;
            }

            const keyEventName = `key-${event.key}`;
            const [lastOverlayId, callbacks] = this.overlays.value[this.overlays.value.length - 1];
            if (!callbacks.value[keyEventName]) {
                return;
            }

            // Prevent default action for registered key event (ex. enter, esc)
            event.preventDefault();

            this.run(lastOverlayId, keyEventName, event);
        });
    }

    getLastOverlayId() {
        return this.overlays.value.length > 0 ? this.overlays.value[this.overlays.value.length - 1][0] : '';
    }

    async run<T = void>(id: string, eventName: string, ...args: any[]): Promise<T | void> {
        const index = this.overlays.value.findIndex(([overlayId]) => overlayId === id);
        if (index === -1) {
            return;
        }
        const [, callbacks] = this.overlays.value[index];
        return await callbacks.value[eventName]?.(...args);
    }

    push(id: string, callbacks: Ref<OverlayCallbacks>) {
        this.overlays.value.push([id, callbacks]);
        this.run(id, VS_OVERLAY_OPEN);
        return this.run(id, 'open');
    }

    pop(...args: any[]) {
        const [targetId] = this.overlays.value[this.overlays.value.length - 1];
        this.run(targetId, VS_OVERLAY_CLOSE, ...args);
        const result = this.run(targetId, 'close', ...args);
        this.overlays.value.pop();
        return result;
    }

    remove(id: string, ...args: any[]) {
        const index = this.overlays.value.findIndex(([stackId]) => stackId === id);
        if (index === -1) {
            return;
        }
        const [targetId] = this.overlays.value[index];
        this.run(targetId, VS_OVERLAY_CLOSE, ...args);
        const result = this.run(targetId, 'close', ...args);
        this.overlays.value.splice(index, 1);
        return result;
    }

    clear(...args: any[]) {
        while (this.overlays.value.length > 0) {
            this.pop(...args);
        }
    }
}
