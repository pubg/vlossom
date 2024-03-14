<template>
    <div :class="['vs-check-node', type, `vs-${colorScheme}`, { ...classObj }]" :style="styleSet">
        <div class="input-container">
            <vs-icon class="check-icon" :icon="icon" />
            <input
                :class="['check-input', boxGlowByState]"
                :type="type"
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
        <label v-if="label" :for="id" :class="textGlowByState">
            <slot name="label">{{ label }}</slot>
        </label>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';
import { ColorScheme, UIState } from '@/declaration';
import { useStateClass } from '@/composables';
import { VsIcon } from '@/icons';

type CheckNodeType = 'radio' | 'checkbox';

export default defineComponent({
    name: 'VsCheckNode',
    components: { VsIcon },
    props: {
        id: { type: String, required: true },
        colorScheme: {
            type: String as PropType<'default' | ColorScheme>,
            required: true,
        },
        styleSet: {
            type: Object as PropType<{ [key: string]: any }>,
            required: true,
        },
        type: {
            type: String as PropType<CheckNodeType>,
            required: true,
            default: 'checkbox',
        },
        checked: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        label: { type: String, default: '' },
        name: { type: String, default: '' },
        readonly: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        state: { type: String as PropType<UIState>, default: UIState.Idle },
        value: { type: null, default: 'true' },
    },
    emits: ['change', 'toggle', 'focus', 'blur'],
    setup(props, { emit }) {
        const { checked, disabled, readonly, state, type } = toRefs(props);

        const { boxGlowByState, textGlowByState } = useStateClass(state);

        const classObj = computed(() => ({
            checked: checked.value,
            disabled: disabled.value,
            readonly: readonly.value,
        }));

        const icon = computed(() => {
            if (type.value === 'radio') {
                return checked.value ? 'radioChecked' : 'radioUnchecked';
            }
            return 'check';
        });

        function toggle(event: Event) {
            emit('change', event);
            emit('toggle', (event.target as HTMLInputElement).checked);
        }

        function onFocus(e: FocusEvent) {
            emit('focus', e);
        }

        function onBlur(e: FocusEvent) {
            emit('blur', e);
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

<style lang="scss" scoped src="./VsCheckNode.scss" />
