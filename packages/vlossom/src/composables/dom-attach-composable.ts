import { Ref, onBeforeMount, ref } from 'vue';
import { AttachInfo, Align, Position } from '@/declaration/types';
import { utils } from '@/utils';

export function useDomAttach(target: Ref<HTMLElement>, attachment: Ref<HTMLElement>, useOverlay = false) {
    const isAttached = ref(false);
    const attachedPosition: Ref<Position | null> = ref(null);
    let throttledSetPosition: ((...args: any) => any) | null = null;

    function getX(align: Align, left: number, right: number, width: number, attachmentWidth: number) {
        switch (align) {
            case 'left':
                return left;
            case 'right':
                return right - attachmentWidth;
            case 'center':
            case 'top':
            case 'bottom':
                return left + width / 2 - attachmentWidth / 2;
            default:
                throw Error('Align is Invalid Value');
        }
    }

    function getY(align: Align, top: number, bottom: number, height: number, attachmentHeight: number) {
        switch (align) {
            case 'top':
                return top;
            case 'bottom':
                return bottom - attachmentHeight;
            case 'center':
            case 'left':
            case 'right':
                return top + height / 2 - attachmentHeight / 2;
            default:
                throw Error('Align is Invalid Value');
        }
    }


    function setPosition({
        position = 'top',
        align = 'center',
        margin = 2,
        followWidth = false,
        minWidth,
        maxWidth,
    }: AttachInfo) {
        if (!target.value || !attachment.value) {
            return;
        }

        const { top, right, bottom, left, width, height } = utils.dom.getClientRect(target.value);
        const { width: attachmentWidth, height: attachmentHeight } = utils.dom.getClientRect(attachment.value);

        attachedPosition.value = position;

        // Change positions when there are no spaces in the viewport.
        if (position === 'bottom' && bottom + attachmentHeight > window.innerHeight) {
            attachedPosition.value = 'top';
        } else if (position === 'top' && top - attachmentHeight < 0) {
            attachedPosition.value = 'bottom';
        } else if (position === 'left' && left - attachmentWidth < 0) {
            attachedPosition.value = 'right';
        } else if (position === 'right' && right + attachmentWidth > window.innerWidth) {
            attachedPosition.value = 'left';
        }

        let x: number;
        let y: number;

        switch (attachedPosition.value) {
            case 'top':
                x = getX(align, left, right, width, attachmentWidth);
                y = top - attachmentHeight - margin;
                break;
            case 'right':
                x = right + margin;
                y = getY(align, top, bottom, height, attachmentHeight);
                break;
            case 'bottom':
                x = getX(align, left, right, width, attachmentWidth);
                y = bottom + margin;
                break;
            case 'left':
                x = left - attachmentWidth - margin;
                y = getY(align, top, bottom, height, attachmentHeight);
                break;
            default:
                throw Error('Direction is Invalid Value');
        }

        const scrollLeft = window.scrollX || document.documentElement.scrollLeft || 0;
        const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;

        attachment.value.style.display = 'block';
        attachment.value.style.opacity = '1';
        attachment.value.style.position = 'absolute';
        attachment.value.style.left = `${x + scrollLeft}px`;
        attachment.value.style.top = `${y + scrollTop}px`;

        // refine width
        let resultWidth = attachmentWidth;
        if (followWidth) {
            resultWidth = width;
        }
        if (minWidth) {
            resultWidth = Math.max(minWidth, resultWidth);
        }
        if (maxWidth) {
            resultWidth = Math.min(maxWidth, resultWidth);
        }
        attachment.value.style.width = `${resultWidth}px`;
    }

    function attach(attachInfo: AttachInfo = {}) {
        setTimeout(() => {
            setPosition(attachInfo);
            throttledSetPosition = utils.function.throttle(setPosition.bind(null, attachInfo), 30);
            document.addEventListener('scroll', throttledSetPosition, true);
            window.addEventListener('resize', throttledSetPosition, true);
        }, 50);

        isAttached.value = true;
        attachment.value.style.opacity = '0';
    }

    function detach() {
        if (throttledSetPosition) {
            document.removeEventListener('scroll', throttledSetPosition, true);
            window.removeEventListener('resize', throttledSetPosition, true);
        }
        isAttached.value = false;
    }

    function attachOverlay() {
        if (document.getElementById('vs-overlay')) {
            return;
        }
        const overlay = document.createElement('div');
        overlay.setAttribute('id', 'vs-overlay');

        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.zIndex = '10000';

        document.body.appendChild(overlay);
    }

    onBeforeMount(() => {
        if (!useOverlay) {
            return;
        }
        attachOverlay();
    });

    return {
        isAttached,
        attachedPosition,
        attach,
        detach,
    };
}

export default useDomAttach;
