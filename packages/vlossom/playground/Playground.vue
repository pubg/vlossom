<template>
    <vs-page>
        <template #title>Vlossom Playground</template>
        Hello Vlossom!
        <vs-button
            @click="
                $vs.toast.info({
                    text: 'This is Toast Info!',
                    autoClose: false,
                })
            "
            >TOP</vs-button
        >
        <vs-button
            @click="
                $vs.toast.error({
                    text: 'This is Toast Error!',
                    autoClose: false,
                    placement: 'bottom',
                })
            "
            >BOTTOM</vs-button
        >
        <vs-button
            @click="
                $vs.toast.success({
                    text: 'This is Toast Error!',
                    autoClose: false,
                    placement: 'left',
                })
            "
            >LEFT</vs-button
        >
        <vs-button
            @click="
                $vs.toast.warn({
                    text: 'This is Toast Error!',
                    autoClose: false,
                    placement: 'right',
                })
            "
            >RIGHT</vs-button
        >
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
