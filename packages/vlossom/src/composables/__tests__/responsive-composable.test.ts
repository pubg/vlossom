import { describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { useResponsive } from './../responsive-composable';

describe('responsive-composable (useResponsive)', () => {
    describe('width', () => {
        it('width가 string type이면 style에 width만 추가한다', () => {
            const width = ref('400px');
            const grid = ref({});
            const { responsiveClasses, responsiveStyles } = useResponsive(width, grid);

            expect(responsiveClasses.value).toEqual(['vs-response']);
            expect(responsiveStyles.value).toEqual({ width: '400px' });
        });

        it('width가 null이면 style을 추가하지 않는다', () => {
            const width = ref(null);
            const grid = ref({});
            const { responsiveClasses, responsiveStyles } = useResponsive(width, grid);

            expect(responsiveClasses.value).toEqual(['vs-response']);
            expect(responsiveStyles.value).toEqual({});
        });

        describe('각 breakpoints에 해당하는 class와 style이 적용된다', () => {
            it('모든 breakpoints에 width 값이 설정되어 있는 경우', () => {
                const width = ref({ xl: '100px', lg: '150px', md: '200px', sm: '250px', xs: '300px' });
                const grid = ref({});
                const { responsiveClasses, responsiveStyles } = useResponsive(width, grid);

                expect(responsiveClasses.value).toEqual([
                    'vs-response',
                    'vs-width-sm',
                    'vs-width-md',
                    'vs-width-lg',
                    'vs-width-xl',
                ]);
                expect(responsiveStyles.value).toEqual({
                    '--vs-width-xs': '300px',
                    '--vs-width-sm': '250px',
                    '--vs-width-md': '200px',
                    '--vs-width-lg': '150px',
                    '--vs-width-xl': '100px',
                });
            });

            it('일부 breakpoints에 width 값이 설정되어 있는 경우', () => {
                const width = ref({ lg: '20%', sm: '50%' });
                const grid = ref({});
                const { responsiveClasses, responsiveStyles } = useResponsive(width, grid);

                expect(responsiveClasses.value).toEqual(['vs-response', 'vs-width-sm', 'vs-width-lg']);
                expect(responsiveStyles.value).toEqual({
                    '--vs-width-sm': '50%',
                    '--vs-width-lg': '20%',
                });
            });
        });
    });

    describe('grid', () => {
        it('모든 breakpoints에 grid 값이 설정되어 있는 경우', () => {
            const width = ref(null);
            const grid = ref({ xl: 1, lg: 2, md: 3, sm: 4, xs: 6 });
            const { responsiveClasses, responsiveStyles } = useResponsive(width, grid);

            expect(responsiveClasses.value).toEqual([
                'vs-response',
                'vs-grid-sm',
                'vs-grid-md',
                'vs-grid-lg',
                'vs-grid-xl',
            ]);
            expect(responsiveStyles.value).toEqual({
                '--vs-grid-xs': '6',
                '--vs-grid-sm': '4',
                '--vs-grid-md': '3',
                '--vs-grid-lg': '2',
                '--vs-grid-xl': '1',
            });
        });

        it('일부 breakpoints에 grid 값이 설정되어 있는 경우', () => {
            const width = ref(null);
            const grid = ref({ lg: 2, sm: 5 });
            const { responsiveClasses, responsiveStyles } = useResponsive(width, grid);

            expect(responsiveClasses.value).toEqual(['vs-response', 'vs-grid-sm', 'vs-grid-lg']);
            expect(responsiveStyles.value).toEqual({
                '--vs-grid-sm': '5',
                '--vs-grid-lg': '2',
            });
        });
    });

    describe('width와 grid가 모두 설정되어 있는 경우', () => {
        it('각각의 class와 style이 모두 적용된다', () => {
            const width = ref({ lg: '20%', sm: '50%' });
            const grid = ref({ lg: 2, sm: 5 });
            const { responsiveClasses, responsiveStyles } = useResponsive(width, grid);

            expect(responsiveClasses.value).toEqual([
                'vs-response',
                'vs-width-sm',
                'vs-width-lg',
                'vs-grid-sm',
                'vs-grid-lg',
            ]);
            expect(responsiveStyles.value).toEqual({
                '--vs-width-sm': '50%',
                '--vs-width-lg': '20%',
                '--vs-grid-sm': '5',
                '--vs-grid-lg': '2',
            });
        });
    });
});
