<template>
    <Teleport v-if="isOpen" :to="container">
        <vs-modal-node
            v-model:id="id"
            :color-scheme="colorScheme"
            :style-set="styleSet"
            :dim-close="dimClose"
            :dimmed="dimmed"
            :esc-close="escClose"
            :fixed="fixed"
            :focus-lock="focusLock"
            :hide-scroll="hideScroll"
            :initial-focus-ref="initialFocusRef"
            :size="size"
            @open="isOpen = true"
            @close="isOpen = false"
        >
            <template #header>
                <slot name="header" />
            </template>
            <slot />
            <template #footer>
                <slot name="footer" />
            </template>
        </vs-modal-node>
    </Teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs, watch } from 'vue';
import { getOverlayProps } from '@/models';
import { VsComponent, SizeProp } from '@/declaration';
import { VsModalNode } from '@/nodes';
import { store } from '@/stores';

const name = VsComponent.VsModal;
export default defineComponent({
    name,
    components: { VsModalNode },
    props: {
        ...getOverlayProps(),
        container: { type: String, default: 'body' },
        size: {
            type: [String, Number, Object] as PropType<SizeProp | { width?: SizeProp; height?: SizeProp }>,
            default: 'md',
        },
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue', 'open', 'close'],
    setup(props, { emit }) {
        const { modelValue, id } = toRefs(props);

        const isOpen = ref(false);

        watch(modelValue, (o) => {
            isOpen.value = o;
        });

        watch(isOpen, (o) => {
            emit('update:modelValue', o);
            emit(o ? 'open' : 'close');
            if (!o) {
                store.overlay.remove(id.value);
            }
        });

        return {
            isOpen,
        };
    },
});
</script>
