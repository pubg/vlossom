import { VS_OVERLAY } from '@/declaration';

export function useOverlayDom() {
    function appendOverlayDom(target: string = VS_OVERLAY, zIndex: number = 10000) {
        if (document.querySelector(target)) {
            return;
        }

        const overlay = document.createElement('div');
        overlay.setAttribute('id', target);
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.zIndex = zIndex.toString();

        document.body.appendChild(overlay);
    }

    return { appendOverlayDom };
}
