<template>
    <div :class="['vs-tabs', `vs-${computedColorScheme}`, { ...classObj }]" :style="computedStyleSet">
        <ul>
            <li v-for="(tab, index) in tabs" :key="tab">
                <div
                    :class="['tab', { primary: selectedIdx === index, disabled: isDisabled(index) }]"
                    @click.stop="selectTab(index)"
                    tabindex="0"
                >
                    <div class="tab-content">
                        <slot :name="tab">
                            {{ tab }}
                        </slot>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs, ref, watch } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { objectUtil } from '@/utils/object';

import type { VsTabsStyleSet } from './types';

const name = VsComponent.VsTabs;
export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsTabsStyleSet>, default: '' },
        dense: { type: Boolean, default: false },
        disabled: { type: Array as PropType<number[]>, default: () => [] },
        mobileFull: { type: Boolean, default: false },
        tabs: {
            type: Array as PropType<string[]>,
            default: () => [],
            validator(prop: string[]) {
                return objectUtil.isUniq(prop);
            },
        },
        // v-model
        modelValue: { type: Number, default: 0 },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const { colorScheme, styleSet, dense, disabled, mobileFull, tabs, modelValue } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);
        const { computedStyleSet } = useStyleSet<VsTabsStyleSet>(name, styleSet);

        const classObj = computed(() => ({
            dense: dense.value,
            'mobile-full': mobileFull.value,
        }));

        function isDisabled(index: number) {
            return disabled.value?.includes(index);
        }

        const selectedIdx = ref(modelValue.value);

        watch(tabs, () => {
            selectedIdx.value = modelValue.value;
        });

        watch(selectedIdx, (index: number) => {
            if (index !== modelValue.value) {
                emit('update:modelValue', index);
            }
        });

        function selectTab(index: number) {
            if (index < 0 || index > tabs.value.length - 1) {
                return;
            }
            if (isDisabled(index)) {
                return;
            }
            selectedIdx.value = index;
        }

        watch(
            modelValue,
            (index: number) => {
                selectTab(index);
            },
            { immediate: true },
        );

        return {
            computedColorScheme,
            computedStyleSet,
            classObj,
            isDisabled,
            selectedIdx,
            selectTab,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsTabs.scss" />
