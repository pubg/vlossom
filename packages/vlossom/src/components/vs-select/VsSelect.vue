<template>
    <vs-input-wrapper
        v-show="visible"
        :width="width"
        :grid="grid"
        :id="computedId"
        :label="label"
        :required="required"
        :disabled="computedDisabled"
        :dense="dense"
        :messages="computedMessages"
        :no-message="noMessage"
        :shake="shake"
    >
        <template #label v-if="label || $slots['label']">
            <slot name="label" />
        </template>

        <div
            :id="computedId"
            ref="triggerRef"
            :class="['vs-select', colorSchemeClass, classObj, stateClasses]"
            :style="computedStyleSet"
            @click.prevent.stop="onClickTrigger()"
        >
            <div class="vs-select-wrap">
                <input
                    v-if="!(multiple && !autocomplete && selectedOptions.length)"
                    ref="inputRef"
                    role="combobox"
                    :id="`${computedId}-input`"
                    :class="['vs-select-input', { 'vs-autocomplete': autocomplete }]"
                    :aria-expanded="isOpen || isVisible"
                    :aria-label="ariaLabel"
                    aria-controls="vs-select-options"
                    :aria-autocomplete="autocomplete ? 'list' : undefined"
                    :aria-activedescendant="focusedOptionId"
                    :disabled="computedDisabled"
                    :placeholder="placeholder"
                    :readonly="computedReadonly || !autocomplete"
                    :aria-required="required"
                    :value="inputLabel"
                    @input.stop="onInput"
                    @focus.stop="onFocus"
                    @blur.stop="onBlur"
                    @keydown.stop="onComboboxKeydown"
                    @change.stop
                />

                <div
                    v-if="multiple && selectedOptions.length"
                    :class="['vs-multiple-chips', { 'vs-autocompleted': autocomplete }]"
                >
                    <div v-if="collapseChips" class="vs-chips">
                        <vs-chip
                            class="vs-select-chip"
                            :color-scheme="colorScheme"
                            :closable="closableChips"
                            :dense="dense"
                            primary
                            @close="removeSelected(selectedOptions[0].value)"
                        >
                            {{ getOptionLabel(selectedOptions[0].value) }}
                        </vs-chip>
                        <vs-chip
                            v-if="selectedOptions.length > 1"
                            class="vs-select-chip vs-chip-others"
                            :color-scheme="colorScheme"
                            :dense="dense"
                        >
                            + {{ selectedOptions.length - 1 }}
                        </vs-chip>
                    </div>
                    <div v-else class="vs-chips">
                        <vs-chip
                            class="vs-select-chip"
                            v-for="option in selectedOptions"
                            :key="`selected-${option.id}`"
                            :color-scheme="colorScheme"
                            :closable="closableChips"
                            :dense="dense"
                            primary
                            @close="removeSelected(option.value)"
                        >
                            {{ getOptionLabel(option.value) }}
                        </vs-chip>
                    </div>
                </div>
            </div>
            <div class="vs-select-side">
                <button
                    v-if="!noClear && selectedOptions.length && !computedReadonly && !computedDisabled"
                    type="button"
                    class="vs-clear-button"
                    aria-label="Clear"
                    tabindex="-1"
                    @click.prevent.stop="onClear()"
                >
                    <vs-icon icon="close" :size="dense ? 14 : 16" />
                </button>

                <div class="vs-arrow-box">
                    <vs-icon
                        icon="keyboardArrowDown"
                        :size="dense ? 16 : 20"
                        class="vs-arrow-icon"
                        :class="{ 'vs-arrow-up': isOpen }"
                    />
                </div>
            </div>

            <Teleport :to="`#${VS_OVERLAY_ID}`" v-if="isOpen || isVisible">
                <div
                    ref="optionsRef"
                    :class="[
                        'vs-options-container',
                        colorSchemeClass,
                        animationClass,
                        { 'vs-dense': dense, 'vs-closing': isClosing },
                    ]"
                    :style="computedStyleSet"
                >
                    <div class="vs-options-header" v-if="$slots['options-header']" @click.prevent.stop>
                        <slot name="options-header" />
                    </div>
                    <div
                        v-if="selectAll && multiple && loadedOptions.length"
                        id="vs-select-all"
                        role="option"
                        aria-label="select all"
                        :aria-selected="multiple ? undefined : isAllSelected"
                        :aria-checked="multiple ? isAllSelected : undefined"
                        :aria-setsize="filteredOptions.length"
                        :aria-posinset="1"
                        :class="[
                            'vs-option',
                            'vs-select-all',
                            {
                                'vs-selected': isAllSelected,
                                'vs-chased': (chasingMouse ? hoveredIndex : focusedIndex) === 0,
                            },
                        ]"
                        @mousemove.stop="onMouseMove('all')"
                        @click.prevent.stop="selectAllOptions()"
                    >
                        <slot name="select-all" :selected="isAllSelected">
                            <span>Select All</span>
                        </slot>
                    </div>
                    <ul
                        ref="listboxRef"
                        role="listbox"
                        class="vs-select-options"
                        :aria-multi-selectable="multiple"
                        :aria-activedescendant="focusedOptionId"
                        tabindex="-1"
                    >
                        <li
                            v-for="(option, index) in loadedOptions"
                            :key="option.id"
                            role="option"
                            :id="option.id"
                            :class="[
                                'vs-option',
                                {
                                    'vs-selected': isSelectedOption(option.value),
                                    'vs-chased': isChasedOption(index),
                                },
                            ]"
                            :aria-label="getOptionLabel(option.value)"
                            :aria-selected="multiple ? undefined : isSelectedOption(option.value)"
                            :aria-checked="multiple ? isSelectedOption(option.value) : undefined"
                            :aria-setsize="filteredOptions.length"
                            :aria-posinset="(selectAll ? 2 : 1) + index"
                            @mousemove.stop="onMouseMove(option)"
                            @click.prevent.stop="selectOption(option.value)"
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
                        <li v-if="!loadedOptions.length" class="vs-option" @click.prevent.stop="closeOptions()">
                            No Options
                        </li>
                    </ul>
                    <div class="vs-options-footer" v-if="$slots['options-footer']" @click.prevent.stop>
                        <slot name="options-footer" />
                    </div>
                </div>
            </Teleport>
        </div>

        <template #messages v-if="!noMessage">
            <slot name="messages" />
        </template>
    </vs-input-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, type PropType } from 'vue';
