import { computed, ComputedRef, Ref } from 'vue';

export function useCustomStyle<T extends { [key: string]: any }>(styleSet: Ref<string | T>, prefix: string) {
    const styles: ComputedRef<T> = computed(() => {
        // TODO
        if (typeof styleSet.value === 'string') {
            return {} as T;
        }

        return styleSet.value;
    });

    const customProperties = computed(() =>
        Object.keys(styles.value).reduce((acc, cur) => {
            acc[`--${prefix}-${cur}`] = styles.value[cur as keyof T];
            return acc;
        }, {} as { [key: string]: any }),
    );

    return { customProperties };
}
