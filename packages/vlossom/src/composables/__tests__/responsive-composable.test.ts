import { describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { useResponsiveWidth } from '../responsive-composable';

describe('useResponsiveWidth composable', () => {
    describe('width', () => {
        it('string type width', () => {
            const { widthVariables, widthClasses, widthProperties } = useResponsiveWidth(ref('400px'), ref({}));

            expect(widthVariables.value).toEqual({});
            expect(widthClasses.value).toEqual([]);
            expect(widthProperties.value).toEqual({ width: '400px' });
        });

        it('default width (null)', () => {
            const { widthVariables, widthClasses, widthProperties } = useResponsiveWidth(ref(null), ref({}));

            expect(widthVariables.value).toEqual({});
            expect(widthClasses.value).toEqual([]);
            expect(widthProperties.value).toEqual({ width: '100%' });
        });

        it('width with all breakpoints', () => {
            const { widthVariables, widthClasses, widthProperties } = useResponsiveWidth(
                ref({
                    xl: '100px',
                    lg: '150px',
                    md: '200px',
                    sm: '250px',
                    base: '300px',
                }),
                ref({}),
            );

            expect(widthVariables.value).toEqual({
                '--vs-width-base': '300px',
                '--vs-width-sm': '250px',
                '--vs-width-md': '200px',
                '--vs-width-lg': '150px',
                '--vs-width-xl': '100px',
            });
            expect(widthClasses.value).toEqual([
                'vs-width-base',
                'vs-width-sm',
                'vs-width-md',
                'vs-width-lg',
                'vs-width-xl',
            ]);
            expect(widthProperties.value).toEqual(widthVariables.value);
        });

        it('width with some breakpoints', () => {
            const { widthVariables, widthClasses, widthProperties } = useResponsiveWidth(
                ref({ lg: '20%', sm: '50%' }),
                ref({}),
            );

            expect(widthVariables.value).toEqual({
                '--vs-width-base': '100%',
                '--vs-width-sm': '50%',
                '--vs-width-lg': '20%',
            });
            expect(widthClasses.value).toEqual(['vs-width-base', 'vs-width-sm', 'vs-width-lg']);
            expect(widthProperties.value).toEqual(widthVariables.value);
        });
    });

    describe('grid', () => {
        it('When both string type width and grid are present, string type width takes precedence', () => {
            const { widthVariables, widthClasses, widthProperties } = useResponsiveWidth(
                ref('400px'),
                ref({ xl: 1, lg: 2, md: 3, sm: 4, base: 6 }),
            );

            expect(widthVariables.value).toEqual({});
            expect(widthClasses.value).toEqual([]);
            expect(widthProperties.value).toEqual({ width: '400px' });
        });

        it('grid with all breakpoints', () => {
            const { widthVariables, widthClasses, widthProperties } = useResponsiveWidth(
                ref({}),
                ref({ xl: 1, lg: 2, md: 3, sm: 4, base: 6 }),
            );

            expect(widthVariables.value).toEqual({
                '--vs-width-base': 'calc(6/12 * 100%)',
                '--vs-width-sm': 'calc(4/12 * 100%)',
                '--vs-width-md': 'calc(3/12 * 100%)',
                '--vs-width-lg': 'calc(2/12 * 100%)',
                '--vs-width-xl': 'calc(1/12 * 100%)',
            });
            expect(widthClasses.value).toEqual([
                'vs-width-base',
                'vs-width-sm',
                'vs-width-md',
                'vs-width-lg',
                'vs-width-xl',
            ]);
            expect(widthProperties.value).toEqual(widthVariables.value);
        });

        it('grid with some breakpoints', () => {
            const { widthVariables, widthClasses, widthProperties } = useResponsiveWidth(
                ref({}),
                ref({ lg: 4, md: 6 }),
            );

            expect(widthVariables.value).toEqual({
                '--vs-width-base': '100%',
                '--vs-width-md': 'calc(6/12 * 100%)',
                '--vs-width-lg': 'calc(4/12 * 100%)',
            });
            expect(widthClasses.value).toEqual(['vs-width-base', 'vs-width-md', 'vs-width-lg']);
            expect(widthProperties.value).toEqual(widthVariables.value);
        });

        it('grid comes first', () => {
            const { widthVariables, widthClasses, widthProperties } = useResponsiveWidth(
                ref({ lg: '20%', sm: '50%' }),
                ref({ lg: 4, md: 6 }),
            );

            expect(widthVariables.value).toEqual({
                '--vs-width-base': '100%',
                '--vs-width-md': 'calc(6/12 * 100%)',
                '--vs-width-lg': 'calc(4/12 * 100%)',
            });
            expect(widthClasses.value).toEqual(['vs-width-base', 'vs-width-md', 'vs-width-lg']);
            expect(widthProperties.value).toEqual(widthVariables.value);
        });
    });
});