import { useColorScheme, useStyleSet, useInput, useInputOption, useStateClass } from '@/composables';
import { getInputProps, getInputOptionProps, getResponsiveProps } from '@/models';
import { useAutocomplete, useFocusControl, useInfiniteScroll, useSelectOption, useToggleOptions } from './composables';
import { VsComponent, VS_OVERLAY_ID, type ColorScheme } from '@/declaration';
import { VsIcon } from '@/icons';
import { utils } from '@/utils';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import VsChip from '@/components/vs-chip/VsChip.vue';
import { useVsSelectRules } from './vs-select-rules';

import type { VsSelectStyleSet } from './types';

const name = VsComponent.VsSelect;
export default defineComponent({
    name,
    components: { VsInputWrapper, VsChip, VsIcon },
    props: {
        ...getInputProps<any>(),
        ...getInputOptionProps(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsSelectStyleSet> },
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
        max: {
            type: [Number, String],
            default: Number.MAX_SAFE_INTEGER,
            validator: (value: number | string) => {
                return utils.props.checkValidNumber(name, 'max', value);
            },
        },
        min: {
            type: [Number, String],
            default: 0,
            validator: (value: number | string) => {
                return utils.props.checkValidNumber(name, 'min', value);
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
    // expose: ['clear', 'validate', 'focus', 'blur', 'open', 'close'],
    setup(props, context) {
        const {
            colorScheme,
            styleSet,
            autocomplete,
            dense,
            disabled,
            modelValue,
            id,
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
            max,
            min,
            noDefaultRules,
        } = toRefs(props);

        const { emit } = context;

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsSelectStyleSet>(name, styleSet);

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

        const { requiredCheck, maxCheck, minCheck } = useVsSelectRules(required, max, min, multiple);

        function onClear() {
            if (multiple.value) {
                inputValue.value = [];
            } else {
                inputValue.value = null;
            }

            if (autocomplete.value) {
                autocompleteText.value = '';
            }

            closeOptions();
        }

        const {
            computedId,
            computedMessages,
            computedState,
            computedDisabled,
            computedReadonly,
            shake,
            validate,
            clear,
        } = useInput(context, {
            inputValue,
            modelValue,
            id,
            disabled,
            readonly,
            messages,
            rules,
            defaultRules: [requiredCheck, maxCheck, minCheck],
            noDefaultRules,
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
        });

        const classObj = computed(() => ({
            'vs-dense': dense.value,
            'vs-disabled': computedDisabled.value,
            'vs-readonly': computedReadonly.value,
        }));

        const { stateClasses } = useStateClass(computedState);

        const { getOptionLabel, getOptionValue } = useInputOption(
            inputValue,
            options,
            optionLabel,
            optionValue,
            multiple,
        );

        const inputLabel = computed(() => {
            if (focusing.value && autocomplete.value) {
                return autocompleteText.value;
            }

            if (multiple.value) {
                return '';
            }

            return selectedOptions.value[0] ? getOptionLabel(selectedOptions.value[0].value) : '';
        });

        const { isOpen, isClosing, toggleOptions, closeOptions, triggerRef, optionsRef, isVisible, computedPlacement } =
            useToggleOptions(computedId, computedDisabled, computedReadonly);

        const { autocompleteText, filteredOptions, updateAutocompleteText } = useAutocomplete(
            autocomplete,
            computedOptions,
            getOptionLabel,
            inputLabel,
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

        const {
            focusedIndex,
            focusedOptionId,
            hoveredIndex,
            chasingMouse,
            onComboboxKeydown,
            onMouseMove,
            isChasedOption,
        } = useFocusControl(
            computedDisabled,
            computedReadonly,
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

            emit('blur', e);
        }

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

        function onClickTrigger() {
            focus();
            toggleOptions();
        }

        function open() {
            isOpen.value = true;
        }

        function close() {
            isOpen.value = false;
        }

        return {
            computedId,
            classObj,
            colorSchemeClass,
            computedStyleSet,
            computedDisabled,
            computedReadonly,
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
            onComboboxKeydown,
            onClickTrigger,
            open,
            close,
            VS_OVERLAY_ID,
        };
    },
});
</script>

<style lang="scss" src="./VsSelect.scss" />
