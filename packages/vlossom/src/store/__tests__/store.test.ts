import { describe, it, expect } from 'vitest';
import { VsStore } from './../index';

describe('vlossom store', () => {
    it('store를 가져올 수 있다', () => {
        // given
        const store = new VsStore();

        // when
        const result = store.getStore();

        // then
        expect(result).toEqual({
            globalColorScheme: {},
            styleSets: {},
        });
    });

    it('globalColorScheme을 설정할 수 있다', () => {
        // given
        const store = new VsStore();

        // when
        store.setGlobalColorScheme({ default: 'red' });

        // then
        expect(store.getStore().globalColorScheme).toEqual({ default: 'red' });
    });

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
