<template>
    <Teleport to="body" :disabled="hasContainer">
        <Transition name="modal" :duration="200">
            <div v-if="isOpen" :class="['vs-modal', { 'has-container': hasContainer }]" :style="computedStyleSet">
                <div class="dimmed" aria-hidden="true" @click.stop="clickDimmed()" />
                <vs-focus-trap :initial-focus-ref="initialFocusRef">
                    <vs-dialog-node
                        :class="['modal-dialog', size]"
                        :style-set="computedStyleSet"
                        :close-on-esc="closeOnEsc"
                        :hide-scroll="hideScroll"
                        @close="() => (isOpen = false)"
                    >
                        <template #header v-if="hasHeader">
                            <slot name="header" />
                        </template>
                        <slot />
                        <template #footer v-if="hasFooter">
                            <slot name="footer" />
                        </template>
                    </vs-dialog-node>
                </vs-focus-trap>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch, computed, type PropType } from 'vue';
import { useStyleSet } from '@/composables';
import { VsComponent, Size } from '@/declaration';
import VsFocusTrap from '@/components/vs-focus-trap/VsFocusTrap.vue';
import { VsDialogNode } from '@/nodes';

import type { VsModalStyleSet } from './types';

const name = VsComponent.VsModal;

export default defineComponent({
    name,
    components: { VsDialogNode, VsFocusTrap },
    props: {
        styleSet: { type: [String, Object] as PropType<string | VsModalStyleSet>, default: '' },
        closeOnDimmedClick: { type: Boolean, default: true },
        closeOnEsc: { type: Boolean, default: true },
        hasContainer: { type: Boolean, default: false },
        hideScroll: { type: Boolean, default: false },
        initialFocusRef: { type: [Object, undefined] as PropType<HTMLElement | null>, default: null },
        size: { type: String as PropType<Size | string>, default: '' },
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    setup(props, { emit, slots }) {
        const { styleSet, modelValue, closeOnDimmedClick, hasContainer } = toRefs(props);

        const { computedStyleSet } = useStyleSet<VsModalStyleSet>(name, styleSet);

        const hasHeader = computed(() => !!slots['header']);
        const hasFooter = computed(() => !!slots['footer']);

        const isOpen = ref(modelValue.value);

        watch(modelValue, (val) => {
            isOpen.value = val;
        });

        watch(isOpen, (val) => {
            if (val && !hasContainer.value) {
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = '15px';
            } else {
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
            }

            emit('update:modelValue', val);
        });

        function clickDimmed() {
            if (closeOnDimmedClick.value) {
                isOpen.value = false;
            }
        }

        return {
            computedStyleSet,
            isOpen,
            clickDimmed,
            hasHeader,
            hasFooter,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsModal.scss" />
