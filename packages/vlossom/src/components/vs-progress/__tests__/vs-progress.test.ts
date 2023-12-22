import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsProgress from './../VsProgress.vue';

describe('VsProgress', () => {
    it('value 를 지정할 수 있다', () => {
        // given
        const wrapper = mount(VsProgress, {
            props: {
                value: 50,
            },
        });

        // then
        expect(wrapper.props('value')).toBe(50);
        expect(wrapper.find('.vs-progress').element.getAttribute('value')).toBe('50');
    });

    it('max 를 지정할 수 있다', () => {
        // given
        const wrapper = mount(VsProgress, {
            props: {
                max: 200,
            },
        });

        // then
        expect(wrapper.props('max')).toBe(200);
        expect(wrapper.find('.vs-progress').element.getAttribute('max')).toBe('200');
    });
});
