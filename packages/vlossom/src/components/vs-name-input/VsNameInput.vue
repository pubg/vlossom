<template>
    <vs-wrapper :width="width" :grid="grid">
        <vs-input-wrapper
            :label="label"
            :messages="computedMessages"
            :no-label="noLabel"
            :no-msg="noMsg"
            :required="required"
        >
            <input
                class="first-name"
                :value="inputValue.firstName"
                :placeholder="placeholderFirstName"
                @input.stop="updateValue('firstName', $event)"
                @focus.stop="onFocus('firstName', $event)"
                @blur.stop="onBlur('firstName', $event)"
                @change.stop
            />
            <input
                class="last-name"
                :value="inputValue.lastName"
                :placeholder="placeholderLastName"
                @input.stop="updateValue('lastName', $event)"
                @focus.stop="onFocus('lastName', $event)"
                @blur.stop="onBlur('lastName', $event)"
                @change.stop
            />
            changed: {{ changed }} / valid: {{ valid }}
            <button class="clear-btn" type="button" @click.stop="clear">clear</button>
        </vs-input-wrapper>
    </vs-wrapper>
</template>

<script lang="ts">
import { PropType, Ref, computed, defineComponent, ref, toRefs, watch } from 'vue';
import { getInputProps, getResponsiveProps, useInput } from '@/composables';
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';

export interface NameInputValue {
    firstName: string;
    lastName: string;
}

export default defineComponent({
    components: { VsWrapper, VsInputWrapper },
    props: {
        ...getResponsiveProps(),
        ...getInputProps<NameInputValue>(),
        placeholderFirstName: { type: String, default: 'first name' },
        placeholderLastName: { type: String, default: 'last name' },
        // v-model
        modelValue: {
            type: Object as PropType<NameInputValue>,
            default: null,
        },
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
    },
    expose: ['validate', 'focus', 'blur', 'clear'],
    emits: [
        'update:modelValue',
        'update:changed',
        'update:valid',
        'update:firstName',
        'update:lastName',
        'change',
        'focus',
        'blur',
    ],
    setup(props, context) {
        const { modelValue, firstName, lastName, messages, rules } = toRefs(props);
        const inputValue: Ref<NameInputValue> = ref({ firstName: '', lastName: '' });
        const { emit } = context;

        function clear(): void {
            inputValue.value = { firstName: '', lastName: '' };
        }

        function firstNameRequiredCheck(value: NameInputValue) {
            return value.firstName ? '' : 'firstName is required';
        }
        function lastNameRequiredCheck(value: NameInputValue) {
            return value.lastName ? '' : 'lastName is required';
        }
        const allRules = computed(() => [...rules.value, firstNameRequiredCheck, lastNameRequiredCheck]);

        const { computedMessages, validate } = useInput(inputValue, modelValue, context, {
            messages,
            rules: allRules,
            clear,
            callbacks: {
                onChange: (value, oldValue) => {
                    if (value.firstName !== oldValue.firstName) {
                        emit('update:firstName', value.firstName);
                    }
                    if (value.lastName !== oldValue.lastName) {
                        emit('update:lastName', value.lastName);
                    }
                },
                onMounted() {
                    inputValue.value = {
                        firstName: firstName.value || modelValue.value?.firstName || '',
                        lastName: lastName.value || modelValue.value?.lastName || '',
                    };
                },
            },
        });
        watch(firstName, (value) => {
            inputValue.value = { ...inputValue.value, firstName: value };
        });

        watch(lastName, (value) => {
            inputValue.value = { ...inputValue.value, lastName: value };
        });

        function updateValue(property: 'firstName' | 'lastName', event: Event): void {
            const target = event.target as HTMLInputElement;
            inputValue.value = { ...inputValue.value, [property]: target.value };
        }

        const firstInputRef: Ref<HTMLInputElement | null> = ref(null);
        const lastInputRef: Ref<HTMLInputElement | null> = ref(null);

        const focusedFirstName = ref(false);
        const focusedLastName = ref(false);
        const focused = computed(() => focusedFirstName.value || focusedLastName.value);

        function onFocus(type: 'firstName' | 'lastName', event: Event) {
            if (type === 'firstName') {
                focusedFirstName.value = true;
            } else {
                focusedLastName.value = true;
            }

            emit('focus', event);
        }

        function onBlur(type: 'firstName' | 'lastName', event: Event) {
            if (type === 'firstName') {
                focusedFirstName.value = false;
            } else {
                focusedLastName.value = false;
            }

            emit('blur', event);
        }

        function focus() {
            firstInputRef.value?.focus();
        }

        function blur() {
            if (focusedFirstName.value) {
                firstInputRef.value?.blur();
            }
            if (focusedLastName.value) {
                lastInputRef.value?.blur();
            }
        }

        return {
            inputValue,
            updateValue,
            computedMessages,
            validate,
            firstInputRef,
            lastInputRef,
            onFocus,
            onBlur,
            focused,
            focusedFirstName,
            focusedLastName,
            focus,
            blur,
            clear,
        };
    },
});
</script>
