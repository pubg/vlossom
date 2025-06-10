<template>
    <vs-responsive :width="width" :grid="grid">
        <div :class="['vs-tabs', colorSchemeClass, { 'vs-dense': dense }]" :style="computedStyleSet">
            <vs-button
                v-if="showScrollButtons"
                class="vs-scroll-button vs-scroll-left-button"
                aria-label="scroll to the left"
                :disabled="isLeftEdge"
                tabindex="-1"
                @click.prevent.stop="goLeft"
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
                        @click.prevent.stop="selectTab(index)"
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
                tabindex="-1"
                @click.prevent.stop="goRight"
                dense
            >
                <vs-icon icon="goNext" size="1.6rem" />
            </vs-button>
        </div>
    </vs-responsive>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, ref, watch, onMounted, onUnmounted, type Ref, type PropType } from 'vue';
import { useColorScheme, useStyleSet, useIndexSelector } from '@/composables';
import { getResponsiveProps } from '@/models';
import { VsComponent, type ColorScheme } from '@/declaration';
import { VsIcon } from '@/icons';
import { utils } from '@/utils';
import VsResponsive from '@/components/vs-responsive/VsResponsive.vue';
import VsButton from '@/components/vs-button/VsButton.vue';

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
        disabled: {
            type: Array as PropType<number[]>,
            default: () => [],
            validator: (value: number[], props: any) => {
                const tabsLength = props.tabs.length;
                const isValid = value.every((i) => i >= 0 && i < tabsLength);
                if (!isValid) {
                    utils.log.propWarning(name, 'disabled', 'Disabled index is out of range.');
                }
                return isValid;
            },
        },
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
        const scrollCount = ref(0);

        const {
            selectedIndex,
            isLeftEdge,
            isRightEdge,
            isSelected,
            isDisabled,
            findNextActivedIndex,
            findPreviousActivedIndex,
            getInitialIndex,
            selectIndex: selectTab,
            handleKeydown,
        } = useIndexSelector(tabs, disabled);

        selectTab(getInitialIndex(modelValue.value));

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

        watch(
            () => tabs.value.length,
            () => {
                selectTab(findNextActivedIndex(selectedIndex.value));
            },
        );

        watch(selectedIndex, (index: number) => {
            scrollTo(index);
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
