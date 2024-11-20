<template>
    <Transition name="drawer" :duration="MODAL_DURATION">
        <div
            v-show="isOpen"
            :class="['vs-drawer', colorSchemeClass, { 'vs-dimmed': dimmed }]"
            :style="computedStyleSet"
        >
            <div v-if="dimmed" class="vs-drawer-dimmed" aria-hidden="true" @click.stop="onClickDimmed" />
            <vs-focus-trap ref="focusTrapRef" :focus-lock="focusLock" :initial-focus-ref="initialFocusRef">
                <div :class="['vs-drawer-wrap', `vs-${placement}`, hasSpecifiedSize ? '' : size]" :style="layoutStyles">
                    <header v-if="$slots['header']" class="vs-drawer-header">
                        <slot name="header" />
                    </header>
                    <div :class="['vs-drawer-body', { 'vs-hide-scroll': hideScroll }]">
                        <slot />
                    </div>
                    <footer v-if="$slots['footer']" class="vs-drawer-footer">
                        <slot name="footer" />
                    </footer>
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
import { useColorScheme, useLayout, useBodyScroll, useStyleSet } from '@/composables';
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
    MODAL_DURATION,
    type SizeProp,
} from '@/declaration';
import { utils } from '@/utils';
import { VsFocusTrap } from '@/nodes';
import { getModalProps } from '@/models';

import type { VsDrawerStyleSet } from './types';

const name = VsComponent.VsDrawer;
export default defineComponent({
    name,
    components: { VsFocusTrap },
    props: {
        ...getModalProps<VsDrawerStyleSet, PropType<SizeProp>>({ size: 'sm' }),
        dimClose: { type: Boolean, default: true },
        open: { type: Boolean, default: false },
        placement: {
            type: String as PropType<Exclude<Placement, 'middle'>>,
            default: 'left',
            validator: (val: Placement) => utils.props.checkPropExist<Placement>(name, 'placement', PLACEMENTS, val),
        },
        size: { type: [String, Number] as PropType<SizeProp>, default: 'sm' },
        useLayoutPadding: { type: Boolean, default: false },
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const {
            colorScheme,
            styleSet,
            modelValue,
            dimClose,
            escClose,
            dimmed,
            open,
            placement,
            size,
            useLayoutPadding,
        } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet: drawerStyleSet } = useStyleSet<VsDrawerStyleSet>(name, styleSet);

        const isOpen = ref(open.value || modelValue.value);
        const focusTrapRef = ref(null);

        const positionStyle = computed(() => {
            const position = hasContainer.value ? 'absolute' : 'fixed';
            const style: { [key: string]: string | number } = { position };

            if (position === 'absolute') {
                style['--vs-drawer-zIndex'] = LAYOUT_Z_INDEX;
            } else if (position === 'fixed') {
                style['--vs-drawer-zIndex'] = APP_LAYOUT_Z_INDEX;
            }

            return style;
        });

        const hasSpecifiedSize = computed(() => size.value && !SIZES.includes(size.value as Size));
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
                const needScrollLock = dimmed.value && !hasContainer.value;
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
        const { getDefaultLayoutProvide } = useLayout();
        const { header, footer, setDrawerLayout } = inject(VS_LAYOUT, getDefaultLayoutProvide());

        const isLayoutChild = getCurrentInstance()?.parent?.type.name === VsComponent.VsLayout;
        if (isLayoutChild) {
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

        const layoutStyles = computed(() => {
            if (!isLayoutChild || !useLayoutPadding.value) {
                return {};
            }

            const style: { [key: string]: string | number } = {};
            const needPadding = ['absolute', 'fixed'];

            const { position: headerPosition, height: headerHeight } = header.value;
            if (needPadding.includes(headerPosition)) {
                style.paddingTop = headerHeight;
            }

            const { position: footerPosition, height: footerHeight } = footer.value;
            if (needPadding.includes(footerPosition)) {
                style.paddingBottom = footerHeight;
            }

            return style;
        });

        function onClickDimmed() {
            if (dimClose.value) {
                isOpen.value = false;
            }
        }

        return {
            colorSchemeClass,
            computedStyleSet,
            hasSpecifiedSize,
            isOpen,
            onClickDimmed,
            MODAL_DURATION,
            focusTrapRef,
            layoutStyles,
        };
    },
});
</script>

<style lang="scss" src="./VsDrawer.scss" />
