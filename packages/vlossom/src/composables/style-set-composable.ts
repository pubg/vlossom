import { computed, ComputedRef, Ref } from 'vue';
import { utils } from '@/utils';
import { store } from '@/stores';

import type { VsComponent } from '@/declaration';

export function useStyleSet<T extends { [key: string]: any }>(component: VsComponent, styleSet: Ref<string | T>) {
    const styles: ComputedRef<T> = computed(() => {
        if (!styleSet.value) {
            return {} as T;
        }

        if (typeof styleSet.value === 'string') {
            return (store.option.getStyleSet(component, styleSet.value) || {}) as T;
        }

        return styleSet.value;
    });

    const computedStyleSet = computed(() =>
        Object.entries(styles.value).reduce((acc, [key, value]) => {
            acc[`--${utils.string.pascalToKebab(component)}-${key}`] = value;
            return acc;
        }, {} as { [key: string]: any }),
    );

    return {
        computedStyleSet,
    };
}
