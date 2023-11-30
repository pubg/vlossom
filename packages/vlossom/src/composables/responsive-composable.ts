import type { Breakpoints } from '@/declaration/types';

import { Ref, computed } from 'vue';

export function useResponsiveWidth(width: Ref<Breakpoints>, grid: Ref<Breakpoints>) {
    const computedWidth = computed(() => {
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
        const { xs, sm, md, lg, xl } = computedWidth.value;

        return {
            ...(xs && { ['--vs-width-xs']: xs?.toString() }),
            ...(sm && { ['--vs-width-sm']: sm?.toString() }),
            ...(md && { ['--vs-width-md']: md?.toString() }),
            ...(lg && { ['--vs-width-lg']: lg?.toString() }),
            ...(xl && { ['--vs-width-xl']: xl?.toString() }),
        };
    });

    const widthClasses = computed(() => {
        const { xs, sm, md, lg, xl } = computedWidth.value;

        return [
            ...(xs ? ['vs-width-xs'] : []),
            ...(sm ? ['vs-width-sm'] : []),
            ...(md ? ['vs-width-md'] : []),
            ...(lg ? ['vs-width-lg'] : []),
            ...(xl ? ['vs-width-xl'] : []),
        ];
    });

    return {
        widthVariables,
        widthClasses,
    };
}
