<template>
    <vs-wrapper :width="width" :grid="grid">
        <div :class="['vs-tabs', `vs-${computedColorScheme}`, { dense }]" :style="computedStyleSet">
            <ul role="tablist">
                <li
                    v-for="(tab, index) in tabs"
                    ref="tabRefs"
                    :key="tab"
                    :class="['tab', { primary: isSelected(index), disabled: isDisabled(index) }]"
                    role="tab"
                    :aria-selected="isSelected(index)"
                    :aria-disabled="isDisabled(index)"
                    :tabindex="isSelected(index) ? 0 : -1"
                    @click.stop="selectTab(index)"
                    @keydown.stop="handleKeydown"
                >
                    <slot :name="tab" :index="index">
                        {{ tab }}
                    </slot>
                </li>
            </ul>
        </div>
    </vs-wrapper>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, watch, type Ref, type PropType } from 'vue';
import { useColorScheme, useStyleSet, getResponsiveProps } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { objectUtil } from '@/utils/object';
import { logUtil } from '@/utils/log';
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';

import type { VsTabsStyleSet } from './types';

const name = VsComponent.VsTabs;
export default defineComponent({
    name,
    components: { VsWrapper },
    props: {
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsTabsStyleSet> },
        dense: { type: Boolean, default: false },
        disabled: { type: Array as PropType<number[]>, default: () => [] },
        tabs: {
            type: Array as PropType<string[]>,
            required: true,
            validator: (prop: string[]) => {
                const isValid = objectUtil.isUniq(prop);
                if (!isValid) {
                    logUtil.logPropError(name, 'tabs', 'tabs with duplicate items are not allowed');
                }
                return isValid;
            },
        },
        // v-model
        modelValue: { type: Number, default: 0 },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const { colorScheme, styleSet, disabled, tabs, modelValue } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsTabsStyleSet>(name, styleSet);

        const tabRefs: Ref<HTMLElement[]> = ref([]);

        function isSelected(index: number) {
            return selectedIdx.value === index;
        }

        function isDisabled(index: number) {
            return disabled.value?.includes(index);
        }

        const selectedIdx = ref(modelValue.value);

        function selectTab(index: number) {
            if (index < 0 || index > tabs.value.length - 1) {
                selectedIdx.value = 0;
                return;
            }
            if (isDisabled(index)) {
                return;
            }
            selectedIdx.value = index;
        }

        watch(tabs, () => {
            selectTab(modelValue.value);
        });

        watch(selectedIdx, (index: number) => {
            tabRefs.value[index]?.focus();
            if (index !== modelValue.value) {
                emit('update:modelValue', index);
                emit('change', index);
            }
        });

        watch(
            modelValue,
            (index: number) => {
                selectTab(index);
            },
            { immediate: true },
        );

        function findNextActivedIndex(startIndex: number): number {
            const length = tabs.value.length;
            for (let i = startIndex; i < length + startIndex; i++) {
                const index = i % length;
                if (!isDisabled(index)) {
                    return index;
                }
            }
            return startIndex;
        }

        function findPreviousActivedIndex(startIndex: number): number {
            const length = tabs.value.length;
            for (let i = startIndex; i > startIndex - length; i--) {
                const index = (i + length) % length;
                if (!isDisabled(index)) {
                    return index;
                }
            }
            return startIndex;
        }

        function handleKeydown(event: KeyboardEvent) {
            const length = tabs.value.length;
            let targetIndex = selectedIdx.value;

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
            selectTab(targetIndex);
        }

        return {
            computedColorScheme,
            computedStyleSet,
            isSelected,
            isDisabled,
            selectedIdx,
            selectTab,
            tabRefs,
            handleKeydown,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsTabs.scss" />
