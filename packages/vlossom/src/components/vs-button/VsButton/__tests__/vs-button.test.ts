import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsButton from '../VsButton.vue';

describe('vs-button', () => {
    describe('dense / large', () => {
        it('dense 사이즈를 설정할 수 있다', () => {
            // given
            const wrapper = mount(VsButton, {
                props: {
                    dense: true,
                },
            });

            // then
            expect(wrapper.props('dense')).toBe(true);
            expect(wrapper.classes('dense')).toBe(true);
        });

        it('large 사이즈를 설정할 수 있다', () => {
            // given
            const wrapper = mount(VsButton, {
                props: {
                    large: true,
                },
            });

            // then
            expect(wrapper.props('large')).toBe(true);
            expect(wrapper.classes('large')).toBe(true);
        });
    });

    describe('disabled', () => {
        it('disabled를 설정할 수 있다.', () => {
            // given
            const wrapper = mount(VsButton, {
                props: {
                    disabled: true,
                },
            });

            // then
            expect(wrapper.props('disabled')).toBe(true);
            expect(wrapper.attributes()).toHaveProperty('disabled');
        });
    });

    describe('loading', () => {
        it('loading을 설정할 수 있다.', () => {
            // given
            const wrapper = mount(VsButton, {
                props: {
                    loading: true,
                },
            });

            // then
            expect(wrapper.props('loading')).toBe(true);
            expect(wrapper.get('.loading'));
            expect(wrapper.find('.content').exists()).toBe(false);
        });
    });

    describe('outline', () => {
        it('outline style을 설정할 수 있다.', () => {
            // given
            const wrapper = mount(VsButton, {
                props: {
                    outline: true,
                },
            });

            // then
            expect(wrapper.props('outline')).toBe(true);
            expect(wrapper.classes('outline')).toBe(true);
        });
    });

    describe('mobile-full', () => {
        it('mobile-full prop을 설정할 수 있다', () => {
            //given
            const wrapper = mount(VsButton, {
                props: {
                    mobileFull: true,
                },
            });

            //then
            expect(wrapper.props('mobileFull')).toBe(true);
            expect(wrapper.classes('mobile-full')).toBe(true);
        });
    });

    describe('primary', () => {
        it('primary style을 설정할 수 있다.', () => {
            // given
            const wrapper = mount(VsButton, {
                props: {
                    primary: true,
                },
            });

            // then
            expect(wrapper.props('primary')).toBe(true);
            expect(wrapper.classes('primary')).toBe(true);
        });
    });
});
