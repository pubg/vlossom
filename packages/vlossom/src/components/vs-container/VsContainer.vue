<template>
    <div class="vs-container">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { VsComponent } from '@/declaration';

export default defineComponent({
    name: VsComponent.VsContainer,
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped src="./VsContainer.scss" />
