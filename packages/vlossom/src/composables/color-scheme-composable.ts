import type { Ref } from 'vue';
import type { ColorScheme, VsComponent } from '@/declaration/types';

import { computed } from 'vue';
import { store } from '@/store';

export function useColorScheme(component: VsComponent, colorScheme: Ref<ColorScheme | undefined>) {
    const computedColorScheme = computed(
        () =>
            colorScheme.value ||
            store.getStore().globalColorScheme[component] ||
            store.getStore().globalColorScheme.default ||
            'default',
    );

    return {
        computedColorScheme,
    };
}
