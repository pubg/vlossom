import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsIndexItem from '../VsIndexItem.vue';

describe('vs-index-item', () => {
    describe('slot', () => {
        it('slot에 삽입된 내용을 보여준다', () => {
            // given
            const wrapper = mount(VsIndexItem, {
                props: {
                    key: 'key',
                },
                slots: {
                    default: 'This is index item content',
                },
            });

            // then
            expect(wrapper.html()).toContain('This is index item content');
        });
    });
});
