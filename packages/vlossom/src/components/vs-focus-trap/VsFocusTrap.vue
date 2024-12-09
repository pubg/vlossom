<script lang="ts">
import {
    defineComponent,
    ref,
    toRefs,
    cloneVNode,
    h,
    onMounted,
    onBeforeUnmount,
    computed,
    nextTick,
    type Ref,
    type ComponentPublicInstance,
    type PropType,
} from 'vue';
import { VsComponent } from '@/declaration';
import { utils } from '@/utils';

export default defineComponent({
    name: VsComponent.VsFocusTrap,
    props: {
        focusLock: { type: Boolean, default: true },
        initialFocusRef: { type: Object as PropType<HTMLElement | null>, default: null },
    },
    setup(props, { slots, expose }) {
        const { focusLock, initialFocusRef } = toRefs(props);

        const focusTrapRef: Ref<HTMLElement | null> = ref(null);
        const wrapperRef: Ref<HTMLElement | ComponentPublicInstance | null> = ref(null);

        const wrapperElement = computed(() => {
            if (!wrapperRef.value) {
                return null;
            }

            return wrapperRef.value instanceof HTMLElement ? wrapperRef.value : (wrapperRef.value.$el as HTMLElement);
        });

        let previousFocused: HTMLElement | null = null;

        let firstFocusable: HTMLElement | null = null;
        let lastFocusable: HTMLElement | null = null;

        function cycleTabKey(event: KeyboardEvent) {
            if (event.key !== 'Tab') {
                return;
            }

            if (!firstFocusable || !lastFocusable) {
                return;
            }

            if (event.shiftKey && document.activeElement === firstFocusable) {
                event.preventDefault();
                lastFocusable.focus();
            } else if (!event.shiftKey && document.activeElement === lastFocusable) {
                event.preventDefault();
                firstFocusable.focus();
            }
        }

        function activateCycle() {
            if (!firstFocusable || !lastFocusable) {
                return;
            }

            firstFocusable.addEventListener('keydown', cycleTabKey);
            lastFocusable.addEventListener('keydown', cycleTabKey);
        }

        function deactivateCycle() {
            if (!firstFocusable || !lastFocusable) {
                return;
            }

            firstFocusable.removeEventListener('keydown', cycleTabKey);
            lastFocusable.removeEventListener('keydown', cycleTabKey);
        }

        function catchFocusables() {
            if (!wrapperElement.value) {
                return;
            }

            const focusables = wrapperElement.value.querySelectorAll<HTMLElement>(
                `button:not([tabindex="-1"]), [href]:not([tabindex="-1"]), input:not([tabindex="-1"]),
                select:not([tabindex="-1"]), textarea:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])`,
            );
            if (!focusables.length) {
                return;
            }

            firstFocusable = focusables[0];
            lastFocusable = focusables[focusables.length - 1];
        }

        function focus() {
            if (document.activeElement) {
                previousFocused = document.activeElement as HTMLElement;
            }

            nextTick(() => {
                if (initialFocusRef.value) {
                    initialFocusRef.value.focus();
                } else {
                    focusTrapRef.value?.focus();
                }
            });
        }

        function blur() {
            deactivateCycle();

            if (previousFocused?.focus) {
                previousFocused.focus();
            }
        }

        onMounted(focus);

        onBeforeUnmount(blur);

        expose({ focus, blur });

        function render() {
            if (!slots.default) {
                return null;
            }

            const vNodes = slots.default();
            if (vNodes.length !== 1) {
                utils.log.error('vs-focus-trap', 'FocusTrap can only contain one child');

                return vNodes;
            }

            nextTick(() => {
                deactivateCycle();
                catchFocusables();
                if (focusLock.value) {
                    activateCycle();
                }
            });

            return h('div', { class: 'vs-focus-trap' }, [
                h('div', { tabindex: -1, ref: focusTrapRef }),
                cloneVNode(vNodes[0], { ref: wrapperRef }),
            ]);
        }

        return () => render();
    },
});
</script>
