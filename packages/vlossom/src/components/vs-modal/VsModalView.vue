<template>
    <div class="vs-modal-view" :class="{ 'vs-modal-fixed': isFixed }" :id="wrapperId">
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
            :hide-scroll="modal.hideScroll"
            :id="modal.id"
            :initial-focus-ref="modal.initialFocusRef"
            :size="modal.size"
            :callbacks="modal.callbacks"
        >
            <template #header v-if="modal.header">
                <vs-content-renderer :content="modal.header" />
            </template>
            <vs-content-renderer v-if="modal.component" :content="modal.component" />
            <template #footer v-if="modal.footer">
                <vs-content-renderer :content="modal.footer" />
            </template>
        </vs-modal-node>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { store } from '@/stores';
import { useContentRenderer } from '@/composables';
import VsModalNode from '@/components/vs-modal/VsModalNode.vue';
import VsContentRenderer from './../vs-content-renderer/VsContentRenderer.vue';

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

        const { getRenderedContent } = useContentRenderer();

        const wrapperId = computed(() => `vs-modal-${container.value.replace('#', '').replace('.', '')}`);

        const isFixed = computed(() => container.value === 'body');

        return { modals, getRenderedContent, wrapperId, isFixed };
    },
});
</script>

<style lang="scss" src="./VsModalView.scss" />
