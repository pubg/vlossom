<template>
    <teleport to="body" :disabled="hasContainer">
        <Transition :name="`slide-${placement}`" :duration="500">
            <div v-if="isOpen" class="modal-container" :style="{ position: hasContainer ? 'absolute' : 'fixed' }">
                <div class="dimmed" @click="isOpen = false" />
                <div :class="['vs-drawer', `vs-${computedColorScheme}`, placement]">
                    <slot />
                </div>
            </div>
        </Transition>
    </teleport>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, ref, toRefs, watch } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { VsComponent, type ColorScheme, type Placement } from '@/declaration';

// import type { VsButtonStyleSet } from './types';

const name = VsComponent.VsDrawer;
export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string>, default: '' },
        closeOnEsc: { type: Boolean, default: true },
        hasContainer: { type: Boolean, default: false },
        placement: { type: String as PropType<Placement>, default: 'left' },
        // fixed: { type: Boolean, default: false },
        // hideScroll: { type: Boolean, default: false },
        // width: { type: String, default: '300px' },
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const { colorScheme, styleSet, modelValue } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        // const { customProperties } = useCustomStyle<VsButtonStyleSet>(name, styleSet);

        const isOpen = ref(modelValue.value);

        watch(modelValue, (val) => {
            isOpen.value = val;
        });

        watch(isOpen, (val) => {
            emit('update:modelValue', val);
        });

        return {
            computedColorScheme,
            isOpen,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsDrawer.scss" />
