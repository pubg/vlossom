import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsToastView from '../VsToastView.vue';

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
});
