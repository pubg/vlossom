import type { GlobalColorScheme } from '@/declaration/types';

import { beforeAll, afterAll, describe, expect, it } from 'vitest';
import { setGlobalColorScheme, useColorScheme } from '../color-scheme-composable';
import { ref } from 'vue';

const globalColorScheme: GlobalColorScheme = {
    vsButton: 'red',
    vsInput: 'amber',
};

describe('useColorScheme composable', () => {
    beforeAll(() => {
        setGlobalColorScheme(globalColorScheme);
    });

    afterAll(() => {
        setGlobalColorScheme({});
    });

    it('use colorScheme prop first if it exists', () => {
        const { computedColorScheme } = useColorScheme(ref('green'), 'vsButton', 'indigo');

        expect(computedColorScheme.value).toBe('green');
    });

    it('use a global color scheme value of component if it exists', () => {
        const { computedColorScheme } = useColorScheme(ref(''), 'vsInput', 'indigo');

        expect(computedColorScheme.value).toBe('amber');
    });

    it('use a default global color scheme value if it exists', () => {
        setGlobalColorScheme({ ...globalColorScheme, default: 'blue' });

        const { computedColorScheme } = useColorScheme(ref(''), 'vsSection', 'idle');

        expect(computedColorScheme.value).toBe('blue');
    });

    it('use a default color scheme value of component if there is nor prop or global value', () => {
        setGlobalColorScheme(globalColorScheme);

        const { computedColorScheme } = useColorScheme(ref(''), 'vsSection', 'idle');

        expect(computedColorScheme.value).toBe('idle');
    });
});
