<template>
    <div class="vs-flex-layout">
        <div v-if="$slots['header']" class="vs-flex-layout-header">
            <slot name="header" />
        </div>

        <div :class="['vs-flex-layout-body', { 'vs-hide-scroll': hideScroll }]">
            <div class="vs-flex-layout-body-inner">
                <slot />
            </div>
        </div>

        <div v-if="$slots['footer']" class="vs-flex-layout-footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'VsFlexLayout',
    props: {
        hideScroll: { type: Boolean, default: false },
    },
    setup() {
        return {};
    },
});
</script>

<style lang="scss" src="./VsFlexLayout.scss" />
