import type { Ref } from 'vue';
import type { StyleSet } from '@/declaration/types';

import { computed, ComputedRef, ref } from 'vue';
import { kebabToPascal } from '@/utils';

const registeredStyleSet: Ref<StyleSet> = ref({});

export function registerStyleSet(newStyleSet: StyleSet) {
    Object.entries(newStyleSet).forEach(([key, value]) => {
        const styleSet = registeredStyleSet.value[key as keyof StyleSet];

        if (!styleSet) {
            registeredStyleSet.value[key as keyof StyleSet] = value;
        } else {
            Object.assign(styleSet, value);
        }
    });
}

export function useCustomStyle<T extends { [key: string]: any }>(styleSet: Ref<string | T>, prefix: string) {
    const styles: ComputedRef<T> = computed(() => {
        if (!styleSet.value) {
            return {} as T;
        }

        if (typeof styleSet.value === 'string') {
            const preDefinedStyleSet =
                registeredStyleSet.value[('vs' + kebabToPascal(prefix)) as keyof StyleSet]?.[styleSet.value];

            return (preDefinedStyleSet ?? {}) as T;
        }

        return styleSet.value;
    });

    const customProperties = computed(() =>
        Object.entries(styles.value).reduce((acc, [key, value]) => {
            acc[`--vs-${prefix}-${key}`] = value;
            return acc;
        }, {} as { [key: string]: any }),
    );

    return {
        customProperties,
    };
}
