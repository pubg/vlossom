<template>
    <Teleport to="body" :disabled="hasContainer">
        <div class="vs-drawer">
            <Transition name="fade">
                <div
                    v-if="isOpen && dimmed"
                    :class="['dimmed', { 'has-container': hasContainer }]"
                    aria-hidden="true"
                    @click.stop="clickDimmed()"
                />
            </Transition>
            <Transition :name="`slide-${placement}`">
                <vs-focus-trap v-if="isOpen" :focus-lock="dimmed" :initialFocusRef="initialFocusRef">
                    <div
                        :class="[
                            'vs-drawer-content',
                            placement,
                            hasSpecifiedSize ? '' : size,
                            { 'has-container': hasContainer },
                        ]"
                        :style="{ ...computedStyleSet, ...sizeProperty }"
                        role="dialog"
                        :aria-labelledby="hasHeader ? 'vs-drawer-title' : undefined"
                        aria-describedby="vs-drawer-body"
                        :aria-label="hasHeader ? undefined : 'Dialog'"
                        :aria-modal="dimmed"
                    >
                        <header v-if="hasHeader" id="vs-drawer-title" aria-label="Dialog Header">
                            <slot name="header" />
                        </header>

                        <div :class="['drawer-body', { 'hide-scroll': hideScroll }]" id="vs-drawer-body">
                            <slot />
                        </div>

                        <footer v-if="hasFooter" aria-label="Dialog Footer">
                            <slot name="footer" />
                        </footer>
                    </div>
                </vs-focus-trap>
            </Transition>
        </div>
    </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch, computed, onMounted, onBeforeUnmount, type PropType } from 'vue';
import { useStyleSet } from '@/composables';
import { VsComponent, Placement, PLACEMENTS, Size, SIZES } from '@/declaration';
import { VsFocusTrap } from '@/components';

import type { VsDrawerStyleSet } from './types';

const name = VsComponent.VsDrawer;
export default defineComponent({
    name,
    components: { VsFocusTrap },
    props: {
        styleSet: { type: [String, Object] as PropType<string | VsDrawerStyleSet>, default: '' },
        closeOnDimmedClick: { type: Boolean, default: true },
        closeOnEsc: { type: Boolean, default: true },
        dimmed: { type: Boolean, default: true },
        hasContainer: { type: Boolean, default: false },
        hideScroll: { type: Boolean, default: false },
        initialFocusRef: { type: [Object, undefined] as PropType<HTMLElement | null>, default: null },
        placement: {
            type: String as PropType<Placement>,
            default: 'left',
            validator: (val: Placement) => PLACEMENTS.includes(val),
        },
        size: { type: String as PropType<Size | string>, default: '' },
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    setup(props, { emit, slots }) {
        const { styleSet, modelValue, closeOnEsc, closeOnDimmedClick, placement, size } = toRefs(props);

        const { computedStyleSet } = useStyleSet<VsDrawerStyleSet>(name, styleSet);

        const hasSpecifiedSize = computed(() => size.value && !SIZES.includes(size.value as Size));

        const sizeProperty = computed(() => {
            if (hasSpecifiedSize.value) {
                if (placement.value === 'top' || placement.value === 'bottom') {
                    return { '--vs-drawer-height': size.value };
                }

                if (placement.value === 'left' || placement.value === 'right') {
                    return { '--vs-drawer-width': size.value };
                }
            }

            return {};
        });

        const hasHeader = computed(() => !!slots['header']);
        const hasFooter = computed(() => !!slots['footer']);

        const isOpen = ref(modelValue.value);

        watch(modelValue, (val) => {
            isOpen.value = val;
        });

        function clickDimmed() {
            if (closeOnDimmedClick.value) {
                isOpen.value = false;
            }
        }

        function onPressEsc(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                isOpen.value = false;
            }
        }

        watch(isOpen, (val) => {
            if (closeOnEsc.value) {
                if (val) {
                    document.addEventListener('keydown', onPressEsc);
                } else {
                    document.removeEventListener('keydown', onPressEsc);
                }
            }

            emit('update:modelValue', val);
        });

        onMounted(() => {
            if (isOpen.value && closeOnEsc.value) {
                document.addEventListener('keydown', onPressEsc);
            }
        });

        onBeforeUnmount(() => {
            document.removeEventListener('keydown', onPressEsc);
        });

        return {
            computedStyleSet,
            hasSpecifiedSize,
            sizeProperty,
            isOpen,
            clickDimmed,
            hasHeader,
            hasFooter,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsDrawer.scss" />
