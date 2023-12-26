<template>
    <div
        v-if="isVisible"
        :class="['vs-notice', `vs-${computedColorScheme}`, { ...classObj }]"
        :style="customProperties"
    >
        <strong class="sub-title">Notice</strong>
        <p>
            <slot />
        </p>
        <button type="button" class="vs-notice-close" @click.stop="closeNotice()">
            <close aria-label="close" class="close-icon" />
        </button>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, toRefs, watch, computed } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { ColorScheme, VsComponent } from '@/declaration/types';
import Close from '@/assets/icons/close';

interface NoticeStyleSet {
    backgroundColor: string;
    color: string;
    fontSize: string;
    fontWeight: string;
    subTitleFontSize: string;
    subTitleFontWeight: string;
}

export type VsNoticeStyleSet = Partial<NoticeStyleSet>;

const name = VsComponent.VsNotice;

export default defineComponent({
    name,
    components: { Close },
    props: {
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
        const { customProperties } = useCustomStyle<VsNoticeStyleSet>(name, styleSet);

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
            customProperties,
            isVisible,
            closeNotice,
            classObj,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsNotice.scss" />
