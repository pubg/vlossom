import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import VsTabs from '../VsTabs.vue';
import { mockConsoleError } from '@/test/setup';
import { nextTick } from 'vue';

function mountComponent() {
    return mount(VsTabs);
}
describe('vs-tabs', () => {
    const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
    let originalInnerWidth: number = 0;

    beforeEach(() => {
        window.HTMLElement.prototype.scrollIntoView = vi.fn().mockImplementation(() => {});
        originalInnerWidth = window.innerWidth;
    });

    afterEach(() => {
        window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
        window.innerWidth = originalInnerWidth;
    });

    describe('tabs', () => {
        it('props tabs에 string 배열을 전달하면, 그 길이만큼 tab이 생기고 배열의 각 요소가 tab의 이름으로 지정된다', () => {
            // given
            const tabs = ['tab1', 'tab2', 'tab3'];
            const wrapper = mount(VsTabs, {
                props: {
                    tabs,
                },
            });

            // then
            expect(wrapper.html()).toContain('tab1');
            expect(wrapper.html()).toContain('tab2');
            expect(wrapper.html()).toContain('tab3');
            expect(wrapper.vm.$options.props.tabs.validator?.(tabs)).toBe(true);
        });

        it('props tabs에 전달된 string 배열이 중복되면 validator 가 false 를 리턴한다', () => {
            // given
            const tabs = ['tab1', 'tab1'];

            const wrapper = mount(VsTabs, {
                props: {
                    tabs,
                },
            });

            // then
            expect(wrapper.vm.$options.props.tabs.validator?.(tabs)).toBe(false);
            expect(mockConsoleError).toHaveBeenCalledTimes(2);
        });

        it('각 탭의 slot을 통해 탭을 커스터마이징 할 수 있다', () => {
            // given
            const wrapper = mount(VsTabs, {
                props: {
                    tabs: ['tab1', 'tab2', 'tab3'],
                },
                slots: {
                    tab1: 'ITEM ONE',
                    tab2: 'ITEM TWO',
                    tab3: 'ITEM THREE',
                },
            });
            // then
            expect(wrapper.html()).toContain('ITEM ONE');
            expect(wrapper.html()).toContain('ITEM TWO');
            expect(wrapper.html()).toContain('ITEM THRE');
        });
    });

    describe('select', () => {
        it('tab 이름을 click 하면 selectedTab 이 해당 tab index로 변경된다 (update: modelValue)', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTabs, {
                props: {
                    tabs: ['tab1', 'tab2', 'tab3'],
                    modelValue: 2,
                    'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            await wrapper.findAll('li')[1].trigger('click');

            // then
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1]);
            expect(wrapper.vm.selectedIdx).toEqual(1);
        });

        it('disabled 인 tab 은 click 이벤트가 발생하지 않는다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTabs, {
                props: {
                    tabs: ['tab1', 'tab2', 'tab3'],
                    modelValue: 2,
                    'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    disabled: [0],
                },
            });

            // when
            const tabs = wrapper.findAll('li');
            await tabs[1].trigger('click');
            await tabs[0].trigger('click');

            // then
            expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1]);
            expect(wrapper.vm.selectedIdx).toEqual(1);
        });
    });

    describe('scrollable', () => {
        it('scrollButtons prop이 false 이면 scroll 버튼이 렌더되지 않는다', () => {
            // given
            const wrapper = mount(VsTabs, {
                props: {
                    tabs: ['tab1', 'tab2', 'tab3'],
                    scrollButtons: false,
                },
            });

            // then
            expect(wrapper.html()).not.toContain('scroll-button');
        });

        it('scrollButtons props이 auto이면 모바일에서는 scroll 버튼이 렌더되지 않는다', () => {
            // given
            window.innerWidth = 500;
            const wrapper = mount(VsTabs, {
                props: {
                    tabs: ['tab1', 'tab2', 'tab3'],
                    scrollButtons: 'auto',
                },
            });

            // then
            expect(wrapper.html()).not.toContain('scroll-button');
        });

        it('scrollButtons prop이 true이더라도 scrollCount가 전체 탭 길이와 동일하면 scroll 버튼이 렌더되지 않는다', async () => {
            // given
            const wrapper = mount(VsTabs, {
                props: {
                    tabs: ['tab1', 'tab2', 'tab3'],
                    scrollButtons: true,
                },
            });

            // when
            wrapper.vm.scrollCount = 3;
            await nextTick();

            // then
            expect(wrapper.html()).not.toContain('scroll-button');
        });
    });
});
