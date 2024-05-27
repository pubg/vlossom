<template>
    <Transition name="drawer" :duration="300">
        <div
            v-if="isOpen"
            class="vs-drawer"
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
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch, computed, type PropType } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import VsFocusTrap from '@/components/vs-focus-trap/VsFocusTrap.vue';
import { VsDialogNode } from '@/nodes';
import {
    VsComponent,
    Placement,
    Size,
    SIZES,
    PLACEMENTS,
    LAYOUT_Z_INDEX,
    APP_LAYOUT_Z_INDEX,
    type ColorScheme,
    type CssPosition,
} from '@/declaration';
import { utils } from '@/utils';

import type { VsDrawerStyleSet } from './types';

const name = VsComponent.VsDrawer;

export default defineComponent({
    name,
    components: { VsDialogNode, VsFocusTrap },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsDrawerStyleSet> },
        closeOnDimmedClick: { type: Boolean, default: true },
        closeOnEsc: { type: Boolean, default: true },
        dimmed: { type: Boolean, default: false },
        hideScroll: { type: Boolean, default: false },
        initialFocusRef: {
            type: [Object, undefined] as PropType<HTMLElement | null>,
            default: null,
        },
        placement: {
            type: String as PropType<Placement>,
            default: 'left',
            validator: (val: Placement) => utils.props.checkPropExist<Placement>(name, 'placement', PLACEMENTS, val),
        },
        position: { type: String as PropType<CssPosition>, default: 'absolute' },
        size: { type: String as PropType<Size | string>, default: '' },
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    setup(props, { emit, slots }) {
        const { colorScheme, styleSet, modelValue, closeOnDimmedClick, dimmed, placement, position, size } =
            toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet: drawerStyleSet } = useStyleSet<VsDrawerStyleSet>(name, styleSet);

        const hasSpecifiedSize = computed(() => size.value && !SIZES.includes(size.value as Size));

        const positionStyle = computed(() => {
            const style: { [key: string]: string | number } = { position: position.value };

            if (position.value === 'absolute') {
                style['--vs-drawer-zIndex'] = LAYOUT_Z_INDEX;
            } else if (position.value === 'fixed') {
                style['--vs-drawer-zIndex'] = APP_LAYOUT_Z_INDEX;
            }

            return style;
        });

        const sizeStyle = computed(() => {
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
                ...positionStyle.value,
                ...sizeStyle.value,
                ...drawerStyleSet.value,
            };
        });

        const hasHeader = computed(() => !!slots['header']);
        const hasFooter = computed(() => !!slots['footer']);

        const isOpen = ref(modelValue.value);

        watch(modelValue, (val) => {
            isOpen.value = val;
        });

        watch(isOpen, (val) => {
            if (dimmed.value) {
                if (val && position.value === 'fixed') {
                    if (document.body.scrollHeight > window.innerHeight) {
                        document.body.style.overflow = 'hidden';
                        document.body.style.paddingRight = '0.4rem';
                    }

                    if (document.body.scrollWidth > window.innerWidth) {
                        document.body.style.overflow = 'hidden';
                        document.body.style.paddingBottom = '0.4rem';
                    }
                }
            }

            emit('update:modelValue', val);
        });

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
