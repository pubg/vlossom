<template>
    <div :class="['vs-checkbox-node', checkColorSchemeClass, classObj]" :style="styleSet">
        <div :class="['vs-checkbox-wrap', stateClasses]">
            <vs-icon class="vs-check-icon" :icon="icon" />
            <input
                ref="checkboxRef"
                type="checkbox"
                class="vs-checkbox-input"
                :aria-label="ariaLabel"
                :id="id"
                :disabled="disabled || readonly"
                :name="name"
                :value="convertToString(value)"
                :checked="checked"
                :aria-required="required"
                @click.prevent.stop="onClick"
                @focus.stop="onFocus"
                @blur.stop="onBlur"
            />
        </div>
        <label v-if="label || $slots['label']" :for="id" class="vs-checkbox-label">
            <slot name="label">{{ label }}</slot>
        </label>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, PropType, Ref, ref, toRefs, watch } from 'vue';
import { ColorScheme, UIState, VsNode } from '@/declaration';
import { useColorScheme, useStateClass } from '@/composables';
import { utils } from '@/utils';
import { VsIcon } from '@/icons';

export default defineComponent({
    name: VsNode.VsCheckboxNode,
    components: { VsIcon },
    props: {
        colorScheme: { type: String as PropType<'default' | ColorScheme> },
        styleSet: { type: Object as PropType<{ [key: string]: any }> },
        ariaLabel: { type: String, default: '' },
        checked: { type: Boolean, default: false },
        dense: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        id: { type: String, required: true },
        indeterminate: { type: Boolean, default: false },
        label: { type: String, default: '' },
        name: { type: String, default: '' },
        readonly: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        state: { type: String as PropType<UIState>, default: UIState.Idle },
        value: { type: null, default: 'true' },
    },
    emits: ['change', 'toggle', 'focus', 'blur'],
    expose: ['focus', 'blur'],
    setup(props, { emit }) {
        const { colorScheme, checked, indeterminate, dense, disabled, readonly, state } = toRefs(props);

        const checkColorSchemeClass = computed(() => {
            const propColorScheme = colorScheme.value === 'default' ? undefined : colorScheme.value;
            const { colorSchemeClass } = useColorScheme(VsNode.VsCheckboxNode, ref(propColorScheme));
            return colorSchemeClass.value;
        });

        const { stateClasses } = useStateClass(state);

        const checkboxRef: Ref<HTMLInputElement | null> = ref(null);

        const classObj = computed(() => ({
            'vs-checked': checked.value,
            'vs-dense': dense.value,
            'vs-disabled': disabled.value,
            'vs-readonly': readonly.value,
        }));

        const icon = computed(() => {
            if (checked.value) {
                return 'checkboxChecked';
            }

            if (indeterminate.value) {
                return 'checkboxIndeterminate';
            }

            return 'checkboxUnchecked';
        });

        function onClick(event: Event) {
            emit('change', event);
            emit('toggle', !checked.value);
        }

        function onFocus(event: FocusEvent) {
            emit('focus', event);
        }

        function onBlur(event: FocusEvent) {
            emit('blur', event);
        }

        function focus() {
            checkboxRef.value?.focus();
        }

        function blur() {
            checkboxRef.value?.blur();
        }

        watch(
            checked,
            (value) => {
                nextTick(() => {
                    if (checkboxRef.value) {
                        checkboxRef.value.checked = value;
                    }
                });
            },
            { immediate: true },
        );

        return {
            checkboxRef,
            checkColorSchemeClass,
            classObj,
            icon,
            onClick,
            onFocus,
            onBlur,
            focus,
            blur,
            convertToString: utils.string.convertToString,
            stateClasses,
        };
    },
});
</script>

<style lang="scss" src="./VsCheckboxNode.scss" />
