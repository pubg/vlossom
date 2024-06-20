<template>
    <div class="vs-input-wrapper" :class="{ 'shake-horizontal': needToShake }">
        <component :is="groupLabel ? 'fieldset' : 'div'">
            <component
                v-if="label || $slots['label']"
                :is="groupLabel ? 'legend' : 'label'"
                :for="groupLabel ? undefined : id || undefined"
                class="vs-label"
            >
                <slot name="label">
                    <span :class="{ disabled }">{{ label }}</span>
                </slot>
                <i v-if="required" :class="['required-star', { disabled }]">*</i>
            </component>

            <slot />
        </component>

        <div class="vs-messages" v-if="!noMessage && messages.length">
            <slot name="messages">
                <vs-message
                    class="message-item"
                    v-for="(message, index) in messages"
                    :key="`${index}-${message.text}`"
                    :message="message"
                />
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, toRefs, watch } from 'vue';
import { VsComponent, type StateMessage } from '@/declaration';
import VsMessage from '@/components/vs-message/VsMessage.vue';

export default defineComponent({
    name: VsComponent.VsInputWrapper,
    components: { VsMessage },
    props: {
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

<style lang="scss" scoped src="./VsInputWrapper.scss" />
