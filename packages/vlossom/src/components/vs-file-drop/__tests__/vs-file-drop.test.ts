import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsFileDrop from '../VsFileDrop.vue';

describe('vs-file-drop', () => {
    it('should render', () => {
        const wrapper = mount(VsFileDrop, {
            props: {
                modelValue: null,
            },
        });
        expect(wrapper.exists()).toBe(true);
    });
});
