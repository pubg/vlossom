<template>
    <div class="vs-index-item">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';
import { VsComponent } from '@/declaration';

const name = VsComponent.VsIndexItem;

export default defineComponent({
    name,
    setup() {
        const instance = getCurrentInstance();
        const key = instance?.vnode.key;
        if (!key) {
            console.error('[vs-index-item] error: key is required');
        }
    },
});
</script>

<style lang="scss" scoped src="./VsIndexView.scss" />
