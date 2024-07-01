<template>
    <vs-responsive :width="width" :grid="grid">
        <div class="vs-index-view">
            <template v-if="keepAlive">
                <KeepAlive>
                    <component :is="selectedComponent" role="tabpanel" tabindex="0" />
                </KeepAlive>
            </template>
            <template v-else>
                <component :is="selectedComponent" role="tabpanel" tabindex="0" />
            </template>
        </div>
    </vs-responsive>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue';
import { VsComponent } from '@/declaration';
import { getResponsiveProps } from '@/composables';
import VsResponsive from '@/components/vs-responsive/VsResponsive.vue';

const name = VsComponent.VsIndexView;

export default defineComponent({
    name,
    components: { VsResponsive },
    props: {
        ...getResponsiveProps(),
        keepAlive: { type: Boolean, default: true },
        // v-model
        modelValue: { type: Number, default: 0 },
    },
    setup(props, { slots }) {
        const { modelValue } = toRefs(props);

        const selectedComponent = computed(() => {
            if (!slots.default) {
                return null;
            }

            return slots.default()[modelValue.value];
        });

        return {
            selectedComponent,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsIndexView.scss" />
