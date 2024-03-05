<template>
    <div :class="['vs-toast-item', `vs-${colorScheme}`]" :style="computedStyle">
        <button type="button" class="close-button" @click="closeToast">
            <vs-icon icon="close" style="color: #fff" size="20px" />
        </button>
        <div class="toast-content">
            <span v-html="text" />
        </div>
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, onMounted, ref, toRef, toRefs } from 'vue';
import { UIState, VsComponent } from '@/declaration';
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

        const colorScheme = ref('light-blue');
        // const { computedColorScheme } = useColorScheme(name, toRef(toastInfo.value.colorScheme));
        // TODO: 컬러를 지정하게 할 것인가? ui state 에 따라서 할 것인가?
        if (toastInfo.value.state === UIState.Error) {
            colorScheme.value = 'red';
        }
        const { placement, align } = toastInfo.value;

        const computedStyle = computed(() => {
            const style: { [key: string]: any } = {};

            switch (placement) {
                case 'top':
                    style.top = '5%';
                    style.left = '50%';
                    //  transform
                    break;
                case 'right':
                    break;
                case 'bottom':
                    break;
                case 'left':
                    break;
                default:
                    style.top = '5%';
                    style.left = '50%';
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
            colorScheme,
            text,
            computedStyle,
            closeToast,
        };
    },
});
</script>

<style src="./VsToastView.scss" scoped />
