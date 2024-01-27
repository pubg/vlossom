<script lang="ts">
import {
    defineComponent,
    ref,
    toRefs,
    cloneVNode,
    onMounted,
    onBeforeUnmount,
    watch,
    computed,
    nextTick,
    type Ref,
    type ComponentPublicInstance,
} from 'vue';

export default defineComponent({
    props: {
        active: { type: Boolean, default: false },
        returnFocusOnDeactivate: { type: Boolean, default: true },
    },
    setup(props, { slots }) {
        const { active, returnFocusOnDeactivate } = toRefs(props);

        const wrapperEl: Ref<HTMLElement | ComponentPublicInstance | null> = ref(null);

        const el = computed(() => {
            if (!wrapperEl.value) {
                return null;
            }

            return wrapperEl.value instanceof HTMLElement ? wrapperEl.value : (wrapperEl.value.$el as HTMLElement);
        });

        let previousFocused: HTMLElement | null = null;

        let focusables: NodeListOf<HTMLElement> | null = null;
        let firstFocusable: HTMLElement | null = null;
        let lastFocusable: HTMLElement | null = null;

        function trapTabKey(event: KeyboardEvent) {
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

        function addListeners() {
            if (!firstFocusable || !lastFocusable) {
                return;
            }

            firstFocusable.addEventListener('keydown', trapTabKey);
            lastFocusable.addEventListener('keydown', trapTabKey);
        }

        function removeListeners() {
            if (!firstFocusable || !lastFocusable) {
                return;
            }

            firstFocusable.removeEventListener('keydown', trapTabKey);
            lastFocusable.removeEventListener('keydown', trapTabKey);
        }

        function activate() {
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

            addListeners();
        }

        function deactivate() {
            if (!el.value) {
                return;
            }

            removeListeners();

            firstFocusable = null;
            lastFocusable = null;
        }

        watch(
            active,
            (val) => {
                nextTick(() => {
                    if (val) {
                        activate();
                    } else {
                        deactivate();
                    }
                });
            },
            { immediate: true },
        );

        onMounted(() => {
            if (document.activeElement) {
                previousFocused = document.activeElement as HTMLElement;
            }
        });

        onBeforeUnmount(() => {
            if (active.value) {
                deactivate();
            }

            if (returnFocusOnDeactivate.value && previousFocused?.focus) {
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
