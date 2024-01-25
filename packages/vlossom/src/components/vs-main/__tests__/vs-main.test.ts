import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsMain from './../VsMain.vue';

describe('vs-main', () => {
    it('main 요소를 렌더한다', () => {
        // given
        const wrapper = mount(VsMain);

        // then
        expect(wrapper.find('main').exists()).toBe(true);
    });
});
