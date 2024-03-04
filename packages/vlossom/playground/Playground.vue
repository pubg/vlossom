<template>
    <vs-page>
        <template #title>Vlossom Playground</template>
        Hello Vlossom!
    </vs-page>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue';
import { useVlossom } from '../src';

export default {
    name: 'Playground',
    setup() {
        const vs = useVlossom();
        vs.snackbar.info('Hello Vlossom!');
    },
};
</script>
