import { onMounted, ref } from 'vue';
import { SCROLLBAR_WIDTH } from '@/declaration';
import { useScrollLock } from '@vueuse/core';

export function useBodyScroll() {
    const originalPaddingRight = ref('0');
    const originalPaddingBottom = ref('0');
    const isLocked = useScrollLock(document.body);

    function lock() {
        setTimeout(() => {
            isLocked.value = true;

            if (document.body.scrollHeight > window.innerHeight) {
                document.body.style.paddingRight = SCROLLBAR_WIDTH;
            }

            if (document.body.scrollWidth > window.innerWidth) {
                document.body.style.paddingBottom = SCROLLBAR_WIDTH;
            }
        }, 0);
    }

    function unlock() {
        setTimeout(() => {
            isLocked.value = false;

            document.body.style.paddingRight = originalPaddingRight.value;
            document.body.style.paddingBottom = originalPaddingBottom.value;
        }, 0);
    }

    onMounted(() => {
        originalPaddingRight.value = document.body.style.paddingRight;
        originalPaddingBottom.value = document.body.style.paddingBottom;
    });

    return {
        isLocked,
        lock,
        unlock,
    };
}
