<template>
    <div class="vs-confirm">
        <div class="vs-confirm-wrap">
            <slot />
            <div class="vs-confirm-buttons">
                <vs-button ref="okRef" :style-set="{ width: '12rem' }" @click="ok" primary>{{ okText }}</vs-button>
                <vs-button :style-set="{ width: '12rem' }" @click="cancel">{{ cancelText }}</vs-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/stores';
import { VS_CONFIRM_OK, VS_CONFIRM_CANCEL } from '@/declaration';
import VsButton from '@/components/vs-button/VsButton.vue';

export default defineComponent({
    name: 'VsConfirmation',
    components: { VsButton },
    props: {
        okText: { type: String, default: 'OK' },
        cancelText: { type: String, default: 'Cancel' },
    },
    setup() {
        function ok() {
            const id = store.overlay.getLastOverlayId();
            store.overlay.run<boolean>(id, VS_CONFIRM_OK);
        }

        function cancel() {
            const id = store.overlay.getLastOverlayId();
            store.overlay.run<boolean>(id, VS_CONFIRM_CANCEL);
        }

        return { ok, cancel };
    },
});
</script>

<style lang="scss" scoped>
.vs-confirm {
    display: flex;
    height: 100%;

    .vs-confirm-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        padding-top: 1.6rem;
    }

    .vs-confirm-buttons {
        margin-top: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
