import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import VsChip from './../VsChip.vue';

function mountComponent() {
    return mount(VsChip);
}

describe('vs-chip', () => {
    describe('icon', () => {
        it('icon이 있는 경우 icon 슬롯이 렌더된다', () => {
            // given
            const wrapper = mount(VsChip, {
                slots: {
                    icon: '<div>icon</div>',
                },
            });

            // then
            expect(wrapper.html()).toContain('<div>icon</div>');
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

            afterEach(() => {
                wrapper.unmount();
            });

            it('close 버튼이 렌더된다', () => {
                // then
                expect(wrapper.find('.vs-close-button').exists()).toBe(true);
            });

            it('close 버튼이 눌렸을 때 close 함수를 한번 emit 한다', async () => {
                // when
                const closeBtn = wrapper.find('.vs-close-button');
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
            expect(wrapper.find('.vs-close-button').exists()).toBe(false);
        });
    });
});
