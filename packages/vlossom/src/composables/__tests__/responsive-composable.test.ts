import { describe, expect, it } from 'vitest';
import { useResponsiveWidth } from '../responsive-composable';
import { ref } from 'vue';

describe('useResponsiveWidth composable', () => {
    it('width', () => {
        const { widthVariables, widthClasses } = useResponsiveWidth(
            ref({ xl: '100px', lg: '150px', md: '200px', sm: '250px', xs: '300px' }),
            ref({}),
        );

        expect(widthVariables.value).toEqual({
            '--vs-width-xs': '300px',
            '--vs-width-sm': '250px',
            '--vs-width-md': '200px',
            '--vs-width-lg': '150px',
            '--vs-width-xl': '100px',
        });
        expect(widthClasses.value).toEqual(['vs-width-xs', 'vs-width-sm', 'vs-width-md', 'vs-width-lg', 'vs-width-xl']);
    });

    it('grid', () => {
        const { widthVariables, widthClasses } = useResponsiveWidth(
            ref({}),
            ref({ xl: 1, lg: 2, md: 3, sm: 4, xs: 6 }),
        );

        expect(widthVariables.value).toEqual({
            '--vs-width-xs': 'calc(6/12 * 100%)',
            '--vs-width-sm': 'calc(4/12 * 100%)',
            '--vs-width-md': 'calc(3/12 * 100%)',
            '--vs-width-lg': 'calc(2/12 * 100%)',
            '--vs-width-xl': 'calc(1/12 * 100%)',
        });
        expect(widthClasses.value).toEqual(['vs-width-xs', 'vs-width-sm', 'vs-width-md', 'vs-width-lg', 'vs-width-xl']);
    });
});
