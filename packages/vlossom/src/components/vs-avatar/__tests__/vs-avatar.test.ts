import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VsAvatar from './../VsAvatar.vue';

describe('vs-avatar', () => {
    it('text contents를 slot에 넣을 수 있다', () => {
        // given
        const text = 'AVATAR';
        const wrapper = mount(VsAvatar, {
            slots: {
                default: text,
            },
        });

        // then
        expect(wrapper.html()).toContain(text);
    });

    it('image contents를 slot에 넣을 수 있다', () => {
        // given
        const imgTag = '<img src="test-image" alt="avatar">';
        const wrapper = mount(VsAvatar, {
            slots: {
                default: imgTag,
            },
        });

        // then
        expect(wrapper.html()).toContain(imgTag);
    });
});
