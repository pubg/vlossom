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
    type PropType,
    type Ref,
    type ComputedRef,
} from 'vue';
import { useColorScheme, useLayout, useStyleSet, useOverlay } from '@/composables';
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
    VS_OVERLAY_OPEN,
    VS_OVERLAY_CLOSE,
    type SizeProp,
    Focusable,
} from '@/declaration';
import { utils } from '@/utils';
import { getOverlayProps } from '@/models';
import VsFocusTrap from '@/components/vs-focus-trap/VsFocusTrap.vue';

import type { VsDrawerStyleSet } from './types';

const name = VsComponent.VsDrawer;
export default defineComponent({
    name,
    components: { VsFocusTrap },
    props: {
        ...getOverlayProps<VsDrawerStyleSet>(),
        dimmed: { type: Boolean, default: false },
        escClose: { type: Boolean, default: false },
        fixed: { type: Boolean, default: false },
        open: { type: Boolean, default: false },
        placement: {
            type: String as PropType<Exclude<Placement, 'middle'>>,
            default: 'left',
            validator: (val: Placement) => utils.props.checkPropExist<Placement>(name, 'placement', PLACEMENTS, val),
        },
        size: { type: [String, Number] as PropType<SizeProp>, default: 'sm' },
        useLayoutPadding: { type: Boolean, default: true },
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue', 'open', 'close'],
    setup(props, { emit }) {
        const {
            colorScheme,
            styleSet,
            modelValue,
            id,
            callbacks,
            dimClose,
            dimmed,
            fixed,
            open,
            placement,
            size,
            useLayoutPadding,
            escClose,
        } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet: drawerStyleSet } = useStyleSet<VsDrawerStyleSet>(name, styleSet);

        const focusTrapRef: Ref<Focusable | null> = ref(null);

        const positionStyle = computed(() => {
            const position = fixed.value ? 'fixed' : 'absolute';
            const style: { [key: string]: string | number } = { position };

            if (position === 'absolute') {
                style['--vs-drawer-zIndex'] = LAYOUT_Z_INDEX - 5;
            } else if (position === 'fixed') {
                style['--vs-drawer-zIndex'] = APP_LAYOUT_Z_INDEX - 5;
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

        const initialOpen = open.value || modelValue.value;
        const needScrollLock = computed(() => dimmed.value && fixed.value);
        const computedCallbacks = computed(() => {
            return {
                ...callbacks.value,
                [VS_OVERLAY_OPEN]: () => {
                    focusTrapRef.value?.focus();
                },
                [VS_OVERLAY_CLOSE]: () => {
                    focusTrapRef.value?.blur();
                },
            };
        });
        const { isOpen, close } = useOverlay(id, initialOpen, needScrollLock, computedCallbacks, escClose);

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
                close();
            }
        }

        watch(modelValue, (o) => {
            isOpen.value = o;
        });

        watch(isOpen, (o) => {
            emit('update:modelValue', o);
            emit(o ? 'open' : 'close');
        });

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
