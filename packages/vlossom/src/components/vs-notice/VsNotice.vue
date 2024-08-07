<template>
    <div v-if="isVisible" :class="['vs-notice', colorSchemeClass, classObj]" :style="computedStyleSet">
        <div class="vs-notice-contents">
            <slot name="title">
                <strong class="vs-notice-title">{{ title }}</strong>
            </slot>
            <vs-divider
                :style-set="{
                    border: primary ? '1px solid var(--vs-primary-comp-font)' : '1px solid var(--vs-comp-font)',
                }"
                vertical
            />
            <div>
                <slot />
            </div>
        </div>
        <button type="button" class="vs-notice-close-button" @click.stop="closeNotice()" aria-label="close">
            <vs-icon icon="close" size="20" />
        </button>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, toRefs, watch, computed } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { VsIcon } from '@/icons';
import VsDivider from '@/components/vs-divider/VsDivider.vue';

import type { VsNoticeStyleSet } from './types';

const name = VsComponent.VsNotice;
export default defineComponent({
    name,
    components: { VsDivider, VsIcon },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsNoticeStyleSet> },
        primary: { type: Boolean, default: true },
        title: { type: String, default: 'Notice' },
        // v-model
        modelValue: { type: Boolean, default: true },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const { colorScheme, styleSet, modelValue, primary } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsNoticeStyleSet>(name, styleSet);

        const isVisible = ref(true);

        watch(
            modelValue,
            (visibie: boolean) => {
                isVisible.value = visibie;
            },
            { immediate: true },
        );

        const closeNotice = () => {
            isVisible.value = false;
            emit('update:modelValue', false);
        };

        const classObj = computed(() => ({
            'vs-primary': primary.value,
        }));

        return {
            colorSchemeClass,
            computedStyleSet,
            isVisible,
            closeNotice,
            classObj,
        };
    },
});
</script>

<style lang="scss" src="./VsNotice.scss" />
