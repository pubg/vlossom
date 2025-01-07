import { ref } from 'vue';
import { SCROLLBAR_WIDTH } from '@/declaration';

export function useScrollLock(element: HTMLElement | null) {
    const originalOverflow = ref('');
    const originalPaddingRight = ref('0');
    const originalPaddingBottom = ref('0');

    function lock() {
        if (!element) {
            return;
        }
        setTimeout(() => {
            originalOverflow.value = element.style.overflow;
            originalPaddingRight.value = element.style.paddingRight;
            originalPaddingBottom.value = element.style.paddingBottom;

            element.style.overflow = 'hidden';

            if (element.scrollHeight > element.clientHeight) {
                element.style.paddingRight = SCROLLBAR_WIDTH;
            }

            if (element.scrollWidth > element.clientWidth) {
                element.style.paddingBottom = SCROLLBAR_WIDTH;
            }
        }, 10);
    }

    function unlock() {
        if (!element) {
            return;
        }
        setTimeout(() => {
            element.style.overflow = originalOverflow.value;
            element.style.paddingRight = originalPaddingRight.value;
            element.style.paddingBottom = originalPaddingBottom.value;
        }, 10);
    }

    return {
        lock,
        unlock,
    };
}
