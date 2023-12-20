<template>
    <div class="vs-input-wrapper" :class="{ 'shake-horizontal': needToShake }">
        <label v-if="!noLabel" v-show="label">
            <slot name="label">
                <span class="label">{{ label }}</span>
            </slot>
            <i class="required-star" v-if="required">*</i>
        </label>

        <div>
            <slot />
        </div>

        <slot name="messages">
            <div class="messages" v-if="!noMsg">
                <vs-message
                    v-for="(message, index) in messages"
                    :key="`${index}-${message.message}`"
                    :message="message"
                />
            </div>
        </slot>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, toRefs, watch } from 'vue';
import { StateMessage } from '@/declaration/types';
import VsMessage from '@/components/vs-message/VsMessage/VsMessage.vue';

const VsInputWrapper = defineComponent({
    name: 'vs-input-wrapper',
    components: { VsMessage },
    props: {
        label: { type: String, default: '' },
        messages: { type: Array as PropType<StateMessage[]>, default: () => [] },
        noLabel: { type: Boolean, default: false },
        noMsg: { type: Boolean, default: false },
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

export default VsInputWrapper;
export type VsInputWrapperInstance = InstanceType<typeof VsInputWrapper>;
</script>

<style lang="scss" scoped src="./VsInputWrapper.scss" />
