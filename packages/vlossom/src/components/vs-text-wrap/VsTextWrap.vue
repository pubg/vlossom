<template>
    <div :class="['vs-text-wrap']" :style="computedStyleSet">
        <vs-tooltip
            :color-scheme="colorScheme"
            :style-set="styleSet"
            :placement="placement"
            :align="align"
            :disabled="noTooltip"
            contents-hover
        >
            <div class="text-wrap">
                <div ref="contentsRef" class="text-wrap-contents" :style="{ width: computedWidth }">
                    <slot />
                </div>

                <div class="text-wrap-buttons" v-if="copy || link || $slots['actions']">
                    <slot name="actions" />
                    <button type="button" v-if="copy" class="copy-button" aria-label="copy" @click.stop="copyInnerText">
                        <vs-icon size="1.2rem" icon="copy" />
                    </button>

                    <button type="button" v-if="link" class="link-button" aria-label="link" @click.stop="openLink">
                        <vs-icon size="1.2rem" icon="link" />
                    </button>
                </div>
            </div>

            <template #tooltip>
                <slot />
            </template>
        </vs-tooltip>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, computed, type PropType, type Ref } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme, type Placement, type Align } from '@/declaration';
import { utils } from '@/utils';
import { propValidationUtil } from '@/utils/prop-validation';
import { VsIcon } from '@/icons';

import type { VsTextWrapStyleSet } from './types';

const name = VsComponent.VsTextWrap;

export default defineComponent({
    name,
    components: { VsIcon },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsTextWrapStyleSet> },
        align: {
            type: String as PropType<Align>,
            default: 'center',
            validator: (val: Align) => propValidationUtil.validateAlign(name, val),
        },
        copy: { type: Boolean, default: false },
        link: { type: String, default: '' },
        noTooltip: { type: Boolean, default: false },
        placement: {
            type: String as PropType<Placement>,
            default: 'top',
            validator: (val: Placement) => propValidationUtil.validatePlacement(name, val),
        },
        width: { type: [String, Number], default: '' },
    },
    emits: ['copied'],
    setup(props, { emit }) {
        const { colorScheme, styleSet, link, width } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsTextWrapStyleSet>(name, styleSet);

        const computedWidth = computed(() => {
            return isNaN(Number(width.value)) ? width.value : `${width.value}px`;
        });

        const contentsRef: Ref<HTMLInputElement | null> = ref(null);

        function copyInnerText() {
            const innerText = contentsRef?.value?.innerText || contentsRef?.value?.innerHTML?.replace(/<[^>]*>/g, '');
            if (!innerText) {
                return;
            }
            utils.clipboard.copy(innerText);
            emit('copied', innerText);
        }

        function openLink() {
            if (!link.value) {
                return;
            }
            window.open(link.value, '_blank');
        }
        return {
            computedColorScheme,
            computedStyleSet,
            computedWidth,
            contentsRef,
            copyInnerText,
            openLink,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsTextWrap.scss" />
