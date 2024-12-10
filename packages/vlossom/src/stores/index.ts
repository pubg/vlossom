import { ModalStore } from './modal-store';
import { OverlayStore } from './overlay-store';
import { OptionStore } from './option-store';
import { OverlayStackStore } from './overlay-stack-store';
import { VsToastInfo } from '@/components/vs-toast/types';

export class VsStore {
    private _option: OptionStore | null = null;
    private _modal: ModalStore | null = null;
    private _overlay: OverlayStore | null = null;
    private _toast: OverlayStackStore<VsToastInfo> | null = null;

    public get option() {
        if (!this._option) {
            this._option = new OptionStore();
        }
        return this._option;
    }

    public get modal() {
        if (!this._modal) {
            this._modal = new ModalStore();
        }
        return this._modal;
    }

    public get overlay() {
        if (!this._overlay) {
            this._overlay = new OverlayStore();
        }
        return this._overlay;
    }

    public get toast() {
        if (!this._toast) {
            this._toast = new OverlayStackStore<VsToastInfo>();
        }
        return this._toast;
    }
}

export const store = new VsStore();
