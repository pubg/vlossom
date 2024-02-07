<template>
    <div :class="['vs-checkbox', `vs-${colorScheme}`, { ...classObj }]" :style="styleSet">
        <div class="checkbox-container">
            <span class="checkbox">
                <check-icon class="check-icon" />
            </span>
            <input
                type="checkbox"
                :id="id"
                :disabled="disabled || readonly"
                :name="name"
                :value="convertToString(value)"
                :checked="checked"
                @change="toggle"
                @focus="onFocus"
                @blur="onBlur"
            />
        </div>
        <label v-if="checkLabel" :for="id">{{ checkLabel }}</label>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';
import { ColorScheme, VsComponent } from '@/declaration';
import { CheckIcon } from '@/icons';

const name = VsComponent.VsCheckbox;
export default defineComponent({
    name,
    components: { CheckIcon },
    props: {
        id: { type: String, default: '' },
        colorScheme: { type: String as PropType<'default' | ColorScheme>, required: true },
        styleSet: { type: Object as PropType<{ [key: string]: any }>, required: true },
        checked: { type: Boolean, default: false, required: true },
        checkLabel: { type: String, default: '' },
        disabled: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
        name: { type: String, default: '' },
        value: { type: null, default: 'true' },
    },
    emits: ['toggle', 'focus', 'blur'],
    setup(props, context) {
        const { checked, disabled, readonly } = toRefs(props);

        const { emit } = context;

        const classObj = computed(() => ({
            checked: checked.value,
            disabled: disabled.value,
            readonly: readonly.value,
        }));

        function toggle(e: Event) {
            emit('toggle', e);
        }

        function onFocus() {
            emit('focus');
        }

        function onBlur() {
            emit('blur');
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
        };
    },
});
</script>

<style lang="scss" scoped src="./VsCheckboxNode.scss" />
