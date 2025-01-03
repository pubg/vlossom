<template>
    <div v-if="hasToast" class="vs-toast-view" :id="wrapperId" :class="{ 'vs-toast-fixed': isFixed }">
        <div
            v-for="[key, toasts] in Object.entries(toastsByPosition)"
            :key="key"
            :class="['vs-toast-container', `vs-toast-${key.split('-')[0]}`, `vs-toast-${key.split('-')[1]}`]"
        >
            <TransitionGroup name="toasts" appear>
                <VsToast v-for="toast in toasts" :key="toast.id" :toast="toast" />
            </TransitionGroup>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { store } from '@/stores';
import { VsComponent } from '@/declaration';
import VsToast from './VsToast.vue';
import { VsToastInfo } from './types';

const name = VsComponent.VsToastView;
export default defineComponent({
    name,
    components: { VsToast },
    props: {
        container: { type: String, required: true, default: 'body' },
    },
    setup(props) {
        const { container } = toRefs(props);

        const toastsByPosition = computed(() => {
            const toasts = store.toast.itemsByContainer.value[container.value] || [];
            return toasts.reduce((acc, toast) => {
                const key = `${toast.placement}-${toast.align}`;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(toast);
                return acc;
            }, {} as Record<string, VsToastInfo[]>);
        });

        const wrapperId = computed(() => `vs-toast-${container.value.replace('#', '').replace('.', '')}`);

        const isFixed = computed(() => container.value === 'body');

        const hasToast = computed(() => Object.keys(toastsByPosition.value).length > 0);

        return { toastsByPosition, wrapperId, isFixed, hasToast };
    },
});
</script>

<style lang="scss" src="./VsToastView.scss" />
