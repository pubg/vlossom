<template>
    <vs-wrapper :width="width" :grid="grid">
        <div :class="['vs-stepper', `vs-${computedColorScheme}`]" :style="{ ...computedStyleSet, ...fixedWidth }">
            <div class="step-line absolute">
                <div class="progress-line" :style="progressWidth" />
            </div>
            <ul role="tablist">
                <li
                    v-for="(label, index) in steps"
                    :key="label"
                    :class="[
                        'step',
                        {
                            completed: isCompleted(index) && !isSelected(index),
                            disabled: !isClickable(index),
                            selected: isSelected(index),
                        },
                    ]"
                    role="tab"
                    :aria-selected="isSelected(index)"
                    :tabindex="isSelected(index) ? 0 : -1"
                    @click.stop="selectStep(index)"
                >
                    <div class="step-value">
                        <vs-icon v-if="isCompleted(index) && !isSelected(index)" icon="check" />
                        <span v-else>{{ index + 1 }}</span>
                    </div>
                    <div class="step-label">
                        <slot :name="label">
                            {{ label }}
                        </slot>
                    </div>
                </li>
            </ul>
        </div>
    </vs-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, ref, watch, type PropType } from 'vue';
import { useColorScheme, useStyleSet, getResponsiveProps } from '@/composables';
import { VsComponent, ColorScheme } from '@/declaration';
import { objectUtil } from '@/utils/object';
import { stringUtil } from '@/utils/string';
import { VsIcon } from '@/icons';

import type { VsStepperStyleSet } from './types';

const name = VsComponent.VsStepper;
export default defineComponent({
    name,
    components: { VsIcon },
    props: {
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsStepperStyleSet>, default: '' },
        completed: { type: Array as PropType<number[]>, default: () => [] },
        disabled: { type: Array as PropType<number[]>, default: () => [] },
        gap: { type: [String, Number], default: '' },
        steps: {
            type: Array as PropType<string[]>,
            required: true,
            validator(prop: string[]) {
                return objectUtil.isUniq(prop);
            },
        },
        // v-model
        modelValue: { type: Number, default: 0 },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const { colorScheme, styleSet, completed, disabled, gap, steps, modelValue } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);
        const { computedStyleSet } = useStyleSet<VsStepperStyleSet>(name, styleSet);

        const selected = ref(modelValue.value);

        const gapCount = computed(() => steps.value.length - 1);
        const fixedWidth = computed(() => {
            if (!gap.value) {
                return { width: 'auto' };
            }

            if (typeof gap.value === 'number') {
                return {
                    width: `${gapCount.value * gap.value}px`,
                };
            }

            const { value, unit } = stringUtil.parseUnit(gap.value);
            return {
                width: `${gapCount.value * value}${unit}`,
            };
        });
        const progressWidth = computed(() => {
            return {
                width: (selected.value / gapCount.value) * 100 + '%',
            };
        });

        watch(steps, () => {
            selected.value = modelValue.value;
        });

        watch(selected, (index: number) => {
            if (index !== modelValue.value) {
                emit('update:modelValue', index);
                emit('change', index);
            }
        });

        watch(
            modelValue,
            (index: number) => {
                selectStep(index);
            },
            { immediate: true },
        );

        function isDisabled(index: number) {
            return disabled.value.includes(index);
        }

        function isSelected(index: number) {
            if (isDisabled(index)) {
                return false;
            }
            return index === selected.value;
        }

        function isCompleted(index: number) {
            if (isDisabled(index)) {
                return false;
            }
            return completed.value.includes(index);
        }

        function isClickable(index: number) {
            if (isDisabled(index)) {
                return false;
            }

            if (index === 0) {
                return true;
            }

            const prevSteps = Array.from({ length: index }, (_, i) => i);
            return prevSteps.every((step) => completed.value.includes(step));
        }

        function selectStep(index: number) {
            if (index < 0 || index > gapCount.value) {
                return;
            }

            if (!isClickable(index)) {
                return;
            }

            selected.value = index;
        }

        return {
            computedColorScheme,
            computedStyleSet,
            progressWidth,
            fixedWidth,
            selected,
            selectStep,
            isSelected,
            isCompleted,
            isDisabled,
            isClickable,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsStepper.scss" />
