import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsButton from './../VsButton.vue';

describe('vs-button', () => {
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
        it('loading인 경우에 loading 아이콘이 나타난다', () => {
            // given
            const wrapper = mount(VsButton, {
                props: {
                    loading: true,
                },
            });

            // then
            expect(wrapper.props('loading')).toBe(true);
            expect(wrapper.find('.vs-button-loading-icon').exists()).toBe(true);
        });
    });

    describe('circle', () => {
        it('circle인 경우에 버튼이 원형으로 나타난다', () => {
            // given
            const wrapper = mount(VsButton, {
                props: {
                    circle: true,
                },
            });

            // then
            expect(wrapper.props('circle')).toBe(true);
            expect(wrapper.find('.vs-circle').exists()).toBe(true);
        });
    });
});
