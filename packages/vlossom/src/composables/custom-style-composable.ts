import type { Ref } from 'vue';
import type { StyleSet, VsComponent } from '@/declaration/types';

import { computed, ComputedRef, ref } from 'vue';
import { pascalToKebab } from '@/utils';

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

export function clearStyleSet() {
    registeredStyleSet.value = {};
}

export function useCustomStyle<T extends { [key: string]: any }>(component: VsComponents, styleSet: Ref<string | T>) {
    const styles: ComputedRef<T> = computed(() => {
        if (!styleSet.value) {
            return {} as T;
        }

        if (typeof styleSet.value === 'string') {
            const preDefinedStyleSet = registeredStyleSet.value[component]?.[styleSet.value];

            return (preDefinedStyleSet ?? {}) as T;
        }

        return styleSet.value;
    });

    const customProperties = computed(() =>
        Object.entries(styles.value).reduce((acc, [key, value]) => {
            acc[`--${pascalToKebab(component)}-${key}`] = value;
            return acc;
        }, {} as { [key: string]: any }),
    );

    return {
        customProperties,
    };
}
