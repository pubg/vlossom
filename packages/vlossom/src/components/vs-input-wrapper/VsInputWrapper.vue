<template>
    <div class="vs-input-wrapper" :class="{ 'shake-horizontal': needToShake }">
        <component :is="groupLabel ? 'fieldset' : 'div'">
            <component
                :is="groupLabel ? 'legend' : 'label'"
                v-if="!noLabel"
                :for="groupLabel ? undefined : id || undefined"
                :class="textGlowByState"
            >
                <slot name="label">
                    <span :class="['vs-label', { disabled }]">{{ label }}</span>
                </slot>
                <i :class="['required-star', { disabled }]" v-if="required">*</i>
            </component>

            <slot />
        </component>

        <slot name="messages">
            <div class="vs-messages" v-if="!noMessage">
                <vs-message v-for="(message, index) in messages" :key="`${index}-${message.text}`" :message="message" />
            </div>
        </slot>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, toRefs, watch } from 'vue';
import { VsComponent, type StateMessage, UIState } from '@/declaration';
import { useStateClass } from '@/composables';
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
        noLabel: { type: Boolean, default: false },
        noMessage: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        shake: { type: Boolean, default: false },
        state: { type: String as PropType<UIState>, default: UIState.Idle },
    },
    setup(props) {
        const { shake, state } = toRefs(props);

        const { textGlowByState } = useStateClass(state);

        const needToShake = ref(false);
        watch(shake, () => {
            needToShake.value = true;
            setTimeout(() => {
                needToShake.value = false;
            }, 600);
        });

        return {
            textGlowByState,
            needToShake,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsInputWrapper.scss" />
