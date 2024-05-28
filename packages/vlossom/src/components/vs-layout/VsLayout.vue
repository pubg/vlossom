<template>
    <div class="vs-layout" :style="layoutStyle">
        <slot />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, toRefs } from 'vue';
import { VS_LAYOUT, VsComponent, VsLayoutProvide } from '@/declaration';
import { useLayout } from '@/composables';

export default defineComponent({
    name: VsComponent.VsLayout,
    props: {
        drawerResponsive: { type: Boolean, default: false },
    },
    setup(props) {
        const { drawerResponsive } = toRefs(props);
        const { drawer, getDefaultLayoutProvide } = useLayout();

        provide<VsLayoutProvide>(VS_LAYOUT, getDefaultLayoutProvide());

        const layoutStyle = computed(() => {
            const { drawerOpen, placement, size } = drawer.value;

            if (drawerResponsive.value && drawerOpen) {
                if (placement === 'left') {
                    return {
                        paddingLeft: size,
                    };
                } else if (placement === 'right') {
                    return {
                        paddingRight: size,
                    };
                }
            }
            return {};
        });

        return {
            layoutStyle,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsLayout.scss" />
