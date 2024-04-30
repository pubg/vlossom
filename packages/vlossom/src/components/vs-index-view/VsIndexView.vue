<template>
    <vs-wrapper :width="width" :grid="grid">
        <div class="vs-index-view">
            <template v-if="keepAlive">
                <Transition enter-active-class="fade-in-bottom">
                    <KeepAlive>
                        <component :is="selectedComponent" role="tabpanel" tabindex="0" />
                    </KeepAlive>
                </Transition>
            </template>
            <template v-else>
                <Transition enter-active-class="fade-in-bottom">
                    <component :is="selectedComponent" role="tabpanel" tabindex="0" />
                </Transition>
            </template>
        </div>
    </vs-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue';
import { VsComponent } from '@/declaration';
import { getResponsiveProps } from '@/composables';
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';

const name = VsComponent.VsIndexView;

export default defineComponent({
    name,
    components: { VsWrapper },
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
