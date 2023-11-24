import { Ref, computed } from 'vue';
import { Grid } from '../VsNameInput.vue';

export function useWidth(name: string, width: Ref<string | Grid>) {
    const computedWidth = computed(() => {
        if (typeof width.value === 'string') {
            return {
                xs: width.value,
            };
        }

        return width.value;
    });

    const widthProperties = computed(() => ({
        [`--${name}-width`]: computedWidth.value.xs?.toString() ?? '100%',
        ...(computedWidth.value.sm && { [`--${name}-width-sm`]: computedWidth.value.sm?.toString() }),
        ...(computedWidth.value.md && { [`--${name}-width-md`]: computedWidth.value.md?.toString() }),
        ...(computedWidth.value.lg && { [`--${name}-width-lg`]: computedWidth.value.lg?.toString() }),
        ...(computedWidth.value.xl && { [`--${name}-width-xl`]: computedWidth.value.xl?.toString() }),
    }));

    const widthClasses = computed(() => {
        if (typeof width.value === 'string') {
            return [];
        }

        return [
            ...(width.value.sm ? ['vs-name-input-width-sm'] : []),
            ...(width.value.md ? ['vs-name-input-width-md'] : []),
            ...(width.value.lg ? ['vs-name-input-width-lg'] : []),
            ...(width.value.xl ? ['vs-name-input-width-xl'] : []),
        ];
    });

    return {
        computedWidth,
        widthProperties,
        widthClasses,
    };
}
