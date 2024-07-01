export class EscStackStore {
    private idStack: string[] = [];

    push(id: string) {
        this.idStack.push(id);
    }

    pop() {
        return this.idStack.pop();
    }

    remove(id: string) {
        const index = this.idStack.indexOf(id);
        if (index >= 0) {
            this.idStack.splice(index, 1);
        }
    }

    getTopId() {
        return this.idStack[this.idStack.length - 1];
    }
}
