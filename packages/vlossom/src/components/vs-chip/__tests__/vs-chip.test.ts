import { describe, expect, it, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import VsChip from './../VsChip.vue';

function mountComponent() {
    return mount(VsChip);
}

describe('vs-chip', () => {
    describe('leading-icon', () => {
        it('leading-icon 있는 경우 leading-icon 슬롯이 렌더된다', () => {
            // given
            const wrapper = mount(VsChip, {
                slots: {
                    'leading-icon': '<div>icon</div>',
                },
            });

            // then
            expect(wrapper.find('.vs-chip-leading-icon').exists()).toBe(true);
            expect(wrapper.html()).toContain('<div>icon</div>');
        });
        it('leading-icon이 없는 경우 leading-icon 슬롯이 렌더되지 않는다', () => {
            // given
            const wrapper = mount(VsChip);

            // then
            expect(wrapper.find('.vs-chip-leading-icon').exists()).toBe(false);
            expect(wrapper.html()).not.toContain('<div>icon</div>');
        });
    });

    describe('closable', () => {
        describe('closable 이 true 인 경우', () => {
            let wrapper: ReturnType<typeof mountComponent>;

            // given
            beforeEach(() => {
                wrapper = mount(VsChip, {
                    props: {
                        closable: true,
                    },
                });
            });

            it('close 버튼이 렌더된다', () => {
                // then
                expect(wrapper.find('.vs-chip-close').exists()).toBe(true);
            });

            it('close 버튼이 눌렸을 때 close 함수를 한번 emit 한다', async () => {
                // when
                const closeBtn = wrapper.find('.vs-chip-close');
                await closeBtn.trigger('click');

                // then
                expect(wrapper.emitted()).toHaveProperty('close');
                expect(wrapper.emitted('close')).toHaveLength(1);
            });
        });

        it('closable 이 false 인 경우 close 버튼이 렌더되지 않는다', () => {
            // given
            const wrapper = mount(VsChip, {
                props: {
                    closable: false,
                },
            });

            // then
            expect(wrapper.find('.vs-chip-close').exists()).toBe(false);
        });
    });
});
