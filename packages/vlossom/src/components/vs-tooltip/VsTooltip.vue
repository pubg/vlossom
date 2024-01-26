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
                :class="['tooltip', `vs-${computedColorScheme}`, `position-${attachedPosition}`, `align-${align}`]"
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
import { PropType, defineComponent, toRefs, ref, computed, Ref, watch, nextTick } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { VsComponent, type ColorScheme, Align, Position } from '@/declaration';
import useDomAttach from '@/composables/dom-attach-composable';

import type { VsTooltipStyleSet } from './types';

const name = VsComponent.VsTooltip;

export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsTooltipStyleSet>, default: '' },
        align: { type: String as PropType<Align>, default: 'center' },
        clickable: { type: Boolean, default: false },
        contentsHover: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        disableAnimation: { type: Boolean, default: false },
        enterDelay: { type: Number, default: 100 },
        leaveDelay: { type: Number, default: 100 },
        position: { type: String as PropType<Position>, default: 'top' },
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
            position,
        } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { customProperties } = useCustomStyle<VsTooltipStyleSet>(name, styleSet);

        const triggerOver = ref(false);
        const tooltipOver = ref(false);
        const triggerRef: Ref<HTMLElement | null> = ref(null);
        const tooltipRef: Ref<HTMLElement | null> = ref(null);

        let timeout: any = null;

        const { isAttached, attachedPosition, attach, detach } = useDomAttach(
            triggerRef as Ref<HTMLElement>,
            tooltipRef as Ref<HTMLElement>,
            true,
        );

        const computedShow = computed(() => triggerOver.value || tooltipOver.value);

        const animationClass = computed(() => {
            if (disableAnimation.value) {
                return null;
            }
            const direction = computedShow.value ? 'in' : 'out';
            let animationStart = '';
            switch (position.value) {
                case 'top':
                    animationStart = 'bottom';
                    break;
                case 'right':
                    animationStart = 'left';
                    break;
                case 'bottom':
                    animationStart = 'top';
                    break;
                case 'left':
                    animationStart = 'right';
                    break;
                default:
                    break;
            }
            const enterAnimation = `fade-${direction}-${animationStart}`;
            return [enterAnimation];
        });

        function onTriggerEnter() {
            if (clickable.value) {
                return;
            }

            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            timeout = setTimeout(() => {
                triggerOver.value = true;
            }, enterDelay.value);
        }

        function onTriggerLeave() {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            timeout = setTimeout(() => {
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

        function appendTooltip() {
            if (disabled.value) {
                return;
            }

            nextTick(() => {
                attach({
                    position: position.value,
                    align: align.value,
                });
            });
        }

        function removeTooltip() {
            if (disabled.value) {
                return;
            }

            detach();
        }

        watch(computedShow, (show) => {
            if (show) {
                appendTooltip();
            } else {
                // for waiting animation end
                setTimeout(() => {
                    if (computedShow.value === false) {
                        removeTooltip();
                    }
                }, 200);
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
            attachedPosition,
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
