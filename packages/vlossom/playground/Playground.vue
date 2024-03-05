<template>
    <vs-page>
        <template #title>Vlossom Playground</template>
        Hello Vlossom!
    </vs-page>
</template>

<script lang="ts">
import { useVlossom } from '../src';

export default {
    name: 'Playground',
    setup() {
        const vs = useVlossom();
        vs.toast.info('Hello Vlossom!');
    },
};
</script>
