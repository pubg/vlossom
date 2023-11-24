import { Ref, computed } from 'vue';
import { Grid } from '../VsNameInput.vue';

export function useWidth(name: string, width: Ref<string | Grid>, grid: Ref<Grid>) {
    const computedWidth = computed(() => {
        if (Object.keys(grid.value).length > 0) {
            return Object.entries(grid.value).reduce((acc, [key, value]) => {
                return {
                    ...acc,
                    [key]: `calc(${value}/12 * 100%)`,
                };
            }, {} as Grid);
        }

        if (typeof width.value === 'string') {
            return {
                xs: width.value,
            };
        }

        return width.value;
    });

    const widthProperties = computed(() => {
        const { xs, sm, md, lg, xl } = computedWidth.value;

        return {
            [`--${name}-base`]: xs?.toString() ?? '100%',
            ...(sm && { [`--${name}-sm`]: sm?.toString() }),
            ...(md && { [`--${name}-md`]: md?.toString() }),
            ...(lg && { [`--${name}-lg`]: lg?.toString() }),
            ...(xl && { [`--${name}-xl`]: xl?.toString() }),
        };
    });

    const widthClasses = computed(() => {
        const { sm, md, lg, xl } = computedWidth.value;

        return [
            ...(sm ? [`${name}-sm`] : []),
            ...(md ? [`${name}-md`] : []),
            ...(lg ? [`${name}-lg`] : []),
            ...(xl ? [`${name}-xl`] : []),
        ];
    });

    return {
        computedWidth,
        widthProperties,
        widthClasses,
    };
}
