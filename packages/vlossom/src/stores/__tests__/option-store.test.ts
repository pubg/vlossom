import { describe, it, expect, vi } from 'vitest';
import { OptionStore } from './../option-store';
import { VsComponent } from '@/declaration';

describe('option store', () => {
    it('option store의 상태를 가져올 수 있다', () => {
        // given
        const store = new OptionStore();

        // when
        const result = store.getState();

        // then
        expect(result).toEqual({
            theme: 'light',
            globalColorScheme: {},
            styleSets: {},
            globalRadiusRatio: 1,
        });
    });

    describe('theme', () => {
        it('theme을 설정할 수 있다', () => {
            // given
            const store = new OptionStore();

            // when
            store.setTheme('dark');

            // then
            expect(store.getState().theme).toEqual('dark');
        });
    });

    describe('globalColorScheme', () => {
        it('globalColorScheme을 설정할 수 있다', () => {
            // given
            const store = new OptionStore();

            // when
            store.setGlobalColorScheme({ default: 'red' });

            // then
            expect(store.getState().globalColorScheme).toEqual({ default: 'red' });
        });

        describe('getGlobalColorScheme', () => {
            it('등록된 globalColorScheme을 가져올 수 있다', () => {
                // given
                const store = new OptionStore();
                store.setGlobalColorScheme({ [VsComponent.VsButton]: 'blue', default: 'red' });

                // when
                const result = store.getGlobalColorScheme(VsComponent.VsButton);

                // then
                expect(result).toEqual('blue');
            });

            it('특정 컴포넌트의 globalColorScheme이 없다면 default globalColorScheme을 가져온다', () => {
                // given
                const store = new OptionStore();
                store.setGlobalColorScheme({ default: 'red' });

                // when
                const result = store.getGlobalColorScheme(VsComponent.VsButton);

                // then
                expect(result).toEqual('red');
            });
        });
    });

    describe('styleSets', () => {
        describe('registerStyleSet', () => {
            it('styleSet을 등록할 수 있다', () => {
                // given
                const store = new OptionStore();
                const styleSet = {
                    VsButton: {
                        primary: {
                            fontColor: 'red',
                        },
                    },
                };

                // when
                store.registerStyleSet(styleSet);

                // then
                expect(store.getState().styleSets).toEqual(styleSet);
            });

            it('styleSet을 등록할 수 있다 (기존에 등록된 styleSet이 있을 경우)', () => {
                // given
                const store = new OptionStore();
                const styleSet = {
                    VsButton: {
                        primary: {
                            fontColor: 'red',
                        },
                    },
                };
                const styleSet2 = {
                    VsButton: {
                        secondary: {
                            fontColor: 'blue',
                        },
                    },
                };

                // when
                store.registerStyleSet(styleSet);
                store.registerStyleSet(styleSet2);

                // then
                expect(store.getState().styleSets).toEqual({
                    VsButton: {
                        primary: {
                            fontColor: 'red',
                        },
                        secondary: {
                            fontColor: 'blue',
                        },
                    },
                });
            });
        });

        describe('getStyleSet', () => {
            it('특정 컴포넌트의 StyleSet을 가져올 수 있다', () => {
                // given
                const store = new OptionStore();
                const styleSet = {
                    VsButton: {
                        primary: {
                            fontColor: 'red',
                        },
                    },
                };
                store.registerStyleSet(styleSet);

                // when
                const result = store.getStyleSet(VsComponent.VsButton, 'primary');

                // then
                expect(result).toEqual({ fontColor: 'red' });
            });

            it('StyleSet이 정의되어 있지 않다면 undefined를 반환한다', () => {
                // given
                const store = new OptionStore();
                const styleSet = {
                    VsButton: {
                        primary: {
                            fontColor: 'red',
                        },
                    },
                };
                store.registerStyleSet(styleSet);

                // when
                const result = store.getStyleSet(VsComponent.VsButton, 'secondary');

                // then
                expect(result).toBeUndefined();
            });
        });
    });

    describe('globalRadiusRatio', () => {
        it('globalRadiusRatio를 설정할 수 있다', () => {
            // given
            const store = new OptionStore();
            const setPropertySpy = vi.spyOn(document.documentElement.style, 'setProperty').mockImplementation(() => {});

            // when
            store.setGlobalRadiusRatio(0.5);

            // then
            expect(store.getState().globalRadiusRatio).toEqual(0.5);
            expect(setPropertySpy).toBeCalledWith('--vs-radius-ratio', '0.5');
        });

        it('globalRadiusRatio가 0보다 작으면 radius ratio를 설정하지 않는다', () => {
            // given
            const store = new OptionStore();
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const setPropertySpy = vi.spyOn(document.documentElement.style, 'setProperty').mockImplementation(() => {});

            // when
            store.setGlobalRadiusRatio(-1);

            // then
            expect(consoleErrorSpy).toBeCalled();
            expect(setPropertySpy).not.toBeCalled();
        });

        it('globalRadiusRatio가 1보다 크면 radius ratio를 설정하지 않는다', () => {
            // given
            const store = new OptionStore();
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const setPropertySpy = vi.spyOn(document.documentElement.style, 'setProperty').mockImplementation(() => {});

            // when
            store.setGlobalRadiusRatio(2);

            // then
            expect(consoleErrorSpy).toBeCalled();
            expect(setPropertySpy).not.toBeCalled();
        });

        it('globalRadiusRatio가 NaN이면 radius ratio를 설정하지 않는다', () => {
            // given
            const store = new OptionStore();
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const setPropertySpy = vi.spyOn(document.documentElement.style, 'setProperty').mockImplementation(() => {});

            // when
            store.setGlobalRadiusRatio(NaN);

            // then
            expect(consoleErrorSpy).toBeCalled();
            expect(setPropertySpy).not.toBeCalled();
        });
    });
});
