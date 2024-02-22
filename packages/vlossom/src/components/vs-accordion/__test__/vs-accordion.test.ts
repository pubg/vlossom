import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VsAccordion from './../VsAccordion.vue';

function mountComponent() {
    return mount(VsAccordion);
}

describe('vs-accordion', () => {
    it('accordion title과 contents를 slot에 넣을 수 있다', () => {
        // given
        const title = 'accordion title';
        const contents = 'accordion contents';
        const wrapper: ReturnType<typeof mountComponent> = mount(VsAccordion, {
            slots: {
                title,
                default: contents,
            },
        });

        // then
        expect(wrapper.find('summary').html()).toContain(title);
        expect(wrapper.find('.accordion-content').html()).toContain(contents);
    });

    describe('open', () => {
        it('open 상태를 전달해서 accordion을 열어둘 수 있다', () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsAccordion, {
                props: {
                    open: true,
                },
            });

            // then;
            expect(wrapper.find('details').attributes('open')).exist;
        });

        it('v-model:open으로 open 상태를 바인딩 할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsAccordion, {
                props: {
                    open: false,
                    'onUpdate:open': (open: boolean) => wrapper.setProps({ open }),
                },
            });

            // when
            await wrapper.setProps({ open: true });

            // then;
            expect(wrapper.find('details').attributes('open')).exist;
            expect(wrapper.emitted('update:open')).toEqual([[true]]);
            expect(wrapper.emitted('toggle')).toEqual([[true]]);
        });
    });
});
