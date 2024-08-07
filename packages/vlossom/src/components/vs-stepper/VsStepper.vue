<template>
    <vs-responsive :width="width" :grid="grid">
        <div :class="['vs-stepper', colorSchemeClass]" :style="{ ...computedStyleSet, ...fixedWidth }">
            <div class="vs-item-line">
                <div class="vs-progress-line" :style="progressWidth" />
            </div>
            <ul role="tablist" class="vs-steps">
                <li
                    v-for="(item, index) in steps"
                    ref="stepRefs"
                    class="vs-step"
                    :key="item"
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
                    @click.stop="selectStep(index)"
                    @keydown.stop="handleKeydown"
                >
                    <div class="vs-item-step">
                        <slot :name="`${item}-step`" :item="item" :index="index"> {{ index + 1 }} </slot>
                    </div>
                    <div class="vs-item-name">
                        <slot :name="`${item}-name`" :item="item" :index="index"> {{ item }} </slot>
                    </div>
                </li>
            </ul>
        </div>
    </vs-responsive>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, ref, watch, type Ref, type PropType } from 'vue';
import { useColorScheme, useStyleSet, getResponsiveProps } from '@/composables';
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
        disabled: { type: Array as PropType<number[]>, default: () => [] },
        gap: { type: [String, Number], default: '' },
        steps: {
            type: Array as PropType<string[]>,
            required: true,
            validator: (prop: string[]) => {
                const isValid = utils.object.isUniq(prop);
                if (!isValid) {
                    utils.log.propError(name, 'steps', 'steps with duplicate items are not allowed');
                }
                return isValid;
            },
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
            return index < selected.value;
        }

        function isSelected(index: number) {
            return selected.value === index;
        }

        function selectStep(index: number) {
            if (index < 0 || index > gapCount.value) {
                selected.value = 0;
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
            stepRefs.value[index]?.focus();
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

        function findNextActivedIndex(startIndex: number): number {
            let length = steps.value.length;
            for (let i = startIndex; i < length + startIndex; i++) {
                const index = i % length;
                if (!isDisabled(index)) {
                    return index;
                }
            }
            return startIndex;
        }

        function findPreviousActivedIndex(startIndex: number): number {
            let length = steps.value.length;
            for (let i = startIndex; i > startIndex - length; i--) {
                const index = (i + length) % length;
                if (!isDisabled(index)) {
                    return index;
                }
            }
            return startIndex;
        }

        function handleKeydown(event: KeyboardEvent) {
            const length = steps.value.length;
            let targetIndex = selected.value;

            switch (event.code) {
                case 'ArrowLeft':
                    targetIndex = findPreviousActivedIndex(targetIndex - 1);
                    break;
                case 'ArrowRight':
                    targetIndex = findNextActivedIndex(targetIndex + 1);
                    break;
                case 'Home':
                    targetIndex = findNextActivedIndex(0);
                    break;
                case 'End':
                    targetIndex = findPreviousActivedIndex(length - 1);
                    break;
                default:
                    return;
            }

            event.preventDefault();
            selectStep(targetIndex);
        }

        return {
            colorSchemeClass,
            computedStyleSet,
            progressWidth,
            fixedWidth,
            selected,
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
