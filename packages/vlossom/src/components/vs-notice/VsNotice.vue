<template>
    <div
        v-if="isVisible"
        :class="['vs-notice', `vs-${computedColorScheme}`, { ...classObj }]"
        :style="computedStyleSet"
    >
        <div class="vs-notice-contents">
            <strong class="sub-title">{{ title }}</strong>
            <vs-divider :color-scheme="colorScheme" :style-set="{ lineColor: primary ? 'white' : '' }" vertical />
            <p>
                <slot />
            </p>
        </div>
        <button type="button" class="vs-notice-close" @click.stop="closeNotice()" aria-label="close">
            <vs-icon icon="close" size="20" />
        </button>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, toRefs, watch, computed } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { VsIcon } from '@/icons';
import VsDivider from '../vs-divider/VsDivider.vue';

import type { VsNoticeStyleSet } from './types';

const name = VsComponent.VsNotice;
export default defineComponent({
    name,
    components: { VsDivider, VsIcon },
    props: {
        title: { type: String, default: 'Notice' },
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsNoticeStyleSet>, default: '' },
        primary: { type: Boolean, default: false },
        // v-model
        modelValue: { type: Boolean, default: true },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const { colorScheme, styleSet, modelValue, primary } = toRefs(props);
        const { computedColorScheme } = useColorScheme(name, colorScheme);
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
            primary: primary.value,
        }));

        return {
            computedColorScheme,
            computedStyleSet,
            isVisible,
            closeNotice,
            classObj,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsNotice.scss" />
