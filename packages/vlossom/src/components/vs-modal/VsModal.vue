<template>
    <Teleport to="body" :disabled="hasContainer">
        <div class="vs-modal" :style="modalCustomStyleSet">
            <Transition name="fade">
                <div
                    v-if="isOpen"
                    :class="['dimmed', { 'has-container': hasContainer }]"
                    aria-hidden="true"
                    @click.stop="clickDimmed()"
                />
            </Transition>
            <Transition name="scale">
                <vs-focus-trap v-if="isOpen" :initial-focus-ref="initialFocusRef">
                    <vs-dialog-node
                        :class="size"
                        :style-set="computedStyleSet"
                        :close-on-esc="closeOnEsc"
                        :has-container="hasContainer"
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
            </Transition>
        </div>
    </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch, computed, type PropType } from 'vue';
import { useStyleSet } from '@/composables';
import { VsComponent, Size } from '@/declaration';
import { VsFocusTrap } from '@/components';
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
        const { styleSet, modelValue, closeOnDimmedClick } = toRefs(props);

        const { computedStyleSet } = useStyleSet<VsModalStyleSet>(name, styleSet);

        const modalCustomStyleSet = computed(() => {
            return {
                '--vs-modal-borderRadius': computedStyleSet.value['--vs-modal-borderRadius'] || undefined,
            };
        });

        const hasHeader = computed(() => !!slots['header']);
        const hasFooter = computed(() => !!slots['footer']);

        const isOpen = ref(modelValue.value);

        watch(modelValue, (val) => {
            isOpen.value = val;
        });

        watch(isOpen, (val) => {
            emit('update:modelValue', val);
        });

        function clickDimmed() {
            if (closeOnDimmedClick.value) {
                isOpen.value = false;
            }
        }

        return {
            computedStyleSet,
            modalCustomStyleSet,
            isOpen,
            clickDimmed,
            hasHeader,
            hasFooter,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsModal.scss" />
