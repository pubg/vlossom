import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsToastView from '../VsToastView.vue';
import { ToastInfo } from '@/declaration';
import { store } from '@/store';

describe('vs-toast-view', () => {
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
});
