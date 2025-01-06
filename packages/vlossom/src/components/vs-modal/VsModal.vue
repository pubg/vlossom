<template>
    <div v-if="false" :style="{ display: 'none' }">
        <slot name="header" />
        <slot />
        <slot name="footer" />
    </div>
</template>

<script lang="ts">
import { Component, computed, defineComponent, PropType, ref, toRefs, watch } from 'vue';
import { getOverlayProps } from '@/models';
import { VsComponent, SizeProp, VS_OVERLAY_CLOSE } from '@/declaration';
import { utils } from '@/utils';
import { modalPlugin } from '@/plugins';

import type { VsModalStyleSet } from './types';

const name = VsComponent.VsModal;
export default defineComponent({
    name,
    props: {
        ...getOverlayProps<VsModalStyleSet>(),
        container: { type: String, default: 'body' },
        size: {
            type: [String, Number, Object] as PropType<SizeProp | { width?: SizeProp; height?: SizeProp }>,
            default: 'md',
        },
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue', 'open', 'close'],
    setup(props, { emit, slots }) {
        const {
            modelValue,
            id,
            container,
            colorScheme,
            styleSet,
            callbacks,
            dimClose,
            dimmed,
            escClose,
            focusLock,
            hideScroll,
            initialFocusRef,
            size,
        } = toRefs(props);

        const innerId = utils.string.createID();
        const modalId = computed(() => id.value || innerId);

        const isOpen = ref(false);

        function emitValue(open: boolean) {
            emit('update:modelValue', open);
            emit(open ? 'open' : 'close');
        }

        watch(modelValue, (o) => {
            isOpen.value = o;
        });

        watch(isOpen, (open) => {
            if (open) {
                modalPlugin.open({
                    component: slots.default as string | Component,
                    header: slots.header as string | Component,
                    footer: slots.footer as string | Component,
                    container: container.value,
                    colorScheme: colorScheme.value,
                    styleSet: styleSet.value,
                    callbacks: {
                        ...callbacks.value,
                        [VS_OVERLAY_CLOSE]: () => {
                            emitValue(false);
                        },
                        'key-Escape': () => {
                            if (escClose.value) {
                                emitValue(false);
                            }
                        },
                    },
                    dimClose: dimClose.value,
                    dimmed: dimmed.value,
                    escClose: escClose.value,
                    focusLock: focusLock.value,
                    hideScroll: hideScroll.value,
                    id: modalId.value,
                    initialFocusRef: initialFocusRef.value,
                    size: size.value,
                });
            } else {
                modalPlugin.closeWithId(modalId.value);
            }

            emitValue(open);
        });

        return {
            modalId,
            isOpen,
        };
    },
});
</script>
