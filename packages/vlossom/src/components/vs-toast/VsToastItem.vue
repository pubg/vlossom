<template>
    <div :class="['vs-toast-item', `vs-${colorScheme}`]">
        <span v-html="text"></span>
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, ref, toRef, toRefs } from 'vue';
import { UIState, VsComponent } from '@/declaration';
import { useColorScheme } from '@/composables';
import { ToastInfo } from '@/declaration';

const name = VsComponent.VsToastItem;

export default defineComponent({
    name,
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
        const text = computed(() => toastInfo.value?.text ?? '');

        return {
            colorScheme,
            text,
        };
    },
});
</script>

<style src="./VsToastView.scss" scoped />
