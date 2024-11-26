import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import VsInputWrapper from './../VsInputWrapper.vue';
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
            const label = wrapper.find('label');
            expect(label.exists()).toBe(true);
            expect(label.isVisible()).toBe(true);
            expect(label.text()).toBe('My Label');
        });

        it('label을 설정하지 않으면 label 영역이 없다', () => {
            // given
            const wrapper = mount(VsInputWrapper);

            // then
            const label = wrapper.find('label');
            expect(label.exists()).toBe(false);
        });

        it('label slot을 넣으면 label 영역이 있다', () => {
            // given
            const wrapper = mount(VsInputWrapper, {
                slots: {
                    label: 'My Label',
                },
            });

            // then
            expect(wrapper.find('label').exists()).toBe(true);
            expect(wrapper.find('label').text()).toBe('My Label');
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
            const requiredStar = wrapper.find('i.vs-required-star');
            expect(requiredStar.exists()).toBe(true);
            expect(requiredStar.text()).toBe('*');
        });

        it('group label을 설정할 수 있다', () => {
            // given
            const wrapper = mount(VsInputWrapper, {
                props: {
                    label: 'My Group',
                    groupLabel: true,
                },
            });

            // then
            const fieldset = wrapper.find('fieldset');
            const legend = fieldset.find('legend');
            expect(fieldset.exists()).toBe(true);
            expect(legend.text()).toBe('My Group');
        });
    });

    describe('messages', () => {
        it('noMessage props가 전달되면 message 영역이 없다', () => {
            // given
            const wrapper = mount(VsInputWrapper, {
                props: {
                    noMessage: true,
                },
            });

            // then
            expect(wrapper.find('.vs-messages').exists()).toBe(false);
        });

        it('message가 없어도 message 영역은 있다', () => {
            // given
            const wrapper = mount(VsInputWrapper);

            // then
            expect(wrapper.find('.vs-messages').exists()).toBe(true);
        });

        it('message가 있다면 message 영역이 있다', () => {
            // given
            const wrapper = mount(VsInputWrapper, {
                props: {
                    messages: [{ state: 'info', text: 'Info Message' }],
                },
            });

            // then
            expect(wrapper.find('.vs-messages').exists()).toBe(true);
        });
    });

    describe('shake', () => {
        it('shake props 값이 바뀌면 shake-horizontal class가 붙는다', async () => {
            // given
            const wrapper = mount(VsInputWrapper, {
                props: {
                    shake: false,
                },
            });

            // when
            await wrapper.setProps({ shake: true });

            // then
            expect(wrapper.find('.vs-input-wrapper').classes()).toContain('shake-horizontal');
        });

        it('shake props 값이 바뀌면 shake-horizontal class가 붙었다가 600ms 후에 떨어진다', async () => {
            // given
            const wrapper = mount(VsInputWrapper, {
                props: {
                    shake: false,
                },
            });
            vi.useFakeTimers();

            // when
            await wrapper.setProps({ shake: true });
            vi.advanceTimersByTime(600);
            await nextTick();

            // then
            expect(wrapper.find('.vs-input-wrapper').classes()).not.toContain('shake-horizontal');
            vi.clearAllTimers();
        });
    });
});
