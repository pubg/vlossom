import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsCheckboxNode from './../VsCheckboxNode.vue';

describe('vs-checkbox-node', () => {
    it('checked 속성을 설정할 수 있다', async () => {
        // given
        const wrapper = mount(VsCheckboxNode);

        // when
        await wrapper.setProps({ checked: true });

        // then
        expect(wrapper.find('input').element.checked).toBe(true);
    });

    describe('label', () => {
        it('label을 세팅할 수 있다', () => {
            // given
            const wrapper = mount(VsCheckboxNode, {
                props: {
                    label: 'test label',
                },
            });

            // then
            expect(wrapper.find('label').text()).toBe('test label');
        });

        it('label slot에 원하는 내용을 넣을 수 있다', () => {
            // given
            const wrapper = mount(VsCheckboxNode, {
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
            const wrapper = mount(VsCheckboxNode);

            // when
            await wrapper.find('input').trigger('click');

            // then
            expect(wrapper.emitted('change')).toHaveLength(1);
            expect(wrapper.emitted('toggle')).toHaveLength(1);
        });

        it('focus 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper = mount(VsCheckboxNode);

            // when
            await wrapper.find('input').trigger('focus');

            // then
            expect(wrapper.emitted('focus')).toHaveLength(1);
        });

        it('blur 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper = mount(VsCheckboxNode);

            // when
            await wrapper.find('input').trigger('blur');

            // then
            expect(wrapper.emitted('blur')).toHaveLength(1);
        });
    });
});
