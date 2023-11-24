import { Ref, computed, nextTick, watch } from 'vue';
import { Grid } from '../VsNameInput.vue';

export function useWidth(name: string, width: Ref<string | Grid>, container: Ref<HTMLElement | null>) {
    const computedWidth = computed(() => {
        if (typeof width.value === 'string') {
            return {
                xs: width.value,
                sm: width.value,
                md: width.value,
                lg: width.value,
                xl: width.value,
            };
        }

        return {
            xs: width.value.xs || '100%',
            sm: width.value.sm || width.value.xs || '100%',
            md: width.value.md || width.value.sm || '100%',
            lg: width.value.lg || width.value.md || width.value.sm || width.value.xs || '100%',
            xl: width.value.xl || width.value.lg || width.value.md || width.value.sm || width.value.xs || '100%',
        };
    });

    watch(
        width,
        async () => {
            await nextTick();
            if (container.value === null) {
                return;
            }

            container.value.style.setProperty(`--${name}-width-xs`, computedWidth.value.xs.toString());
            container.value.style.setProperty(`--${name}-width-sm`, computedWidth.value.sm.toString());
            container.value.style.setProperty(`--${name}-width-md`, computedWidth.value.md.toString());
            container.value.style.setProperty(`--${name}-width-lg`, computedWidth.value.lg.toString());
            container.value.style.setProperty(`--${name}-width-xl`, computedWidth.value.xl.toString());
        },
        { immediate: true },
    );

    return {
        computedWidth,
    };
}
