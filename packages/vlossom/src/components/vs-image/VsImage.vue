<template>
    <div :class="['vs-image']"> </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { VsComponent } from '@/declaration';

const name = VsComponent.VsImage;

export default defineComponent({
    name,
    props: {},
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped src="./VsImage.scss" />
