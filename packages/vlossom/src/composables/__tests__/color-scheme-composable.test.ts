import { describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { store } from '@/stores';
import { VsComponent } from '@/declaration';
import { useColorScheme } from './../color-scheme-composable';

describe('useColorScheme composable', () => {
    it('use colorScheme prop first if it exists', () => {
        // given
        store.option.setGlobalColorScheme({ VsButton: 'red' });

        // when
        const { computedColorScheme } = useColorScheme(VsComponent.VsButton, ref('green'));

        // then
        expect(computedColorScheme.value).toBe('green');
    });

    it('use a global color scheme value of component if it exists', () => {
        // given
        store.option.setGlobalColorScheme({ VsInput: 'yellow' });

        // when
        const { computedColorScheme } = useColorScheme(VsComponent.VsInput, ref(undefined));

        // then
        expect(computedColorScheme.value).toBe('yellow');
    });

    it('use a default global color scheme value if it exists', () => {
        // given
        store.option.setGlobalColorScheme({ default: 'blue' });

        // when
        const { computedColorScheme } = useColorScheme(VsComponent.VsSection, ref(undefined));

        // then
        expect(computedColorScheme.value).toBe('blue');
    });

    it("return default if there isn't both prop and global values", () => {
        // when
        const { computedColorScheme } = useColorScheme(VsComponent.VsSection, ref(undefined));

        // then
        expect(computedColorScheme.value).toBe('default');
    });
});
