export class DialogStackStore {
    private stack: string[] = [];

    push(id: string) {
        this.stack.push(id);
    }

    pop() {
        this.stack.pop();
    }

    getTopId() {
        return this.stack[this.stack.length - 1];
    }
}
