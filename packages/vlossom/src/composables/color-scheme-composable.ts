import { computed } from 'vue';
import { store } from '@/store';

import type { Ref } from 'vue';
import type { ColorScheme, VsComponent } from '@/declaration';

export function useColorScheme(component: VsComponent, colorScheme: Ref<ColorScheme | undefined>) {
    const computedColorScheme = computed(() => colorScheme.value || store.getGlobalColorScheme(component) || 'default');

    return {
        computedColorScheme,
    };
}
