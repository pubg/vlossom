<template>
    <vs-responsive :class="['vs-index-view', colorSchemeClass]" :width="width" :grid="grid">
        <template v-if="keepAlive">
            <KeepAlive>
                <component :is="selectedComponent" role="tabpanel" tabindex="0" />
            </KeepAlive>
        </template>
        <template v-else>
            <component :is="selectedComponent" role="tabpanel" tabindex="0" />
        </template>
    </vs-responsive>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, PropType } from 'vue';
import { ColorScheme, VsComponent } from '@/declaration';
import { getResponsiveProps, useColorScheme } from '@/composables';
import VsResponsive from '@/components/vs-responsive/VsResponsive.vue';

const name = VsComponent.VsIndexView;
export default defineComponent({
    name,
    components: { VsResponsive },
    props: {
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        keepAlive: { type: Boolean, default: true },
        // v-model
        modelValue: { type: Number, default: 0 },
    },
    setup(props, { slots }) {
        const { colorScheme, modelValue } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const selectedComponent = computed(() => {
            if (!slots.default) {
                return null;
            }

            return slots.default()[modelValue.value];
        });

        return {
            colorSchemeClass,
            selectedComponent,
        };
    },
});
</script>

<style lang="scss" src="./VsIndexView.scss" />
