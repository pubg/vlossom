<template>
    <div :class="['vs-modal-node', colorSchemeClass, { 'vs-dimmed': dimmed }]" :style="computedStyleSet">
        <div v-if="dimmed" class="vs-modal-dimmed" aria-hidden="true" @click.prevent.stop="onClickDimmed" />
        <vs-focus-trap ref="focusTrapRef" :focus-lock="focusLock" :initial-focus-ref="initialFocusRef">
            <div
                :class="['vs-modal-wrap', hasSpecifiedSize ? '' : size]"
                role="dialog"
                aria-label="Modal"
                :aria-modal="true"
            >
                <slot />
            </div>
        </vs-focus-trap>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, toRefs } from 'vue';
import { Size, SIZES, VsComponent, SizeProp, VS_OVERLAY_CLOSE } from '@/declaration';
import { useColorScheme, useOverlay, useStyleSet } from '@/composables';
import { VsModalNodeStyleSet } from './types';
import { getOverlayProps } from '@/models';
import { utils } from '@/utils';
import { store } from '@/stores';
import VsFocusTrap from '@/components/vs-focus-trap/VsFocusTrap.vue';

const name = VsComponent.VsModalNode;
export default defineComponent({
    name,
    components: { VsFocusTrap },
    props: {
        ...getOverlayProps<VsModalNodeStyleSet>(),
        container: { type: String, default: 'body' },
        size: {
            type: [String, Number, Object] as PropType<SizeProp | { width?: SizeProp; height?: SizeProp }>,
        },
    },
    setup(props) {
        const { colorScheme, styleSet, id, dimClose, escClose, size, callbacks, container } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet: modalStyleSet } = useStyleSet<VsModalNodeStyleSet>(name, styleSet);

        const fixed = computed(() => container.value === 'body');

        const hasSpecifiedSize = computed(() => size.value && !SIZES.includes(size.value as Size));
        const sizeStyle = computed(() => {
            if (!size.value) {
                return {};
            }
            const style: { [key: string]: string } = {};
            if (typeof size.value === 'object') {
                const { width = 'md', height = 'md' } = size.value;

                if (SIZES.includes(width as Size)) {
                    style['--vs-modal-node-width'] = `var(--vs-modal-node-width-${width})`;
                } else {
                    const convertedWidth = utils.string.convertToStringSize(width);
                    style['--vs-modal-node-width'] = convertedWidth;
                }

                if (SIZES.includes(height as Size)) {
                    style['--vs-modal-node-height'] = `var(--vs-modal-node-height-${height})`;
                } else {
                    const convertedHeight = utils.string.convertToStringSize(height);
                    style['--vs-modal-node-height'] = convertedHeight;
                }
            } else if (hasSpecifiedSize.value) {
                const convertedSize = utils.string.convertToStringSize(size.value);

                style['--vs-modal-node-width'] = convertedSize;
                style['--vs-modal-node-height'] = convertedSize;
            }

            return style;
        });

        const computedStyleSet = computed(() => {
            return {
                ...modalStyleSet.value,
                ...sizeStyle.value,
            };
        });

        const computedCallbacks = computed(() => {
            return {
                ...callbacks.value,
                [VS_OVERLAY_CLOSE]: () => {
                    callbacks.value?.[VS_OVERLAY_CLOSE]?.();
                    store.modal.remove(overlayId.value);
                },
            };
        });

        const { overlayId, open, close } = useOverlay(id, computedCallbacks, escClose);

        function onClickDimmed() {
            if (dimClose.value) {
                close();
            }
        }

        onBeforeMount(open);

        return {
            colorSchemeClass,
            computedStyleSet,
            onClickDimmed,
            hasSpecifiedSize,
            fixed,
        };
    },
});
</script>

<style lang="scss" src="./VsModalNode.scss" />
