import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, ref, type Ref } from 'vue';
import { usePositioning } from '@/composables';

describe('anchor-positioning-composable', () => {
    describe('usePositioning', async () => {
        // given

        const TargetComponent = defineComponent({
            template: `
                <div ref="anchorRef">anchor</div>
                <div ref="attachmentRef">attachment</div>
            `,
            setup() {
                const anchorRef: Ref<HTMLElement | null> = ref(null);
                const attachmentRef: Ref<HTMLElement | null> = ref(null);

                const { isVisible, appear, disappear } = usePositioning(
                    anchorRef as Ref<HTMLElement>,
                    attachmentRef as Ref<HTMLElement>,
                );

                return { anchorRef, attachmentRef, isVisible, appear, disappear };
            },
        });

        const wrapper = mount(TargetComponent);

        it('appear 호출 시 isVisible이 true가 된다', async () => {
            // when
            wrapper.vm.appear();

            // then
            expect(wrapper.vm.isVisible).toBe(true);
        });

        it('disappear 호출 시 isVisible이 false가 된다', async () => {
            // when
            wrapper.vm.disappear();

            // then
            expect(wrapper.vm.isVisible).toBe(false);
        });
    });
});
