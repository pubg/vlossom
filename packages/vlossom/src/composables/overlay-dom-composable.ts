interface OverlayStyle {
    width?: string;
    height?: string;
    pointerEvents?: string;
    zIndex?: number;
}

export function useOverlayDom() {
    function createOverlayDom(id: string, overlayStyle: OverlayStyle = {}) {
        const overlay = document.createElement('div');
        overlay.setAttribute('id', id);
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';

        if (overlayStyle.width) {
            overlay.style.width = overlayStyle.width;
        }
        if (overlayStyle.height) {
            overlay.style.height = overlayStyle.height;
        }
        if (overlayStyle.pointerEvents) {
            overlay.style.pointerEvents = overlayStyle.pointerEvents;
        }

        overlay.style.zIndex = (overlayStyle.zIndex || 2000).toString();

        return overlay;
    }

    function appendOverlayDom(targetElement: Element, id: string, overlayStyle: OverlayStyle = {}) {
        const overlay = targetElement.querySelector(`#${id}`);
        if (overlay) {
            return overlay;
        }

        const newOverlay = createOverlayDom(id, overlayStyle);
        targetElement.appendChild(newOverlay);
        return newOverlay;
    }

    return { appendOverlayDom };
}
