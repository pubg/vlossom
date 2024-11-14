import { PropType } from 'vue';
import { Breakpoints } from '@/declaration';
import { utils } from '@/utils';

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
