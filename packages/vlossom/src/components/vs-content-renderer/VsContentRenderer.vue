<template>
    <div v-if="typeof content === 'string'" v-html="content" />
    <component v-else :is="toRaw(content)" />
</template>

<script lang="ts">
import { Component, defineComponent, PropType, toRaw } from 'vue';

export default defineComponent({
    name: 'VsContentRenderer',
    props: {
        content: { type: [String, Object, Function] as PropType<string | Component>, required: true },
    },
    setup() {
        return { toRaw };
    },
});
</script>
