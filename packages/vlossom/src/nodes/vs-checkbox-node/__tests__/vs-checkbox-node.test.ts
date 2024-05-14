import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsCheckboxNode from './../VsCheckboxNode.vue';
import { nextTick } from 'vue';

function mountComponent() {
    return mount(VsCheckboxNode);
}

describe('vs-checkbox-node', () => {
    describe('icon', () => {
        it('선택 상태가 아니면 unchecked icon이 표시된다', () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxNode, {
                props: {
                    id: 'test',
                    checked: false,
                },
            });

            // then
            expect(wrapper.find('input').element.checked).toBe(false);
            expect(wrapper.vm.icon).toBe('checkboxUnchecked');
        });

        it('선택 상태이면 checked icon이 표시된다', () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxNode, {
                props: {
                    id: 'test',
                    checked: true,
                },
            });

            // then
            expect(wrapper.find('input').element.checked).toBe(true);
            expect(wrapper.vm.icon).toBe('checkboxChecked');
        });

        it('indeterminate 상태이면 indeterminate icon이 표시된다', () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxNode, {
                props: {
                    id: 'test',
                    checked: false,
                    indeterminate: true,
                },
            });

            // then
            expect(wrapper.find('input').element.checked).toBe(false);
            expect(wrapper.vm.icon).toBe('checkboxIndeterminate');
        });

        it('indeterminate가 true라도 checked가 true이면 checked icon이 표시된다', () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxNode, {
                props: {
                    id: 'test',
                    checked: true,
                    indeterminate: true,
                },
            });

            // then
            expect(wrapper.find('input').element.checked).toBe(true);
            expect(wrapper.vm.icon).toBe('checkboxChecked');
        });
    });

    it('checked 속성을 설정할 수 있다', async () => {
        // given
        const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxNode, {
            props: {
                id: 'test',
                checked: false,
            },
        });

        // when
        await wrapper.setProps({ checked: true });

        // then
        expect(wrapper.find('input').element.checked).toBe(true);
        expect(wrapper.vm.icon).toBe('checkboxChecked');
    });

    describe('label', () => {
        it('label을 세팅할 수 있다', () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxNode, {
                props: {
                    id: 'test',
                    checked: false,
                    label: 'test label',
                },
            });

            // then
            expect(wrapper.find('label').text()).toBe('test label');
        });

        it('label slot에 원하는 내용을 넣을 수 있다', () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxNode, {
                props: {
                    id: 'test',
                    checked: false,
                },
                slots: {
                    label: 'test label',
                },
            });

            // then
            expect(wrapper.find('label').text()).toBe('test label');
        });
    });

    describe('events', () => {
        it('toggle 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxNode, {
                props: {
                    id: 'test',
                    checked: true,
                },
            });

            // when
            await wrapper.find('input').trigger('click');

            // then
            expect(wrapper.emitted('change')).toHaveLength(1);
            expect(wrapper.emitted('toggle')).toHaveLength(1);
            expect(wrapper.emitted('toggle')).toEqual([[false]]);
        });

        it('focus 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxNode, {
                props: {
                    id: 'test',
                    checked: false,
                },
            });

            // when
            await wrapper.find('input').trigger('focus');

            // then
            expect(wrapper.emitted('focus')).toHaveLength(1);
        });

        it('blur 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxNode, {
                props: {
                    id: 'test',
                    checked: false,
                },
            });

            // when
            await wrapper.find('input').trigger('blur');

            // then
            expect(wrapper.emitted('blur')).toHaveLength(1);
        });
    });
});
