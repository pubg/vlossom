import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { ToastInfo } from '@/declaration';
import { store } from '@/store';
import VsToastView from '../VsToastView.vue';

describe('vs-toast-view', () => {
    let originalToasts: ToastInfo[] = [];

    let mockStore: {
        toast: {
            toasts: ToastInfo[];
        };
    } | null = null;

    beforeEach(() => {
        originalToasts = store.toast.getState().toasts;

        mockStore = {
            toast: {
                toasts: [
                    {
                        id: '1',
                        text: 'Hello',
                        autoClose: true,
                        duration: 3000,
                        placement: 'top',
                        align: 'start',
                    },
                    {
                        id: '2',
                        text: 'Hello',
                        autoClose: true,
                        duration: 3000,
                        placement: 'top',
                        align: 'center',
                    },
                    {
                        id: '3',
                        text: 'Hello',
                        autoClose: true,
                        duration: 3000,
                        placement: 'top',
                        align: 'end',
                    },
                    {
                        id: '4',
                        text: 'Hello',
                        autoClose: true,
                        duration: 3000,
                        placement: 'bottom',
                        align: 'start',
                    },
                    {
                        id: '5',
                        text: 'Hello',
                        autoClose: true,
                        duration: 3000,
                        placement: 'bottom',
                        align: 'center',
                    },
                    {
                        id: '6',
                        text: 'Hello',
                        autoClose: true,
                        duration: 3000,
                        placement: 'bottom',
                        align: 'end',
                    },
                ],
            },
        };
    });

    afterEach(() => {
        store.toast.getState().toasts = originalToasts;
    });

    describe('placement', () => {
        it('placement가 top 인 컴포넌트를 렌더할 수 있다 ', () => {
            // given
            const wrapper = mount(VsToastView, {
                props: {
                    placement: 'top',
                    align: 'center',
                },
            });

            // then
            expect(wrapper.find('div.vs-toast-view-top').exists()).toBe(true);
        });

        it('placement가 bottom 인 컴포넌트를 렌더할 수 있다 ', () => {
            // given
            const wrapper = mount(VsToastView, {
                props: {
                    placement: 'bottom',
                    align: 'center',
                },
            });

            // then
            expect(wrapper.find('div.vs-toast-view-bottom').exists()).toBe(true);
        });
    });

    describe('toasts', () => {
        it('placement 가 top 이고 align이 start 이면 toasts는 그에 맞게 필터된다 ', () => {
            // given
            store.toast.getState().toasts = mockStore?.toast.toasts ?? [];

            const wrapper = mount(VsToastView, {
                props: {
                    placement: 'top',
                    align: 'start',
                },
            });

            // then
            expect(wrapper.vm.toasts).toEqual([
                {
                    id: '1',
                    text: 'Hello',
                    autoClose: true,
                    duration: 3000,
                    placement: 'top',
                    align: 'start',
                },
            ]);
        });

        it('placement 가 top 이고 align이 center 이면 toasts는 그에 맞게 필터된다 ', () => {
            // given
            store.toast.getState().toasts = mockStore?.toast.toasts ?? [];

            const wrapper = mount(VsToastView, {
                props: {
                    placement: 'top',
                    align: 'center',
                },
            });

            // then
            expect(wrapper.vm.toasts).toEqual([
                {
                    id: '2',
                    text: 'Hello',
                    autoClose: true,
                    duration: 3000,
                    placement: 'top',
                    align: 'center',
                },
            ]);
        });

        it('placement 가 top 이고 align이 end 이면 toasts는 그에 맞게 필터된다 ', () => {
            // given
            store.toast.getState().toasts = mockStore?.toast.toasts ?? [];

            const wrapper = mount(VsToastView, {
                props: {
                    placement: 'top',
                    align: 'end',
                },
            });

            // then
            expect(wrapper.vm.toasts).toEqual([
                {
                    id: '3',
                    text: 'Hello',
                    autoClose: true,
                    duration: 3000,
                    placement: 'top',
                    align: 'end',
                },
            ]);
        });

        it('placement 가 bottom 이고 align이 start 이면 toasts는 그에 맞게 필터된다 ', () => {
            // given
            store.toast.getState().toasts = mockStore?.toast.toasts ?? [];

            const wrapper = mount(VsToastView, {
                props: {
                    placement: 'bottom',
                    align: 'start',
                },
            });

            // then
            expect(wrapper.vm.toasts).toEqual([
                {
                    id: '4',
                    text: 'Hello',
                    autoClose: true,
                    duration: 3000,
                    placement: 'bottom',
                    align: 'start',
                },
            ]);
        });

        it('placement 가 bottom 이고 align이 center 이면 toasts는 그에 맞게 필터된다 ', () => {
            // given
            store.toast.getState().toasts = mockStore?.toast.toasts ?? [];

            const wrapper = mount(VsToastView, {
                props: {
                    placement: 'bottom',
                    align: 'center',
                },
            });

            // then
            expect(wrapper.vm.toasts).toEqual([
                {
                    id: '5',
                    text: 'Hello',
                    autoClose: true,
                    duration: 3000,
                    placement: 'bottom',
                    align: 'center',
                },
            ]);
        });

        it('placement 가 bottom 이고 align이 end 이면 toasts는 그에 맞게 필터된다 ', () => {
            // given
            store.toast.getState().toasts = mockStore?.toast.toasts ?? [];

            const wrapper = mount(VsToastView, {
                props: {
                    placement: 'bottom',
                    align: 'end',
                },
            });

            // then
            expect(wrapper.vm.toasts).toEqual([
                {
                    id: '6',
                    text: 'Hello',
                    autoClose: true,
                    duration: 3000,
                    placement: 'bottom',
                    align: 'end',
                },
            ]);
        });
    });

    describe('handleKeyPress', () => {
        it('tab 키가 눌리면 가장 처음에 생성된 vs-toast 의 close-button 이 focus 된다', async () => {
            // given
            mockStore = {
                toast: {
                    toasts: [
                        {
                            id: '1',
                            text: 'Hello',
                            autoClose: false,
                            placement: 'top',
                            align: 'center',
                        },
                        {
                            id: '2',
                            text: 'Hello',
                            autoClose: false,
                            placement: 'top',
                            align: 'center',
                        },
                    ],
                },
            };
            store.toast.getState().toasts = mockStore?.toast.toasts ?? [];

            const toastViewWrapper = mount(VsToastView, {
                props: {
                    placement: 'top',
                    align: 'center',
                },
                attachTo: document.body,
            });

            // when
            await toastViewWrapper.trigger('keydown', { key: 'Tab' });
            await nextTick();

            // then
            const closeButtonRefs = toastViewWrapper.findAll('button[aria-label="close"]');
            expect(closeButtonRefs.length).toBe(2);

            const targetButtonRef = closeButtonRefs[0];
            expect(targetButtonRef.isVisible()).toBe(true);
            expect(targetButtonRef.element).toEqual(document.activeElement);
        });
    });
});
