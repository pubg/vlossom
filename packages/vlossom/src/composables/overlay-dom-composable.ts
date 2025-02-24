export function useOverlayDom() {
    function createOverlayDom(id: string, zIndex: number = 10000) {
        const overlay = document.createElement('div');
        overlay.setAttribute('id', id);
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.zIndex = zIndex.toString();

        return overlay;
    }

    function appendOverlayDom(targetElement: Element, id: string, zIndex: number = 10000) {
        if (targetElement.querySelector(`#${id}`)) {
            return;
        }

        const overlay = createOverlayDom(id, zIndex);
        targetElement.appendChild(overlay);
    }

    return { appendOverlayDom };
}
