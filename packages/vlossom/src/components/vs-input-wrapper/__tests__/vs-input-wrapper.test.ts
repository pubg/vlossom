import { describe, expect, it } from 'vitest';
import VsInputWrapper from '../VsInputWrapper.vue';
import { mount } from '@vue/test-utils';

describe('vs-input-wrapper', () => {
    describe('label', () => {
        it('label을 설정할 수 있다', () => {
            // given
            const wrapper = mount(VsInputWrapper, {
                props: {
                    label: 'My Label',
                },
            });

            // then
            const label = wrapper.find('.label');
            expect(label.exists()).toBe(true);
            expect(label.isVisible()).toBe(true);
        });

        it('label을 설정하지 않아도 label 영역이 있다', () => {
            // given
            const wrapper = mount(VsInputWrapper);

            // then
            const label = wrapper.find('.label');
            expect(label.exists()).toBe(true);
            expect(label.isVisible()).toBe(false);
            expect(label.text()).toBe('');
        });

        it('noLabel props를 설정하면 label 영역이 없다', () => {
            // given
            const wrapper = mount(VsInputWrapper, {
                props: {
                    noLabel: true,
                },
            });

            // then
            expect(wrapper.find('.label').exists()).toBe(false);
        });

        it('required props를 설정하면 label 영역에 *이 표시된다', () => {
            // given
            const wrapper = mount(VsInputWrapper, {
                props: {
                    label: 'My Label',
                    required: true,
                },
            });

            // then
            expect(wrapper.find('.required-star').exists()).toBe(true);
        });
    });

    describe('messages', () => {
        it('noMsg props가 전달되면 message 영역이 보이지 않는다', () => {
            // given
            const wrapper = mount(VsInputWrapper, {
                props: {
                    noMsg: true,
                },
            });

            // then
            expect(wrapper.find('.messages').exists()).toBe(false);
        });
    });
});
