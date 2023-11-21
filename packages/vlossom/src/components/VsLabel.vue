<template>
    <div class="vs-label">
        <label>
            <slot />
            <i v-if="required">*</i>
        </label>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'vs-label',
    props: {
        required: { type: Boolean, default: false },
    },
});
</script>
