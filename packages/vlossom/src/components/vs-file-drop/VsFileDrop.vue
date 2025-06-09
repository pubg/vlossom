<template>
    <vs-input-wrapper
        v-show="visible"
        :width="width"
        :grid="grid"
        :tabindex="disabled ? -1 : 0"
        :id="computedId"
        :class="classObj"
        :label="label"
        :required="required"
        :dense="dense"
        :readonly="computedReadonly"
        :messages="computedMessages"
        @mouseenter.stop="setHover(true)"
        @mouseleave.stop="setHover(false)"
        @keydown.enter.stop="openFileDialog()"
    >
        <template #label v-if="label || $slots['label']">
            <slot name="label" />
        </template>

        <div :class="['vs-file-drop', colorSchemeClass, classObj, stateClasses]" :style="computedStyleSet">
            <input
                ref="fileDropRef"
                class="vs-file-drop-ref"
                :id="computedId"
                type="file"
                :name="name"
                :readonly="computedReadonly"
                :required="required"
                :accept="accept"
                :multiple="multiple"
                :aria-label="ariaLabel"
                @change.stop="handleFileDialog($event)"
                @drop.stop="handleFileDrop($event)"
                @dragenter.stop="setDragging(true)"
                @dragleave.stop="setDragging(false)"
            />

            <div class="vs-file-drop-content">
                <slot :dragging="dragging" :hover="hover">
                    <div v-if="hasValue" class="vs-file-drop-files">
                        <vs-chip
                            v-for="file in computedInputValue"
                            :key="file.name"
                            :id="file.name"
                            no-round
                            :closable="!computedDisabled"
                            @close="handleFileRemoveClick(file)"
                        >
                            {{ `${file.name} (${file.size} bytes)` }}
                        </vs-chip>
                    </div>

                    <div v-else class="vs-file-drop-placeholder">
                        <vs-icon icon="attachFile" :size="dense ? 16 : 24" />
                        <span>{{ placeholder }}</span>
                    </div>
                </slot>
            </div>
        </div>
    </vs-input-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from 'vue';
import { Breakpoints, StateMessage, VsComponent, type ColorScheme } from '@/declaration';
import { getInputProps, getResponsiveProps } from '@/models';
import { useColorScheme, useInput, useStyleSet, useStateClass } from '@/composables';
import { useVsFileDropRules } from './vs-file-drop-rules';
import { VsChip, VsInputWrapper } from '@/components';
import { VsIcon } from '@/icons';
import type { InputValueType, VsFileDropStyleSet } from './types';

const name = VsComponent.VsFileDrop;
export default defineComponent({
    name,
    components: { VsInputWrapper, VsIcon, VsChip },
    props: {
        ...getInputProps<InputValueType>(),
        ...getResponsiveProps(),
        accept: { type: String, default: '' },
        multiple: { type: Boolean, default: true },
        height: { type: [String, Number, Object] as PropType<string | number | Breakpoints>, default: 'auto' },
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsFileDropStyleSet> },
        // v-model
        modelValue: { type: [Object, Array] as PropType<InputValueType>, default: [] as InputValueType },
    },
    emits: ['update:modelValue', 'update:changed', 'update:valid', 'change', 'drop'],
    setup(props, ctx) {
        const {
            id,
            colorScheme,
            styleSet,
            modelValue,
            disabled,
            multiple,
            rules,
            accept,
            readonly,
            dense,
            height,
            width,
            state,
        } = toRefs(props);

        const fileDropRef = ref<HTMLInputElement | null>(null);

        const inputValue = ref<InputValueType>(modelValue.value);

        const hover = ref(false);

        const dragging = ref(false);

        const messages = ref<StateMessage[]>([]);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsFileDropStyleSet>(
            name,
            styleSet,
            computed(() => ({ height: height.value, width: width.value })),
        );

        const { computedId, computedDisabled, computedReadonly, computedMessages, computedState, validate } = useInput(
            ctx,
            {
                inputValue,
                modelValue,
                id,
                disabled,
                readonly,
                rules,
                messages,
                state,
            },
        );

        const { stateClasses } = useStateClass(computedState);

        const { verifyFileType, verifyMultipleFileUpload } = useVsFileDropRules({
            accept,
            multiple,
        });

        const computedInputValue = computed<File[]>(() => {
            if (!inputValue.value) {
                return [];
            }
            return [inputValue.value].flat();
        });

        const hasValue = computed(() => {
            return computedInputValue.value.length > 0;
        });

        const classObj = computed(() => ({
            'vs-hover': hover.value,
            'vs-dragging': dragging.value,
            'vs-disabled': computedDisabled.value,
            'vs-readonly': computedReadonly.value,
            'vs-dense': dense.value,
        }));

        function setHover(value: boolean): void {
            if (disabled.value || readonly.value) {
                return;
            }

            hover.value = value;
        }

        function setDragging(value: boolean): void {
            if (disabled.value || readonly.value) {
                return;
            }

            dragging.value = value;
        }

        function setInputValue(value: File[]): void {
            const error = verifyFileType(value) || verifyMultipleFileUpload(value);
            if (error) {
                messages.value = [{ state: 'error', text: error }];
                validate();
                return;
            }

            if (!multiple.value) {
                inputValue.value = value[0] || null;
                return;
            }

            if (value.length > 1) {
                messages.value = [{ state: 'info', text: `${value.length} files` }];
            }

            inputValue.value = value;
        }

        function openFileDialog(): void {
            if (computedDisabled.value || readonly.value) {
                return;
            }
            fileDropRef.value?.click();
        }

        function handleFileDialog(event: Event): void {
            const target = event.target as HTMLInputElement;
            const targetValue = Array.from(target.files || []);

            if (!targetValue.length) {
                return; // dialog canceled
            }

            setInputValue(targetValue);
        }

        function handleFileDrop(event: Event): void {
            const target = event.target as HTMLInputElement;
            const targetValue = Array.from(target.files || []);

            ctx.emit('drop', targetValue);
            setDragging(false);

            if (disabled.value) {
                return;
            }

            setInputValue(targetValue);
        }

        function handleFileRemoveClick(target: File): void {
            if (!target || !inputValue.value) {
                return;
            }

            const files = [inputValue.value].flat();
            const filteredFiles = files.filter((file) => file !== target);

            setInputValue(filteredFiles);
        }

        return {
            fileDropRef,
            computedId,
            computedMessages,
            computedInputValue,
            computedDisabled,
            computedReadonly,
            classObj,
            colorSchemeClass,
            computedStyleSet,
            inputValue,
            hasValue,
            dragging,
            hover,
            setHover,
            setDragging,
            openFileDialog,
            handleFileDialog,
            handleFileDrop,
            handleFileRemoveClick,
            stateClasses,
        };
    },
});
</script>

<style lang="scss" src="./VsFileDrop.scss" />
