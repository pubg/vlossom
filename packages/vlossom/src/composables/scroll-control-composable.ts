import { onMounted, ref } from 'vue';
import { SCROLLBAR_WIDTH } from '@/declaration';
import { useScrollLock } from '@vueuse/core';

export function useScrollControl() {
    const originalPaddingRight = ref('0');
    const originalPaddingBottom = ref('0');
    const isLocked = useScrollLock(document.body);

    function disableScroll() {
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

    function enableScroll() {
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
        disableScroll,
        enableScroll,
    };
}
