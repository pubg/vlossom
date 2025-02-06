import { computed } from 'vue';
import { store } from '@/stores';

import type { Ref } from 'vue';
import type { ColorScheme, VsComponent } from '@/declaration';

export function useColorScheme(component: VsComponent | string, colorScheme: Ref<ColorScheme | undefined>) {
    const computedColorScheme = computed(
        () => colorScheme.value || store.option.getGlobalColorScheme(component) || undefined,
    );

    const colorSchemeClass = computed(() => `vs-${computedColorScheme.value || 'none'}`);

    return {
        computedColorScheme,
        colorSchemeClass,
    };
}
