<template>
    <div :class="['vs-text-wrap', colorSchemeClass]" :style="computedStyleSet">
        <vs-tooltip
            :color-scheme="colorScheme"
            :style-set="plainStyleSet.tooltip"
            :placement="placement"
            :align="align"
            :disabled="noTooltip"
            contents-hover
        >
            <div ref="contentsRef" class="vs-text-wrap-contents" :style="{ width: computedWidth }">
                <slot />
            </div>

            <template #tooltip>
                <slot name="tooltip">
                    <slot />
                </slot>
            </template>
        </vs-tooltip>

        <div class="vs-text-wrap-buttons" v-if="copy || link || $slots['actions']">
            <slot name="actions" />
            <button
                type="button"
                v-if="copy"
                class="vs-text-wrap-button vs-copy-button"
                aria-label="copy"
                @click.prevent.stop="copyInnerText"
            >
                <vs-icon size="1.4rem" :icon="computedIcon" :class="{ copied }" />
            </button>

            <button
                type="button"
                v-if="link"
                class="vs-text-wrap-button vs-link-button"
                aria-label="link"
                @click.prevent.stop="openLink"
            >
                <vs-icon size="1.5rem" class="vs-link-icon" icon="link" />
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, computed, type PropType, type Ref } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme, type Placement, type Align, ALIGNS, PLACEMENTS } from '@/declaration';
import { utils } from '@/utils';
import { VsIcon } from '@/icons';
import VsTooltip from '@/components/vs-tooltip/VsTooltip.vue';

import type { VsTextWrapStyleSet } from './types';

const name = VsComponent.VsTextWrap;
export default defineComponent({
    name,
    components: { VsIcon, VsTooltip },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsTextWrapStyleSet> },
        align: {
            type: String as PropType<Align>,
            default: 'center',
            validator: (val: Align) => utils.props.checkPropExist<Align>(name, 'align', ALIGNS, val),
        },
        copy: { type: Boolean, default: false },
        link: { type: String, default: '' },
        noTooltip: { type: Boolean, default: false },
        placement: {
            type: String as PropType<Exclude<Placement, 'middle'>>,
            default: 'top',
            validator: (val: Placement) => utils.props.checkPropExist<Placement>(name, 'placement', PLACEMENTS, val),
        },
        width: { type: [String, Number], default: '' },
    },
    emits: ['copied'],
    setup(props, { emit }) {
        const { colorScheme, styleSet, link, width } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { plainStyleSet, computedStyleSet } = useStyleSet<VsTextWrapStyleSet>(name, styleSet);

        const computedWidth = computed(() => utils.string.convertToStringSize(width.value));

        const contentsRef: Ref<HTMLInputElement | null> = ref(null);

        const copied = ref(false);
        function copyInnerText() {
            const innerText = contentsRef?.value?.innerText || contentsRef?.value?.innerHTML?.replace(/<[^>]*>/g, '');
            if (!innerText) {
                return;
            }
            utils.clipboard.copy(innerText);
            emit('copied', innerText);

            copied.value = true;
            setTimeout(() => {
                copied.value = false;
            }, 2000);
        }

        const computedIcon = computed(() => {
            return copied.value ? 'check' : 'copy';
        });

        function openLink() {
            if (!link.value) {
                return;
            }
            window.open(link.value, '_blank');
        }
        return {
            colorSchemeClass,
            plainStyleSet,
            computedStyleSet,
            computedWidth,
            contentsRef,
            copyInnerText,
            openLink,
            copied,
            computedIcon,
        };
    },
});
</script>

<style lang="scss" src="./VsTextWrap.scss" />
