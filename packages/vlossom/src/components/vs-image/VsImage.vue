<template>
    <div class="vs-image" ref="vsImageRef" :style="computedStyleSet">
        <vs-skeleton
            v-if="skeleton && isLoading"
            class="vs-image-skeleton"
            :style="{ width: 'var(--vs-image-width)', height: 'var(--vs-image-height)' }"
        >
            <slot name="skeleton" />
        </vs-skeleton>
        <img
            :class="['vs-image-tag', { 'vs-hidden': isLoading }]"
            :src="computedSrc"
            :alt="alt"
            @load.stop="onImageLoad"
            @error.stop="onImageError"
        />
        <span class="vs-alt-text" v-if="!isLoading && isNoImage">{{ alt }}</span>
    </div>
</template>

<script lang="ts">
import { ComputedRef, PropType, computed, defineComponent, ref, toRefs, watch } from 'vue';
import { useStyleSet } from '@/composables';
import { useIntersectionObserver } from '@vueuse/core';
import { VsComponent } from '@/declaration';
import NO_IMAGE from '@/assets/no-image.png';
import VsSkeleton from '@/components/vs-skeleton/VsSkeleton.vue';

import type { VsImageStyleSet } from './types';

const name = VsComponent.VsImage;
export default defineComponent({
    name,
    components: { VsSkeleton },
    props: {
        styleSet: { type: [String, Object] as PropType<string | VsImageStyleSet> },
        alt: { type: String, default: '' },
        fallback: { type: String, default: '' },
        lazy: { type: Boolean, default: false },
        skeleton: { type: Boolean, default: false },
        src: { type: String, required: true, default: '' },
    },
    emits: ['error'],
    setup(props, { emit }) {
        const { styleSet, src, fallback, lazy } = toRefs(props);

        const { computedStyleSet } = useStyleSet<VsImageStyleSet>(name, styleSet);

        const vsImageRef = ref(null);

        const hasIntersectionObserver = window && window.IntersectionObserver !== undefined;

        const isLoading = ref(true); // check if img tag src is loaded
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

        function onImageLoad() {
            isLoading.value = false;
        }

        function onImageError() {
            if (!isLoaded.value) {
                return;
            }

            emit('error');
            isLoading.value = false;

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

        return { computedStyleSet, computedSrc, vsImageRef, isLoading, isNoImage, onImageLoad, onImageError };
    },
});
</script>

<style lang="scss" src="./VsImage.scss" />
