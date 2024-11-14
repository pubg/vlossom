<template>
    <vs-responsive :class="['vs-index-view', colorSchemeClass]" :width="width" :grid="grid">
        <template v-if="keepAlive">
            <KeepAlive>
                <component :is="selectedComponent" />
            </KeepAlive>
        </template>
        <template v-else>
            <component :is="selectedComponent" />
        </template>
    </vs-responsive>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, PropType, Ref, ref, watch, nextTick } from 'vue';
import { ColorScheme, VsComponent } from '@/declaration';
import { useColorScheme } from '@/composables';
import { getResponsiveProps } from '@/models';
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

        const selectedKey: Ref<any> = ref('');

        const selectedComponent = computed(() => {
            if (!slots.default) {
                return null;
            }

            return slots.default().find((vnode) => vnode.key === selectedKey.value);
        });

        const keys = computed(() => {
            return (
                slots
                    .default?.()
                    .map((vnode) => vnode.key)
                    .filter((v) => {
                        return v !== undefined && v !== null;
                    }) || []
            );
        });

        watch(
            modelValue,
            (index) => {
                nextTick(() => {
                    selectedKey.value = keys.value[index];
                });
            },
            { immediate: true },
        );

        watch(keys, () => {
            nextTick(() => {
                selectedKey.value = keys.value[modelValue.value];
            });
        });

        return {
            keys,
            colorSchemeClass,
            selectedComponent,
        };
    },
});
</script>

<style lang="scss" src="./VsIndexView.scss" />
