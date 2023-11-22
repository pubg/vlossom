<template>
    <div class="label">
        <label>
            <slot />
            <i class="required-star relative ml-4" v-if="required">*</i>
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
