import { ref } from 'vue';
import { SCROLLBAR_WIDTH } from '@/declaration';
import { utils } from '@/utils';

interface ScrollLockState {
    overflow: string;
    paddingRight: string;
    paddingBottom: string;
}

export function useScrollLock(element: HTMLElement | null) {
    const originalState = ref<ScrollLockState>({
        overflow: '',
        paddingRight: '0',
        paddingBottom: '0',
    });
    const isNotTouchDevice = !(utils.dom.isBrowser() && utils.device.isTouchDevice());

    function saveOriginalState() {
        if (!element) {
            return;
        }

        originalState.value = {
            overflow: element.style.overflow,
            paddingRight: element.style.paddingRight,
            paddingBottom: element.style.paddingBottom,
        };
    }

    function applyScrollLockStyles() {
        if (!element) {
            return;
        }

        element.style.overflow = 'hidden';

        if (isNotTouchDevice) {
            if (element.scrollHeight >= element.clientHeight) {
                element.style.paddingRight = SCROLLBAR_WIDTH;
            }
            if (element.scrollWidth >= element.clientWidth) {
                element.style.paddingBottom = SCROLLBAR_WIDTH;
            }
        }
    }

    function restoreOriginalState() {
        if (!element) {
            return;
        }

        element.style.overflow = originalState.value.overflow;
        element.style.paddingRight = originalState.value.paddingRight;
        element.style.paddingBottom = originalState.value.paddingBottom;
    }

    function lock() {
        if (!element) {
            return;
        }

        saveOriginalState();
        requestAnimationFrame(applyScrollLockStyles);
    }

    function unlock() {
        if (!element) {
            return;
        }

        requestAnimationFrame(restoreOriginalState);
    }

    return {
        lock,
        unlock,
    };
}
