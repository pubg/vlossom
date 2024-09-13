import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsToast from './../VsToast.vue';

describe('vs-toast', () => {
    describe('toastInfo', () => {
        it('text를 렌더할 수 있다', () => {
            // given
            const wrapper = mount(VsToast, {
                props: {
                    id: '1',
                    content: 'Hello',
                    autoClose: true,
                },
            });

            expect(wrapper.text()).toContain('Hello');
        });

        describe('autoClose', () => {
            it('autoClose 가 true 인 경우, close-button이 렌더되지 않는다', () => {
                // given
                const wrapper = mount(VsToast, {
                    props: {
                        id: '1',
                        content: 'Hello',
                        autoClose: true,
                    },
                });

                expect(wrapper.find('button.close-button').exists()).toBe(false);
            });
            it('autoClose 가 false 인 경우, close-button이 렌더된다', () => {
                // given
                const wrapper = mount(VsToast, {
                    props: {
                        id: '1',
                        content: 'Hello',
                        autoClose: false,
                    },
                });

                expect(wrapper.find('.vs-toast-close').exists()).toBe(true);
            });
        });

        describe('colorScheme', () => {
            it('colorScheme이 주어진 경우, 해당 색상으로 렌더된다', () => {
                // given
                const wrapper = mount(VsToast, {
                    props: {
                        id: '1',
                        content: 'Hello',
                        autoClose: true,
                        colorScheme: 'red',
                    },
                });

                expect(wrapper.classes()).toContain('vs-red');
            });
        });
    });
});
