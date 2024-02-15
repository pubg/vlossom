<template>
    <div class="vs-input-wrapper" :class="{ 'shake-horizontal': needToShake }">
        <fieldset v-if="group">
            <legend v-if="!noLabel">
                <slot name="label">
                    <span class="vs-label">{{ label }}</span>
                </slot>
                <i class="required-star" v-if="required">*</i>
            </legend>

            <slot />
        </fieldset>

        <template v-else>
            <label v-if="!noLabel" :for="id || undefined">
                <slot name="label">
                    <span class="vs-label">{{ label }}</span>
                </slot>
                <i class="required-star" v-if="required">*</i>
            </label>

            <slot />
        </template>

        <slot name="messages">
            <div class="vs-messages" v-if="!noMsg">
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
import { VsComponent, type StateMessage } from '@/declaration';
import VsMessage from '@/components/vs-message/VsMessage.vue';

export default defineComponent({
    name: VsComponent.VsInputWrapper,
    components: { VsMessage },
    props: {
        group: { type: Boolean, default: false },
        id: { type: String, default: '' },
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
</script>

<style lang="scss" scoped src="./VsInputWrapper.scss" />
