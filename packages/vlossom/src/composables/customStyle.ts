import type { Ref } from 'vue';
import type { StyleSet, StyleSets } from '@/declaration/types';

import { computed, ComputedRef, ref } from 'vue';
import { kebabToPascal } from '@/utils';

const styleSets: Ref<StyleSets> = ref({});

export function registerStyleSets(newStyleSets: StyleSets) {
    Object.assign(styleSets.value, newStyleSets);
}

export function useCustomStyle<T extends { [key: string]: any }>(styleSet: Ref<string | T>, prefix: string) {
    const styles: ComputedRef<T> = computed(() => {
        if (typeof styleSet.value === 'string') {
            const preDefinedStyleSet =
                styleSets.value[styleSet.value]?.[('vs' + kebabToPascal(prefix)) as keyof StyleSet];

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
