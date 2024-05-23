<template>
    <div class="vs-layout">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue';
import { VS_LAYOUT, VsComponent, VsLayoutProvide } from '@/declaration';
import { useLayout } from '@/composables';

export default defineComponent({
    name: VsComponent.VsLayout,
    setup() {
        const { getDefaultLayoutProvide } = useLayout();

        provide<VsLayoutProvide>(VS_LAYOUT, getDefaultLayoutProvide());

        return {};
    },
});
</script>

<style lang="scss" scoped src="./VsLayout.scss" />
