<template>
    <div class="vs-index-view">
        <template v-if="keepAlive">
            <Transition enter-active-class="fade-in-bottom">
                <KeepAlive>
                    <component :is="selectedComponent" role="tabpanel" tabindex="0" />
                </KeepAlive>
            </Transition>
        </template>
        <template v-else>
            <Transition enter-active-class="fade-in-bottom">
                <component :is="selectedComponent" role="tabpanel" tabindex="0" />
            </Transition>
        </template>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    watch,
    computed,
    toRefs,
    ref,
    type ComputedRef,
    type VNode,
    type VNodeArrayChildren,
} from 'vue';
import { VsComponent } from '@/declaration';

const name = VsComponent.VsIndexView;

export default defineComponent({
    name,
    props: {
        keepAlive: { type: Boolean, default: false },
        // v-model
        modelValue: { type: Number, default: 0 },
    },
    setup(props, { slots }) {
        const { modelValue } = toRefs(props);

        const selectedKey = ref('');

        const selectedComponent = computed(() => {
            if (!slots.default) {
                return null;
            }

            return slots.default().find((item: VNode) => item.key === selectedKey.value);
        });

        const computedKeys: ComputedRef<string[]> = computed(() => {
            if (!slots.default) {
                return [];
            }

            const keys = slots.default();
            return keys
                .reduce((acc: string[], item: VNode) => {
                    if (!item.key && item.children && Array.isArray(item.children)) {
                        acc = acc.concat((item.children as VNodeArrayChildren).map((child: any) => child.key) || '');
                    } else if (item.key) {
                        acc.push(item.key.toString());
                    }

                    return acc;
                }, [])
                .filter((k) => k);
        });

        function changeKey(index: number) {
            if (index < 0 || index >= computedKeys.value.length) {
                return;
            }
            const newKey = computedKeys.value[index] || '';
            selectedKey.value = newKey;
        }

        watch(
            computedKeys,
            () => {
                changeKey(modelValue.value);
            },
            { immediate: true },
        );

        watch(modelValue, (index: number) => {
            changeKey(index);
        });

        return {
            selectedKey,
            selectedComponent,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsIndexView.scss" />
