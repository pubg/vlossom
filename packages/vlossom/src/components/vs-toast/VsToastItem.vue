<template>
    <div class="vs-toast-item">
        <div>Toast Item</div>
        {{ text }}
    </div>
</template>

<script lang="ts">
import { ToastInfo } from '@/declaration';
import { PropType, computed, defineComponent, toRefs } from 'vue';

export default defineComponent({
    name: 'VsToastItem',
    props: {
        toastInfo: { type: Object as PropType<ToastInfo>, default: null },
    },
    setup(props) {
        console.log('Toast Item Rendered');
        const { toastInfo } = toRefs(props);
        const text = computed(() => toastInfo.value?.text ?? '');
        // const toastColor
        return {
            text,
        };
    },
});
</script>

<style src="./VsToastView.scss" scoped />
