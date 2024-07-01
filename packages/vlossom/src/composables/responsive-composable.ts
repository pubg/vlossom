import { ComputedRef, PropType, Ref, computed } from 'vue';
import { utils } from '@/utils';

import type { Breakpoints } from '@/declaration';

function hasValue(value: any): value is string | number | Breakpoints {
    return value !== undefined && value !== null && value !== '';
}

export function getResponsiveProps() {
    return {
        width: { type: [String, Number, Object] as PropType<string | number | Breakpoints>, default: null },
        grid: { type: [String, Number, Object] as PropType<string | number | Breakpoints>, default: null },
    };
}

export function getGridProps(name: string) {
    return {
        columnGap: {
            type: [Number, String],
            default: 0,
            validator: (value: number | string, props: any) => {
                if (!props.grid && !!value) {
                    utils.log.propWarning(name, 'column-gap', 'column-gap is only available when grid is true');
                    return false;
                }
                return true;
            },
        },
        grid: { type: Boolean, default: false },
        rowGap: {
            type: [Number, String],
            default: 0,
            validator: (value: number | string, props: any) => {
                if (!props.grid && !!value) {
                    utils.log.propWarning(name, 'row-gap', 'row-gap is only available when grid is true');
                    return false;
                }
                return true;
            },
        },
    };
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
                const { base, sm, md, lg, xl } = width.value;
                const widthStyles = {
                    ...(hasValue(base) && { ['--vs-width-base']: utils.string.convertToStringSize(base) }),
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
                const { base, sm, md, lg, xl } = grid.value;
                const gridStyles = {
                    ...(hasValue(base) && { ['--vs-grid-base']: base?.toString() }),
                    ...(hasValue(sm) && { ['--vs-grid-sm']: sm?.toString() }),
                    ...(hasValue(md) && { ['--vs-grid-md']: md?.toString() }),
                    ...(hasValue(lg) && { ['--vs-grid-lg']: lg?.toString() }),
                    ...(hasValue(xl) && { ['--vs-grid-xl']: xl?.toString() }),
                };
                Object.assign(styles, gridStyles);
            } else {
                const gridStyles = {
                    '--vs-grid-base': grid.value?.toString(),
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
