import { ComputedRef, PropType, Ref, computed } from 'vue';

import type { Breakpoints } from '@/declaration';

export function getResponsiveProps() {
    return {
        width: { type: [String, Object] as PropType<string | Breakpoints>, default: null },
        grid: { type: Object as PropType<Breakpoints>, default: () => ({}) },
    };
}

export function useResponsiveWidth(width: Ref<string | Breakpoints | null>, grid: Ref<Breakpoints>) {
    const responsiveWidth: ComputedRef<Breakpoints | string> = computed(() => {
        if (typeof width.value === 'string') {
            return width.value;
        }

        if (Object.keys(grid.value).length > 0) {
            return Object.entries(grid.value).reduce((acc, [key, value]) => {
                return {
                    ...acc,
                    [key]: `calc(${value}/12 * 100%)`,
                };
            }, {} as Breakpoints);
        }

        return width.value ?? '100%';
    });

    const widthVariables: ComputedRef<Record<string, string>> = computed(() => {
        if (typeof responsiveWidth.value === 'string') {
            return {};
        }

        const { base = '100%', sm, md, lg, xl } = responsiveWidth.value;

        return {
            ...(base && { ['--vs-width-base']: base?.toString() }),
            ...(sm && { ['--vs-width-sm']: sm?.toString() }),
            ...(md && { ['--vs-width-md']: md?.toString() }),
            ...(lg && { ['--vs-width-lg']: lg?.toString() }),
            ...(xl && { ['--vs-width-xl']: xl?.toString() }),
        };
    });

    const widthClasses: ComputedRef<string[]> = computed(() => {
        if (typeof responsiveWidth.value === 'string') {
            return [];
        }

        const { base = '100%', sm, md, lg, xl } = responsiveWidth.value;

        return [
            ...(base ? ['vs-width-base'] : []),
            ...(sm ? ['vs-width-sm'] : []),
            ...(md ? ['vs-width-md'] : []),
            ...(lg ? ['vs-width-lg'] : []),
            ...(xl ? ['vs-width-xl'] : []),
        ];
    });

    const widthProperties: ComputedRef<Record<string, string>> = computed(() => {
        if (typeof responsiveWidth.value === 'string') {
            return {
                width: responsiveWidth.value,
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
