<template>
    <div v-html="content" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'VsModalString',
    props: {
        content: { type: String, required: true },
    },
    setup() {
        return {};
    },
});
</script>
