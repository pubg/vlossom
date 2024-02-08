import { describe, it, expect } from 'vitest';
import { VsStore } from './../index';
import { VsComponent } from '@/declaration';

describe('vlossom store', () => {
    it('store를 가져올 수 있다', () => {
        // given
        const store = new VsStore();

        // when
        const result = store.getStore();

        // then
        expect(result).toEqual({
            theme: 'light',
            globalColorScheme: {},
            styleSets: {},
        });
    });

    describe('theme', () => {
        it('theme을 설정할 수 있다', () => {
            // given
            const store = new VsStore();

            // when
            store.setTheme('dark');

            // then
            expect(store.getStore().theme).toEqual('dark');
        });
    });

    describe('globalColorScheme', () => {
        it('globalColorScheme을 설정할 수 있다', () => {
            // given
            const store = new VsStore();

            // when
            store.setGlobalColorScheme({ default: 'red' });

            // then
            expect(store.getStore().globalColorScheme).toEqual({ default: 'red' });
        });

        describe('getGlobalColorScheme', () => {
            it('등록된 globalColorScheme을 가져올 수 있다', () => {
                // given
                const store = new VsStore();
                store.setGlobalColorScheme({ [VsComponent.VsButton]: 'blue', default: 'red' });

                // when
                const result = store.getGlobalColorScheme(VsComponent.VsButton);

                // then
                expect(result).toEqual('blue');
            });

            it('특정 컴포넌트의 globalColorScheme이 없다면 default globalColorScheme을 가져온다', () => {
                // given
                const store = new VsStore();
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
                const store = new VsStore();
                const styleSet = {
                    VsButton: {
                        primary: {
                            color: 'red',
                        },
                    },
                };

                // when
                store.registerStyleSet(styleSet);

                // then
                expect(store.getStore().styleSets).toEqual(styleSet);
            });

            it('styleSet을 등록할 수 있다 (기존에 등록된 styleSet이 있을 경우)', () => {
                // given
                const store = new VsStore();
                const styleSet = {
                    VsButton: {
                        primary: {
                            color: 'red',
                        },
                    },
                };
                const styleSet2 = {
                    VsButton: {
                        secondary: {
                            color: 'blue',
                        },
                    },
                };

                // when
                store.registerStyleSet(styleSet);
                store.registerStyleSet(styleSet2);

                // then
                expect(store.getStore().styleSets).toEqual({
                    VsButton: {
                        primary: {
                            color: 'red',
                        },
                        secondary: {
                            color: 'blue',
                        },
                    },
                });
            });
        });

        describe('getStyleSet', () => {
            it('특정 컴포넌트의 StyleSet을 가져올 수 있다', () => {
                // given
                const store = new VsStore();
                const styleSet = {
                    VsButton: {
                        primary: {
                            color: 'red',
                        },
                    },
                };
                store.registerStyleSet(styleSet);

                // when
                const result = store.getStyleSet(VsComponent.VsButton, 'primary');

                // then
                expect(result).toEqual({ color: 'red' });
            });

            it('StyleSet이 정의되어 있지 않다면 undefined를 반환한다', () => {
                // given
                const store = new VsStore();
                const styleSet = {
                    VsButton: {
                        primary: {
                            color: 'red',
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
});
