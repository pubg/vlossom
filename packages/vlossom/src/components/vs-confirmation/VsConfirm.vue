<template>
    <div class="vs-confirm">
        <div class="vs-confirm-wrap">
            <slot />
            <div class="vs-confirm-buttons">
                <vs-button ref="okRef" :style-set="getButtonStyleSet(plainStyleSet?.okButton)" @click="ok" primary>
                    {{ okText }}
                </vs-button>
                <vs-button :style-set="getButtonStyleSet(plainStyleSet?.cancelButton)" @click="cancel">
                    {{ cancelText }}
                </vs-button>
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
import type { VsButtonStyleSet } from '@/components/vs-button/types';

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

        function getButtonStyleSet(buttonStyleSet: VsButtonStyleSet = {}) {
            return { width: '12rem', ...buttonStyleSet };
        }

        function ok() {
            const id = store.overlay.getLastOverlayId();
            store.overlay.run<boolean>(id, VS_CONFIRM_OK);
        }

        function cancel() {
            const id = store.overlay.getLastOverlayId();
            store.overlay.run<boolean>(id, VS_CONFIRM_CANCEL);
        }

        return { plainStyleSet, getButtonStyleSet, ok, cancel };
    },
});
</script>

<style lang="scss" src="./VsConfirm.scss" />
