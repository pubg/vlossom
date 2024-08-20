<template>
    <div :class="['vs-layout', colorSchemeClass]" :style="layoutStyle">
        <slot />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, provide, toRefs } from 'vue';
import { ColorScheme, VS_LAYOUT, VsComponent, VsLayoutProvide } from '@/declaration';
import { useColorScheme, useLayout } from '@/composables';

const name = VsComponent.VsLayout;
export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        drawerResponsive: { type: Boolean, default: false },
    },
    setup(props) {
        const { colorScheme, drawerResponsive } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);
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
            colorSchemeClass,
            layoutStyle,
        };
    },
});
</script>

<style lang="scss" src="./VsLayout.scss" />
