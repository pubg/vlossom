<template>
    <div :class="['vs-pagination', colorSchemeClass, { 'vs-disabled': disabled }]" :style="computedStyleSet">
        <button
            v-if="edgeButtons"
            class="vs-page-button"
            :disabled="selected <= 1"
            @click.prevent.stop="goFirst"
            aria-label="go to first page"
        >
            <slot name="first">
                <vs-icon icon="goFirst" size="2rem" />
            </slot>
        </button>
        <button
            class="vs-page-button"
            :disabled="selected <= 1"
            @click.prevent.stop="goPrev"
            aria-label="go to previous page"
        >
            <slot name="prev">
                <vs-icon icon="goPrev" size="2rem" />
            </slot>
        </button>
        <div class="vs-page-buttons">
            <button
                v-for="page in pages"
                :key="page"
                :class="['vs-page-button', { 'vs-selected': page === selected }]"
                :aria-label="`go to page ${page}`"
                @click.prevent.stop="setPage(page)"
            >
                <slot name="page" :page="page">
                    {{ page }}
                </slot>
            </button>
        </div>
        <button
            class="vs-page-button"
            :disabled="selected >= length"
            @click.prevent.stop="goNext"
            aria-label="go to next page"
        >
            <slot name="next">
                <vs-icon icon="goNext" size="2rem" />
            </slot>
        </button>
        <button
            v-if="edgeButtons"
            class="vs-page-button"
            :disabled="selected >= length"
            @click.prevent.stop="goLast"
            aria-label="go to last page"
        >
            <slot name="last">
                <vs-icon icon="goLast" size="2rem" />
            </slot>
        </button>
    </div>
</template>

<script lang="ts">
import { ComputedRef, PropType, computed, defineComponent, ref, toRefs, watch } from 'vue';
import { ColorScheme, VsComponent } from '@/declaration';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsIcon } from '@/icons';
import { VsPaginationStyleSet } from './types';
import { utils } from '@/utils';

const name = VsComponent.VsPagination;
export default defineComponent({
    name,
    components: { VsIcon },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsPaginationStyleSet> },
        disabled: { type: Boolean, default: false },
        edgeButtons: { type: Boolean, default: false },
        length: {
            type: Number,
            required: true,
            default: 1,
            validator: (value: number) => {
                const isValid = value > 0;
                if (!isValid) {
                    utils.log.propError(name, 'length', 'length must be greater than 0');
                }
                return isValid;
            },
        },
        showingLength: {
            type: Number,
            default: 10,
            validator: (value: number) => {
                const isValid = value > 0;
                if (!isValid) {
                    utils.log.propError(name, 'showingLength', 'showingLength must be greater than 0');
                }
                return isValid;
            },
        },
        // v-model
        modelValue: { type: Number, default: 1 },
    },
    emits: ['update:modelValue', 'change'],
    // expose: ['goFirst', 'goLast', 'goPrev', 'goNext', 'setPage'],
    setup(props, { emit }) {
        const { colorScheme, styleSet, modelValue, length, showingLength } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsPaginationStyleSet>(name, styleSet);

        const selected = ref(modelValue.value);

        const pages: ComputedRef<number[]> = computed(() => {
            const pageArr: number[] = [];
            let start = 0;
            let end = 0;
            const isOdd = showingLength.value % 2;
            const halfLess = selected.value - Math.floor(showingLength.value / 2);
            const halfMore = selected.value + Math.floor(showingLength.value / 2);

            if (length.value <= showingLength.value) {
                start = 1;
                end = length.value;
            } else if (halfLess <= 0) {
                start = 1;
                end = showingLength.value;
            } else if ((!isOdd && halfMore - 1 >= length.value) || (isOdd && halfMore >= length.value)) {
                start = length.value - showingLength.value + 1;
                end = length.value;
            } else {
                start = halfLess;
                end = !isOdd ? halfMore - 1 : halfMore;
            }

            for (let i = start; i <= end; i++) {
                pageArr.push(i);
            }

            if (pageArr.length === 0) {
                return [1];
            }
            return pageArr;
        });

        function goFirst() {
            selected.value = 1;
        }

        function goLast() {
            selected.value = length.value;
        }

        function goPrev() {
            if (selected.value > 1) {
                selected.value -= 1;
            }
        }

        function goNext() {
            if (selected.value < length.value) {
                selected.value += 1;
            }
        }

        function setPage(page: number) {
            if (!page || page < 1) {
                selected.value = 1;
            } else if (page > length.value) {
                selected.value = length.value;
            } else {
                selected.value = page;
            }
        }

        watch(modelValue, setPage);

        watch(selected, () => {
            emit('update:modelValue', selected.value);
            emit('change', selected.value);
        });

        watch(length, () => {
            selected.value = 1;
        });

        return {
            colorSchemeClass,
            computedStyleSet,
            selected,
            pages,
            goFirst,
            goLast,
            goPrev,
            goNext,
            setPage,
        };
    },
});
</script>

<style lang="scss" src="./VsPagination.scss" />
