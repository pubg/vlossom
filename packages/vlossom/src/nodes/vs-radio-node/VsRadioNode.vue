<template>
    <div :class="['vs-radio-node', colorSchemeClass, classObj, stateClasses]" :style="computedStyleSet">
        <label class="vs-radio-wrap" :for="computedId">
            <input
                ref="radioRef"
                type="radio"
                class="vs-radio-input"
                :aria-label="ariaLabel"
                :id="computedId"
                :disabled="disabled || readonly"
                :name="name"
                :value="convertToString(value)"
                :checked="checked"
                :aria-required="required"
                @change.stop="toggle"
                @focus.stop="onFocus"
                @blur.stop="onBlur"
            />

            <span class="vs-radio-label">
                <slot name="label">{{ label }}</slot>
            </span>
        </label>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref, toRefs } from 'vue';
import { ColorScheme, UIState, VsNode } from '@/declaration';
import { useColorScheme, useLazyId, useStateClass, useStyleSet } from '@/composables';
import { utils } from '@/utils';
import { VsRadioNodeStyleSet } from './types';

const name = VsNode.VsRadioNode;
export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsRadioNodeStyleSet> },
        ariaLabel: { type: String, default: '' },
        checked: { type: Boolean, default: false },
        dense: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        id: { type: String, default: '' },
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
        const { colorScheme, styleSet, dense, disabled, readonly, state, id } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet(name, styleSet);

        const radioRef: Ref<HTMLInputElement | null> = ref(null);

        const { stateClasses } = useStateClass(state);

        const classObj = computed(() => ({
            'vs-dense': dense.value,
            'vs-disabled': disabled.value,
            'vs-readonly': readonly.value,
        }));

        const { computedId } = useLazyId(id);

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

        function focus() {
            radioRef.value?.focus();
        }

        function blur() {
            radioRef.value?.blur();
        }

        return {
            radioRef,
            classObj,
            toggle,
            onFocus,
            onBlur,
            focus,
            blur,
            colorSchemeClass,
            computedStyleSet,
            stateClasses,
            computedId,
            convertToString: utils.string.convertToString,
        };
    },
});
</script>

<style lang="scss" src="./VsRadioNode.scss" />
