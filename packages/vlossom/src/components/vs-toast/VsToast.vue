<template>
    <div :class="['vs-toast', colorSchemeClass, { 'vs-primary': primary }]" :style="computedStyleSet" role="alert">
        <div class="vs-toast-content">
            <span v-html="content" />
        </div>
        <button v-if="!autoClose" class="vs-toast-close" type="button" @click.stop="closeToast" aria-label="close">
            <vs-icon icon="close" size="14px" />
        </button>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent, toRefs } from 'vue';
import { ColorScheme } from '@/declaration';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsIcon } from '@/icons';
import { store } from '@/stores';
import { VsComponent } from '@/declaration';

import type { VsToastStyleSet } from './types';

const name = VsComponent.VsToast;
export default defineComponent({
    name,
    components: { VsIcon },
    props: {
        id: { type: String, required: true },
        content: { type: String, required: true },
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsToastStyleSet> },
        autoClose: { type: Boolean, default: true },
        primary: { type: Boolean, default: false },
    },
    setup(props) {
        const { id, colorScheme, styleSet } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsToastStyleSet>(name, styleSet);

        function closeToast() {
            store.toast.removeToastById(id.value);
        }

        return {
            colorSchemeClass,
            computedStyleSet,
            closeToast,
        };
    },
});
</script>

<style lang="scss" src="./VsToast.scss" />
