<template>
    <vs-responsive :width="width" :grid="grid">
        <div :class="['vs-tabs', colorSchemeClass, { 'vs-dense': dense }]" :style="computedStyleSet">
            <vs-button
                v-if="showScrollButtons"
                class="vs-scroll-button vs-scroll-left-button"
                aria-label="scroll to the left"
                :disabled="isLeftEdge"
                @click.stop="goLeft"
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
                :disabled="isRightEdge"
                @click.stop="goRight"
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
import VsResponsive from '@/components/vs-responsive/VsResponsive.vue';
import VsButton from '@/components/vs-button/VsButton.vue';
import { VsIcon } from '@/icons';

import type { VsTabsStyleSet } from './types';

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
        tabButtons: {
            type: String as PropType<'hide' | 'show' | 'auto'>,
            default: 'hide',
        },
        tabs: {
            type: Array as PropType<string[]>,
            required: true,
        },
        // v-model
        modelValue: { type: Number, default: 0 },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const { colorScheme, styleSet, disabled, tabButtons, tabs, modelValue } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsTabsStyleSet>(name, styleSet);

        const tabsWrapRef: Ref<HTMLElement | null> = ref(null);
        const tabRefs: Ref<HTMLElement[]> = ref([]);
        const selectedIndex = ref(modelValue.value);
        const scrollCount = ref(0);

        // select tab on created
        const nextIndex = selectedIndex.value === -1 ? -1 : findNextActivedIndex(selectedIndex.value);
        selectTab(nextIndex);

        function isSelected(index: number): boolean {
            return selectedIndex.value === index;
        }

        function isDisabled(index: number): boolean {
            return disabled.value?.includes(index);
        }

        const isLeftEdge = computed(() => {
            const targetDisabled = disabled.value.filter((i) => i >= 0 && i < selectedIndex.value);
            return targetDisabled.length === selectedIndex.value;
        });

        const isRightEdge = computed(() => {
            const targetDisabled = disabled.value.filter((i) => i > selectedIndex.value);
            return targetDisabled.length === tabs.value.length - selectedIndex.value - 1;
        });

        function selectTab(index: number) {
            const tabsLength = tabs.value.length;
            const isOutOfRange = index < 0 || index > tabsLength - 1;
            const isAllDisabled = disabled.value.length === tabsLength;
            if (isOutOfRange || isAllDisabled || isDisabled(index)) {
                selectedIndex.value = -1;
                return;
            }

            selectedIndex.value = index;
            scrollTo(index);
        }

        function findNextActivedIndex(startIndex: number): number {
            const tabsLength = tabs.value.length;
            for (let i = startIndex; i < tabsLength + startIndex; i++) {
                const index = i % tabsLength;
                if (!isDisabled(index)) {
                    return index;
                }
            }
            return startIndex;
        }

        function findPreviousActivedIndex(startIndex: number): number {
            const tabsLength = tabs.value.length;
            for (let i = startIndex; i > startIndex - tabsLength; i--) {
                const index = (i + tabsLength) % tabsLength;
                if (!isDisabled(index)) {
                    return index;
                }
            }
            return startIndex;
        }

        const showScrollButtons = computed(() => {
            if (tabButtons.value === 'auto') {
                return scrollCount.value < tabs.value.length;
            }

            return tabButtons.value === 'show';
        });

        function scrollTo(index: number) {
            if (!tabRefs.value[index]) {
                return;
            }
            tabRefs.value[index].focus();
            tabRefs.value[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }

        function goLeft() {
            const targetIndex = findPreviousActivedIndex(selectedIndex.value - 1);
            selectTab(targetIndex);
        }

        function goRight() {
            const targetIndex = findNextActivedIndex(selectedIndex.value + 1);
            selectTab(targetIndex);
        }

        function handleKeydown(event: KeyboardEvent) {
            let targetIndex = selectedIndex.value;
            switch (event.code) {
                case 'ArrowLeft': {
                    if (isLeftEdge.value) {
                        return;
                    }
                    event.preventDefault();
                    targetIndex = findPreviousActivedIndex(targetIndex - 1);
                    break;
                }
                case 'ArrowRight': {
                    if (isRightEdge.value) {
                        return;
                    }
                    event.preventDefault();
                    targetIndex = findNextActivedIndex(targetIndex + 1);
                    break;
                }
                case 'Home': {
                    event.preventDefault();
                    targetIndex = findNextActivedIndex(0);
                    break;
                }
                case 'End': {
                    event.preventDefault();
                    targetIndex = findPreviousActivedIndex(tabs.value.length - 1);
                    break;
                }
                default:
                    return;
            }

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

        onMounted(() => {
            calculateScrollCount();
            window.addEventListener('resize', calculateScrollCount);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', calculateScrollCount);
        });

        watch(tabs, () => {
            selectTab(findNextActivedIndex(0));
        });

        watch(selectedIndex, (index: number) => {
            emit('update:modelValue', index);
            emit('change', index);
        });

        watch(modelValue, selectTab);

        return {
            colorSchemeClass,
            computedStyleSet,
            isSelected,
            isDisabled,
            selectedIndex,
            selectTab,
            tabsWrapRef,
            tabRefs,
            handleKeydown,
            showScrollButtons,
            goLeft,
            goRight,
            scrollCount,
            isLeftEdge,
            isRightEdge,
        };
    },
});
</script>

<style lang="scss" src="./VsTabs.scss" />
