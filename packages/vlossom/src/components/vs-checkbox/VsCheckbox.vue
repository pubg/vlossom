<template>
    <vs-wrapper :width="width" :grid="grid" v-show="visible">
        <vs-input-wrapper
            :label="label"
            :messages="computedMessages"
            :no-label="noLabel"
            :no-msg="noMsg"
            :required="required"
            :shake="shake"
        >
            <div :class="['vs-checkbox', `vs-${computedColorScheme}`, { ...classObj }]" :style="customProperties">
                <div class="checkbox">
                    <check-icon class="check-icon" />
                    <input
                        type="checkbox"
                        :id="id"
                        :name="name"
                        :value="value"
                        :checked="inputValue"
                        @change="toggle"
                    />
                </div>
                <label v-if="checkLabel" :for="id">{{ checkLabel }}</label>
            </div>
        </vs-input-wrapper>
    </vs-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from 'vue';
import { useColorScheme, useCustomStyle, getResponsiveProps, getInputProps, useInput } from '@/composables';
import { ColorScheme, VsComponent } from '@/declaration/types';
import { stringUtil } from '@/utils';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';
import CheckIcon from '@/assets/icons/check';

interface CheckboxStyleSet {
    backgroundColor: string;
    border: string;
    borderRadius: string;
    checkLabelColor: string;
    fontSize: string;
    height: string;
    iconColor: string;
    width: string;
}

export type VsCheckboxStyleSet = Partial<CheckboxStyleSet>;

const name = VsComponent.VsCheckbox;

export default defineComponent({
    name,
    components: { VsInputWrapper, VsWrapper, CheckIcon },
    props: {
        ...getInputProps<boolean>(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsCheckboxStyleSet>, default: '' },
        beforeChange: {
            type: Function as PropType<(value: any) => Promise<boolean> | null>,
            default: null,
        },
        checkLabel: { type: String, default: '' },
        name: { type: String, default: '' },
        value: { type: String, default: '' },
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue', 'update:changed', 'update:valid', 'change'],
    expose: ['clear', 'validate'],
    setup(props, context) {
        const {
            colorScheme,
            styleSet,
            beforeChange,
            disabled,
            label,
            modelValue,
            messages,
            readonly,
            required,
            rules,
        } = toRefs(props);

        const classObj = computed(() => ({
            checked: inputValue.value,
            disabled: disabled.value,
            readonly: readonly.value,
        }));

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { customProperties } = useCustomStyle<VsCheckboxStyleSet>(name, styleSet);

        const id = stringUtil.createID();

        const inputValue = ref(modelValue.value);

        function requiredCheck(v: boolean) {
            return required.value && !v ? 'required' : '';
        }

        const allRules = computed(() => [...rules.value, requiredCheck]);

        const { computedMessages, shake, validate, clear } = useInput(inputValue, modelValue, context, label, {
            messages,
            rules: allRules,
            callbacks: {
                onMounted: () => {
                    inputValue.value = Boolean(modelValue.value);
                },
                onClear: () => {
                    inputValue.value = false;
                },
            },
        });

        async function toggle(e: Event) {
            const beforeChangeFn = beforeChange.value;
            if (beforeChangeFn) {
                const result = await beforeChangeFn(inputValue.value);
                if (!result) {
                    return;
                }
            }

            const target = e.target as HTMLInputElement;
            inputValue.value = target.checked;
        }

        return {
            classObj,
            computedColorScheme,
            customProperties,
            id,
            inputValue,
            computedMessages,
            shake,
            validate,
            clear,
            toggle,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsCheckbox.scss" />
