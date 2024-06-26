<template>
    <Teleport v-if="isOpen" to="body" :disabled="hasContainer">
        <Transition name="modal" :duration="MODAL_DURATION">
            <div
                :class="['vs-modal', `vs-${computedColorScheme}`, { 'has-container': hasContainer, dimmed }]"
                :style="computedStyleSet"
            >
                <div v-if="dimmed" class="vs-modal-dimmed" aria-hidden="true" @click.stop="onClickDimmed" />
                <vs-focus-trap ref="focusTrapRef" :focus-lock="focusLock" :initial-focus-ref="initialFocusRef">
                    <div
                        :class="['vs-modal-wrap', hasSpecifiedSize ? '' : size]"
                        role="dialog"
                        :aria-labelledby="hasHeader ? headerId : undefined"
                        :aria-describedby="bodyId"
                        :aria-label="hasHeader ? undefined : 'Modal'"
                        :aria-modal="true"
                    >
                        <header v-if="hasHeader" :id="headerId" class="vs-modal-header" aria-label="Modal Header">
                            <slot name="header" />
                        </header>

                        <div :id="bodyId" :class="['vs-modal-body', { 'hide-scroll': hideScroll }]" tabindex="0">
                            <slot />
                        </div>

                        <footer v-if="$slots['footer']" class="vs-modal-footer" aria-label="Modal Footer">
                            <slot name="footer" />
                        </footer>
                    </div>
                </vs-focus-trap>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch, computed, onMounted, type PropType } from 'vue';
import { useColorScheme, useBodyScroll, useStyleSet, useEscClose, getModalProps } from '@/composables';
import { VsComponent, Size, SIZES, MODAL_DURATION, type ColorScheme } from '@/declaration';
import VsFocusTrap from '@/components/vs-focus-trap/VsFocusTrap.vue';
import { utils } from '@/utils';

import type { VsModalStyleSet } from './types';

const name = VsComponent.VsModal;

export default defineComponent({
    name,
    components: { VsFocusTrap },
    props: {
        ...getModalProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsModalStyleSet> },
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    setup(props, { emit, slots }) {
        const { colorScheme, styleSet, modelValue, closeOnDimmedClick, closeOnEsc, dimmed, hasContainer, size } =
            toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet: modalStyleSet } = useStyleSet<VsModalStyleSet>(name, styleSet);

        const hasSpecifiedSize = computed(() => size.value && !SIZES.includes(size.value as Size));

        const sizeStyle = computed(() => {
            const style: { [key: string]: string } = {};

            if (typeof size.value === 'object') {
                const { width = 'md', height = 'md' } = size.value;

                if (SIZES.includes(width as Size)) {
                    style['--vs-modal-width'] = `var(--vs-modal-width-${width})`;
                } else {
                    const convertedWidth = utils.string.convertToStringSize(width);
                    style['--vs-modal-width'] = convertedWidth;
                }

                if (SIZES.includes(height as Size)) {
                    style['--vs-modal-height'] = `var(--vs-modal-height-${height})`;
                } else {
                    const convertedHeight = utils.string.convertToStringSize(height);
                    style['--vs-modal-height'] = convertedHeight;
                }
            } else if (hasSpecifiedSize.value) {
                const convertedSize = utils.string.convertToStringSize(size.value);

                style['--vs-modal-width'] = convertedSize;
                style['--vs-modal-height'] = convertedSize;
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

        const id = utils.string.createID();

        const hasHeader = computed(() => !!slots['header']);
        const headerId = `vs-modal-header-${id}`;
        const bodyId = `vs-modal-body-${id}`;

        onMounted(() => {
            originalOverflow.value = document.body.style.overflow;
        });

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
            },
            { immediate: true },
        );

        function onClickDimmed() {
            if (closeOnDimmedClick.value) {
                isOpen.value = false;
            }
        }

        useEscClose(id, closeOnEsc, isOpen, () => {
            isOpen.value = false;
        });

        return {
            computedColorScheme,
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

<style lang="scss" scoped src="./VsModal.scss" />
