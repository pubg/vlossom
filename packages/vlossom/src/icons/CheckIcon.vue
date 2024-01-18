<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 -960 960 960">
        <path fill="currentColor" d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getIconProps } from './icon-props';

export default defineComponent({
    name: 'CheckIcon',
    props: {
        ...getIconProps(),
    },
});
</script>
