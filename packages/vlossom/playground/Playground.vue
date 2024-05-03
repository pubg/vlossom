<template>
    <vs-page>
        <template #title>Vlossom Playground</template>

        Hello Vlossom!
        <vs-button @click="checked = !checked">Toggle Checkbox</vs-button>
        <vs-button @click="onClick">Show Toast</vs-button>
        <vs-checkbox :before-change="checkConfirm" label="hello" check-label="world" />
        <input type="checkbox" :checked="checked" />
    </vs-page>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useVlossom } from './../src';

export default {
    name: 'Playground',
    setup() {
        const $vs = useVlossom();

        const checked = ref(false);

        function onClick() {
            $vs.toast.show('Hello Vlossom!');
        }

        async function checkConfirm() {
            const answer = await $vs.confirm.open('Are you sure?');

            console.log(answer);
            return answer;
        }

        return {
            checkConfirm,
            checked,
            onClick,
        };
    },
};
</script>
