<template>
    <Teleport v-if="isOpen" :to="container">
        <vs-modal-node
            :color-scheme="colorScheme"
            :style-set="styleSet"
            :callbacks="callbacks"
            :container="container"
            :dim-close="dimClose"
            :dimmed="dimmed"
            :esc-close="escClose"
            :focus-lock="focusLock"
            :hide-scroll="hideScroll"
            :id="modalId"
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
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue';
import { getOverlayProps } from '@/models';
import { VsComponent, SizeProp } from '@/declaration';
import { VsModalNode, VsModalNodeStyleSet } from '@/nodes';
import { store } from '@/stores';
import { utils } from '@/utils';

const name = VsComponent.VsModal;
export default defineComponent({
    name,
    components: { VsModalNode },
    props: {
        ...getOverlayProps<VsModalNodeStyleSet>(),
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

        const innerId = utils.string.createID();
        const modalId = computed(() => id.value || innerId);
        const isOpen = ref(false);

        watch(modelValue, (o) => {
            isOpen.value = o;
        });

        watch(isOpen, (o) => {
            emit('update:modelValue', o);
            emit(o ? 'open' : 'close');
            if (!o) {
                store.overlay.remove(modalId.value);
            }
        });

        return {
            modalId,
            isOpen,
        };
    },
});
</script>
