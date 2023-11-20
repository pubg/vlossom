import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsNameInput from '../VsNameInput.vue';

describe('Name Input', () => {
    describe('v-model로 수정하고 싶은 값을 two-way binding 할 수 있다', () => {
        it('', () => {
            // given
            const wrapper = mount(VsNameInput);

            // when
            const text = wrapper.text();

            // then
            expect(text).toBe('Hello World');
        });
    });

    // describe('value props로 시작값을 세팅할 수 있다', () => {});
});
