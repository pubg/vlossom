<template>
    <Teleport to="body" :disabled="hasContainer">
        <Transition name="drawer" :duration="300">
            <div
                v-if="isOpen"
                :class="['vs-drawer', { 'has-container': hasContainer }]"
                :style="{
                    ...computedStyleSet,
                    ...{ pointerEvents: dimmed && closeOnDimmedClick ? 'auto' : 'none' },
                }"
            >
                <div v-if="dimmed" class="dimmed" aria-hidden="true" @click.stop="clickDimmed()" />
                <vs-focus-trap :focus-lock="dimmed" :initial-focus-ref="initialFocusRef">
                    <vs-dialog-node
                        :class="['drawer-dialog', `vs-${computedColorScheme}`, placement, hasSpecifiedSize ? '' : size]"
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
import { defineComponent, ref, toRefs, watch, computed, inject, watchEffect, type PropType } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import VsFocusTrap from '@/components/vs-focus-trap/VsFocusTrap.vue';
import { VsDialogNode } from '@/nodes';
import { VsComponent, Placement, Size, SIZES, type ColorScheme, PLACEMENTS } from '@/declaration';
import { utils } from '@/utils';

import type { VsDrawerStyleSet } from './types';
import type { LayoutAttrs } from '../vs-layout/types';

const name = VsComponent.VsDrawer;

export default defineComponent({
    name,
    components: { VsDialogNode, VsFocusTrap },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsDrawerStyleSet> },
        closeOnDimmedClick: { type: Boolean, default: true },
        closeOnEsc: { type: Boolean, default: true },
        dimmed: { type: Boolean, default: true },
        hasContainer: { type: Boolean, default: false },
        hideScroll: { type: Boolean, default: false },
        initialFocusRef: { type: [Object, undefined] as PropType<HTMLElement | null>, default: null },
        layout: { type: Boolean, default: false },
        placement: {
            type: String as PropType<Placement>,
            default: 'left',
            validator: (val: Placement) => utils.props.checkPropExist<Placement>(name, 'placement', PLACEMENTS, val),
        },
        size: { type: String as PropType<Size | string>, default: '' },
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    setup(props, { emit, slots }) {
        const { colorScheme, styleSet, modelValue, closeOnDimmedClick, dimmed, hasContainer, layout, placement, size } =
            toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet: drawerStyleSet } = useStyleSet<VsDrawerStyleSet>(name, styleSet);

        const hasSpecifiedSize = computed(() => size.value && !SIZES.includes(size.value as Size));

        const sizeStyleSet = computed(() => {
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

        const computedStyleSet = computed(() => {
            return {
                ...drawerStyleSet.value,
                ...sizeStyleSet.value,
            };
        });

        const hasHeader = computed(() => !!slots['header']);
        const hasFooter = computed(() => !!slots['footer']);

        const isOpen = ref(modelValue.value);

        const navOn = inject('navOn');
        const layoutAttrs: LayoutAttrs | undefined = inject('layoutAttrs');

        watch(modelValue, (val) => {
            isOpen.value = val;
        });

        watch(isOpen, (val) => {
            if (dimmed.value) {
                if (val && !hasContainer.value) {
                    if (document.body.scrollHeight > window.innerHeight) {
                        document.body.style.overflow = 'hidden';
                        document.body.style.paddingRight = '0.4rem';
                    }

                    if (document.body.scrollWidth > window.innerWidth) {
                        document.body.style.overflow = 'hidden';
                        document.body.style.paddingBottom = '0.4rem';
                    }
                } else {
                    document.body.style.overflow = '';
                    document.body.style.paddingRight = '';
                    document.body.style.paddingBottom = '';
                }
            }

            emit('update:modelValue', val);
        });

        watchEffect(() => {
            if (!layout.value) {
                return;
            }
            if (typeof navOn === 'object' && navOn !== null && 'value' in navOn) {
                navOn.value = isOpen.value;
            }
        });

        watch(
            computedStyleSet,
            () => {
                if (!layout.value || !layoutAttrs) {
                    return;
                }
                layoutAttrs.drawer = {
                    placement: placement.value,
                    size: size.value,
                };
            },
            { immediate: true, deep: true },
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
            hasHeader,
            hasFooter,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsDrawer.scss" />
