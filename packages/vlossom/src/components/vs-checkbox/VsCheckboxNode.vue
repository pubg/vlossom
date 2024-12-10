<template>
    <div :class="['vs-checkbox-node', colorSchemeClass, classObj]" :style="computedStyleSet">
        <label class="vs-checkbox-wrap" :for="computedId">
            <input
                ref="checkboxRef"
                type="checkbox"
                :class="['vs-checkbox-input', stateClasses]"
                :aria-label="ariaLabel"
                :id="computedId"
                :disabled="disabled || readonly"
                :name="name"
                :value="convertToString(value)"
                :checked="checked"
                :aria-required="required"
                @click.prevent.stop="toggle"
                @focus.stop="onFocus"
                @blur.stop="onBlur"
            />
            <div v-if="label || $slots['label']" class="vs-checkbox-label">
                <slot name="label">{{ label }}</slot>
            </div>
        </label>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, PropType, Ref, ref, toRefs, watch } from 'vue';
import { ColorScheme, UIState, VsComponent } from '@/declaration';
import { useColorScheme, useLazyId, useStateClass, useStyleSet } from '@/composables';
import { utils } from '@/utils';
import { VsCheckboxNodeStyleSet } from './types';

const name = VsComponent.VsCheckboxNode;
export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsCheckboxNodeStyleSet> },
        ariaLabel: { type: String, default: '' },
        checked: { type: Boolean, default: false },
        dense: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        id: { type: String, default: '' },
        indeterminate: { type: Boolean, default: false },
        label: { type: String, default: '' },
        name: { type: String, default: '' },
        readonly: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        state: { type: String as PropType<UIState>, default: 'idle' },
        value: { type: null, default: 'true' },
    },
    emits: ['change', 'toggle', 'focus', 'blur'],
    // expose: ['focus', 'blur'],
    setup(props, { emit }) {
        const { colorScheme, styleSet, checked, id, indeterminate, dense, disabled, readonly, state } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet(name, styleSet);

        const { stateClasses } = useStateClass(state);

        const checkboxRef: Ref<HTMLInputElement | null> = ref(null);

        const classObj = computed(() => ({
            'vs-checked': checked.value,
            'vs-dense': dense.value,
            'vs-disabled': disabled.value,
            'vs-readonly': readonly.value,
            'vs-indeterminate': indeterminate.value,
        }));

        const { computedId } = useLazyId(id);

        function toggle(event: Event) {
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
            colorSchemeClass,
            classObj,
            onFocus,
            onBlur,
            focus,
            blur,
            convertToString: utils.string.convertToString,
            stateClasses,
            computedStyleSet,
            computedId,
            toggle,
        };
    },
});
</script>

<style lang="scss" src="./VsCheckboxNode.scss" />
