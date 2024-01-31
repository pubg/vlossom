<template>
    <div class="vs-tooltip">
        <div
            ref="triggerRef"
            class="tooltip-trigger"
            @mouseenter="onTriggerEnter"
            @mouseleave="onTriggerLeave"
            @click="onTriggerClick"
        >
            <slot />
        </div>

        <teleport to="#vs-overlay" v-if="computedShow || isAttached">
            <div
                ref="tooltipRef"
                :class="['tooltip', `vs-${computedColorScheme}`, `placement-${attachedPlacement}`, `align-${align}`]"
                @mouseenter="onTooltipEnter"
                @mouseleave="onTooltipLeave"
            >
                <div v-if="isAttached" class="tooltip-contents" :style="customProperties" :class="animationClass">
                    <slot name="tooltip" />
                </div>
            </div>
        </teleport>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, computed, watch, nextTick, onBeforeUnmount, type PropType, type Ref } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { VsComponent, type ColorScheme, type Placement, type Align } from '@/declaration';
import { useDomAttach, useOverlay } from '@/composables/dom-attach-composable';

import type { VsTooltipStyleSet } from './types';

const name = VsComponent.VsTooltip;

export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsTooltipStyleSet>, default: '' },
        placement: { type: String as PropType<Placement>, default: 'top' },
        align: { type: String as PropType<Align>, default: 'center' },
        clickable: { type: Boolean, default: false },
        contentsHover: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        disableAnimation: { type: Boolean, default: false },
        enterDelay: { type: Number, default: 100 },
        leaveDelay: { type: Number, default: 100 },
    },
    setup(props) {
        const {
            colorScheme,
            styleSet,
            align,
            clickable,
            contentsHover,
            disabled,
            disableAnimation,
            enterDelay,
            leaveDelay,
            placement,
        } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { customProperties } = useCustomStyle<VsTooltipStyleSet>(name, styleSet);

        const triggerRef: Ref<HTMLElement | null> = ref(null);
        const tooltipRef: Ref<HTMLElement | null> = ref(null);

        useOverlay();

        const { isAttached, attachedPlacement, attach, detach } = useDomAttach(
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
                    attach({
                        placement: placement.value,
                        align: align.value ? align.value : 'center',
                    });
                });
            } else if (isAttached.value) {
                setTimeout(() => {
                    detach();
                }, 200); // for waiting animation end
            }
        });

        const animationClass = computed(() => {
            if (disableAnimation.value) {
                return null;
            }
            const direction = computedShow.value ? 'in' : 'out';
            switch (attachedPlacement.value) {
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

            if (isAttached.value) {
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

        onBeforeUnmount(() => {
            detach();

            if (timer) {
                clearTimer();
            }
        });

        return {
            computedColorScheme,
            customProperties,
            animationClass,
            triggerRef,
            tooltipRef,
            isAttached,
            computedShow,
            attachedPlacement,
            onTriggerEnter,
            onTriggerLeave,
            onTriggerClick,
            onTooltipEnter,
            onTooltipLeave,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsTooltip.scss" />
