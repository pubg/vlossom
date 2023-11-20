<template>
    <input v-model="value" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const value = ref('');

        return {
            value,
        };
    },
});
</script>
