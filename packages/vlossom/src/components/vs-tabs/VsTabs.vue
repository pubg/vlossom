<template>
    <vs-responsive :width="width" :grid="grid">
        <div :class="['vs-tabs', colorSchemeClass, { 'vs-dense': dense }]" :style="computedStyleSet">
            <vs-button
                v-if="showScrollButtons"
                class="vs-scroll-button vs-scroll-left-button"
                aria-label="scroll to the left"
                :disabled="currentFocusedTab <= 0"
                @click.stop="scrollLeft"
                dense
            >
                <vs-icon icon="goPrev" size="1.6rem" />
            </vs-button>
            <div class="vs-tabs-wrap" ref="tabsWrapRef">
                <ul role="tablist" :class="['vs-tab-list', { 'vs-bottom-line': bottomLine }]">
                    <li
                        v-for="(tab, index) in tabs"
                        ref="tabRefs"
                        :key="tab"
                        :class="['vs-tab-item', { 'vs-selected': isSelected(index), 'vs-disabled': isDisabled(index) }]"
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
            <vs-button
                v-if="showScrollButtons"
                class="vs-scroll-button vs-scroll-right-button"
                aria-label="scroll to the right"
                :colorScheme="colorScheme"
                :disabled="currentFocusedTab >= tabs.length - 1"
                @click.stop="scrollRight"
                dense
            >
                <vs-icon icon="goNext" size="1.6rem" />
            </vs-button>
        </div>
    </vs-responsive>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, ref, watch, onMounted, onUnmounted, type Ref, type PropType } from 'vue';
import { useColorScheme, useStyleSet, getResponsiveProps } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { utils } from '@/utils';
import VsResponsive from '@/components/vs-responsive/VsResponsive.vue';
import VsButton from '@/components/vs-button/VsButton.vue';
import { VsIcon } from '@/icons';

import type { VsTabsStyleSet, ScrollButton } from './types';

const name = VsComponent.VsTabs;
export default defineComponent({
    name,
    components: { VsButton, VsIcon, VsResponsive },
    props: {
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsTabsStyleSet> },
        bottomLine: { type: Boolean, default: true },
        dense: { type: Boolean, default: false },
        disabled: { type: Array as PropType<number[]>, default: () => [] },
        scrollButtons: {
            type: String as PropType<ScrollButton>,
            default: 'hide',
        },
        tabs: {
            type: Array as PropType<string[]>,
            required: true,
            validator: (prop: string[]) => {
                const isValid = utils.object.isUniq(prop);
                if (!isValid) {
                    utils.log.propError(name, 'tabs', 'tabs with duplicate items are not allowed');
                }
                return isValid;
            },
        },
        // v-model
        modelValue: { type: Number, default: 0 },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const { colorScheme, styleSet, disabled, scrollButtons, tabs, modelValue } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsTabsStyleSet>(name, styleSet);

        const totalLength = computed(() => tabs.value.length);
        const tabsWrapRef: Ref<HTMLElement | null> = ref(null);
        const tabRefs: Ref<HTMLElement[]> = ref([]);
        const selectedIdx = ref(modelValue.value);
        const currentFocusedTab = ref(selectedIdx.value);
        const scrollCount = ref(0);

        function isSelected(index: number) {
            return selectedIdx.value === index;
        }

        function isDisabled(index: number) {
            return disabled.value?.includes(index);
        }

        function selectTab(index: number) {
            if (index < 0 || index > totalLength.value - 1) {
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
            scrollTo(index);

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
            for (let i = startIndex; i < totalLength.value + startIndex; i++) {
                const index = i % totalLength.value;
                if (!isDisabled(index)) {
                    return index;
                }
            }
            return startIndex;
        }

        function findPreviousActivedIndex(startIndex: number): number {
            for (let i = startIndex; i > startIndex - totalLength.value; i--) {
                const index = (i + totalLength.value) % totalLength.value;
                if (!isDisabled(index)) {
                    return index;
                }
            }
            return startIndex;
        }

        function handleKeydown(event: KeyboardEvent) {
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
                    targetIndex = findPreviousActivedIndex(totalLength.value - 1);
                    break;
                default:
                    return;
            }

            event.preventDefault();
            selectTab(targetIndex);
        }

        function calculateScrollCount(): void {
            const tabsWrapWidth = tabsWrapRef.value?.clientWidth;
            if (!tabsWrapWidth) {
                scrollCount.value = 0;
                return;
            }

            let visibleTabsCount = 0;
            let accumulatedWidth = 0;

            tabRefs.value.some((tabRef) => {
                if (accumulatedWidth < tabsWrapWidth - tabRef.offsetWidth) {
                    accumulatedWidth += tabRef.offsetWidth;
                    visibleTabsCount++;
                    return false;
                }
                return true;
            });

            scrollCount.value = visibleTabsCount;
        }

        const showScrollButtons = computed(() => {
            if (scrollButtons.value === 'auto') {
                return !utils.dom.hasTouchScreen() && scrollCount.value < totalLength.value;
            }

            return scrollButtons.value === 'show';
        });

        function scrollTo(index: number) {
            let targetIndex = index;

            if (index < 0) {
                targetIndex = 0;
            }

            if (index > totalLength.value - 1) {
                targetIndex = totalLength.value - 1;
            }

            tabRefs.value[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
            currentFocusedTab.value = targetIndex;
        }

        function scrollLeft() {
            const targetIndex = Math.max(0, currentFocusedTab.value - scrollCount.value);
            scrollTo(targetIndex);
        }

        function scrollRight() {
            const targetIndex = Math.min(totalLength.value - 1, currentFocusedTab.value + scrollCount.value);
            scrollTo(targetIndex);
        }

        onMounted(() => {
            calculateScrollCount();
            window.addEventListener('resize', calculateScrollCount);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', calculateScrollCount);
        });

        return {
            colorSchemeClass,
            computedStyleSet,
            isSelected,
            isDisabled,
            selectedIdx,
            selectTab,
            tabsWrapRef,
            tabRefs,
            handleKeydown,
            showScrollButtons,
            currentFocusedTab,
            scrollLeft,
            scrollRight,
            scrollCount,
        };
    },
});
</script>

<style lang="scss" src="./VsTabs.scss" />
