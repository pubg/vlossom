<template>
    <div class="vs-message">
        <span>{{ text }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'vs-message',
    props: {
        text: { type: String, default: '' },
    },
});
</script>