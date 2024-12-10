import { OptionStore } from './option-store';
import { OverlayCallbackStore } from './overlay-callback-store';
import { OverlayStackStore } from './overlay-stack-store';
import { VsModalOptions, VsToastInfo } from '@/components';

export class VsStore {
    private _option: OptionStore | null = null;
    private _modal: OverlayStackStore<VsModalOptions> | null = null;
    private _overlay: OverlayCallbackStore | null = null;
    private _toast: OverlayStackStore<VsToastInfo> | null = null;

    public get option() {
        if (!this._option) {
            this._option = new OptionStore();
        }
        return this._option;
    }

    public get modal() {
        if (!this._modal) {
            this._modal = new OverlayStackStore<VsModalOptions>();
        }
        return this._modal;
    }

    public get overlay() {
        if (!this._overlay) {
            this._overlay = new OverlayCallbackStore();
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
