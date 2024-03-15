<template>
    <div class="vs-index-item">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';
import { VsComponent } from '@/declaration';
import { logUtil } from '@/utils/log';

const name = VsComponent.VsIndexItem;

export default defineComponent({
    name,
    setup() {
        const instance = getCurrentInstance();
        const key = instance?.vnode.key;
        if (!key) {
            logUtil.logWarning(name, 'key is required');
        }
    },
});
</script>

<style lang="scss" scoped src="./VsIndexView.scss" />
