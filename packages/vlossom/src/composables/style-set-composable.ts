import { computed, ComputedRef, Ref } from 'vue';
import { utils } from '@/utils';
import { store } from '@/stores';

import type { VsComponent, VsNode } from '@/declaration';

export function useStyleSet<T extends { [key: string]: any }>(
    component: VsComponent | VsNode,
    styleSet: Ref<string | T | undefined>,
    additionalStyleSet?: Ref<T>,
) {
    const plainStyleSet: ComputedRef<T> = computed(() => {
        let resultStyleSet: T = {} as T;
        if (!styleSet.value) {
            resultStyleSet = {} as T;
        } else if (typeof styleSet.value === 'string') {
            resultStyleSet = (store.option.getStyleSet(component, styleSet.value) || {}) as T;
        } else {
            resultStyleSet = styleSet.value;
        }

        return { ...resultStyleSet, ...additionalStyleSet?.value };
    });

    const computedStyleSet = computed(() =>
        Object.entries(plainStyleSet.value).reduce((acc, [key, value]) => {
            acc[`--${utils.string.pascalToKebab(component)}-${key}`] = value;
            return acc;
        }, {} as { [key: string]: any }),
    );

    return {
        plainStyleSet,
        computedStyleSet,
    };
}
