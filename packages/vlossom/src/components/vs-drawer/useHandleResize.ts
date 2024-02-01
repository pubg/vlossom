import { Ref, onBeforeUnmount, onMounted } from 'vue';
import * as _ from 'lodash-es';

export function useHandleResize(isOpen: Ref<boolean>, container: HTMLElement, breakpoint: number) {
    const resizeObserver = new ResizeObserver(
        _.debounce((entries) => {
            for (const entry of entries) {
                const { width } = entry.contentRect;
                if (width < breakpoint) {
                    isOpen.value = false;
                }
            }
        }, 300),
    );

    onMounted(() => {
        resizeObserver.observe(container);
    });

    onBeforeUnmount(() => {
        resizeObserver.disconnect();
    });
}
