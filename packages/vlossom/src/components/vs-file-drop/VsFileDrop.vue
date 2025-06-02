<template>
    <vs-input-wrapper
        v-show="visible"
        :id="computedId"
        :class="classObj"
        :required="required"
        :messages="computedMessages"
        @mouseenter.stop="setHover(true)"
        @mouseleave.stop="setHover(false)"
    >
        <div :class="['vs-file-drop', colorSchemeClass, classObj]" :style="computedStyleSet">
            <input
                ref="fileDropRef"
                class="vs-file-drop-ref"
                :id="computedId"
                type="file"
                :name="name"
                :required="required"
                :accept="accept"
                :multiple="multiple"
                @change.stop="handleFileDialog($event)"
                @drop.stop="handleFileDrop($event)"
                @dragenter.stop="setDragging(true)"
                @dragleave.stop="setDragging(false)"
            />

            <div class="vs-file-drop-content">
                <slot>
                    <div v-if="hasValue" class="vs-file-drop-files">
                        <vs-chip v-for="file in computedInputValue" :key="file.name" closable no-round>
                            {{ `${file.name} (${file.size} bytes)` }}
                        </vs-chip>
                    </div>

                    <div v-else class="vs-file-drop-placeholder">
                        <vs-icon icon="attachFile" size="40" />
                        <span>Drop files here or click to upload</span>
                    </div>
                </slot>
            </div>
        </div>
    </vs-input-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from 'vue';
import { StateMessage, VsComponent, type ColorScheme } from '@/declaration';
import { getInputProps } from '@/models';
import { useColorScheme, useInput, useStyleSet } from '@/composables';
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
        accept: { type: String, default: '' },
        multiple: { type: Boolean, default: true },
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsFileDropStyleSet> },
        // v-model
        modelValue: { type: [Object, Array] as PropType<InputValueType>, default: [] as InputValueType },
    },
    emits: ['update:modelValue', 'update:changed', 'change', 'drop'],
    setup(props, ctx) {
        const { id, colorScheme, styleSet, modelValue, disabled, multiple, rules, accept } = toRefs(props);

        const fileDropRef = ref<HTMLInputElement | null>(null);

        const inputValue = ref<InputValueType>(modelValue.value);

        const hover = ref(false);

        const dragging = ref(false);

        const messages = ref<StateMessage[]>([]);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsFileDropStyleSet>(name, styleSet);

        const { computedId, computedDisabled, computedMessages, validate } = useInput(ctx, {
            inputValue,
            modelValue,
            id,
            disabled,
            rules,
            messages,
        });

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
        }));

        function setHover(value: boolean): void {
            if (disabled.value) {
                return;
            }

            hover.value = value;
        }

        function setDragging(value: boolean): void {
            if (disabled.value) {
                return;
            }

            dragging.value = value;
        }

        function setInputValue(value: File[]): void {
            const error = verifyFileType(value) || verifyMultipleFileUpload(value);
            if (error) {
                messages.value.push({ state: 'error', text: error });
                validate();
                return;
            }

            if (!multiple.value) {
                inputValue.value = value[0] || null;
                return;
            }

            if (value.length > 1) {
                messages.value.push({ state: 'info', text: `${value.length} files` });
            }

            inputValue.value = value;
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

        return {
            fileDropRef,
            computedId,
            computedMessages,
            computedInputValue,
            classObj,
            colorSchemeClass,
            computedStyleSet,
            inputValue,
            hasValue,
            setHover,
            setDragging,
            handleFileDialog,
            handleFileDrop,
        };
    },
});
</script>

<style lang="scss" src="./VsFileDrop.scss" />
