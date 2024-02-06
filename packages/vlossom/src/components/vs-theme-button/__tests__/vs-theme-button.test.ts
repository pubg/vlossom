import { beforeEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { useVlossom } from '@/vlossom-framework';
import { nextTick } from 'vue';
import VsThemeButton from '../VsThemeButton.vue';

function mountComponent() {
    return mount(VsThemeButton);
}

describe('vs-theme-button', () => {
    describe('light mode', () => {
        it('aria-label이 `Switch to dark mode` 이다', () => {
            //given
            const wrapper = mount(VsThemeButton);

            //then
            expect(wrapper.attributes('aria-label')).toBe('Switch to dark mode');
        });

        it('theme dark 아이콘이 활성화된다', () => {
            //given
            const wrapper = mount(VsThemeButton);

            //then
            expect(wrapper.find('span.theme-dark').classes()).toContain('on');
        });

        it('클릭하면 dark mode로 변경한다', async () => {
            //given
            const wrapper = mount(VsThemeButton);

            //when
            await wrapper.trigger('click');

            //then
            expect(wrapper.attributes('aria-label')).toBe('Switch to light mode');
        });
    });

    describe('dark mode', () => {
        let wrapper: ReturnType<typeof mountComponent>;

        beforeEach(() => {
            wrapper = mount(VsThemeButton);
            useVlossom().theme = 'dark';
        });

        it('aria-label이 `Switch to light mode` 이다', async () => {
            //when
            await nextTick();

            //then
            expect(wrapper.attributes('aria-label')).toBe('Switch to light mode');

            expect(wrapper.find('span').classes()).toContain('on');
        });

        it('theme light 아이콘이 활성화된다', async () => {
            //when
            await nextTick();

            //then
            expect(wrapper.find('span.theme-light').classes()).toContain('on');
        });

        it('클릭하면 light mode로 변경한다', async () => {
            //when
            await wrapper.trigger('click');

            //then
            expect(wrapper.attributes('aria-label')).toBe('Switch to dark mode');
        });
    });
});
