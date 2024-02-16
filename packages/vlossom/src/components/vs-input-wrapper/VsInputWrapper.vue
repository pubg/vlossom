<template>
    <div class="vs-input-wrapper" :class="{ 'shake-horizontal': needToShake }">
        <component :is="groupLabel ? 'fieldset' : 'div'">
            <component
                :is="groupLabel ? 'legend' : 'label'"
                v-if="!noLabel"
                :for="groupLabel ? undefined : id || undefined"
            >
                <slot name="label">
                    <span class="vs-label">{{ label }}</span>
                </slot>
                <i class="required-star" v-if="required">*</i>
            </component>

            <slot />
        </component>

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
        groupLabel: { type: Boolean, default: false },
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
