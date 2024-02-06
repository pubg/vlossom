<template>
    <button class="vs-theme-button" :style="computedStyleSet" @click.stop="toggleTheme()">
        <span class="icon theme-light" :class="{ on: isDarkTheme }">
            <theme-light-icon aria-label="Switch to light mode" size="20" />
        </span>

        <span class="icon theme-dark" :class="{ on: !isDarkTheme }">
            <theme-dark-icon aria-label="Switch to dark mode" size="20" />
        </span>
    </button>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, type PropType } from 'vue';
import { useStyleSet } from '@/composables';
import { VsComponent } from '@/declaration';
import { ThemeDarkIcon, ThemeLightIcon } from '@/icons';
import { useVlossom } from '@/vlossom-framework';

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

        const { computedStyleSet } = useStyleSet<VsThemeButtonStyleSet>(name, styleSet);

        const vlossom = useVlossom();

        const isDarkTheme = computed(() => vlossom.theme === 'dark');

        function toggleTheme() {
            vlossom.toggleTheme();
        }

        return {
            computedStyleSet,
            isDarkTheme,
            toggleTheme,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsThemeButton.scss" />
