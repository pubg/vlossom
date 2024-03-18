<template>
    <div :class="['vs-toast', `vs-${getColorScheme()}`]" :style="computedStyle" role="alert">
        <div class="toast-content">
            <span v-html="toastInfo.text" />
        </div>
        <div class="close-button-container">
            <button
                ref="closeButtonRef"
                v-if="!toastInfo.autoClose"
                type="button"
                class="close-button"
                @click="closeToast"
                aria-label="close"
            >
                <vs-icon icon="close" size="20px" />
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, ref, toRef, toRefs } from 'vue';
import { UIState } from '@/declaration';
import { useColorScheme } from '@/composables';
import { VsIcon } from '@/icons';
import { store } from '@/stores';
import { VsComponent } from '@/declaration';

import type { ToastInfo } from '@/plugins';

const name = VsComponent.VsToast;
export default defineComponent({
    name,
    components: { VsIcon },
    props: {
        toastInfo: { type: Object as PropType<ToastInfo>, required: true },
    },
    setup(props) {
        const { toastInfo } = toRefs(props);
        const closeButtonRef = ref(null);

        function getColorScheme() {
            let color = 'default';
            if (toastInfo.value.state) {
                switch (toastInfo.value.state) {
                    case UIState.Success:
                        color = 'green';
                        break;
                    case UIState.Info:
                        color = 'light-blue';
                        break;
                    case UIState.Error:
                        color = 'red';
                        break;
                    case UIState.Warning:
                        color = 'orange';
                        break;
                    default:
                        color = 'indigo';
                        break;
                }
            }

            if (toastInfo.value.colorScheme) {
                const { computedColorScheme } = useColorScheme(name, toRef(toastInfo.value.colorScheme));
                color = computedColorScheme.value;
            }
            return color;
        }

        const computedStyle = computed(() => {
            const style: { [key: string]: any } = {};

            switch (toastInfo.value.align) {
                case 'start':
                    style.alignSelf = 'flex-start';
                    break;
                case 'center':
                    style.alignSelf = 'center';
                    break;
                case 'end':
                    style.alignSelf = 'flex-end';
                    break;
                default:
                    style.alignSelf = 'center';
                    break;
            }
            return style;
        });

        function closeToast() {
            store.toast.removeToast(toastInfo.value.id);
        }

        return {
            closeButtonRef,
            getColorScheme,
            computedStyle,
            closeToast,
        };
    },
});
</script>

<style src="./VsToastView.scss" scoped />
