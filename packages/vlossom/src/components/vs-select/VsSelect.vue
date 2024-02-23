<template>
    <vs-wrapper :width="width" :grid="grid" v-show="visible">
        <vs-input-wrapper
            :id="id"
            :label="label"
            :messages="computedMessages"
            :no-label="noLabel"
            :no-msg="noMsg"
            :required="required"
            :shake="shake"
        >
            <template #label v-if="!noLabel">
                <slot name="label" />
            </template>

            <div
                ref="triggerRef"
                :class="['vs-select', `vs-${computedColorScheme}`, { ...classObj }]"
                @click.stop="toggleOptions()"
            >
                <div v-if="multiple" class="multiple-chips">
                    <div v-if="collapseChips && selectedOptions.length" class="collapse-chips">
                        <vs-chip
                            :color-scheme="colorScheme"
                            :closable="closableChips"
                            primary
                            @close="removeSelected(selectedOptions[0].value)"
                        >
                            {{ getOptionLabel(selectedOptions[0].value) }}
                        </vs-chip>
                        <span v-if="selectedOptions.length > 1" class="chip-others">
                            + {{ selectedOptions.length - 1 }}
                        </span>
                    </div>
                    <div v-else class="collapse-chips">
                        <vs-chip
                            v-for="option in selectedOptions"
                            :key="`selected-${option.id}`"
                            :color-scheme="colorScheme"
                            :closable="closableChips"
                            primary
                            @close="removeSelected(option.value)"
                        >
                            {{ getOptionLabel(option.value) }}
                        </vs-chip>
                    </div>
                </div>

                <input
                    :id="id"
                    role="combobox"
                    :aria-expanded="isOpen || isVisible"
                    :class="{ autocomplete: autocomplete }"
                    :disabled="disabled"
                    :placeholder="placeholder"
                    :readonly="readonly || !autocomplete"
                    :value="inputLabel"
                    @input="updateAutocompleteText"
                    @focus="onFocus"
                    @blur="onBlur"
                    @keydown="onKeyDown"
                />

                <button
                    v-if="!noClear && selectedOptions.length && !readonly && !disabled"
                    type="button"
                    class="clear-button"
                    aria-label="clear"
                    @click.stop="onClear()"
                >
                    <vs-icon icon="close" :size="dense ? 16 : 20" />
                </button>

                <Teleport to="#vs-overlay" v-if="isOpen || isVisible">
                    <ul
                        ref="optionsRef"
                        role="listbox"
                        :aria-multi-selectable="multiple"
                        :class="['options', `vs-${computedColorScheme}`, { dense: dense }]"
                    >
                        <li v-if="selectAll && multiple" class="select-all" @click.stop="selectAllOptions()">
                            <span>Select All</span>
                        </li>
                        <li
                            v-for="(option, index) in loadedOptions"
                            :key="option.id"
                            :id="option.id"
                            role="option"
                            :aria-label="getOptionLabel(option.value)"
                            :aria-selected="multiple ? undefined : isSelectedOption(option.value)"
                            :aria-checked="multiple ? isSelectedOption(option.value) : undefined"
                            :class="{ selected: isSelectedOption(option.value), hovered: focusedIndex === index }"
                            @mousemove="onMouseMove(option)"
                            @click.stop="selectOption(option.value)"
                        >
                            <slot
                                name="option"
                                :optionIndex="index"
                                :option="option"
                                :label="getOptionLabel(option.value)"
                                :value="getOptionValue(option.value)"
                                :selected="isSelectedOption(option.value)"
                            >
                                <span>{{ getOptionLabel(option.value) }}</span>
                            </slot>
                        </li>
                        <li v-if="!options.length" @click.stop="closeOptions()">No Options</li>
                    </ul>
                </Teleport>
            </div>

            <template #messages v-if="!noMsg">
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
} from '@/composables';
import { useAutocomplete, useFocus, useInfiniteScroll, useSelectOption, useToggleOptions } from './composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { VsSelectStyleSet } from './types';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';
import VsChip from '@/components/vs-chip/VsChip.vue';
import { VsIcon } from '@/icons';
import { utils } from '@/utils';

