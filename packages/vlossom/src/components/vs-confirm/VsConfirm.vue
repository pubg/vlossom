<template>
    <Transition>
        <div v-if="isOpen" class="vs-confirm">
            <div class="dimmed" aria-hidden="true" />
            <vs-focus-trap>
                <vs-dialog-node
                    id="confirm"
                    :class="['confirm-dialog', confirmInfo.size || 'sm']"
                    :style-set="dialogStylSet"
                    :close-on-esc="false"
                >
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
                </vs-dialog-node>
            </vs-focus-trap>
        </div>
    </Transition>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, toRef, toRefs } from 'vue';
import { useColorScheme } from '@/composables';
import { VsComponent } from '@/declaration';
import { store } from '@/store';
import VsButton from '@/components/vs-button/VsButton.vue';
import VsFocusTrap from '@/components/vs-focus-trap/VsFocusTrap.vue';
import { VsDialogNode } from '@/nodes';

import type { ConfirmInfo } from '@/plugins';

const name = VsComponent.VsConfirm;
export default defineComponent({
    name,
    components: { VsButton, VsFocusTrap, VsDialogNode },
    props: {
        confirmInfo: { type: Object as PropType<ConfirmInfo>, required: true },
    },
    setup(props) {
        const { confirmInfo } = toRefs(props);

        const isOpen = ref(true);

        const { computedColorScheme } = useColorScheme(name, toRef(confirmInfo.value.colorScheme));

        const dialogStylSet = {
            '--vs-dialog-node-padding': 0,
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
