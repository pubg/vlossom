import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsToastView from '../VsToastView.vue';

describe('vs-toast-view', () => {
    describe('positions', () => {
        it('위쪽에 3개의 토스트 그룹이 생성된다', () => {
            // given
            const wrapper = mount(VsToastView, {
                props: {
                    toasts: [
                        { id: '1', text: 'Hello' },
                        { id: '2', text: 'Hello' },
                        { id: '3', text: 'Hello' },
                    ],
                },
            });

            // then
            expect(wrapper.findAll('.vs-toast-view-top').length).toBe(3);
        });

        it('아래쪽에 3개의 토스트 그룹이 생성된다', () => {
            // given
            const wrapper = mount(VsToastView, {
                props: {
                    toasts: [
                        { id: '1', text: 'Hello', placement: 'bottom' },
                        { id: '2', text: 'Hello', placement: 'bottom' },
                        { id: '3', text: 'Hello', placement: 'bottom' },
                    ],
                },
            });

            // then
            expect(wrapper.findAll('.vs-toast-view-bottom').length).toBe(3);
        });
    });
});
