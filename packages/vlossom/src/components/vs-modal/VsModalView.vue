<template>
    <div class="vs-modal-view" :class="{ 'vs-modal-fixed': isFixed }" :id="wrapperId">
        <TransitionGroup name="modal" :duration="MODAL_DURATION">
            <vs-modal-node
                v-for="modal in modals"
                :key="modal.id"
                :color-scheme="modal.colorScheme"
                :style-set="modal.styleSet"
                :container="container"
                :dim-close="modal.dimClose"
                :dimmed="modal.dimmed"
                :esc-close="modal.escClose"
                :focus-lock="modal.focusLock"
                :id="modal.id"
                :initial-focus-ref="modal.initialFocusRef"
                :size="modal.size"
                :callbacks="modal.callbacks"
            >
                <template #header v-if="modal.header">
                    <vs-content-renderer :content="modal.header" :props="modal.props" />
                </template>
                <vs-content-renderer v-if="modal.component" :content="modal.component" :props="modal.props" />
                <template #footer v-if="modal.footer">
                    <vs-content-renderer :content="modal.footer" :props="modal.props" />
                </template>
            </vs-modal-node>
        </TransitionGroup>
    </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, toRefs, watch } from 'vue';
import { store } from '@/stores';
import { useScrollLock } from '@/composables';
import VsModalNode from '@/components/vs-modal/VsModalNode.vue';
import VsContentRenderer from '@/components/vs-content-renderer/VsContentRenderer.vue';
import { MODAL_DURATION } from '@/declaration';

export default defineComponent({
    props: {
        container: { type: String, required: true, default: 'body' },
    },
    components: { VsModalNode, VsContentRenderer },
    setup(props) {
        const { container } = toRefs(props);
        const modals = computed(() => {
            return store.modal.itemsByContainer.value[container.value] || [];
        });

        const wrapperId = computed(() => `vs-modal-${container.value.replace('#', '').replace('.', '')}`);

        const isFixed = computed(() => container.value === 'body');

        const containerElement: ComputedRef<HTMLElement | null> = computed(() => {
            if (container.value === 'body') {
                return document.body;
            }

            return document.querySelector(container.value);
        });

        const needScrollLock = computed(() => {
            return modals.value.some((modal) => modal.scrollLock);
        });

        watch(needScrollLock, (lock) => {
            if (lock) {
                useScrollLock(containerElement.value).lock();
            } else {
                useScrollLock(containerElement.value).unlock();
            }
        });

        return { modals, wrapperId, isFixed, MODAL_DURATION };
    },
});
</script>

<style lang="scss" src="./VsModalView.scss" />
