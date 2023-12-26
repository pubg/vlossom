import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VsNotice from '../VsNotice.vue';

function mountComponent() {
    return mount(VsNotice);
}

describe('vs-notice', () => {
    describe('visibility', () => {
        let wrapper: ReturnType<typeof mountComponent>;

        beforeEach(() => {
            wrapper = mount(VsNotice, {
                props: {
                    modelValue: true,
                    'onUpdate:modelValue': (v: boolean) => wrapper.setProps({ modelValue: v }),
                },
            });
        });

        afterEach(() => {
            wrapper.unmount();
        });

        it('modelValue의 초깃값이 true이면 Notice가 나타난다', () => {
            // then
            expect(wrapper.props('modelValue')).toBe(true);
            expect(wrapper.find('.vs-notice').exists()).toBe(true);
        });

        it('modelValue가 false로 업데이트되면  Notice가 사라진다', async () => {
            //when
            await wrapper.setProps({ modelValue: false });

            // then
            expect(wrapper.props('modelValue')).toBe(false);
            expect(wrapper.find('.vs-notice').exists()).toBe(false);
        });
    });
});
