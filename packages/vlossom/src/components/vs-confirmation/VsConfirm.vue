<template>
    <div class="vs-confirm">
        <div class="vs-confirm-wrap">
            <slot />
            <div class="vs-confirm-buttons">
                <vs-button ref="okRef" :style-set="plainStyleSet?.okButton" @click="ok" primary>{{ okText }}</vs-button>
                <vs-button :style-set="plainStyleSet?.cancelButton" @click="cancel">{{ cancelText }}</vs-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { store } from '@/stores';
import { VS_CONFIRM_OK, VS_CONFIRM_CANCEL, VsComponent } from '@/declaration';
import { useStyleSet } from '@/composables';
import VsButton from '@/components/vs-button/VsButton.vue';

import type { VsConfirmStyleSet } from './types';

const name = VsComponent.VsConfirm;
export default defineComponent({
    name: 'VsConfirm',
    components: { VsButton },
    props: {
        styleSet: { type: [String, Object] as PropType<string | VsConfirmStyleSet> },
        okText: { type: String, default: 'OK' },
        cancelText: { type: String, default: 'Cancel' },
    },
    setup(props) {
        const { styleSet } = toRefs(props);
        const { plainStyleSet } = useStyleSet<VsConfirmStyleSet>(name, styleSet);

        function ok() {
            const id = store.overlay.getLastOverlayId();
            store.overlay.run<boolean>(id, VS_CONFIRM_OK);
        }

        function cancel() {
            const id = store.overlay.getLastOverlayId();
            store.overlay.run<boolean>(id, VS_CONFIRM_CANCEL);
        }

        return { plainStyleSet, ok, cancel };
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
