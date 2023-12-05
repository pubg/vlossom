import type { GlobalColorScheme } from '@/declaration/types';

import { beforeAll, afterAll, describe, expect, it } from 'vitest';
import { setGlobalColorScheme, useColorScheme } from '../color-scheme-composable';
import { ref } from 'vue';
import { VsComponent } from '@/declaration/types';

const globalColorScheme: GlobalColorScheme = {
    VsButton: 'red',
    VsInput: 'amber',
};

describe('useColorScheme composable', () => {
    beforeAll(() => {
        setGlobalColorScheme(globalColorScheme);
    });

    afterAll(() => {
        setGlobalColorScheme({});
    });

    it('use colorScheme prop first if it exists', () => {
        const { computedColorScheme } = useColorScheme(VsComponent.VsButton, ref('green'));

        expect(computedColorScheme.value).toBe('green');
    });

    it('use a global color scheme value of component if it exists', () => {
        const { computedColorScheme } = useColorScheme(VsComponent.VsInput, ref(undefined));

        expect(computedColorScheme.value).toBe('amber');
    });

    it('use a default global color scheme value if it exists', () => {
        setGlobalColorScheme({ ...globalColorScheme, default: 'blue' });

        const { computedColorScheme } = useColorScheme(VsComponent.VsSection, ref(undefined));

        expect(computedColorScheme.value).toBe('blue');
    });

    it("return default if there isn't both prop and global values", () => {
        setGlobalColorScheme(globalColorScheme);

        const { computedColorScheme } = useColorScheme(VsComponent.VsSection, ref(undefined));

        expect(computedColorScheme.value).toBe('default');
    });
});
