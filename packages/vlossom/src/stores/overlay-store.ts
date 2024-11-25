import { OverlayCallbacks, VS_OVERLAY_CLOSE, VS_OVERLAY_OPEN } from '@/declaration';

export class OverlayStore {
    // overlay tuple: [id, { [eventName: callback }]
    private overlays: [string, OverlayCallbacks][] = [];

    constructor() {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (this.overlays.length === 0) {
                return;
            }

            const keyEventName = `key-${event.key}`;
            const lastOverlay = this.overlays[this.overlays.length - 1];
            const [poppedId] = lastOverlay;
            this.run(poppedId, keyEventName, event);
        });
    }

    async run(id: string, eventName: string, ...args: any[]) {
        const index = this.overlays.findIndex(([stackId]) => stackId === id);
        if (index === -1) {
            return;
        }
        const [, callbacks] = this.overlays[index];
        return await callbacks[eventName]?.(...args);
    }

    push(id: string, callbacks: OverlayCallbacks) {
        this.overlays.push([id, callbacks]);
        return this.run(id, VS_OVERLAY_OPEN);
    }

    addCallbacks(id: string, callbacks: OverlayCallbacks) {
        const index = this.overlays.findIndex(([stackId]) => stackId === id);
        if (index === -1) {
            return;
        }
        const [, currentCallbacks] = this.overlays[index];
        this.overlays[index] = [id, { ...currentCallbacks, ...callbacks }];
    }

    pop() {
        const popped = this.overlays.pop();
        if (!popped) {
            return;
        }
        const [poppedId] = popped;
        return this.run(poppedId, VS_OVERLAY_CLOSE);
    }

    remove(id: string) {
        const index = this.overlays.findIndex(([stackId]) => stackId === id);
        if (index === -1) {
            return;
        }
        const [popped] = this.overlays.splice(index, 1);
        if (!popped) {
            return;
        }
        const [poppedId] = popped;
        return this.run(poppedId, VS_OVERLAY_CLOSE);
    }
}
