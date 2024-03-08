import { detachConfirm } from '@/plugins';

export class DialogStore {
    private idStack: string[] = [];

    push(id: string) {
        this.idStack.push(id);
    }

    pop() {
        if (this.getTopId() === 'confirm') {
            detachConfirm();
        }
        this.idStack.pop();
    }

    getTopId() {
        return this.idStack[this.idStack.length - 1];
    }
}
