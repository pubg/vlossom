import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsCheckboxNode from '../VsCheckboxNode.vue';

function mountComponent() {
    return mount(VsCheckboxNode);
}

describe('vs-checkbox-node', () => {
    describe('checked', () => {
        it('checked 속성을 설정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxNode);

            // when
            await wrapper.setProps({ checked: true });

            // then
            expect(wrapper.find('input').element.checked).toBe(true);
        });
    });

    describe('events', () => {
        it('toggle 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxNode);

            // when
            await wrapper.find('input').trigger('change');

            // then
            expect(wrapper.emitted('toggle')).toHaveLength(1);
        });

        it('focus 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxNode);

            // when
            await wrapper.find('input').trigger('focus');

            // then
            expect(wrapper.emitted('focus')).toHaveLength(1);
        });

        it('blur 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckboxNode);

            // when
            await wrapper.find('input').trigger('blur');

            // then
            expect(wrapper.emitted('blur')).toHaveLength(1);
        });
    });
});
