<template>
    <Transition name="drawer" :duration="DIALOG_DURATION">
        <div v-show="isOpen" :class="['vs-drawer', `vs-${computedColorScheme}`, { dimmed }]" :style="computedStyleSet">
            <div v-if="dimmed" class="vs-drawer-dimmed" aria-hidden="true" @click.stop="onClickDimmed" />
            <vs-focus-trap :focus-lock="focusLock" :initial-focus-ref="initialFocusRef" ref="focusTrapRef">
                <div :class="['vs-drawer-wrap', placement, hasSpecifiedSize ? '' : size]">
                    <div class="vs-drawer-header" v-if="$slots['header']">
                        <slot name="header" />
                    </div>
                    <div :class="['vs-drawer-body', { 'hide-scroll': hideScroll }]">
                        <slot />
                    </div>
                    <div class="vs-drawer-footer" v-if="$slots['footer']">
                        <slot name="footer" />
                    </div>
                </div>
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
    computed,
    getCurrentInstance,
    ComputedRef,
    nextTick,
    type PropType,
} from 'vue';
import { useColorScheme, useDialogEsc, useLayout, useBodyScroll, useStyleSet } from '@/composables';
import {
    VsComponent,
    Placement,
    Size,
    SIZES,
    PLACEMENTS,
    LAYOUT_Z_INDEX,
    APP_LAYOUT_Z_INDEX,
    VS_LAYOUT,
    DRAWER_SIZE,
    DIALOG_DURATION,
    type ColorScheme,
    type CssPosition,
    type SizeProp,
} from '@/declaration';
import { utils } from '@/utils';
import VsFocusTrap from '@/components/vs-focus-trap/VsFocusTrap.vue';

import type { VsDrawerStyleSet } from './types';

const name = VsComponent.VsDrawer;

export default defineComponent({
    name,
    components: { VsFocusTrap },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsDrawerStyleSet> },
        closeOnDimmedClick: { type: Boolean, default: true },
        closeOnEsc: { type: Boolean, default: true },
        dimmed: { type: Boolean, default: false },
        focusLock: { type: Boolean, default: true },
        hideScroll: { type: Boolean, default: false },
        initialFocusRef: {
            type: [Object, undefined] as PropType<HTMLElement | null>,
            default: null,
        },
        open: { type: Boolean, default: false },
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
        const {
            colorScheme,
            styleSet,
            modelValue,
            closeOnDimmedClick,
            closeOnEsc,
            dimmed,
            open,
            placement,
            position,
            size,
        } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet: drawerStyleSet } = useStyleSet<VsDrawerStyleSet>(name, styleSet);

        const id = utils.string.createID();
        const isOpen = ref(open.value || modelValue.value);
        const focusTrapRef = ref(null);

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
                style['--vs-drawer-size'] = convertedSize;
            } else {
                style['--vs-drawer-size'] = DRAWER_SIZE[size.value as Size];
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

        watch(modelValue, (val) => {
            isOpen.value = val;
        });

        const bodyScroll = useBodyScroll();
        watch(
            isOpen,
            (val) => {
                const needScrollLock = dimmed.value && position.value === 'fixed';
                if (val) {
                    if (needScrollLock) {
                        bodyScroll.lock();
                    }
                    nextTick(() => {
                        (focusTrapRef.value as any)?.focus();
                    });
                } else {
                    if (needScrollLock) {
                        bodyScroll.unlock();
                    }
                    nextTick(() => {
                        (focusTrapRef.value as any)?.blur();
                    });
                }

                emit('update:modelValue', val);
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
                        size: newSize['--vs-drawer-size'],
                    });
                },
                { immediate: true },
            );
        }

        function onClickDimmed() {
            if (closeOnDimmedClick.value) {
                isOpen.value = false;
            }
        }

        useDialogEsc(id, closeOnEsc, () => {
            isOpen.value = false;
        });

        return {
            computedColorScheme,
            computedStyleSet,
            hasSpecifiedSize,
            isOpen,
            onClickDimmed,
            DIALOG_DURATION,
            focusTrapRef,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsDrawer.scss" />
