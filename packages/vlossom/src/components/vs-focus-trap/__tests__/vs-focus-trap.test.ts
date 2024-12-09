import { describe, expect, it, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick, ref, defineComponent, Ref } from 'vue';
import VsFocusTrap from './../VsFocusTrap.vue';

const Component = defineComponent({
    template: `
        <div>
            <input />
            <button ref="buttonRef">close</button>
        </div>
    `,
    setup() {
        const buttonRef: Ref<HTMLElement | null> = ref(null);

        return {
            buttonRef,
        };
    },
});

beforeEach(() => {
    document.body.innerHTML = '';
});

describe('focus-trap', () => {
    describe('catch focus', () => {
        it('mount 되고 나서 vs-focus-trap이 감싸고 있는 영역으로 focus를 가져온다', async () => {
            // given
            const wrapper = mount(VsFocusTrap, {
                slots: {
                    default: Component,
                },
                attachTo: document.body,
            });

            await nextTick();

            // then
            expect(wrapper.find('.vs-focus-trap>div[tabindex="-1"]').element).toBe(document.activeElement);
        });

        it('initial-focus-ref prop이 지정되어 있다면 mount 되고 나서 해당 요소에 focus를 준다', async () => {
            // given
            const wrapper = mount(VsFocusTrap, {
                slots: {
                    default: Component,
                },
                attachTo: document.body,
            });

            await wrapper.setProps({ initialFocusRef: document.querySelector('button') });

            // then
            expect(wrapper.find('button').element).toBe(document.activeElement);
        });
    });

    describe('cycle tab focus', () => {
        it('focusable 마지막 요소에서 tab 키를 누르면 첫번째 focusable 요소에 focus를 준다', async () => {
            // given
            const wrapper = mount(VsFocusTrap, {
                slots: {
                    default: Component,
                },
                attachTo: document.body,
            });

            await nextTick();

            // when
            await wrapper.find('button').element.focus();
            await wrapper.find('button').trigger('keydown.Tab');

            // then
            expect(wrapper.find('input').element).toBe(document.activeElement);
        });

        it('focusable 첫번째 요소에서 shift + tab 키를 누르면 마지막 focusable 요소에 focus를 준다', async () => {
            // given
            const wrapper = mount(VsFocusTrap, {
                slots: {
                    default: Component,
                },
                attachTo: document.body,
            });

            await nextTick();

            // when
            await wrapper.find('input').element.focus();
            await wrapper.find('input').trigger('keydown.Tab', {
                shiftKey: true,
            });

            // then
            expect(wrapper.find('button').element).toBe(document.activeElement);
        });

        it('focus-lock prop이 false로 지정된 경우엔 tab key focus가 cycle되지 않는다', async () => {
            // given
            document.body.appendChild(document.createElement('select'));

            const wrapper = mount(VsFocusTrap, {
                slots: {
                    default: Component,
                },
                props: {
                    focusLock: false,
                },
                attachTo: document.body,
            });

            await nextTick();

            // when
            wrapper.find('input').trigger('keydown.Tab', {
                shiftKey: true,
            });

            // then
            expect(wrapper.find('button').element).not.toBe(document.activeElement);
        });
    });

    describe('return focus', () => {
        it('unmount 되기 전에 focus가 있던 요소에 focus를 준다', async () => {
            // given
            const button = document.createElement('button');
            document.body.appendChild(button);
            button.focus();

            const wrapper = mount(VsFocusTrap, {
                slots: {
                    default: Component,
                },
                attachTo: document.body,
            });

            await nextTick();

            // when
            wrapper.unmount();

            // then
            expect(button).toBe(document.activeElement);
        });
    });
});
