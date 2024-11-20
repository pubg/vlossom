<template>
    <div
        :class="['vs-modal-node', colorSchemeClass, { 'vs-has-container': hasContainer, 'vs-dimmed': dimmed }]"
        :style="computedStyleSet"
    >
        <div v-if="dimmed" class="vs-modal-dimmed" aria-hidden="true" @click.stop="onClickDimmed" />
        <Transition name="modal" :duration="MODAL_DURATION">
            <vs-focus-trap ref="focusTrapRef" :focus-lock="focusLock" :initial-focus-ref="initialFocusRef">
                <div
                    :class="['vs-modal-wrap', hasSpecifiedSize ? '' : size]"
                    role="dialog"
                    :aria-labelledby="hasHeader ? headerId : undefined"
                    :aria-describedby="bodyId"
                    :aria-label="hasHeader ? undefined : 'Modal'"
                    :aria-modal="true"
                >
                    <div class="vs-modal-contents">
                        <header v-if="hasHeader" :id="headerId" class="vs-modal-header" aria-label="Modal Header">
                            <slot name="header" />
                        </header>

                        <div :id="bodyId" :class="['vs-modal-body', { 'hide-scroll': hideScroll }]">
                            <slot />
                        </div>

                        <footer v-if="$slots['footer']" class="vs-modal-footer" aria-label="Modal Footer">
                            <slot name="footer" />
                        </footer>
                    </div>
                </div>
            </vs-focus-trap>
        </Transition>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { Size, SIZES, VsNode } from '@/declaration';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsModalStyleSet } from '@/components';
import { utils } from '@/utils';
import { getModalProps } from '@/models';

const name = VsNode.VsModalNode;
export default defineComponent({
    name,
    props: {
        ...getModalProps(),
    },
    setup(props) {
        const { colorScheme, styleSet, size } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet: modalStyleSet } = useStyleSet<VsModalStyleSet>(name, styleSet);

        const hasSpecifiedSize = computed(() => size.value && !SIZES.includes(size.value as Size));

        const sizeStyle = computed(() => {
            const style: { [key: string]: string } = {};

            if (typeof size.value === 'object') {
                const { width = 'md', height = 'md' } = size.value;

                if (SIZES.includes(width as Size)) {
                    style['--vs-modal-width'] = `var(--vs-modal-width-${width})`;
                } else {
                    const convertedWidth = utils.string.convertToStringSize(width);
                    style['--vs-modal-width'] = convertedWidth;
                }

                if (SIZES.includes(height as Size)) {
                    style['--vs-modal-height'] = `var(--vs-modal-height-${height})`;
                } else {
                    const convertedHeight = utils.string.convertToStringSize(height);
                    style['--vs-modal-height'] = convertedHeight;
                }
            } else if (hasSpecifiedSize.value) {
                const convertedSize = utils.string.convertToStringSize(size.value);

                style['--vs-modal-width'] = convertedSize;
                style['--vs-modal-height'] = convertedSize;
            }

            return style;
        });

        const computedStyleSet = computed(() => {
            return {
                ...modalStyleSet.value,
                ...sizeStyle.value,
            };
        });

        return {
            colorSchemeClass,
            computedStyleSet,
        };
    },
});
</script>

<style lang="scss" src="./VsModalNode.scss" />
