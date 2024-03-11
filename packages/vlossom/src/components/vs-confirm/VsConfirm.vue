<template>
    <vs-modal v-model="isOpen" :style-set="dialogStylSet" :size="confirmInfo.size || 'sm'" :close-on-esc="false">
        <div class="confirm-text scale-up-center">
            <p v-html="confirmInfo.text"></p>
        </div>
        <template #footer>
            <div class="confirm-footer">
                <vs-button
                    :color-scheme="computedColorScheme === 'default' ? 'indigo' : computedColorScheme"
                    class="ok-button"
                    aria-label="ok"
                    dense
                    @click="ok"
                >
                    {{ confirmInfo.okText || 'Ok' }}
                </vs-button>
                <vs-button
                    :color-scheme="computedColorScheme === 'default' ? 'indigo' : computedColorScheme"
                    class="cancel-button"
                    aria-label="cancel"
                    dense
                    @click="cancel"
                >
                    {{ confirmInfo.cancelText || 'Cancel' }}
                </vs-button>
            </div>
        </template>
    </vs-modal>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, toRef, toRefs } from 'vue';
import { useColorScheme } from '@/composables';
import { VsComponent } from '@/declaration';
import { store } from '@/store';
import VsButton from '@/components/vs-button/VsButton.vue';
import VsModal from '../vs-modal/VsModal.vue';

import type { ConfirmInfo } from '@/plugins';

const name = VsComponent.VsConfirm;
export default defineComponent({
    name,
    components: { VsButton, VsModal },
    props: {
        confirmInfo: { type: Object as PropType<ConfirmInfo>, required: true },
    },
    setup(props) {
        const { confirmInfo } = toRefs(props);

        const isOpen = ref(true);

        const { computedColorScheme } = useColorScheme(name, toRef(confirmInfo.value.colorScheme));

        const dialogStylSet = {
            padding: '0',
        };

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
            computedColorScheme,
            dialogStylSet,
            ok,
            cancel,
        };
    },
});
</script>

<style src="./VsConfirm.scss" scoped />
