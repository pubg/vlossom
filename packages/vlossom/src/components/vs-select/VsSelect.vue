<template>
    <vs-wrapper :width="width" :grid="grid" v-show="visible">
        <vs-input-wrapper
            :id="id"
            :label="label"
            :disabled="disabled"
            :messages="computedMessages"
            :no-label="noLabel"
            :no-message="noMessage"
            :required="required"
            :shake="shake"
        >
            <template #label v-if="!noLabel">
                <slot name="label" />
            </template>

            <div
                ref="triggerRef"
                :class="['vs-select', `vs-${computedColorScheme}`, { ...classObj }, stateClasses]"
                :style="computedStyleSet"
                @click.stop="toggleOptions()"
            >
                <div class="select-wrap">
                    <div v-if="multiple && selectedOptions.length" class="multiple-chips">
                        <div v-if="collapseChips" class="chips">
                            <vs-chip
                                class="select-chip"
                                :color-scheme="colorScheme"
                                :style-set="chipStyleSets"
                                :closable="closableChips"
                                primary
                                @close="removeSelected(selectedOptions[0].value)"
                            >
                                {{ getOptionLabel(selectedOptions[0].value) }}
                            </vs-chip>
                            <vs-chip
                                v-if="selectedOptions.length > 1"
                                class="select-chip chip-others"
                                :color-scheme="colorScheme"
                                :style-set="collapseChipStyleSets"
                            >
                                + {{ selectedOptions.length - 1 }}
                            </vs-chip>
                        </div>
                        <div v-else class="chips">
                            <vs-chip
                                class="select-chip"
                                v-for="option in selectedOptions"
                                :key="`selected-${option.id}`"
                                :color-scheme="colorScheme"
                                :style-set="chipStyleSets"
                                :closable="closableChips"
                                primary
                                @close="removeSelected(option.value)"
                            >
                                {{ getOptionLabel(option.value) }}
                            </vs-chip>
                        </div>
                    </div>

                    <input
                        ref="inputRef"
                        :id="id"
                        role="combobox"
                        :aria-expanded="isOpen || isVisible"
                        :aria-label="ariaLabel"
                        aria-controls="vs-select-options"
                        :aria-autocomplete="autocomplete ? 'list' : undefined"
                        :aria-activedescendant="focusedOptionId"
                        :class="{ autocomplete }"
                        :disabled="disabled"
                        :placeholder="placeholder"
                        :readonly="readonly || !autocomplete"
                        :aria-required="required"
                        :value="inputLabel"
                        @input.stop="onInput"
                        @focus.stop="onFocus"
                        @blur.stop="onBlur"
                        @keydown.stop="onKeyDown"
                        @change.stop
                    />
                </div>
                <button
                    v-if="!noClear && selectedOptions.length && !readonly && !disabled"
                    type="button"
                    class="clear-button"
                    aria-hidden="true"
                    tabindex="-1"
                    @click.stop="onClear()"
                >
                    <vs-icon icon="close" :size="dense ? 14 : 16" />
                </button>

                <div class="arrow-box">
                    <vs-icon
                        icon="keyboardArrowDown"
                        :size="dense ? 16 : 20"
                        class="arrow-icon"
                        :class="{ 'arrow-up': isOpen }"
                    />
                </div>

                <Teleport to="#vs-overlay" v-if="isOpen || isVisible">
                    <div
                        ref="optionsRef"
                        :class="[
                            'vs-options-container',
                            `vs-${computedColorScheme}`,
                            animationClass,
                            { dense: dense, closing: isClosing },
                        ]"
                        :style="computedStyleSet"
                    >
                        <div v-if="$slots['options-header']" @click.stop>
                            <slot name="options-header" />
                        </div>
                        <ul
                            ref="listboxRef"
                            role="listbox"
                            class="vs-select-options"
                            :aria-multi-selectable="multiple"
                            :aria-activedescendant="focusedOptionId"
                            tabindex="-1"
                            @keydown.stop="onKeyDown"
                        >
                            <li
                                v-if="selectAll && multiple && loadedOptions.length"
                                id="vs-select-all"
                                role="option"
                                aria-label="select all"
                                :aria-selected="multiple ? undefined : isAllSelected"
                                :aria-checked="multiple ? isAllSelected : undefined"
                                :aria-setsize="filteredOptions.length"
                                :aria-posinset="1"
                                :class="[
                                    'option',
                                    'select-all',
                                    {
                                        selected: isAllSelected,
                                        chased: (chasingMouse ? hoveredIndex : focusedIndex) === 0,
                                    },
                                ]"
                                @mousemove.stop="onMouseMove('all')"
                                @click.stop="selectAllOptions()"
                            >
                                <slot name="select-all" :selected="isAllSelected">
                                    <span>Select All</span>
                                </slot>
                                <vs-divider :style="{ margin: 0 }" :style-set="{ lineColor: 'var(--vs-line-color)' }" />
                            </li>
                            <li
                                v-for="(option, index) in loadedOptions"
                                :key="option.id"
                                :id="option.id"
                                role="option"
                                :aria-label="getOptionLabel(option.value)"
                                :aria-selected="multiple ? undefined : isSelectedOption(option.value)"
                                :aria-checked="multiple ? isSelectedOption(option.value) : undefined"
                                :aria-setsize="filteredOptions.length"
                                :aria-posinset="(selectAll ? 2 : 1) + index"
                                :class="[
                                    'option',
                                    {
                                        selected: isSelectedOption(option.value),
                                        chased: isChasedOption(index),
                                    },
                                ]"
                                @mousemove.stop="onMouseMove(option)"
                                @click.stop="selectOption(option.value)"
                            >
                                <slot
                                    name="option"
                                    :optionIndex="index"
                                    :option="option.value"
                                    :label="getOptionLabel(option.value)"
                                    :value="getOptionValue(option.value)"
                                    :selected="isSelectedOption(option.value)"
                                >
                                    <span>{{ getOptionLabel(option.value) }}</span>
                                </slot>
                            </li>
                            <li v-if="!loadedOptions.length" @click.stop="closeOptions()">No Options</li>
                        </ul>
                        <div v-if="$slots['options-footer']" @click.stop>
                            <slot name="options-footer" />
                        </div>
                    </div>
                </Teleport>
            </div>

            <template #messages v-if="!noMessage">
                <slot name="messages" />
            </template>
        </vs-input-wrapper>
    </vs-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, type PropType } from 'vue';
