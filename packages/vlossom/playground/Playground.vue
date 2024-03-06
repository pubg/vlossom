<template>
    <vs-page>
        <template #title>Vlossom Playground</template>
        Hello Vlossom!
        <vs-button
            @click="
                $vs.toast.info('This is Toast This is Toast Info!', {
                    autoClose: false,
                })
            "
            >TOP</vs-button
        >
        <vs-button
            @click="
                $vs.toast.error('This is Toast Error This iis Toast Error This is Toast Error!', {
                    autoClose: false,
                    placement: 'bottom',
                })
            "
            >BOTTOM</vs-button
        >
        <vs-button
            @click="
                $vs.toast.success('This is Toast Successccess This is Toast Success This is Toast Success!', {
                    autoClose: false,
                    placement: 'top',
                    align: 'start',
                })
            "
            >LEFT</vs-button
        >
        <vs-button
            @click="
                $vs.toast.warn('This is Toast Warn! This iis Toast Warn This is Toast Warn', {
                    autoClose: false,
                    placement: 'top',
                    align: 'end',
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
