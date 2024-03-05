<template>
    <vs-page>
        <template #title>Vlossom Playground</template>
        Hello Vlossom!
        <vs-button @click="$vs.toast.info('This is Toast Info!')">INFO</vs-button>
        <vs-button @click="$vs.toast.error('This is Toast Error!')">ERROR</vs-button>
    </vs-page>
</template>

<script lang="ts">
// import { useVlossom } from '../src';

export default {
    name: 'Playground',
    setup() {
        // const { toast } = useVlossom();
        // toast.info('Hello Vlossom!');
    },
};
</script>