import {
    useColorScheme,
    useStyleSet,
    getResponsiveProps,
    getInputProps,
    useInput,
    getInputOptionProps,
    useInputOption,
    useStateClass,
} from '@/composables';
import { useAutocomplete, useFocusControl, useInfiniteScroll, useSelectOption, useToggleOptions } from './composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { VsSelectStyleSet } from './types';
import { VsIcon } from '@/icons';
import { utils } from '@/utils';
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import VsChip from '@/components/vs-chip/VsChip.vue';
import VsDivider from '@/components/vs-divider/VsDivider.vue';

import type { VsChipStyleSet } from '@/components/vs-chip/types';

const name = VsComponent.VsSelect;
export default defineComponent({
    name,
    components: { VsInputWrapper, VsWrapper, VsChip, VsIcon, VsDivider },
    props: {
        ...getInputProps<any, []>(),
        ...getInputOptionProps(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsSelectStyleSet> },
        ariaLabel: { type: String, default: '' },
        autocomplete: { type: Boolean, default: false },
        closableChips: {
            type: Boolean,
            default: false,
            validator: (value, props) => {
                if (!props.multiple && value) {
                    utils.log.propError(name, 'closable-chips', 'closableChips can only be used with multiple prop');
                    return false;
                }
                return true;
            },
        },
        collapseChips: {
            type: Boolean,
            default: false,
            validator: (value, props) => {
                if (!props.multiple && value) {
                    utils.log.propError(name, 'collapse-chips', 'collapseChips can only be used with multiple prop');
                    return false;
                }
                return true;
            },
        },
        dense: { type: Boolean, default: false },
        lazyLoadNum: {
            type: Number,
            default: 100,
            validator: (value: number) => {
                const isValid = value >= 10;
                if (!isValid) {
                    utils.log.propError(name, 'lazy-load-num', 'lazyLoadNum must be 10 or more');
                }
                return isValid;
            },
        },
        multiple: { type: Boolean, default: false },
        selectAll: {
            type: Boolean,
            default: false,
            validator: (value, props) => {
                if (!props.multiple && value) {
                    utils.log.propError(name, 'select-all', 'selectAll can only be used with multiple prop');
                    return false;
                }
                return true;
            },
        },
        // v-model
        modelValue: { type: null, default: null },
    },
    emits: ['update:modelValue', 'update:changed', 'update:valid', 'change', 'focus', 'blur'],
    expose: ['clear', 'validate', 'focus', 'blur'],
    setup(props, context) {
        const {
            colorScheme,
            styleSet,
            autocomplete,
            dense,
            disabled,
            modelValue,
            label,
            lazyLoadNum,
            messages,
            multiple,
            options,
            optionLabel,
            optionValue,
            readonly,
            required,
            rules,
            selectAll,
            state,
        } = toRefs(props);

        const { emit } = context;

        const classObj = computed(() => ({
            dense: dense.value,
            disabled: disabled.value,
            readonly: readonly.value,
        }));

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsSelectStyleSet>(name, styleSet);
        const chipStyleSets = computed(
            (): VsChipStyleSet => ({
                backgroundColor: computedStyleSet.value['--vs-select-chipBackgroundColor'] as string,
                fontColor: computedStyleSet.value['--vs-select-chipFontColor'] as string,
                height: dense.value ? '1.2rem' : '1.6rem',
                fontSize: dense.value ? '0.7rem' : '0.8rem',
            }),
        );
        const collapseChipStyleSets = computed(
            (): VsChipStyleSet => ({
                backgroundColor: computedStyleSet.value['--vs-select-collapseChipBackgroundColor'] as string,
                fontColor: computedStyleSet.value['--vs-select-collapseChipFontColor'] as string,
                height: dense.value ? '1.2rem' : '1.6rem',
                fontSize: dense.value ? '0.7rem' : '0.8rem',
            }),
        );

        const inputRef = ref<HTMLInputElement | null>(null);

        function focus() {
            inputRef.value?.focus();
        }

        function blur() {
            inputRef.value?.blur();
        }

        function select() {
            inputRef.value?.select();
        }

        const inputValue = ref(modelValue.value);

        const computedOptions = computed(() =>
            options.value.map((option) => ({ id: utils.string.createID(), value: option })),
        );

        function requiredCheck() {
            if (!required.value) {
                return '';
            }

            if (multiple.value) {
                return inputValue.value && inputValue.value.length > 0 ? '' : 'required';
            } else {
                return inputValue.value ? '' : 'required';
            }
        }

        const allRules = computed(() => [...rules.value, requiredCheck]);

        function onClear() {
            if (multiple.value) {
                inputValue.value = [];
            } else {
                inputValue.value = null;
            }

            if (autocomplete.value) {
                autocompleteText.value = '';
            }
        }

        const { computedMessages, computedState, shake, validate, clear, id } = useInput(
            inputValue,
            modelValue,
            context,
            label,
            {
                messages,
                rules: allRules,
                state,
                callbacks: {
                    onMounted: () => {
                        if (multiple.value && !Array.isArray(inputValue.value)) {
                            inputValue.value = [];
                        }
                    },
                    onChange: () => {
                        if (multiple.value && !Array.isArray(inputValue.value)) {
                            inputValue.value = [];
                        }
                    },
                    onClear,
                },
            },
        );

        const { stateClasses } = useStateClass(computedState);

        const { getOptionLabel, getOptionValue } = useInputOption(
            inputValue,
            options,
            optionLabel,
            optionValue,
            multiple,
        );

        const { isOpen, isClosing, toggleOptions, closeOptions, triggerRef, optionsRef, isVisible, computedPlacement } =
            useToggleOptions(id, disabled, readonly);

        const { autocompleteText, filteredOptions, updateAutocompleteText } = useAutocomplete(
            computedOptions,
            getOptionLabel,
            isOpen,
        );

        const { listboxRef, loadedOptions } = useInfiniteScroll(filteredOptions, lazyLoadNum, isOpen);

        const { selectOption, selectAllOptions, isSelectedOption, isAllSelected, removeSelected, selectedOptions } =
            useSelectOption(
                inputValue,
                computedOptions,
                getOptionLabel,
                getOptionValue,
                multiple,
                closeOptions,
                autocomplete,
                autocompleteText,
                focus,
            );

        const { focusedIndex, hoveredIndex, chasingMouse, onKeyDown, onMouseMove, isChasedOption, focusedOptionId } =
            useFocusControl(
                disabled,
                readonly,
                isOpen,
                closeOptions,
                selectAll,
                isAllSelected,
                selectedOptions,
                filteredOptions,
                loadedOptions,
                selectOption,
                selectAllOptions,
                focus,
            );

        const focusing = ref(false);

        function onFocus(e: FocusEvent) {
            focusing.value = true;

            if (autocomplete.value) {
                e.preventDefault();
                select();
            }
            emit('focus', e);
        }

        function onBlur(e: FocusEvent) {
            focusing.value = false;

            if (autocomplete.value) {
                autocompleteText.value = inputLabel.value;
            }
            emit('blur', e);
        }

        const inputLabel = computed(() => {
            if (focusing.value && autocomplete.value) {
                return autocompleteText.value;
            }

            if (multiple.value) {
                return '';
            }

            return selectedOptions.value[0] ? getOptionLabel(selectedOptions.value[0].value) : '';
        });

        const animationClass = computed(() => {
            if (isOpen.value) {
                return computedPlacement.value === 'top' ? 'fade-enter-bottom' : 'fade-enter-top';
            } else {
                return computedPlacement.value === 'top' ? 'fade-leave-bottom' : 'fade-leave-top';
            }
        });

        function onInput(e: Event) {
            // Open options on typing after focused by tab key
            if (autocomplete.value && !isOpen.value) {
                isOpen.value = true;
            }

            const target = e.target as HTMLInputElement;
            updateAutocompleteText(target.value);
        }

        return {
            id,
            classObj,
            computedColorScheme,
            computedStyleSet,
            chipStyleSets,
            collapseChipStyleSets,
            animationClass,
            inputValue,
            computedMessages,
            shake,
            triggerRef,
            optionsRef,
            isVisible,
            inputLabel,
            isOpen,
            isClosing,
            toggleOptions,
            closeOptions,
            listboxRef,
            filteredOptions,
            loadedOptions,
            getOptionLabel,
            getOptionValue,
            removeSelected,
            selectOption,
            selectAllOptions,
            isSelectedOption,
            isAllSelected,
            selectedOptions,
            onClear,
            clear,
            validate,
            updateAutocompleteText,
            focusedIndex,
            hoveredIndex,
            chasingMouse,
            onKeyDown,
            onMouseMove,
            isChasedOption,
            focusedOptionId,
            onFocus,
            onBlur,
            inputRef,
            focus,
            blur,
            stateClasses,
            onInput,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsSelect.scss" />
