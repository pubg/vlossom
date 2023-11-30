<template>
    <div class="vs-container">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const VsContainer = defineComponent({
    name: 'vs-container',
    setup() {
        return {};
    },
});

export default VsContainer;
export type VsContainerInstance = InstanceType<typeof VsContainer>;
</script>

<style lang="scss" scoped src="./VsContainer.scss" />
