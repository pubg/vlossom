import { reactive } from 'vue';
import { SnackbarInfo } from '..';

interface SnackbarState {
    snackbars: SnackbarInfo[];
}

export class SnackbarsStore {
    private state: SnackbarState = reactive({
        snackbars: [],
    });

    getState() {
        return this.state;
    }

    addSnackbar(snackbarInfo: SnackbarInfo) {
        console.log(222222, 'added snackbar!');
        this.state.snackbars.unshift(snackbarInfo);

        setTimeout(() => {
            const index = this.state.snackbars.findIndex((snackbar: SnackbarInfo) => snackbar.id === snackbarInfo.id);
            if (index !== -1) {
                this.removeSnackbar(index);
            }
        }, snackbarInfo.duration);
    }

    removeSnackbar(index: number) {
        this.state.snackbars.splice(index, 1);
    }
}
