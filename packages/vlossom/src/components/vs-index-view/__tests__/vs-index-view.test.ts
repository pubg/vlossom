import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import VsIndexView from '../VsIndexView.vue';

describe('vs-index-view', () => {
    describe('slot', () => {
        it('Dynamic Component', async () => {
            // given
            const wrapper = mount(VsIndexView, {
                props: {
                    modelValue: 0,
                },
                slots: {
                    default: `
						<div key="A">A Component</div>
						<div key="B">B Component</div>
					`,
                },
            });

            // when
            await vi.dynamicImportSettled();

            // then
            expect(wrapper.html()).toContain('A Component');

            // when
            await wrapper.setProps({ modelValue: 1 });

            // then
            expect(wrapper.html()).toContain('B Component');
        });
    });

    describe('keepAlive', () => {
        it('keepAlive prop이 true일 때, keep-alive 컴포넌트를 렌더한다', () => {
            // given
            const wrapper = mount(VsIndexView, {
                props: {
                    keepAlive: true,
                },
            });

            // then
            expect(wrapper.findComponent({ name: 'keep-alive' }).exists()).toBe(true);
        });

        it('keepAlive prop이 false일 때, keep-alive 컴포넌트를 렌더하지 않는다', () => {
            // given
            const wrapper = mount(VsIndexView, {
                props: {
                    keepAlive: false,
                },
            });

            // then
            expect(wrapper.findComponent({ name: 'keep-alive' }).exists()).toBe(false);
        });
    });
});
