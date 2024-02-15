import { describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { useResponsive } from '../responsive-composable';

describe('useResponsive composable', () => {
    describe('width', () => {
        it('string type width', () => {
            const { responsiveClasses, responsiveStyles } = useResponsive(ref('400px'), ref({}));

            expect(responsiveClasses.value).toEqual([]);
            expect(responsiveStyles.value).toEqual({ width: '400px' });
        });

        it('default width (null)', () => {
            const { responsiveClasses, responsiveStyles } = useResponsive(ref(null), ref({}));

            expect(responsiveClasses.value).toEqual([]);
            expect(responsiveStyles.value).toEqual({ width: '100%' });
        });

        it('width with all breakpoints', () => {
            const { responsiveClasses, responsiveStyles } = useResponsive(
                ref({
                    xl: '100px',
                    lg: '150px',
                    md: '200px',
                    sm: '250px',
                    base: '300px',
                }),
                ref({}),
            );

            expect(responsiveClasses.value).toEqual([
                'vs-width-base',
                'vs-width-sm',
                'vs-width-md',
                'vs-width-lg',
                'vs-width-xl',
            ]);
            expect(responsiveStyles.value).toEqual({
                '--vs-width-base': '300px',
                '--vs-width-sm': '250px',
                '--vs-width-md': '200px',
                '--vs-width-lg': '150px',
                '--vs-width-xl': '100px',
            });
        });

        it('width with some breakpoints', () => {
            const { responsiveClasses, responsiveStyles } = useResponsive(ref({ lg: '20%', sm: '50%' }), ref({}));

            expect(responsiveClasses.value).toEqual(['vs-width-base', 'vs-width-sm', 'vs-width-lg']);
            expect(responsiveStyles.value).toEqual({
                '--vs-width-base': '100%',
                '--vs-width-sm': '50%',
                '--vs-width-lg': '20%',
            });
        });
    });

    describe('grid', () => {
        it('When both string type width and grid are present, string type width takes precedence', () => {
            const { responsiveClasses, responsiveStyles } = useResponsive(
                ref('400px'),
                ref({ xl: 1, lg: 2, md: 3, sm: 4, base: 6 }),
            );

            expect(responsiveClasses.value).toEqual([]);
            expect(responsiveStyles.value).toEqual({ width: '400px' });
        });

        it('grid with all breakpoints', () => {
            const { responsiveClasses, responsiveStyles } = useResponsive(
                ref({}),
                ref({ xl: 1, lg: 2, md: 3, sm: 4, base: 6 }),
            );

            expect(responsiveClasses.value).toEqual([
                'vs-width-base',
                'vs-width-sm',
                'vs-width-md',
                'vs-width-lg',
                'vs-width-xl',
            ]);
            expect(responsiveStyles.value).toEqual({
                '--vs-width-base': 'calc(6/12 * 100%)',
                '--vs-width-sm': 'calc(4/12 * 100%)',
                '--vs-width-md': 'calc(3/12 * 100%)',
                '--vs-width-lg': 'calc(2/12 * 100%)',
                '--vs-width-xl': 'calc(1/12 * 100%)',
            });
        });

        it('grid with some breakpoints', () => {
            const { responsiveClasses, responsiveStyles } = useResponsive(ref({}), ref({ lg: 4, md: 6 }));

            expect(responsiveClasses.value).toEqual(['vs-width-base', 'vs-width-md', 'vs-width-lg']);
            expect(responsiveStyles.value).toEqual({
                '--vs-width-base': '100%',
                '--vs-width-md': 'calc(6/12 * 100%)',
                '--vs-width-lg': 'calc(4/12 * 100%)',
            });
        });

        it('grid comes first', () => {
            const { responsiveClasses, responsiveStyles } = useResponsive(
                ref({ lg: '20%', sm: '50%' }),
                ref({ lg: 4, md: 6 }),
            );

            expect(responsiveClasses.value).toEqual(['vs-width-base', 'vs-width-md', 'vs-width-lg']);
            expect(responsiveStyles.value).toEqual({
                '--vs-width-base': '100%',
                '--vs-width-md': 'calc(6/12 * 100%)',
                '--vs-width-lg': 'calc(4/12 * 100%)',
            });
        });
    });
});
