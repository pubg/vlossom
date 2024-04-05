import { ComputedRef, PropType, Ref, computed } from 'vue';
import { utils } from '@/utils';

import type { Breakpoints } from '@/declaration';

export function getResponsiveProps() {
    return {
        width: { type: [String, Object] as PropType<string | Breakpoints>, default: null },
        grid: { type: Object as PropType<Breakpoints>, default: () => ({}) },
    };
}

export function useResponsive(width: Ref<string | Breakpoints | null>, grid: Ref<Breakpoints>) {
    const responsiveClasses: ComputedRef<string[]> = computed(() => {
        const classes: string[] = ['vs-responsive'];

        if (width.value && utils.object.isPlainObject(width.value)) {
            const { sm, md, lg, xl } = width.value;
            const widthClasses = [
                ...(sm ? ['vs-width-sm'] : []),
                ...(md ? ['vs-width-md'] : []),
                ...(lg ? ['vs-width-lg'] : []),
                ...(xl ? ['vs-width-xl'] : []),
            ];
            classes.push(...widthClasses);
        }

        const { sm, md, lg, xl } = grid.value;
        const gridClasses = [
            ...(sm ? ['vs-grid-sm'] : []),
            ...(md ? ['vs-grid-md'] : []),
            ...(lg ? ['vs-grid-lg'] : []),
            ...(xl ? ['vs-grid-xl'] : []),
        ];
        classes.push(...gridClasses);

        return classes;
    });

    const responsiveStyles: ComputedRef<Record<string, string>> = computed(() => {
        const styles: Record<string, string> = {};

        if (width.value && utils.object.isPlainObject(width.value)) {
            const { base, sm, md, lg, xl } = width.value;
            const widthStyles = {
                ...(base && { ['--vs-width-base']: base?.toString() }),
                ...(sm && { ['--vs-width-sm']: sm?.toString() }),
                ...(md && { ['--vs-width-md']: md?.toString() }),
                ...(lg && { ['--vs-width-lg']: lg?.toString() }),
                ...(xl && { ['--vs-width-xl']: xl?.toString() }),
            };
            Object.assign(styles, widthStyles);
        } else if (typeof width.value === 'string') {
            styles['width'] = width.value;
        }

        const { base, sm, md, lg, xl } = grid.value;
        const gridStyles = {
            ...(base && { ['--vs-grid-base']: base?.toString() }),
            ...(sm && { ['--vs-grid-sm']: sm?.toString() }),
            ...(md && { ['--vs-grid-md']: md?.toString() }),
            ...(lg && { ['--vs-grid-lg']: lg?.toString() }),
            ...(xl && { ['--vs-grid-xl']: xl?.toString() }),
        };
        Object.assign(styles, gridStyles);

        return styles;
    });

    return {
        responsiveClasses,
        responsiveStyles,
    };
}
