import { describe, expect, it } from 'vitest';
import { useResponsiveWidth } from '../responsive-composable';
import { ref } from 'vue';

describe('useResponsiveWidth composable', () => {
    it('width with all breakpoints', () => {
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

    it('width with some breakpoints', () => {
        const { widthVariables, widthClasses } = useResponsiveWidth(ref({ lg: '20%', sm: '50%' }), ref({}));

        expect(widthVariables.value).toEqual({
            '--vs-width-sm': '50%',
            '--vs-width-lg': '20%',
        });
        expect(widthClasses.value).toEqual(['vs-width-sm', 'vs-width-lg']);
    });

    it('grid with all breakpoints', () => {
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

    it('grid with some breakpoints', () => {
        const { widthVariables, widthClasses } = useResponsiveWidth(ref({}), ref({ lg: 4, md: 6 }));

        expect(widthVariables.value).toEqual({
            '--vs-width-md': 'calc(6/12 * 100%)',
            '--vs-width-lg': 'calc(4/12 * 100%)',
        });
        expect(widthClasses.value).toEqual(['vs-width-md', 'vs-width-lg']);
    });

    it('grid comes first', () => {
        const { widthVariables, widthClasses } = useResponsiveWidth(
            ref({ lg: '20%', sm: '50%' }),
            ref({ lg: 4, md: 6 }),
        );

        expect(widthVariables.value).toEqual({
            '--vs-width-md': 'calc(6/12 * 100%)',
            '--vs-width-lg': 'calc(4/12 * 100%)',
        });
        expect(widthClasses.value).toEqual(['vs-width-md', 'vs-width-lg']);
    });
});
