import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsDrawer from './../VsDrawer.vue';

describe('vs-drawer', () => {
    describe('has container', () => {
        it('has container prop을 전달하면 drawer position은 absolute가 된다', () => {
            // given
            const wrapper = mount(VsDrawer, {
                props: {
                    modelValue: true,
                    hasContainer: true,
                },
            });

            // then
            expect(wrapper.find('.drawer-container').attributes().style).toBe('position: absolute;');
        });
    });

    describe('dimmed', () => {
        it('dimmed prop을 전달하면 dimmed 영역이 생긴다', () => {
            // given
            const wrapper = mount(VsDrawer, {
                props: {
                    modelValue: true,
                    dimmed: true,
                },
                global: {
                    stubs: ['Teleport'],
                },
            });

            // then
            expect(wrapper.find('.dimmed').exists()).toBe(true);
        });
    });

    describe('overlay click', () => {
        it('overlay 클릭 시 drawer가 닫힌다', async () => {
            // given
            const wrapper = mount(VsDrawer, {
                props: {
                    modelValue: true,
                    dimmed: true,
                    closeOnOverlayClick: true,
                },
                global: {
                    stubs: ['Teleport'],
                },
            });

            // when
            await wrapper.find('.dimmed').trigger('click');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0]).toEqual([false]);
        });
    });
});
