<template>
    <div :class="['vs-toast-item', `vs-${computedColorScheme}`]" :style="computedStyle">
        <button v-if="!toastInfo.autoClose" type="button" class="close-button" @click="closeToast">
            <vs-icon icon="close" style="color: #fff" size="20px" />
        </button>
        <div class="toast-content" :style="toastInfo.autoClose && { paddingTop: '1.4rem' }">
            <span v-html="text" />
        </div>
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRef, toRefs } from 'vue';
import { VsComponent } from '@/declaration';
import { useColorScheme } from '@/composables';
import { ToastInfo } from '@/declaration';
import { VsIcon } from '@/icons';
import { store } from '@/store';

const name = VsComponent.VsToastItem;

export default defineComponent({
    name,
    components: { VsIcon },
    props: {
        toastInfo: { type: Object as PropType<ToastInfo>, default: null },
    },
    setup(props) {
        console.log('Toast Item Rendered');
        const { toastInfo } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, toRef(toastInfo.value.colorScheme));

        const { align } = toastInfo.value;

        const computedStyle = computed(() => {
            const style: { [key: string]: any } = {};

            switch (align) {
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

        const text = computed(() => toastInfo.value?.text ?? '');

        function closeToast() {
            console.log('close', toastInfo.value.id);
            store.toastStore.removeToast(toastInfo.value.id);
        }

        return {
            computedColorScheme,
            text,
            computedStyle,
            closeToast,
        };
    },
});
</script>

<style src="./VsToastView.scss" scoped />
