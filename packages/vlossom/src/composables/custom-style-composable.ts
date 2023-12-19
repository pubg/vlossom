import type { Ref } from 'vue';
import type { VsComponent } from '@/declaration/types';

import { computed, ComputedRef } from 'vue';
import { stringUtil } from '@/utils';
import { store } from '@/store';

export function useCustomStyle<T extends { [key: string]: any }>(component: VsComponent, styleSet: Ref<string | T>) {
    const styles: ComputedRef<T> = computed(() => {
        if (!styleSet.value) {
            return {} as T;
        }

        if (typeof styleSet.value === 'string') {
            const preDefinedStyleSet = store.getStore().styleSets[component]?.[styleSet.value];

            return (preDefinedStyleSet ?? {}) as T;
        }

        return styleSet.value;
    });

    const customProperties = computed(() =>
        Object.entries(styles.value).reduce((acc, [key, value]) => {
            acc[`--${stringUtil.pascalToKebab(component)}-${key}`] = value;
            return acc;
        }, {} as { [key: string]: any }),
    );

    return {
        customProperties,
    };
}
