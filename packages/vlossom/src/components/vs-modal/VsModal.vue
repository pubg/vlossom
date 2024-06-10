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
                        :class="['modal-dialog', `vs-${computedColorScheme}`, hasSpecifiedSize ? '' : size]"
                        :style-set="computedStyleSet"
                        :close-on-esc="closeOnEsc"
                        :hide-scroll="hideScroll"
                        :isModal="dimmed"
                        @close="() => (isOpen = false)"
                    >
                        <template #header v-if="$slots['header']">
                            <slot name="header" />
                        </template>
                        <slot />
                        <template #footer v-if="$slots['footer']">
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
import { VsComponent, Size, type ColorScheme, SCROLLBAR_WIDTH, SIZES } from '@/declaration';
import VsFocusTrap from '@/components/vs-focus-trap/VsFocusTrap.vue';
import { VsDialogNode } from '@/nodes';

import type { VsModalStyleSet } from './types';

const name = VsComponent.VsModal;
const CLOSE_DELAY = 200;

type SizeValue = Size | string | number;

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
        size: {
            type: [String, Number, Object] as PropType<SizeValue | { width: SizeValue; height: SizeValue }>,
            default: 'sm',
        },
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const { colorScheme, styleSet, modelValue, closeOnDimmedClick, dimmed, hasContainer, size } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet: modalStyleSet } = useStyleSet<VsModalStyleSet>(name, styleSet);

        const hasSpecifiedSize = computed(() => size.value && !SIZES.includes(size.value as Size));

        const sizeStyle = computed(() => {
            const style: { [key: string]: string } = {};

            if (typeof size.value === 'object') {
                const { width, height } = size.value;

                if (SIZES.includes(width as Size)) {
                    style['--vs-modal-width'] = `var(--vs-modal-width-${width})`;
                } else {
                    const convertedWidth = isNaN(Number(width)) ? width : `${width}px`;
                    style['--vs-modal-width'] = convertedWidth as string;
                }

                if (SIZES.includes(height as Size)) {
                    style['--vs-modal-height'] = `var(--vs-modal-height-${height})`;
                } else {
                    const convertedHeight = isNaN(Number(height)) ? height : `${height}px`;
                    style['--vs-modal-height'] = convertedHeight as string;
                }
            } else {
                if (hasSpecifiedSize.value) {
                    const convertedSize = isNaN(Number(size.value)) ? size.value : `${size.value}px`;

                    style['--vs-modal-width'] = convertedSize as string;
                    style['--vs-modal-height'] = convertedSize as string;
                } else {
                    style['--vs-modal-width'] = `var(--vs-modal-width-${size.value})`;
                }
            }

            return style;
        });

        const computedStyleSet = computed(() => {
            return {
                ...modalStyleSet.value,
                ...sizeStyle.value,
            };
        });

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
            hasSpecifiedSize,
            isOpen,
            clickDimmed,
            CLOSE_DELAY,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsModal.scss" />
