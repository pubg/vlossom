import { PropType, Ref, computed } from 'vue';
import type { Breakpoints } from '@/declaration/types';

export function getResponsiveProps() {
    return {
        grid: { type: Object as PropType<Breakpoints>, default: () => ({}) },
        width: { type: [String, Object] as PropType<string | Breakpoints>, default: '100%' },
    };
}

export function useResponsiveWidth(width: Ref<string | Breakpoints>, grid: Ref<Breakpoints>) {
    const responsiveWidth = computed(() => {
        if (typeof width.value === 'string') {
            return {};
        }

        if (Object.keys(grid.value).length > 0) {
            return Object.entries(grid.value).reduce((acc, [key, value]) => {
                return {
                    ...acc,
                    [key]: `calc(${value}/12 * 100%)`,
                };
            }, {} as Breakpoints);
        }

        return width.value;
    });

    const widthVariables = computed(() => {
        const { xs, sm, md, lg, xl } = responsiveWidth.value;

        return {
            ...(xs && { ['--vs-width-xs']: xs?.toString() }),
            ...(sm && { ['--vs-width-sm']: sm?.toString() }),
            ...(md && { ['--vs-width-md']: md?.toString() }),
            ...(lg && { ['--vs-width-lg']: lg?.toString() }),
            ...(xl && { ['--vs-width-xl']: xl?.toString() }),
        };
    });

    const widthClasses = computed(() => {
        const { xs, sm, md, lg, xl } = responsiveWidth.value;

        return [
            ...(xs ? ['vs-width-xs'] : []),
            ...(sm ? ['vs-width-sm'] : []),
            ...(md ? ['vs-width-md'] : []),
            ...(lg ? ['vs-width-lg'] : []),
            ...(xl ? ['vs-width-xl'] : []),
        ];
    });

    const widthProperties = computed(() => {
        if (typeof width.value === 'string') {
            return {
                width: width.value,
            };
        }

        return widthVariables.value;
    });

    return {
        widthVariables,
        widthClasses,
        widthProperties,
    };
}
