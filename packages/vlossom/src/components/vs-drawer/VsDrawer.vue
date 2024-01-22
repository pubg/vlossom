<template>
    <teleport to="body" :disabled="hasContainer">
        <Transition :name="`slide-${placement}`" :duration="500">
            <div v-if="isOpen" class="modal-container" :style="{ position: hasContainer ? 'absolute' : 'fixed' }">
                <div v-if="dimmed" class="dimmed" aria-hidden="true" @click.stop="clickOverlay()" />
                <div
                    :class="['vs-drawer', `vs-${computedColorScheme}`, placement, size]"
                    :style="customProperties"
                    role="dialog"
                    aria-labelledby="vs-drawer-title"
                    aria-describedby="vs-drawer-body"
                >
                    <header id="vs-drawer-title">
                        <slot name="header" />
                    </header>

                    <div :class="['drawer-body', { 'hide-scroll': hideScroll }]" id="vs-drawer-body">
                        <slot />
                    </div>

                    <footer>
                        <slot name="footer" />
                    </footer>
                </div>
            </div>
        </Transition>
    </teleport>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, toRefs, watch } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { VsComponent, type ColorScheme, type Placement, type Size } from '@/declaration';
import * as _ from 'lodash-es';

import type { VsDrawerStyleSet } from './types';
import { onMounted } from 'vue';
import { onBeforeUnmount } from 'vue';

const placements: Placement[] = ['top', 'right', 'bottom', 'left'];
const sizes: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const name = VsComponent.VsDrawer;
export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsDrawerStyleSet>, default: '' },
        closeOnEsc: { type: Boolean, default: true },
        closeOnOverlayClick: { type: Boolean, default: false },
        dimmed: { type: Boolean, default: false },
        // handleResize: { type: Boolean, default: false },
        hasContainer: { type: Boolean, default: false },
        hideScroll: { type: Boolean, default: false },
        placement: {
            type: String as PropType<Placement>,
            default: 'left',
            validator: (val: Placement) => placements.includes(val),
        },
        size: { type: String as PropType<Size>, default: 'sm', validator: (val: Size) => sizes.includes(val) },
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const { colorScheme, styleSet, modelValue, closeOnEsc, closeOnOverlayClick } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { customProperties } = useCustomStyle<VsDrawerStyleSet>(name, styleSet);

        const isOpen = ref(modelValue.value);

        watch(modelValue, (val) => {
            isOpen.value = val;
        });

        watch(isOpen, (val) => {
            emit('update:modelValue', val);
        });

        function clickOverlay() {
            if (closeOnOverlayClick.value) {
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
            clickOverlay,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsDrawer.scss" />
