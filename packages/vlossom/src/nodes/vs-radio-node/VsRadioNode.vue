<template>
    <div :class="['vs-radio-node', `vs-${colorScheme}`, { ...classObj }]" :style="styleSet">
        <label class="radio-wrap">
            <input
                type="radio"
                :class="['radio-input', boxGlowByState]"
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

            <span :class="['radio-label', textGlowByState]">
                <slot name="label">{{ label }}</slot>
            </span>
        </label>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';
import { ColorScheme, UIState } from '@/declaration';
import { useStateClass } from '@/composables';

export default defineComponent({
    name: 'VsRadioNode',
    props: {
        colorScheme: { type: String as PropType<'default' | ColorScheme> },
        styleSet: { type: Object as PropType<{ [key: string]: any }> },
        checked: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        id: { type: String, required: true },
        label: { type: String, default: '' },
        name: { type: String, default: '' },
        readonly: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        state: { type: String as PropType<UIState>, default: UIState.Idle },
        value: { type: null, default: 'true' },
    },
    emits: ['change', 'toggle', 'focus', 'blur'],
    setup(props, { emit }) {
        const { disabled, readonly, state } = toRefs(props);

        const { boxGlowByState, textGlowByState } = useStateClass(state);

        const classObj = computed(() => ({
            disabled: disabled.value,
            readonly: readonly.value,
        }));

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

<style lang="scss" scoped src="./VsRadioNode.scss" />
