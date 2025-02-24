<template>
    <div :class="['vs-tooltip', colorSchemeClass]">
        <div
            ref="triggerRef"
            class="vs-tooltip-trigger"
            @mouseenter.stop="onTriggerEnter"
            @mouseleave.stop="onTriggerLeave"
            @click.stop="onTriggerClick"
            @focusin.stop="onTriggerEnter"
            @focusout.stop="onTriggerLeave"
            @keydown.esc.stop="onTriggerLeave"
            tabindex="0"
        >
            <slot />
        </div>

        <Teleport :to="`#${VS_OVERLAY_ID}`" v-if="computedShow || isVisible">
            <div
                ref="tooltipRef"
                :class="['vs-tooltip-wrap', colorSchemeClass, `vs-placement-${computedPlacement}`, `vs-align-${align}`]"
                @mouseenter.stop="onTooltipEnter"
                @mouseleave.stop="onTooltipLeave"
            >
                <div v-if="isVisible" class="vs-tooltip-contents" :style="computedStyleSet" :class="animationClass">
                    <slot name="tooltip" />
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    toRefs,
    ref,
    computed,
    watch,
    nextTick,
    onBeforeUnmount,
    type PropType,
    type Ref,
    onBeforeMount,
} from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import {
    VsComponent,
    VS_OVERLAY_ID,
    type ColorScheme,
    type Placement,
    type Align,
    PLACEMENTS,
    ALIGNS,
} from '@/declaration';
import { usePositioning, useOverlayDom } from '@/composables';
import { utils } from '@/utils';

import type { VsTooltipStyleSet } from './types';

const name = VsComponent.VsTooltip;
export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsTooltipStyleSet> },
        align: {
            type: String as PropType<Align>,
            default: 'center',
            validator: (val: Align) => utils.props.checkPropExist<Align>(name, 'align', ALIGNS, val),
        },
        clickable: { type: Boolean, default: false },
        contentsHover: { type: Boolean, default: false },
        disableAnimation: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        enterDelay: { type: Number, default: 100 },
        leaveDelay: { type: Number, default: 100 },
        margin: { type: Number, default: 5 },
        placement: {
            type: String as PropType<Exclude<Placement, 'middle'>>,
            default: 'top',
            validator: (val: Placement) => utils.props.checkPropExist<Placement>(name, 'placement', PLACEMENTS, val),
        },
    },
    setup(props) {
        const {
            colorScheme,
            styleSet,
            align,
            placement,
            clickable,
            contentsHover,
            disabled,
            disableAnimation,
            enterDelay,
            leaveDelay,
            margin,
        } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsTooltipStyleSet>(name, styleSet);

        const triggerRef: Ref<HTMLElement | null> = ref(null);
        const tooltipRef: Ref<HTMLElement | null> = ref(null);

        const { appendOverlayDom } = useOverlayDom();

        const { isVisible, computedPlacement, appear, disappear } = usePositioning(
            triggerRef as Ref<HTMLElement>,
            tooltipRef as Ref<HTMLElement>,
        );

        const triggerOver = ref(false);
        const tooltipOver = ref(false);
        let timer: any = null;

        const computedShow = computed(() => !disabled.value && (triggerOver.value || tooltipOver.value));

        watch(computedShow, (show) => {
            if (show) {
                nextTick(() => {
                    appear({
                        placement: placement.value,
                        align: align.value,
                        margin: margin.value,
                    });
                });
            } else if (isVisible.value) {
                setTimeout(
                    () => {
                        disappear();
                    },
                    disableAnimation.value ? 0 : 200, // for waiting animation end
                );
            }
        });

        const animationClass = computed(() => {
            if (disableAnimation.value) {
                return null;
            }
            const direction = computedShow.value ? 'in' : 'out';
            switch (computedPlacement.value) {
                case 'top':
                    return `fade-${direction}-bottom`;
                case 'right':
                    return `fade-${direction}-left`;
                case 'bottom':
                    return `fade-${direction}-top`;
                case 'left':
                    return `fade-${direction}-right`;
                default:
                    return null;
            }
        });

        function clearTimer() {
            clearTimeout(timer);
            timer = null;
        }

        function onTriggerEnter() {
            if (clickable.value) {
                return;
            }

            if (timer) {
                clearTimer();
            }

            timer = setTimeout(() => {
                triggerOver.value = true;
            }, enterDelay.value);
        }

        function onTriggerLeave() {
            if (timer) {
                clearTimer();
            }

            timer = setTimeout(() => {
                triggerOver.value = false;
            }, leaveDelay.value);
        }

        function onTriggerClick() {
            if (!clickable.value) {
                return;
            }

            if (isVisible.value) {
                triggerOver.value = false;
            } else {
                triggerOver.value = true;
            }
        }

        function onTooltipEnter() {
            if (!contentsHover.value) {
                return;
            }
            tooltipOver.value = true;
        }

        function onTooltipLeave() {
            if (!contentsHover.value) {
                return;
            }
            setTimeout(() => {
                tooltipOver.value = false;
            }, leaveDelay.value);
        }

        onBeforeMount(() => {
            appendOverlayDom(document.body, VS_OVERLAY_ID, { zIndex: 10000 });
        });

        onBeforeUnmount(() => {
            disappear();

            if (timer) {
                clearTimer();
            }
        });

        return {
            colorSchemeClass,
            computedStyleSet,
            animationClass,
            triggerRef,
            tooltipRef,
            isVisible,
            computedShow,
            computedPlacement,
            onTriggerEnter,
            onTriggerLeave,
            onTriggerClick,
            onTooltipEnter,
            onTooltipLeave,
            VS_OVERLAY_ID,
        };
    },
});
</script>

<style lang="scss" src="./VsTooltip.scss" />
