<template>
    <Teleport v-if="isOpen" to="body" :disabled="hasContainer">
        <vs-modal-node v-if="isOpen" />
    </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch, computed } from 'vue';
import { useBodyScroll } from '@/composables';
import { getModalProps } from '@/models';
import { VsComponent, MODAL_DURATION } from '@/declaration';
import { VsModalNode } from '@/nodes';
import { utils } from '@/utils';

const name = VsComponent.VsModal;
export default defineComponent({
    name,
    components: { VsModalNode },
    props: {
        ...getModalProps(),
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue', 'open', 'close'],
    setup(props, { emit, slots }) {
        const { modelValue } = toRefs(props);

        const isOpen = ref(modelValue.value);

        const id = utils.string.createID();

        const hasHeader = computed(() => !!slots['header']);
        const headerId = `vs-modal-header-${id}`;
        const bodyId = `vs-modal-body-${id}`;

        watch(modelValue, (val) => {
            isOpen.value = val;
        });

        const bodyScroll = useBodyScroll();
        watch(
            isOpen,
            (open) => {
                if (dimmed.value && !hasContainer.value) {
                    if (open) {
                        bodyScroll.lock();
                    } else {
                        bodyScroll.unlock();
                    }
                }

                emit('update:modelValue', open);
                emit(open ? 'open' : 'close');
            },
            { immediate: true },
        );

        function onClickDimmed() {
            if (closeOnDimmedClick.value) {
                isOpen.value = false;
            }
        }

        return {
            colorSchemeClass,
            computedStyleSet,
            hasSpecifiedSize,
            isOpen,
            onClickDimmed,
            MODAL_DURATION,
            hasHeader,
            headerId,
            bodyId,
        };
    },
});
</script>

<style lang="scss" src="./VsModal.scss" />
