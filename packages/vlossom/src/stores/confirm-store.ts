import { reactive } from 'vue';

interface ConfirmState {
    resolve: ((result: boolean) => void) | null;
}

export class ConfirmStore {
    private state: ConfirmState = reactive({
        resolve: null,
    });

    getState() {
        return this.state;
    }

    setResolve(resolve: (result: boolean) => void) {
        this.state.resolve = resolve;
    }

    executeResolve(result: boolean) {
        if (this.state.resolve) {
            this.state.resolve(result);
        }
    }
}
