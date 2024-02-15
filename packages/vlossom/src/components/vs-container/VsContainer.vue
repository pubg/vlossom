<template>
    <div class="vs-container" :style="containerStyle">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { VsComponent } from '@/declaration';

export default defineComponent({
    name: VsComponent.VsContainer,
    props: {
        rowGap: { type: [Number, String], default: 0 },
        columnGap: { type: [Number, String], default: 0 },
    },
    computed: {
        containerStyle(): { [key: string]: any } {
            return {
                rowGap: isNaN(Number(this.rowGap)) ? this.rowGap : `${this.rowGap}px`,
                columnGap: isNaN(Number(this.columnGap)) ? this.columnGap : `${this.columnGap}px`,
            };
        },
    },
});
</script>

<style lang="scss" scoped src="./VsContainer.scss" />