const name = VsComponent.VsSelect;

export default defineComponent({
    name,
    components: { VsInputWrapper, VsWrapper, VsChip, VsIcon },
    props: {
        ...getInputProps<any, []>(),
        ...getInputOptionProps(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsSelectStyleSet>, default: '' },
        autocomplete: { type: Boolean, default: false },
        closableChips: { type: Boolean, default: false },
        collapseChips: { type: Boolean, default: false },
        dense: { type: Boolean, default: false },
        loadNumber: {
            type: Number,
            default: 100,
            validator: (value: number) => {
                const isValid = value >= 10;
                if (!isValid) {
                    console.error('[Vlossom] vs-select prop loadNumber must be 10 or more');
                }
                return isValid;
            },
        },
        multiple: { type: Boolean, default: false },
        selectAll: { type: Boolean, default: false },
        // v-model
        modelValue: { type: null, default: null },
    },
    emits: ['update:modelValue', 'update:changed', 'update:valid', 'change', 'focus', 'blur'],
    expose: ['focus', 'blur', 'select', 'clear', 'validate'],
    setup(props, context) {
        const {
            colorScheme,
            styleSet,
            autocomplete,
            dense,
            disabled,
            modelValue,
            label,
            loadNumber,
            messages,
            multiple,
            options,
            optionLabel,
            optionValue,
            readonly,
            required,
            rules,
        } = toRefs(props);

        const classObj = computed(() => ({
            dense: dense.value,
            disabled: disabled.value,
            readonly: readonly.value,
        }));

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsSelectStyleSet>(name, styleSet);

        const inputValue = ref(modelValue.value);

        const computedOptions = computed(() =>
            options.value.map((option) => ({ id: utils.string.createID(), value: option })),
        );

        const { getOptionLabel, getOptionValue } = useInputOption(
            inputValue,
            computed(() => computedOptions.value.map((option) => option.value)),
            optionLabel,
            optionValue,
        );

        const { autocompleteText, focusing, filteredOptions, onFocus, onBlur, updateAutocompleteText } =
            useAutocomplete(computedOptions, getOptionLabel);

        const { loadedOptions, addInfiniteScroll, removeInfiniteScroll } = useInfiniteScroll(
            filteredOptions,
            loadNumber,
        );

        const { isOpen, toggleOptions, closeOptions, triggerRef, optionsRef, isVisible } = useToggleOptions(
            addInfiniteScroll,
            removeInfiniteScroll,
        );

        const { selectOption, selectAllOptions, isSelectedOption, removeSelected, selectedOptions } = useSelectOption(
            inputValue,
            computedOptions,
            getOptionValue,
            multiple,
            closeOptions,
        );

        const { focusedIndex, onKeyDown, onMouseMove } = useFocus(
            disabled,
            readonly,
            isOpen,
            selectedOptions,
            loadedOptions,
            selectOption,
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

        function requiredCheck() {
            if (!required.value) {
                return '';
            }

            if (multiple.value) {
                return inputValue.value.length > 0 ? '' : 'required';
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
        }

        const { computedMessages, shake, validate, clear, id } = useInput(inputValue, modelValue, context, label, {
            messages,
            rules: allRules,
            callbacks: {
                onMounted: () => {
                    if (multiple.value && !Array.isArray(modelValue.value)) {
                        inputValue.value = [];
                    }
                },
                onClear,
            },
        });

        return {
            id,
            classObj,
            computedColorScheme,
            computedStyleSet,
            inputValue,
            computedMessages,
            shake,
            triggerRef,
            optionsRef,
            isVisible,
            inputLabel,
            isOpen,
            toggleOptions,
            closeOptions,
            loadedOptions,
            getOptionLabel,
            getOptionValue,
            removeSelected,
            selectOption,
            selectAllOptions,
            isSelectedOption,
            selectedOptions,
            onClear,
            clear,
            validate,
            onFocus,
            onBlur,
            updateAutocompleteText,
            focusedIndex,
            onKeyDown,
            onMouseMove,
            // focus,
            // blur,
            // select,
            // onFocus,
            // onBlur,
            // onEnter,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsSelect.scss" />
