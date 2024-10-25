import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VsAccordion from './../VsAccordion.vue';

describe('vs-accordion', () => {
    it('accordion title과 contents를 slot에 넣을 수 있다', () => {
        // given
        const title = 'accordion title';
        const contents = 'accordion contents';
        const wrapper = mount(VsAccordion, {
            slots: {
                title,
                default: contents,
            },
        });

        // then
        expect(wrapper.find('.vs-accordion-summary').html()).toContain(title);
        expect(wrapper.find('.vs-accordion-content').html()).toContain(contents);
    });

    it('open 상태를 전달해서 accordion을 열어둘 수 있다', () => {
        // given
        const wrapper = mount(VsAccordion, {
            props: {
                open: true,
            },
        });

        // then;
        expect(wrapper.find('.vs-accordion-details').attributes('open')).toBeDefined();
    });

    describe('v-model', () => {
        it('v-model binding으로 accordion을 열 수 있다', async () => {
            // given
            const wrapper = mount(VsAccordion, {
                props: {
                    modelValue: false,
                    'onUpdate:modelValue': (v: boolean) => wrapper.setProps({ modelValue: v }),
                },
            });

            // when
            await wrapper.setProps({ modelValue: true });

            // then;
            expect(wrapper.find('.vs-accordion-details').attributes('open')).toBeDefined();
            expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);
            expect(wrapper.emitted('toggle')).toEqual([[true]]);
        });

        it('v-model binding으로 accordion을 닫을 수 있다', async () => {
            // given
            const wrapper = mount(VsAccordion, {
                props: {
                    modelValue: true,
                    'onUpdate:modelValue': (v: boolean) => wrapper.setProps({ modelValue: v }),
                },
            });

            // when
            await wrapper.setProps({ modelValue: false });

            // then;
            expect(wrapper.find('.vs-accordion-details').attributes('open')).not.toBeDefined();
            expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
            expect(wrapper.emitted('toggle')).toEqual([[false]]);
        });

        it('open을 설정하면 accordion이 열려있다', () => {
            // given
            const wrapper = mount(VsAccordion, {
                props: {
                    open: true,
                },
            });

            // then
            expect(wrapper.find('.vs-accordion-details').attributes('open')).toBeDefined();
            expect(wrapper.vm.isOpen).toBe(true);
        });
    });
});
