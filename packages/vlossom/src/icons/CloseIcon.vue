<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 -960 960 960">
        <path
            fill="currentColor"
            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
        />
    </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getIconProps } from './icon-props';

export default defineComponent({
    name: 'CloseIcon',
    props: {
        ...getIconProps(),
    },
});
</script>
