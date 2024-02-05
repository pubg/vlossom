<template>
    <button
        class="vs-theme-button"
        :style="customProperties"
        :aria-label="`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`"
        @click.stop="toggleTheme()"
    >
        <span class="icon" :class="{ on: isDarkTheme }">
            <light-mode-icon size="20" />
        </span>

        <span class="icon" :class="{ on: !isDarkTheme }">
            <dark-mode-icon size="20" />
        </span>
    </button>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, type PropType } from 'vue';
import { useCustomStyle } from '@/composables';
import { VsComponent } from '@/declaration';
import { DarkModeIcon, LightModeIcon } from '@/icons';
import { useVlossom } from '@/index';

import type { VsThemeButtonStyleSet } from './types';

const name = VsComponent.VsThemeButton;

export default defineComponent({
    name,
    components: { DarkModeIcon, LightModeIcon },
    props: {
        styleSet: { type: [String, Object] as PropType<string | VsThemeButtonStyleSet>, default: '' },
    },
    setup(props) {
        const { styleSet } = toRefs(props);

        const { customProperties } = useCustomStyle<VsThemeButtonStyleSet>(name, styleSet);

        const vlossom = useVlossom();

        const isDarkTheme = computed(() => vlossom.theme === 'dark');

        function toggleTheme() {
            vlossom.theme = isDarkTheme.value ? 'light' : 'dark';
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
