<template>
    <vs-input-wrapper
        v-show="visible"
        :width="width"
        :grid="grid"
        :id="computedId"
        :label="label"
        :required="required"
        :disabled="computedDisabled"
        :dense="dense"
        :messages="computedMessages"
        :no-message="noMessage"
        :shake="shake"
    >
        <template #label v-if="label || $slots.label">
            <slot name="label" />
        </template>

        <div
            :class="['vs-file-drop', colorSchemeClass, classObj, stateClasses]"
            :style="computedStyleSet"
            @dragenter.stop="setDragging(true)"
            @dragleave.stop="setDragging(false)"
            @dragover.prevent
            @drop.stop.prevent="onDrop"
            @mouseenter="setHover(true)"
            @mouseleave="setHover(false)"
            tabindex="0"
            @focus="onFocus"
            @blur="onBlur"
        >
            <input
                ref="fileInputRef"
                class="vs-file-drop-input"
                :id="computedId"
                type="file"
                :name="name"
                :disabled="computedDisabled"
                :readonly="computedReadonly"
                :required="required"
                :multiple="multiple"
                :accept="accept"
                :aria-label="ariaLabel"
                @change.stop="updateValue()"
                tabindex="-1"
                style="display: none"
            />
            <div class="vs-file-drop-content">
                <slot v-if="$slots.default" />
                <template v-else>
                    <div v-if="!hasValue" class="vs-file-drop-placeholder">
                        <div class="vs-file-drop-title">Try it out!</div>
                        <div class="vs-file-drop-desc">Drag and drop files here</div>
                        <div class="vs-file-drop-demo">
                            This is just a demo Dropzone.<br />Dropped files are <b>not</b> actually uploaded.
                        </div>
                    </div>
                    <div v-else class="vs-file-drop-files">
                        <div v-if="multiple">
                            <div
                                v-for="(file, idx) in Array.isArray(inputValue) ? inputValue : []"
                                :key="file.name + idx"
                                class="vs-file-drop-file"
                            >
                                <vs-icon icon="success" size="32" />
                                <span>{{ file.name }}</span>
                                <span v-if="fileCount" class="vs-file-count">{{ fileCount }}</span>
                                <button
                                    v-if="!computedReadonly && !computedDisabled"
                                    class="vs-file-drop-clear"
                                    aria-label="Clear"
                                    tabindex="-1"
                                    @click.stop="onClear()"
                                >
                                    <vs-icon icon="close" size="16" />
                                </button>
                            </div>
                        </div>
                        <div v-else>
                            <div class="vs-file-drop-file">
                                <vs-icon icon="success" size="48" />
                                <span>{{ inputValue && !Array.isArray(inputValue) ? inputValue.name : '' }}</span>
                                <button
                                    v-if="
                                        !computedReadonly &&
                                        !computedDisabled &&
                                        inputValue &&
                                        !Array.isArray(inputValue)
                                    "
                                    class="vs-file-drop-clear"
                                    aria-label="Clear"
                                    tabindex="-1"
                                    @click.stop="onClear()"
                                >
                                    <vs-icon icon="close" size="16" />
                                </button>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <template #messages v-if="!noMessage">
            <slot name="messages" />
        </template>
    </vs-input-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from 'vue';
import { useColorScheme } from '@/composables/color-scheme-composable';
import { useStyleSet } from '@/composables/style-set-composable';
import { useInput } from '@/composables/input-composable';
import { useStateClass } from '@/composables/state-class-composable';
import { getInputProps } from '@/models/input-model';
import { getResponsiveProps } from '@/models/responsive-model';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import { VsIcon } from '@/icons';
import type { ColorScheme } from '@/declaration/types';

const name = 'VsFileDrop';
export default defineComponent({
    name,
    components: { VsInputWrapper, VsIcon },
    props: {
        ...getInputProps<File | File[] | null>(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | Record<string, any>> },
        accept: { type: String, default: '' },
        multiple: { type: Boolean, default: false },
        modelValue: { type: [Object, Array] as PropType<File | File[] | null>, default: null },
    },
    emits: ['update:modelValue', 'update:changed', 'update:valid', 'change', 'focus', 'blur'],
    setup(props, context) {
        const {
            colorScheme,
            styleSet,
            dense,
            disabled,
            id,
            messages,
            modelValue,
            readonly,
            rules,
            state,
            noDefaultRules,
            noMessage,
        } = toRefs(props);

        const fileInputRef = ref<HTMLInputElement | null>(null);
        const { emit } = context;
        const { colorSchemeClass } = useColorScheme(name, colorScheme);
        const { computedStyleSet } = useStyleSet(name, styleSet);
        const inputValue = ref<File | File[] | null>(modelValue.value);
        const dragging = ref(false);
        const hover = ref(false);
        const label = ref('');

        const { computedId, computedMessages, computedState, computedDisabled, computedReadonly, shake } = useInput(
            context,
            {
                inputValue,
                modelValue,
                id,
                disabled,
                readonly,
                messages,
                rules,
                defaultRules: [],
                noDefaultRules,
                state,
            },
        );

        const hasValue = computed(() => {
            if (Array.isArray(inputValue.value)) {
                return inputValue.value.length > 0;
            } else {
                return !!inputValue.value;
            }
        });

        const fileCount = computed(() => {
            if (!props.multiple || !Array.isArray(inputValue.value)) {
                return '';
            }
            return inputValue.value.length > 1 ? `${inputValue.value.length} files` : '';
        });

        function setDragging(val: boolean) {
            dragging.value = val;
        }
        function setHover(val: boolean) {
            if (computedDisabled.value) {
                hover.value = false;
            } else {
                hover.value = val;
            }
        }

        function updateValue(event?: Event) {
            if (!event) {
                return;
            }

            const target = event.target as HTMLInputElement;
            const targetValue = Array.from(target.files || []);

            if (props.multiple) {
                inputValue.value = targetValue;
            } else {
                inputValue.value = targetValue[0] || null;
            }
        }
        function onDrop(event: DragEvent) {
            event.preventDefault();
            setDragging(false);

            const files = event.dataTransfer?.files;
            if (!files) {
                return;
            }

            const fileList = Array.from(files);
            if (props.multiple) {
                inputValue.value = fileList;
            } else {
                inputValue.value = fileList[0] || null;
            }
        }
        function onClear() {
            // 추후 구현
        }
        function onFocus(e: FocusEvent) {
            emit('focus', e);
        }
        function onBlur(e: FocusEvent) {
            emit('blur', e);
        }

        const classObj = computed(() => ({
            'vs-dense': dense.value,
            'vs-disabled': computedDisabled.value,
            'vs-readonly': computedReadonly.value,
            'vs-dragging': dragging.value,
            'vs-hover': hover.value && !computedDisabled.value,
        }));
        const { stateClasses } = useStateClass(computedState);

        return {
            computedId,
            fileInputRef,
            classObj,
            colorSchemeClass,
            computedStyleSet,
            inputValue,
            hasValue,
            computedMessages,
            computedDisabled,
            computedReadonly,
            shake,
            onClear,
            updateValue,
            onDrop,
            onFocus,
            onBlur,
            setDragging,
            setHover,
            dragging,
            hover,
            stateClasses,
            noMessage,
            label,
            fileCount,
        };
    },
});
</script>

<style lang="scss" src="./VsFileDrop.scss" />
