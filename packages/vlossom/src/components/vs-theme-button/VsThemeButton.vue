<template>
    <button
        class="vs-theme-button"
        :style="customProperties"
        :aria-label="`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`"
        @click.stop="toggleTheme()"
    >
        <span class="icon theme-light" :class="{ on: isDarkTheme }">
            <theme-light-icon size="20" />
        </span>

        <span class="icon theme-dark" :class="{ on: !isDarkTheme }">
            <theme-dark-icon size="20" />
        </span>
    </button>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, type PropType } from 'vue';
import { useCustomStyle } from '@/composables';
import { VsComponent } from '@/declaration';
import { ThemeDarkIcon, ThemeLightIcon } from '@/icons';
import { useVlossom } from '@/index';

import type { VsThemeButtonStyleSet } from './types';

const name = VsComponent.VsThemeButton;

export default defineComponent({
    name,
    components: { ThemeDarkIcon, ThemeLightIcon },
    props: {
        styleSet: { type: [String, Object] as PropType<string | VsThemeButtonStyleSet>, default: '' },
    },
    setup(props) {
        const { styleSet } = toRefs(props);

        const { customProperties } = useCustomStyle<VsThemeButtonStyleSet>(name, styleSet);

        const vlossom = useVlossom();

        const isDarkTheme = computed(() => vlossom.theme === 'dark');

        function toggleTheme() {
            vlossom.toggleTheme();
        }

        return {
            customProperties,
            isDarkTheme,
            toggleTheme,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsThemeButton.scss" />
