import type { Ref } from 'vue';
import type { ColorScheme, GlobalColorScheme, VsComponent } from '@/declaration/types';

import { computed, ref } from 'vue';

const globalColorScheme: Ref<GlobalColorScheme> = ref({});

export function setGlobalColorScheme(colorScheme: GlobalColorScheme) {
    globalColorScheme.value = colorScheme;
}

export function useColorScheme(component: VsComponent, colorScheme: Ref<ColorScheme | undefined>) {
    const computedColorScheme = computed(
        () => colorScheme.value || globalColorScheme.value[component] || globalColorScheme.value.default || 'default',
    );

    return {
        computedColorScheme,
    };
}
