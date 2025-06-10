<template>
    <button
        :class="['vs-theme-button', colorSchemeClass]"
        :style="computedStyleSet"
        :aria-label="`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`"
        @click.prevent.stop="toggleTheme($event)"
    >
        <span class="vs-theme-icon vs-theme-light" :class="{ 'vs-on': !isDarkTheme }">
            <vs-icon icon="themeLight" size="20" />
        </span>

        <span class="vs-theme-icon vs-theme-dark" :class="{ 'vs-on': isDarkTheme }">
            <vs-icon icon="themeDark" size="20" />
        </span>
    </button>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, type PropType } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { ColorScheme, VsComponent } from '@/declaration';
import { VsIcon } from '@/icons';
import { useVlossom } from '@/vlossom-framework';

import type { VsThemeButtonStyleSet } from './types';

const name = VsComponent.VsThemeButton;
export default defineComponent({
    name,
    components: { VsIcon },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsThemeButtonStyleSet> },
    },
    emits: ['change'],
    setup(props, { emit }) {
        const { colorScheme, styleSet } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsThemeButtonStyleSet>(name, styleSet);

        const vlossom = useVlossom();

        const isDarkTheme = computed(() => vlossom?.theme === 'dark');

        function toggleTheme(event: MouseEvent) {
            vlossom?.toggleTheme();
            emit('change', event);
        }

        return {
            colorSchemeClass,
            computedStyleSet,
            isDarkTheme,
            toggleTheme,
        };
    },
});
</script>

<style lang="scss" src="./VsThemeButton.scss" />
