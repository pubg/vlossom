<template>
    <Transition name="drawer" :duration="CLOSE_DELAY">
        <div
            v-show="isOpen"
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
</template>

<script lang="ts">
import {
    defineComponent,
    inject,
    ref,
    toRefs,
    watch,
    onMounted,
    computed,
    type PropType,
    getCurrentInstance,
    ComputedRef,
} from 'vue';
import { useColorScheme, useLayout, useStyleSet } from '@/composables';
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
    SCROLLBAR_WIDTH,
    VS_LAYOUT,
    type ColorScheme,
    type CssPosition,
} from '@/declaration';
import { utils } from '@/utils';

import type { VsDrawerStyleSet } from './types';

const name = VsComponent.VsDrawer;
const CLOSE_DELAY = 300;

type SizeProp = Size | string | number;

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
        size: { type: [String, Number] as PropType<SizeProp>, default: 'sm' },
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
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
            const style: { [key: string]: string } = {};

            if (hasSpecifiedSize.value) {
                const convertedSize = utils.string.convertToStringSize(size.value);

                if (placement.value === 'top' || placement.value === 'bottom') {
                    style['--vs-drawer-height'] = convertedSize;
                }

                if (placement.value === 'left' || placement.value === 'right') {
                    style['--vs-drawer-width'] = convertedSize;
                }
            } else {
                if (placement.value === 'left' || placement.value === 'right') {
                    style['--vs-drawer-width'] = `var(--vs-drawer-width-${size.value})`;
                }
            }

            return style;
        });

        const computedStyleSet: ComputedRef<{ [key: string]: string }> = computed(() => {
            return {
                ...positionStyle.value,
                ...drawerStyleSet.value,
                ...sizeStyle.value,
            };
        });

        const isOpen = ref(modelValue.value);
        const originalOverflow = ref('');

        onMounted(() => {
            originalOverflow.value = document.body.style.overflow;
        });

        watch(
            modelValue,
            (val) => {
                isOpen.value = val;
            },
            { immediate: true },
        );

        watch(
            isOpen,
            (open) => {
                if (dimmed.value && position.value === 'fixed') {
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

                emit('update:modelValue', open);
            },
            { immediate: true },
        );

        // only for vs-layout children
        const isLayoutChild = getCurrentInstance()?.parent?.type.name === VsComponent.VsLayout;
        if (isLayoutChild) {
            const { getDefaultLayoutProvide } = useLayout();
            const { setDrawerLayout } = inject(VS_LAYOUT, getDefaultLayoutProvide());

            watch(
                [isOpen, placement, sizeStyle],
                ([newDrawerOpen, newPlacement, newSize]) => {
                    setDrawerLayout({
                        drawerOpen: newDrawerOpen,
                        placement: newPlacement,
                        size: newSize['--vs-drawer-width'],
                    });
                },
                { immediate: true },
            );
        }

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

<style lang="scss" scoped src="./VsDrawer.scss" />
