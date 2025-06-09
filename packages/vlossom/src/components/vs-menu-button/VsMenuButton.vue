<template>
    <div
        :class="['vs-menu-button', colorSchemeClass, { selected }]"
        :style="{ ...computedStyleSet, width: size, height: size }"
        @click.stop="isOpen = !isOpen"
    >
        <vs-icon icon="menu" :size="iconSize" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue';
import { VsIcon } from '@/icons';
import { ColorScheme, VsComponent } from '@/declaration';
import { VsMenuButtonStyleSet } from './types';
import { useColorScheme, useStyleSet } from '@/composables';

const name = VsComponent.VsMenuButton;
export default defineComponent({
    name,
    components: { VsIcon },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsMenuButtonStyleSet> },
        selected: { type: Boolean, default: false },
        size: { type: String, default: '3.2rem' },

        // v-model
        modelValue: { type: Boolean, default: false },
    },
    setup(props, { emit }) {
        const { colorScheme, styleSet, size, modelValue } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsMenuButtonStyleSet>(name, styleSet);

        const isOpen = ref(modelValue.value);

        const iconSize = computed(() => {
            const sizeValue = size.value;
            const match = sizeValue.match(/^(\d*\.?\d+)([a-zA-Z%]*)$/);
            if (match) {
                const value = parseFloat(match[1]);
                const unit = match[2];
                return `${(value * 2) / 3}${unit}`;
            }
            return sizeValue;
        });

        watch(isOpen, (newVal) => {
            emit('update:modelValue', newVal);
        });

        return {
            colorSchemeClass,
            computedStyleSet,
            iconSize,
            isOpen,
        };
    },
});
</script>

<style lang="scss" src="./VsMenuButton.scss" />
