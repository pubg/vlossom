import { ComputedRef, Ref, computed } from 'vue';
import { utils } from '@/utils';

import type { Breakpoints } from '@/declaration';

function hasValue(value: any): value is string | number | Breakpoints {
    return value !== undefined && value !== null && value !== '';
}

export function useResponsive(
    width: Ref<string | number | Breakpoints | null>,
    grid: Ref<string | number | Breakpoints | null>,
) {
    const responsiveClasses: ComputedRef<string[]> = computed(() => {
        const classes: string[] = ['vs-response'];

        if (hasValue(width.value) && utils.object.isPlainObject(width.value)) {
            const { sm, md, lg, xl } = width.value;
            const widthClasses = [
                ...(hasValue(sm) ? ['vs-width-sm'] : []),
                ...(hasValue(md) ? ['vs-width-md'] : []),
                ...(hasValue(lg) ? ['vs-width-lg'] : []),
                ...(hasValue(xl) ? ['vs-width-xl'] : []),
            ];
            classes.push(...widthClasses);
        }

        if (hasValue(grid.value) && utils.object.isPlainObject(grid.value)) {
            const { sm, md, lg, xl } = grid.value;
            const gridClasses = [
                ...(hasValue(sm) ? ['vs-grid-sm'] : []),
                ...(hasValue(md) ? ['vs-grid-md'] : []),
                ...(hasValue(lg) ? ['vs-grid-lg'] : []),
                ...(hasValue(xl) ? ['vs-grid-xl'] : []),
            ];
            classes.push(...gridClasses);
        }

        return classes;
    });

    const responsiveStyles: ComputedRef<Record<string, string>> = computed(() => {
        const styles: Record<string, string> = {};
        if (hasValue(width.value)) {
            if (utils.object.isPlainObject(width.value)) {
                const { xs, sm, md, lg, xl } = width.value;
                const widthStyles = {
                    ...(hasValue(xs) && { ['--vs-width-xs']: utils.string.convertToStringSize(xs) }),
                    ...(hasValue(sm) && { ['--vs-width-sm']: utils.string.convertToStringSize(sm) }),
                    ...(hasValue(md) && { ['--vs-width-md']: utils.string.convertToStringSize(md) }),
                    ...(hasValue(lg) && { ['--vs-width-lg']: utils.string.convertToStringSize(lg) }),
                    ...(hasValue(xl) && { ['--vs-width-xl']: utils.string.convertToStringSize(xl) }),
                };

                Object.assign(styles, widthStyles);
            } else {
                styles['width'] = utils.string.convertToStringSize(width.value);
            }
        }

        if (hasValue(grid.value)) {
            if (utils.object.isPlainObject(grid.value)) {
                const { xs, sm, md, lg, xl } = grid.value;
                const gridStyles = {
                    ...(hasValue(xs) && { ['--vs-grid-xs']: xs?.toString() }),
                    ...(hasValue(sm) && { ['--vs-grid-sm']: sm?.toString() }),
                    ...(hasValue(md) && { ['--vs-grid-md']: md?.toString() }),
                    ...(hasValue(lg) && { ['--vs-grid-lg']: lg?.toString() }),
                    ...(hasValue(xl) && { ['--vs-grid-xl']: xl?.toString() }),
                };
                Object.assign(styles, gridStyles);
            } else {
                const gridStyles = {
                    '--vs-grid-xs': grid.value?.toString(),
                };
                Object.assign(styles, gridStyles);
            }
        }

        return styles;
    });

    return {
        responsiveClasses,
        responsiveStyles,
    };
}
