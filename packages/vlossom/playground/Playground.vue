<template>
    <vs-page>
        <template #title>Vlossom Playground</template>

        Hello World
        <vs-input modelValue="aaaa" dense />
        <vs-button loading dense>hello</vs-button>
        <vs-checkbox :modelValue="true" color-scheme="red" />
        <vs-chip closable>hello</vs-chip>
        <vs-checkbox :modelValue="false" color-scheme="red" />
        <vs-notice color-scheme="red" primary>Notice</vs-notice>
    </vs-page>
</template>

<script lang="ts">
export default {
    name: 'Playground',
    setup() {
        return {};
    },
};
</script>
