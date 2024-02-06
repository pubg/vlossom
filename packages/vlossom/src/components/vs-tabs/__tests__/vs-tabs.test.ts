import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsTabs from '../VsTabs.vue';

function mountComponent() {
    return mount(VsTabs);
}
describe('VsTabs', () => {
    describe('props & slots', () => {
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
            await wrapper.findAll('.tab')[1].trigger('click');

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
            await wrapper.findAll('.tab')[1].trigger('click');
            await wrapper.findAll('li')[0].trigger('click');

            // then
            expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1]);
            expect(wrapper.vm.selectedIdx).toEqual(1);
        });
    });
});
