import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, ref, Ref } from 'vue';
import { useDomAttach } from '@/composables';

describe('dom-composable', () => {
    describe('attach, detach', async () => {
        // given
        const attachment = document.createElement('div');
        document.body.appendChild(attachment);

        const TargetComponent = defineComponent({
            template: '<div ref="targetRef">target</div>',
            setup() {
                const targetRef: Ref<HTMLElement | null> = ref(null);

                const { isAttached, attach, detach } = useDomAttach(targetRef as Ref<HTMLElement>, ref(attachment));
                return { targetRef, isAttached, attach, detach };
            },
        });

        const wrapper = mount(TargetComponent);

        it('attach 호출 시 isAttached가 true가 된다', async () => {
            // when
            wrapper.vm.attach();
            await nextTick();

            // then
            expect(wrapper.vm.isAttached).toBe(true);
        });

        it('detach 호출 시 isAttached가 false가 된다', async () => {
            // when
            wrapper.vm.detach();
            await nextTick();

            // then
            expect(wrapper.vm.isAttached).toBe(false);
        });
    });

    describe('attachOverlay', async () => {
        it('default: vs-overlay가 존재하지 않는다.', async () => {
            expect(document.getElementById('vs-overlay')).toBeNull();
        });

        it('useOverlay:true일때 #vs-overlay를 document에 추가한다', async () => {
            // given
            const TargetComponent = defineComponent({
                template: `
                    <div ref="targetRef">target</div>
                    <teleport to="vs-overlay">
                        <div ref="attchmentRef">attachment</div>
                    <teleport>
                `,
                setup() {
                    const targetRef: Ref<HTMLElement | null> = ref(null);
                    const attachmentRef: Ref<HTMLElement | null> = ref(null);

                    const { isAttached, attach, detach } = useDomAttach(
                        targetRef as Ref<HTMLElement>,
                        attachmentRef as Ref<HTMLElement>,
                        true,
                    );
                    return { targetRef, attachmentRef, isAttached, attach, detach };
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
