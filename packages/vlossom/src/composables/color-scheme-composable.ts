import type { Ref } from 'vue';
import type { ColorScheme, GlobalColorScheme } from '@/declaration/types';

import { computed, ref } from 'vue';

const globalColorScheme: Ref<GlobalColorScheme> = ref({});

export function setGlobalColorScheme(colorScheme: GlobalColorScheme) {
    globalColorScheme.value = colorScheme;
}

export function useColorScheme(
    colorScheme: Ref<ColorScheme | ''>,
    key: keyof GlobalColorScheme,
    defaultColorScheme: ColorScheme,
) {
    const computedColorScheme = computed(
        () =>
            colorScheme.value || globalColorScheme.value[key] || globalColorScheme.value.default || defaultColorScheme,
    );

    return {
        computedColorScheme,
    };
}
