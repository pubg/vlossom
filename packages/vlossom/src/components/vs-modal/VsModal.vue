<template>
    <Teleport to="body" :disabled="hasContainer">
        <Transition name="modal" :duration="CLOSE_DELAY">
            <div
                v-if="isOpen"
                :class="['vs-modal', { 'has-container': hasContainer }]"
                :style="{
                    ...computedStyleSet,
                    ...{ pointerEvents: dimmed && closeOnDimmedClick ? 'auto' : 'none' },
                }"
            >
                <div v-if="dimmed" class="dimmed" aria-hidden="true" @click.stop="clickDimmed()" />
                <vs-focus-trap :focus-lock="dimmed" :initial-focus-ref="initialFocusRef">
                    <vs-dialog-node
                        :class="['modal-dialog', `vs-${computedColorScheme}`, size]"
                        :style-set="computedStyleSet"
                        :close-on-esc="closeOnEsc"
                        :hide-scroll="hideScroll"
                        :isModal="dimmed"
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
import { defineComponent, ref, toRefs, watch, computed, onMounted, type PropType } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, Size, type ColorScheme, SCROLLBAR_WIDTH } from '@/declaration';
import VsFocusTrap from '@/components/vs-focus-trap/VsFocusTrap.vue';
import { VsDialogNode } from '@/nodes';

import type { VsModalStyleSet } from './types';

const name = VsComponent.VsModal;
const CLOSE_DELAY = 200;

export default defineComponent({
    name,
    components: { VsDialogNode, VsFocusTrap },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsModalStyleSet> },
        closeOnDimmedClick: { type: Boolean, default: true },
        closeOnEsc: { type: Boolean, default: true },
        dimmed: { type: Boolean, default: true },
        hasContainer: { type: Boolean, default: false },
        hideScroll: { type: Boolean, default: false },
        initialFocusRef: { type: [Object, undefined] as PropType<HTMLElement | null>, default: null },
        size: { type: String as PropType<Size | string>, default: '' },
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    setup(props, { emit, slots }) {
        const { colorScheme, styleSet, modelValue, closeOnDimmedClick, dimmed, hasContainer } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsModalStyleSet>(name, styleSet);

        const hasHeader = computed(() => !!slots['header']);
        const hasFooter = computed(() => !!slots['footer']);

        const isOpen = ref(modelValue.value);
        const originalOverflow = ref('');

        onMounted(() => {
            originalOverflow.value = document.body.style.overflow;
        });

        watch(modelValue, (val) => {
            isOpen.value = val;
        });

        watch(
            isOpen,
            (open) => {
                if (dimmed.value && !hasContainer.value) {
                    if (open) {
                        setTimeout(() => {
                            if (document.body.scrollHeight > window.innerHeight) {
                                document.body.style.overflow = 'hidden';
                                document.body.style.paddingRight = SCROLLBAR_WIDTH;
                            }

                            if (document.body.scrollWidth > window.innerWidth) {
                                document.body.style.overflow = 'hidden';
                                document.body.style.paddingBottom = SCROLLBAR_WIDTH;
                            }
                        });
                    } else {
                        setTimeout(() => {
                            document.body.style.overflow = originalOverflow.value;
                            document.body.style.paddingRight = '0';
                            document.body.style.paddingBottom = '0';
                        }, CLOSE_DELAY);
                    }
                }

                if (open !== modelValue.value) {
                    emit('update:modelValue', open);
                }
            },
            { immediate: true },
        );

        function clickDimmed() {
            if (closeOnDimmedClick.value) {
                isOpen.value = false;
            }
        }

        return {
            computedColorScheme,
            computedStyleSet,
            isOpen,
            clickDimmed,
            hasHeader,
            hasFooter,
            CLOSE_DELAY,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsModal.scss" />
