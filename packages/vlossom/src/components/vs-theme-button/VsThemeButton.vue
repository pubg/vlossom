<template>
    <button
        class="vs-theme-button"
        :style="computedStyleSet"
        :aria-label="`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`"
        @click.stop="toggleTheme()"
    >
        <span class="icon theme-light" :class="{ on: !isDarkTheme }">
            <vs-icon icon="themeLight" size="20" />
        </span>

        <span class="icon theme-dark" :class="{ on: isDarkTheme }">
            <vs-icon icon="themeDark" size="20" />
        </span>
    </button>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, type PropType } from 'vue';
import { useStyleSet } from '@/composables';
import { VsComponent } from '@/declaration';
import { VsIcon } from '@/icons';
import { useVlossom } from '@/vlossom-framework';

import type { VsThemeButtonStyleSet } from './types';

const name = VsComponent.VsThemeButton;

export default defineComponent({
    name,
    components: { VsIcon },
    props: {
        styleSet: { type: [String, Object] as PropType<string | VsThemeButtonStyleSet> },
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
