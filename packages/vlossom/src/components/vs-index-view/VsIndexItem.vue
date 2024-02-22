<template>
    <div class="vs-index-item">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { VsComponent } from '@/declaration';

const name = VsComponent.VsIndexItem;

export default defineComponent({
    name,
});
</script>

<style lang="scss" scoped src="./VsIndexView.scss" />
