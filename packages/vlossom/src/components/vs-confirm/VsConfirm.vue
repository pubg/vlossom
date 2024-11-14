<template>
    <vs-modal
        v-model="isOpen"
        :color-scheme="colorScheme"
        :style-set="styleSet"
        :close-on-dimmed-click="closeOnDimmedClick"
        :close-on-esc="closeOnEsc"
        :dimmed="dimmed"
        :focus-lock="focusLock"
        :has-container="hasContainer"
        :hide-scroll="hideScroll"
        :initial-focus-ref="initialFocusRef"
        :size="size"
    >
        <div class="vs-confirm-text scale-up-center">
            <p v-html="text"></p>
        </div>
        <template #footer>
            <slot name="footer">
                <div class="vs-confirm-footer">
                    <vs-button :color-scheme="colorScheme" class="vs-ok-button" primary @click="ok">
                        {{ okText }}
                    </vs-button>
                    <vs-button :color-scheme="colorScheme" class="vs-cancel-button" @click="cancel">
                        {{ cancelText }}
                    </vs-button>
                </div>
            </slot>
        </template>
    </vs-modal>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, toRefs, watch } from 'vue';
import { VsComponent, type ColorScheme } from '@/declaration';
import { store } from '@/stores';
import { getModalProps } from '@/models';
import VsButton from '@/components/vs-button/VsButton.vue';
import VsModal from '@/components/vs-modal/VsModal.vue';
import { VsModalStyleSet } from '@/components/vs-modal/types';

export default defineComponent({
    name: VsComponent.VsConfirm,
    components: { VsButton, VsModal },
    props: {
        ...getModalProps({ size: 'xs', closeOnDimmedClick: false }),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsModalStyleSet> },
        okText: { type: String, default: 'OK' },
        cancelText: { type: String, default: 'Cancel' },
        text: { type: String, required: true, default: '' },
        // v-model
        modelValue: { type: Boolean, default: true },
    },
    emits: ['update:modelValue'],
    // expose: ['ok', 'cancel'],
    setup(props, { emit }) {
        const { modelValue } = toRefs(props);

        const isOpen = ref(modelValue.value);

        watch(modelValue, (val) => {
            isOpen.value = val;
        });

        watch(isOpen, (val) => {
            emit('update:modelValue', val);
        });

        function ok() {
            store.confirm.executeResolve(true);
            isOpen.value = false;
        }

        function cancel() {
            store.confirm.executeResolve(false);
            isOpen.value = false;
        }

        return {
            isOpen,
            ok,
            cancel,
        };
    },
});
</script>

<style lang="scss" src="./VsConfirm.scss" />
