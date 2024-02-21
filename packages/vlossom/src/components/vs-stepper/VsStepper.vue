<template>
    <vs-wrapper :width="width" :grid="grid">
        <div :class="['vs-stepper', `vs-${computedColorScheme}`]" :style="{ ...computedStyleSet, ...fixedWidth }">
            <div class="item-line">
                <div class="progress-line" :style="progressWidth" />
            </div>
            <ul role="tablist">
                <li
                    v-for="(item, index) in steps"
                    :key="item"
                    :class="[
                        {
                            previous: isPrevious(index),
                            disabled: isDisabled(index),
                            selected: isSelected(index),
                        },
                    ]"
                    role="tab"
                    :aria-selected="isSelected(index)"
                    :aria-disabled="isDisabled(index)"
                    :tabindex="isSelected(index) ? 0 : -1"
                    @click.stop="selectStep(index)"
                >
                    <div class="item-step">
                        <slot :name="`${item}-step`" :index="index"> {{ index + 1 }} </slot>
                    </div>
                    <div class="item-name">
                        <slot :name="`${item}-name`" :index="index"> {{ item }} </slot>
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

import type { VsStepperStyleSet } from './types';

const name = VsComponent.VsStepper;
export default defineComponent({
    name,
    props: {
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsStepperStyleSet>, default: '' },
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
        const { colorScheme, styleSet, disabled, gap, steps, modelValue } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);
        const { computedStyleSet } = useStyleSet<VsStepperStyleSet>(name, styleSet);

        const selected = ref(modelValue.value);

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
            return {
                width: (selected.value / gapCount.value) * 100 + '%',
            };
        });

        function isDisabled(index: number) {
            return disabled.value.includes(index);
        }

        function isPrevious(index: number) {
            if (isDisabled(index)) {
                return false;
            }
            return index < selected.value;
        }

        function isSelected(index: number) {
            return selected.value === index;
        }

        function selectStep(index: number) {
            if (index < 0 || index > gapCount.value) {
                return;
            }

            if (isDisabled(index)) {
                return;
            }

            selected.value = index;
        }

        watch(steps, () => {
            selectStep(modelValue.value);
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

        return {
            computedColorScheme,
            computedStyleSet,
            progressWidth,
            fixedWidth,
            selected,
            selectStep,
            isPrevious,
            isSelected,
            isDisabled,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsStepper.scss" />
