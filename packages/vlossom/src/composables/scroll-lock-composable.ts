import { ref } from 'vue';
import { SCROLLBAR_WIDTH } from '@/declaration';

export function useBodyScroll() {
    const originalOverflow = ref('');
    const originalPaddingRight = ref('0');
    const originalPaddingBottom = ref('0');

    function lock() {
        setTimeout(() => {
            originalOverflow.value = document.body.style.overflow;
            originalPaddingRight.value = document.body.style.paddingRight;
            originalPaddingBottom.value = document.body.style.paddingBottom;

            document.body.style.overflow = 'hidden';

            if (document.body.scrollHeight > window.innerHeight) {
                document.body.style.paddingRight = SCROLLBAR_WIDTH;
            }

            if (document.body.scrollWidth > window.innerWidth) {
                document.body.style.paddingBottom = SCROLLBAR_WIDTH;
            }
        }, 10);
    }

    function unlock() {
        setTimeout(() => {
            document.body.style.overflow = originalOverflow.value;
            document.body.style.paddingRight = originalPaddingRight.value;
            document.body.style.paddingBottom = originalPaddingBottom.value;
        }, 10);
    }

    return {
        lock,
        unlock,
    };
}
