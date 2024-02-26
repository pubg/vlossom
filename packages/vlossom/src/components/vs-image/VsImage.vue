<template>
    <div class="vs-image" ref="vsImageRef" :style="computedStyleSet">
        <img class="image" :src="computedSrc" :alt="alt" @error="onImageError" />
        <span class="alt-text" v-if="isNoImage">{{ alt }}</span>
    </div>
</template>

<script lang="ts">
import { ComputedRef, PropType, computed, defineComponent, ref, toRefs, watch } from 'vue';
import { useStyleSet } from '@/composables';
import { useIntersectionObserver } from '@vueuse/core';
import { VsComponent } from '@/declaration';
import NO_IMAGE from '@/assets/no-image.png';

import type { VsImageStyleSet } from './types';

const name = VsComponent.VsImage;

export default defineComponent({
    name,
    props: {
        styleSet: { type: [String, Object] as PropType<string | VsImageStyleSet>, default: '' },
        src: { type: String, required: true, default: '' },
        alt: { type: String, default: '' },
        fallback: { type: String, default: '' },
        lazy: { type: Boolean, default: false },
    },
    emits: ['error'],
    setup(props, { emit }) {
        const { styleSet, src, fallback, lazy } = toRefs(props);

        const { computedStyleSet } = useStyleSet<VsImageStyleSet>(name, styleSet);

        const vsImageRef = ref(null);

        const hasIntersectionObserver = window && window.IntersectionObserver !== undefined;

        const isLoaded = ref(hasIntersectionObserver && lazy.value ? false : true);
        const isFallback = ref(false);
        const isNoImage = ref(false);

        const computedSrc: ComputedRef<string> = computed(() => {
            if (!isLoaded.value) {
                return '';
            }
            if (isNoImage.value) {
                return NO_IMAGE;
            }
            if (isFallback.value) {
                return fallback.value;
            }

            return src.value;
        });

        watch([src, fallback], () => {
            isFallback.value = false;
            isNoImage.value = false;
        });

        function onImageError() {
            if (!isLoaded.value) {
                return;
            }

            emit('error');

            if (fallback.value && !isFallback.value) {
                isFallback.value = true;
                return;
            }
            isNoImage.value = true;
        }

        if (hasIntersectionObserver && lazy.value) {
            // Use Intersection Observer for Lazy Load
            const { pause } = useIntersectionObserver(vsImageRef, ([{ isIntersecting }]) => {
                if (isIntersecting) {
                    isLoaded.value = true;
                    pause();
                }
            });
        }

        return { computedStyleSet, computedSrc, vsImageRef, isNoImage, onImageError };
    },
});
</script>

<style lang="scss" scoped src="./VsImage.scss" />
