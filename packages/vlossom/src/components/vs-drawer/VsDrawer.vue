<template>
    <Teleport to="body" :disabled="hasContainer">
        <Transition :name="`slide-${placement}`" :duration="500">
            <div v-if="isOpen" class="vs-drawer-container" :style="{ position: hasContainer ? 'absolute' : 'fixed' }">
                <div v-if="dimmed" class="dimmed" aria-hidden="true" @click.stop="clickDimmed()" />
                <div
                    :class="['vs-drawer', `vs-${computedColorScheme}`, placement, size]"
                    :style="customProperties"
                    role="dialog"
                    aria-labelledby="vs-drawer-title"
                    aria-describedby="vs-drawer-body"
                    :aria-label="hasHeader ? '' : 'Dialog'"
                >
                    <header v-if="hasHeader" id="vs-drawer-title">
                        <slot name="header" />
                    </header>

                    <div :class="['drawer-body', { 'hide-scroll': hideScroll }]" id="vs-drawer-body">
                        <slot />
                    </div>

                    <footer v-if="hasFooter">
                        <slot name="footer" />
                    </footer>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, toRefs, watch, onMounted, onBeforeUnmount, computed } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { VsComponent, type ColorScheme, Placement, Size } from '@/declaration';

import type { VsDrawerStyleSet } from './types';

const placements = Object.values(Placement);
const sizes = Object.values(Size);

const name = VsComponent.VsDrawer;
export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsDrawerStyleSet>, default: '' },
        closeOnDimmedClick: { type: Boolean, default: false },
        closeOnEsc: { type: Boolean, default: true },
        dimmed: { type: Boolean, default: false },
        hasContainer: { type: Boolean, default: false },
        hideScroll: { type: Boolean, default: false },
        placement: {
            type: String as PropType<Placement>,
            default: Placement.Left,
            validator: (val: Placement) => placements.includes(val),
        },
        size: { type: String as PropType<Size>, default: Size.Sm, validator: (val: Size) => sizes.includes(val) },
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    setup(props, { emit, slots }) {
        const { colorScheme, styleSet, modelValue, closeOnEsc, closeOnDimmedClick } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { customProperties } = useCustomStyle<VsDrawerStyleSet>(name, styleSet);

        const isOpen = ref(modelValue.value);

        watch(modelValue, (val) => {
            isOpen.value = val;
        });

        watch(isOpen, (val) => {
            emit('update:modelValue', val);
        });

        const hasHeader = computed(() => !!slots['header']);
        const hasFooter = computed(() => !!slots['footer']);

        function clickDimmed() {
            if (closeOnDimmedClick.value) {
                isOpen.value = false;
            }
        }

        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                isOpen.value = false;
            }
        }

        onMounted(() => {
            if (closeOnEsc.value) {
                document.addEventListener('keydown', onKeyDown);
            }
        });

        onBeforeUnmount(() => {
            if (closeOnEsc.value) {
                document.removeEventListener('keydown', onKeyDown);
            }
        });

        return {
            computedColorScheme,
            customProperties,
            isOpen,
            clickDimmed,
            hasHeader,
            hasFooter,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsDrawer.scss" />
