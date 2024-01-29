<template>
    <Teleport to="body" :disabled="hasContainer">
        <div class="vs-drawer">
            <Transition name="fade">
                <div
                    v-if="isOpen && dimmed"
                    :class="['dimmed', { 'has-container': hasContainer }]"
                    aria-hidden="true"
                    @click.stop="clickDimmed()"
                />
            </Transition>
            <Transition :name="`slide-${placement}`">
                <focus-trap v-if="isOpen" :modal="dimmed" :initialFocusRef="initialFocusRef">
                    <div
                        :class="['vs-drawer-content', placement, size, { 'has-container': hasContainer }]"
                        :style="customProperties"
                        role="dialog"
                        :aria-labelledby="hasHeader ? 'vs-drawer-title' : undefined"
                        aria-describedby="vs-drawer-body"
                        :aria-label="hasHeader ? undefined : 'Dialog'"
                        :aria-modal="dimmed"
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
                </focus-trap>
            </Transition>
        </div>
    </Teleport>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, toRefs, watch, onMounted, onBeforeUnmount, computed } from 'vue';
import { useCustomStyle } from '@/composables';
import { VsComponent, Placement, PLACEMENTS, Size, SIZES } from '@/declaration';
import FocusTrap from '@/common/focus-trap/FocusTrap.vue';

import type { VsDrawerStyleSet } from './types';

const name = VsComponent.VsDrawer;
export default defineComponent({
    name,
    components: { FocusTrap },
    props: {
        styleSet: { type: [String, Object] as PropType<string | VsDrawerStyleSet>, default: '' },
        closeOnDimmedClick: { type: Boolean, default: false },
        closeOnEsc: { type: Boolean, default: true },
        dimmed: { type: Boolean, default: false },
        hasContainer: { type: Boolean, default: false },
        hideScroll: { type: Boolean, default: false },
        initialFocusRef: { type: [Object, undefined] as PropType<HTMLElement | null>, default: null },
        placement: {
            type: String as PropType<Placement>,
            default: 'left',
            validator: (val: Placement) => PLACEMENTS.includes(val),
        },
        size: {
            type: String as PropType<Size>,
            default: 'sm',
            validator: (val: Size) => SIZES.includes(val),
        },
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    setup(props, { emit, slots }) {
        const { styleSet, modelValue, closeOnEsc, closeOnDimmedClick } = toRefs(props);

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
