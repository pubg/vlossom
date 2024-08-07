<template>
    <vs-responsive
        :class="['vs-input-wrapper', { 'shake-horizontal': needToShake, 'vs-dense': dense }]"
        :width="width"
        :grid="grid"
    >
        <component :is="groupLabel ? 'fieldset' : 'div'">
            <component
                v-if="label || $slots['label']"
                :is="groupLabel ? 'legend' : 'label'"
                :for="groupLabel ? undefined : id || undefined"
                class="vs-label"
            >
                <slot name="label">
                    <span :class="{ 'vs-disabled': disabled }">{{ label }}</span>
                </slot>
                <i v-if="required" :class="['vs-required-star', { 'vs-disabled': disabled }]">*</i>
            </component>

            <slot />
        </component>

        <div class="vs-messages" v-if="!noMessage">
            <slot name="messages">
                <vs-message
                    class="vs-message-item"
                    :dense="dense"
                    v-for="(message, index) in messages"
                    :key="`${index}-${message.text}`"
                    :message="message"
                />
            </slot>
        </div>
    </vs-responsive>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, toRefs, watch } from 'vue';
import { VsComponent, type StateMessage } from '@/declaration';
import { getResponsiveProps } from '@/composables';
import VsResponsive from '@/components/vs-responsive/VsResponsive.vue';
import VsMessage from '@/components/vs-message/VsMessage.vue';

export default defineComponent({
    name: VsComponent.VsInputWrapper,
    components: { VsResponsive, VsMessage },
    props: {
        ...getResponsiveProps(),
        dense: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        groupLabel: { type: Boolean, default: false },
        id: { type: String, default: '' },
        label: { type: String, default: '' },
        messages: { type: Array as PropType<StateMessage[]>, default: () => [] },
        noMessage: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        shake: { type: Boolean, default: false },
    },
    setup(props) {
        const { shake } = toRefs(props);

        const needToShake = ref(false);
        watch(shake, () => {
            needToShake.value = true;
            setTimeout(() => {
                needToShake.value = false;
            }, 600);
        });

        return {
            needToShake,
        };
    },
});
</script>

<style lang="scss" src="./VsInputWrapper.scss" />
