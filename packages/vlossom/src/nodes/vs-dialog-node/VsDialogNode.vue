<template>
    <div
        class="vs-dialog"
        :style="{ ...convertedStyleSet }"
        role="dialog"
        :aria-labelledby="hasHeader ? headerId : undefined"
        :aria-describedby="bodyId"
        :aria-label="hasHeader ? undefined : 'Dialog'"
        :aria-modal="isModal"
    >
        <header v-if="hasHeader" class="dialog-header" aria-label="Dialog Header" :id="headerId">
            <slot name="header" />
        </header>

        <div :class="['dialog-body', { 'hide-scroll': hideScroll }]" :id="bodyId">
            <slot />
        </div>

        <footer v-if="hasFooter" class="dialog-footer" aria-label="Dialog Footer">
            <slot name="footer" />
        </footer>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, onMounted, onBeforeUnmount, type PropType } from 'vue';
import { store } from '@/stores';
import { utils } from '@/utils';

export default defineComponent({
    props: {
        styleSet: { type: Object as PropType<{ [key: string]: any }>, default: () => ({}) },
        closeOnEsc: { type: Boolean, default: true },
        hideScroll: { type: Boolean, default: false },
        isModal: { type: Boolean, default: true },
    },
    emits: ['close'],
    setup(props, { emit, slots }) {
        const { styleSet, closeOnEsc } = toRefs(props);

        const convertedStyleSet = computed(() => {
            return Object.entries(styleSet.value).reduce((acc, [key, value]) => {
                const propName = key.split('-').pop();
                acc[`--vs-dialog-node-${propName}`] = value;
                return acc;
            }, {} as { [key: string]: any });
        });

        const hasHeader = computed(() => !!slots['header']);
        const hasFooter = computed(() => !!slots['footer']);

        const id = utils.string.createID();
        const headerId = `vs-dialog-header-${id}`;
        const bodyId = `vs-dialog-body-${id}`;

        function onPressEsc(event: KeyboardEvent) {
            if (event.key === 'Escape' && store.dialog.getTopId() === id) {
                emit('close');
            }
        }

        onMounted(() => {
            store.dialog.push(id);
            if (closeOnEsc.value) {
                document.addEventListener('keydown', onPressEsc);
            }
        });

        onBeforeUnmount(() => {
            store.dialog.pop();
            document.removeEventListener('keydown', onPressEsc);
        });

        return {
            id,
            headerId,
            bodyId,
            convertedStyleSet,
            hasHeader,
            hasFooter,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsDialogNode.scss" />
