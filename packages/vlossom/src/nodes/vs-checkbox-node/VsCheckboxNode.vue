<template>
    <div :class="['vs-checkbox-node', `vs-${colorScheme}`, { ...classObj }]" :style="styleSet">
        <div class="checkbox-wrap">
            <vs-icon class="check-icon" :icon="icon" />
            <input
                type="checkbox"
                :class="['checkbox-input', boxGlowByState]"
                :id="id"
                :disabled="disabled || readonly"
                :name="name"
                :value="convertToString(value)"
                :checked="checked"
                :aria-required="required"
                @change="toggle"
                @focus="onFocus"
                @blur="onBlur"
            />
        </div>
        <label v-if="label || $slots['label']" :for="id" :class="['checkbox-label', textGlowByState]">
            <slot name="label">{{ label }}</slot>
        </label>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';
import { ColorScheme, UIState } from '@/declaration';
import { useStateClass } from '@/composables';
import { VsIcon } from '@/icons';

export default defineComponent({
    name: 'VsCheckboxNode',
    components: { VsIcon },
    props: {
        colorScheme: { type: String as PropType<'default' | ColorScheme> },
        styleSet: { type: Object as PropType<{ [key: string]: any }> },
        checked: { type: Boolean, default: false },
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
    setup(props, { emit }) {
        const { checked, indeterminate, disabled, readonly, state } = toRefs(props);

        const { boxGlowByState, textGlowByState } = useStateClass(state);

        const classObj = computed(() => ({
            checked: checked.value,
            disabled: disabled.value,
            readonly: readonly.value,
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

        function toggle(event: Event) {
            emit('change', event);
            emit('toggle', (event.target as HTMLInputElement).checked);
        }

        function onFocus(event: FocusEvent) {
            emit('focus', event);
        }

        function onBlur(event: FocusEvent) {
            emit('blur', event);
        }

        function convertToString(value: any) {
            if (typeof value === 'string') {
                return value;
            }

            return JSON.stringify(value);
        }

        return {
            classObj,
            icon,
            toggle,
            onFocus,
            onBlur,
            convertToString,
            boxGlowByState,
            textGlowByState,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsCheckboxNode.scss" />
