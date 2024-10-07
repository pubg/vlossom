export class EscStackStore {
    private escStack: [string, () => void][] = [];

    constructor() {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (this.escStack.length === 0) {
                return;
            }
            if (event.key === 'Escape') {
                this.pop();
            }
        });
    }

    push(id: string, onEscClose: () => void) {
        this.escStack.push([id, onEscClose]);
    }

    pop() {
        const pop = this.escStack.pop();
        if (!pop) {
            return;
        }
        const [, onEscClose] = pop;
        onEscClose();
    }

    remove(id: string) {
        const index = this.escStack.findIndex(([stackId]) => stackId === id);
        if (index === -1) {
            return;
        }
        const [pop] = this.escStack.splice(index, 1);
        const [, onEscClose] = pop;
        onEscClose();
    }
}
