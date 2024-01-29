<script lang="ts">
import {
    defineComponent,
    ref,
    toRefs,
    cloneVNode,
    onMounted,
    onBeforeUnmount,
    computed,
    nextTick,
    type Ref,
    type ComponentPublicInstance,
    type PropType,
} from 'vue';

export default defineComponent({
    props: {
        initialFocusRef: { type: [Object, undefined] as PropType<HTMLElement | null>, default: null },
        modal: { type: Boolean, default: true },
    },
    setup(props, { slots }) {
        const { initialFocusRef, modal } = toRefs(props);

        const wrapperEl: Ref<HTMLElement | ComponentPublicInstance | null> = ref(null);

        const el = computed(() => {
            if (!wrapperEl.value) {
                return null;
            }

            return wrapperEl.value instanceof HTMLElement ? wrapperEl.value : (wrapperEl.value.$el as HTMLElement);
        });

        let previousFocused: HTMLElement | null = null;

        let focusables;
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

        function catchFocus() {
            if (!el.value) {
                return;
            }

            focusables = el.value.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            );
            if (!focusables.length) {
                return;
            }

            firstFocusable = focusables[0];
            lastFocusable = focusables[focusables.length - 1];

            nextTick(() => {
                if (initialFocusRef.value) {
                    initialFocusRef.value.focus();
                } else {
                    firstFocusable?.focus();
                }
            });
        }

        onMounted(() => {
            if (document.activeElement) {
                previousFocused = document.activeElement as HTMLElement;
            }

            catchFocus();

            if (modal.value) {
                activateCycle();
            }
        });

        onBeforeUnmount(() => {
            if (modal.value) {
                deactivateCycle();
            }

            if (previousFocused?.focus) {
                previousFocused.focus();
            }
        });

        function render() {
            if (!slots.default) {
                return null;
            }

            const vNodes = slots.default().filter((vnode) => vnode.type !== Comment);
            if (vNodes.length !== 1) {
                console.error('FocusTrap can only contain one child');

                return vNodes;
            }

            return cloneVNode(vNodes[0], { ref: wrapperEl });
        }

        return () => render();
    },
});
</script>
