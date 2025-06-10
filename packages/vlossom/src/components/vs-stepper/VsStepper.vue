<template>
    <vs-responsive :width="width" :grid="grid">
        <div :class="['vs-stepper', colorSchemeClass]" :style="{ ...computedStyleSet, ...fixedWidth }">
            <div class="vs-step-line">
                <div class="vs-step-progress" :style="progressWidth" />
            </div>
            <ul role="tablist" :class="['vs-steps', { 'vs-stepper-no-label': noLabel }]">
                <li
                    v-for="(step, index) in steps"
                    ref="stepRefs"
                    class="vs-step-item"
                    :key="step"
                    :class="[
                        {
                            'vs-previous': isPrevious(index),
                            'vs-disabled': isDisabled(index),
                            'vs-selected': isSelected(index),
                        },
                    ]"
                    role="tab"
                    :aria-selected="isSelected(index)"
                    :aria-disabled="isDisabled(index)"
                    :tabindex="isSelected(index) ? 0 : -1"
                    @click.prevent.stop="selectStep(index)"
                    @keydown.stop="handleKeydown"
                >
                    <div class="vs-step-num">
                        <slot :name="`step-${step}`" :step="step" :index="index">{{ index + 1 }}</slot>
                    </div>
                    <div class="vs-step-label" v-if="!noLabel">
                        <slot :name="`label-${step}`" :step="step" :index="index">{{ step }}</slot>
                    </div>
                </li>
            </ul>
        </div>
    </vs-responsive>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, ref, watch, type Ref, type PropType } from 'vue';
import { useColorScheme, useStyleSet, useIndexSelector } from '@/composables';
import { getResponsiveProps } from '@/models';
import { VsComponent, ColorScheme } from '@/declaration';
import { utils } from '@/utils';
import VsResponsive from '@/components/vs-responsive/VsResponsive.vue';

import type { VsStepperStyleSet } from './types';

const name = VsComponent.VsStepper;
export default defineComponent({
    name,
    components: { VsResponsive },
    props: {
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsStepperStyleSet> },
        disabled: {
            type: Array as PropType<number[]>,
            default: () => [],
            validator: (value: number[], props: any) => {
                const stepsLength = props.steps.length;
                const isValid = value.every((i) => i >= 0 && i < stepsLength);
                if (!isValid) {
                    utils.log.propWarning(name, 'disabled', 'Disabled index is out of range.');
                }
                return isValid;
            },
        },
        gap: { type: [String, Number], default: '' },
        noLabel: { type: Boolean, default: false },
        steps: {
            type: Array as PropType<string[]>,
            required: true,
        },
        // v-model
        modelValue: { type: Number, default: 0 },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const { colorScheme, styleSet, disabled, gap, steps, modelValue } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsStepperStyleSet>(name, styleSet);

        const stepRefs: Ref<HTMLElement[]> = ref([]);

        const {
            selectedIndex,
            isSelected,
            isDisabled,
            isPrevious,
            findNextActivedIndex,
            getInitialIndex,
            selectIndex: selectStep,
            handleKeydown,
        } = useIndexSelector(steps, disabled);

        selectStep(getInitialIndex(modelValue.value));

        const gapCount = computed(() => steps.value.length - 1);

        function parseUnit(str: string | number): { value: number; unit: string } {
            const numValue = Number(str);

            if (typeof str === 'number' || !isNaN(numValue)) {
                return {
                    value: numValue,
                    unit: 'px',
                };
            }

            const match = str.match(/(\d+)(\w+|%)/);

            if (match) {
                return {
                    value: Number(match[1]),
                    unit: match[2],
                };
            }
            return {
                value: 0,
                unit: '',
            };
        }

        const fixedWidth = computed(() => {
            if (!gap.value) {
                return { width: 'auto' };
            }

            const { value, unit } = parseUnit(gap.value);
            return {
                width: `${gapCount.value * value}${unit}`,
            };
        });

        const progressWidth = computed(() => {
            if (selectedIndex.value === -1) {
                return { width: '0%' };
            }

            return {
                width: (selectedIndex.value / gapCount.value) * 100 + '%',
            };
        });

        watch(steps, () => {
            selectStep(findNextActivedIndex(0));
        });

        watch(selectedIndex, (index: number) => {
            stepRefs.value[index]?.focus();
            emit('update:modelValue', index);
            emit('change', index);
        });

        watch(modelValue, selectStep);

        return {
            colorSchemeClass,
            computedStyleSet,
            progressWidth,
            fixedWidth,
            selectedIndex,
            selectStep,
            isPrevious,
            isSelected,
            isDisabled,
            stepRefs,
            handleKeydown,
        };
    },
});
</script>

<style lang="scss" src="./VsStepper.scss" />
