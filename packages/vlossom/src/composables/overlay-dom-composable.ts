import { VS_OVERLAY } from '@/declaration';

export function useOverlayDom() {
    function appendOverlayDom(targetId: string = VS_OVERLAY, zIndex: number = 10000) {
        if (document.getElementById(targetId)) {
            return;
        }

        const overlay = document.createElement('div');
        overlay.setAttribute('id', targetId);
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.zIndex = zIndex.toString();

        document.body.appendChild(overlay);
    }

    return { appendOverlayDom };
}
