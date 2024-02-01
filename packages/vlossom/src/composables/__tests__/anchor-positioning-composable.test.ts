import { describe, expect, it, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, ref, Ref } from 'vue';
import { usePositioning, useOverlay } from '@/composables';

describe('anchor-positioning-composable', () => {
    describe('useDomAttach', async () => {
        // given
        const attachment = document.createElement('div');
        document.body.appendChild(attachment);

        const TargetComponent = defineComponent({
            template: '<div ref="anchorRef">anchor</div>',
            setup() {
                const anchorRef: Ref<HTMLElement | null> = ref(null);

                const { isVisible, appear, disappear } = usePositioning(anchorRef as Ref<HTMLElement>, ref(attachment));
                return { anchorRef, isVisible, appear, disappear };
            },
        });

        const wrapper = mount(TargetComponent);

        it('appear 호출 시 isVisible이 true가 된다', async () => {
            // when
            wrapper.vm.appear();
            await nextTick();

            // then
            expect(wrapper.vm.isVisible).toBe(true);
        });

        it('disappear 호출 시 isVisible이 false가 된다', async () => {
            // when
            wrapper.vm.disappear();
            await nextTick();

            // then
            expect(wrapper.vm.isVisible).toBe(false);
        });
    });

    describe('useOverlay', async () => {
        beforeEach(() => {
            document.body.innerHTML = '';
        });

        it('useOverlay를 호출하면 #vs-overlay를 document에 추가한다', async () => {
            // given
            const TargetComponent = defineComponent({
                template: `
                    <div ref="anchorRef">target</div>
                    <teleport to="vs-overlay">
                        <div ref="attchmentRef">attachment</div>
                    <teleport>
                `,
                setup() {
                    const anchorRef: Ref<HTMLElement | null> = ref(null);
                    const attachmentRef: Ref<HTMLElement | null> = ref(null);

                    useOverlay();

                    const { isVisible, appear, disappear } = usePositioning(
                        anchorRef as Ref<HTMLElement>,
                        attachmentRef as Ref<HTMLElement>,
                    );

                    return { anchorRef, attachmentRef, isVisible, appear, disappear };
                },
            });
            mount(TargetComponent);

            // when
            await nextTick();

            // then
            expect(document.getElementById('vs-overlay')).not.toBeNull();
        });
    });
});
