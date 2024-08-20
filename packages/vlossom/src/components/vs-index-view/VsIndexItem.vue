<template>
    <div :class="['vs-index-item', colorSchemeClass]">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, PropType, toRefs } from 'vue';
import { ColorScheme, VsComponent } from '@/declaration';
import { useColorScheme } from '@/composables';
import { utils } from '@/utils';

const name = VsComponent.VsIndexItem;
export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
    },
    setup(props) {
        const { colorScheme } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const instance = getCurrentInstance();
        const key = instance?.vnode.key;
        if (!key) {
            utils.log.warning(name, 'key is required');
        }

        return {
            colorSchemeClass,
        };
    },
});
</script>

<style lang="scss" src="./VsIndexView.scss" />
