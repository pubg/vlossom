<template>
    <div v-if="typeof content === 'string'" v-html="content" />
    <component v-else :is="toRaw(content)" v-bind="props" />
</template>

<script lang="ts">
import { Component, defineComponent, PropType, toRaw } from 'vue';

export default defineComponent({
    name: 'VsContentRenderer',
    props: {
        content: { type: [String, Object, Function] as PropType<string | Component>, required: true },
        props: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    },
    setup() {
        return { toRaw };
    },
});
</script>
