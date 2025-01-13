<template>
    <div :class="['vs-modal-node', colorSchemeClass, { 'vs-dimmed': dimmed }]" :style="computedStyleSet">
        <div v-if="dimmed" class="vs-modal-dimmed" aria-hidden="true" @click.stop="onClickDimmed" />
            <vs-focus-trap ref="focusTrapRef" :focus-lock="focusLock" :initial-focus-ref="initialFocusRef">
                <div
                    :class="['vs-modal-wrap', hasSpecifiedSize ? '' : size]"
                    role="dialog"
                    :aria-labelledby="hasHeader ? headerId : undefined"
                    :aria-describedby="bodyId"
                    :aria-label="hasHeader ? undefined : 'Modal'"
                    :aria-modal="true"
                >
                    <div class="vs-modal-contents">
                        <div v-if="hasHeader" :id="headerId" class="vs-modal-header" aria-label="Modal Header">
                            <slot name="header" />
                        </div>

                        <div :id="bodyId" class="vs-modal-body">
                            <slot />
                        </div>

                        <div v-if="$slots['footer']" class="vs-modal-footer" aria-label="Modal Footer">
                            <slot name="footer" />
                        </div>
                    </div>
                </div>
            </vs-focus-trap>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs, watch } from 'vue';
import { Size, SIZES, VsComponent, SizeProp, VS_OVERLAY_CLOSE } from '@/declaration';
import { useColorScheme, useOverlay, useStyleSet } from '@/composables';
import { VsModalStyleSet } from './types';
import { getOverlayProps } from '@/models';
import { utils } from '@/utils';
import { store } from '@/stores';
import VsFocusTrap from '@/components/vs-focus-trap/VsFocusTrap.vue';

const name = VsComponent.VsModalNode;
export default defineComponent({
    name,
    components: { VsFocusTrap },
    props: {
        ...getOverlayProps<VsModalStyleSet>(),
        container: { type: String, default: 'body' },
        size: {
            type: [String, Number, Object] as PropType<SizeProp | { width?: SizeProp; height?: SizeProp }>,
            default: 'md',
        },
    },
    emits: ['open', 'close'],
    setup(props, { emit, slots }) {
        const { colorScheme, styleSet, id, dimClose, escClose, size, callbacks, container } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet: modalStyleSet } = useStyleSet<VsModalStyleSet>(name, styleSet);

        const fixed = computed(() => container.value === 'body');

        const hasSpecifiedSize = computed(() => size.value && !SIZES.includes(size.value as Size));
        const sizeStyle = computed(() => {
            const style: { [key: string]: string } = {};

            if (typeof size.value === 'object') {
                const { width = 'md', height = 'md' } = size.value;

                if (SIZES.includes(width as Size)) {
                    style['--vs-modal-width'] = `var(--vs-modal-width-${width})`;
                } else {
                    const convertedWidth = utils.string.convertToStringSize(width);
                    style['--vs-modal-width'] = convertedWidth;
                }

                if (SIZES.includes(height as Size)) {
                    style['--vs-modal-height'] = `var(--vs-modal-height-${height})`;
                } else {
                    const convertedHeight = utils.string.convertToStringSize(height);
                    style['--vs-modal-height'] = convertedHeight;
                }
            } else if (hasSpecifiedSize.value) {
                const convertedSize = utils.string.convertToStringSize(size.value);

                style['--vs-modal-width'] = convertedSize;
                style['--vs-modal-height'] = convertedSize;
            }

            return style;
        });

        const computedStyleSet = computed(() => {
            return {
                ...modalStyleSet.value,
                ...sizeStyle.value,
            };
        });

        const initialOpen = true;
        const computedCallbacks = computed(() => {
            return {
                ...callbacks.value,
                [VS_OVERLAY_CLOSE]: () => {
                    store.modal.remove(overlayId.value);
                },
            };
        });

        const { overlayId, isOpen, close } = useOverlay(id, initialOpen, computedCallbacks, escClose);

        const hasHeader = computed(() => !!slots['header']);
        const headerId = computed(() => `vs-modal-header-${overlayId.value}`);
        const bodyId = computed(() => `vs-modal-body-${overlayId.value}`);

        function onClickDimmed() {
            if (dimClose.value) {
                close();
            }
        }

        watch(isOpen, (o) => {
            emit(o ? 'open' : 'close');
        });

        return {
            colorSchemeClass,
            computedStyleSet,
            onClickDimmed,
            hasHeader,
            headerId,
            bodyId,
            hasSpecifiedSize,
            fixed,
        };
    },
});
</script>

<style lang="scss" src="./VsModalNode.scss" />
