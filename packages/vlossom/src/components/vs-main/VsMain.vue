<template>
    <main class="vs-main">
        <slot />
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { VsComponent } from '@/declaration';

const name = VsComponent.VsMain;
export default defineComponent({
    name,
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped src="./VsMain.scss" />
