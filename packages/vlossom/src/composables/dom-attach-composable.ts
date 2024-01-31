import { Ref, onBeforeMount, ref } from 'vue';
import { AttachInfo, Placement, Align } from '@/declaration/types';
import { utils } from '@/utils';

export function useDomAttach(target: Ref<HTMLElement>, attachment: Ref<HTMLElement>, useOverlay = false) {
    const isAttached = ref(false);
    const attachedPlacement: Ref<Placement | null> = ref(null);
    let throttledSetAttachment: ((...args: any) => any) | null = null;

    function getX(align: Align, left: number, right: number, width: number, attachmentWidth: number) {
        switch (align) {
            case 'start':
                return left;
            case 'end':
                return right - attachmentWidth;
            case 'center':
            default:
                return left + width / 2 - attachmentWidth / 2;
        }
    }

    function getY(align: Align, top: number, bottom: number, height: number, attachmentHeight: number) {
        switch (align) {
            case 'start':
                return top;
            case 'end':
                return bottom - attachmentHeight;
            case 'center':
            default:
                return top + height / 2 - attachmentHeight / 2;
        }
    }

    function setAttachment({
        placement = 'top',
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

        // Change placements when there are no spaces in the viewport.
        if (placement === 'bottom' && bottom + attachmentHeight > window.innerHeight) {
            attachedPlacement.value = 'top';
        } else if (placement === 'top' && top - attachmentHeight < 0) {
            attachedPlacement.value = 'bottom';
        } else if (placement === 'left' && left - attachmentWidth < 0) {
            attachedPlacement.value = 'right';
        } else if (placement === 'right' && right + attachmentWidth > window.innerWidth) {
            attachedPlacement.value = 'left';
        } else {
            attachedPlacement.value = placement;
        }

        let x: number;
        let y: number;

        switch (attachedPlacement.value) {
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
            setAttachment(attachInfo);
            throttledSetAttachment = utils.function.throttle(setAttachment.bind(null, attachInfo), 30);
            document.addEventListener('scroll', throttledSetAttachment, true);
            window.addEventListener('resize', throttledSetAttachment, true);
        }, 50);

        isAttached.value = true;
        attachment.value.style.opacity = '0';
    }

    function detach() {
        if (throttledSetAttachment) {
            document.removeEventListener('scroll', throttledSetAttachment, true);
            window.removeEventListener('resize', throttledSetAttachment, true);
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
        attachedPlacement,
        attach,
        detach,
    };
}

export default useDomAttach;
