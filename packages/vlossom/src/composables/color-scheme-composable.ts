import { computed } from 'vue';
import { store } from '@/stores';

import type { Ref } from 'vue';
import type { ColorScheme, VsComponent, VsNode } from '@/declaration';

export function useColorScheme(component: VsComponent | VsNode, colorScheme: Ref<ColorScheme | undefined>) {
    const computedColorScheme = computed(
        () => colorScheme.value || store.option.getGlobalColorScheme(component) || 'default',
    );

    const colorSchemeClass = computed(() => `vs-${computedColorScheme.value}`);

    return {
        computedColorScheme,
        colorSchemeClass,
    };
}
