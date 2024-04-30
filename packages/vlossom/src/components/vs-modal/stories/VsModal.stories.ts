import { size, colorScheme } from '@/storybook';
import { defineComponent, ref } from 'vue';
import VsModal from './../VsModal.vue';
import VsButton from '@/components/vs-button/VsButton.vue';
import VsInput from '@/components/vs-input/VsInput.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const ModalCloseButton = defineComponent({
    components: { VsButton },
    template: `
        <vs-button>Close</vs-button>
    `,
});

const containerStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    border: '1px solid rgb(240, 240, 240)',
    borderRadius: '4px',
    color: 'var(--vs-comp-font)',
    height: '800px',
    overflow: 'hidden',
    position: 'relative',
    padding: '2rem',
    width: '600px',
};

const meta: Meta<typeof VsModal> = {
    title: 'Components/Layout Components/VsModal',
    component: VsModal,
    render: (args: any) => ({
        components: { VsModal, ModalCloseButton, VsButton },
        setup() {
            const isOpen = ref(false);

            return { args, isOpen };
        },
        template: `
            <vs-button @click="isOpen = true">Open Modal</vs-button>
            <vs-modal v-model="isOpen" v-bind="args">
                <template #header>
                    <div style="display:flex; justify-content: space-between">
                        Modal
                    </div>
                </template>
                some contents ...
                <template #footer>
                    <modal-close-button :color-scheme="args.colorScheme" primary @click="isOpen = false" />
                </template>
            </vs-modal>
        `,
    }),
    tags: ['autodocs'],
    argTypes: {
        size,
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsModal>;

export const Default: Story = {};

export const Size: Story = {
    render: (args: any) => ({
        components: { VsModal, ModalCloseButton, VsButton },
        setup() {
            const isOpen = ref(false);
            const sizes = size.options;
            const currentSize = ref('sm');

            function setSize(value: string) {
                currentSize.value = value;
                isOpen.value = true;
            }

            return { args, isOpen, sizes, currentSize, setSize };
        },
        template: `
            <div>
                <vs-button v-for="size in sizes" :key="size" @click="setSize(size)">
                    {{ size }}
                </vs-button>
                <vs-modal v-model="isOpen" v-bind="args" :size="currentSize">
                    some contents ...
                    <template #footer>
                        <modal-close-button primary @click="isOpen = false" />
                    </template>
                </vs-modal>
            </div>
        `,
    }),
    play: () => {},
};

export const Header: Story = {
    render: () => ({
        components: { VsModal, ModalCloseButton, VsButton },
        setup() {
            const isOpen = ref(false);

            return { isOpen };
        },
        template: `
            <div>
                <vs-button @click="isOpen = true">Open Modal</vs-button>
                <vs-modal v-model="isOpen">
                    <template #header>
                        <div style="display:flex; justify-content: space-between">
                            Here is modal header
                        </div>
                    </template>

                    Here is modal body

                    <template #footer>
                        <modal-close-button primary @click="isOpen = false" />
                    </template>
                </vs-modal>
            </div>
        `,
    }),
};

export const Footer: Story = {
    render: () => ({
        components: { VsModal, ModalCloseButton, VsButton },
        setup() {
            const isOpen = ref(false);

            return { isOpen };
        },
        template: `
            <div>
                <vs-button @click="isOpen = true">Open Modal</vs-button>
                <vs-modal v-model="isOpen">
                    Here is modal body

                    <template #footer>
                        <div>
                            Here is modal footer
                            <modal-close-button primary @click="isOpen = false" />
                        </div>
                    </template>
                </vs-modal>
            </div>
        `,
    }),
};

export const Nested: Story = {
    render: () => ({
        components: { VsModal, ModalCloseButton, VsButton },
        setup() {
            const isOpen = ref(false);
            const isOpenNested = ref(false);

            return { isOpen, isOpenNested };
        },
        template: `
            <div>
                <vs-button @click="isOpen = true">Open Modal</vs-button>
                <vs-modal v-model="isOpen">
                    <div>
                        Here is modal body
                        <vs-button @click="isOpenNested = true">Open Nested Modal</vs-button>
                        <vs-modal v-model="isOpenNested">
                            <div >
                                Here is nested modal body
                            </div>
                            <template #footer>
                                <modal-close-button @click="isOpenNested = false" />
                            </template>
                        </vs-modal>
                    </div>
                    <template #footer>
                        <modal-close-button primary @click="isOpen = false" />
                    </template>
                </vs-modal>
            </div>
        `,
    }),
};

export const Form: Story = {
    render: () => ({
        components: { VsModal, ModalCloseButton, VsButton, VsInput },
        setup() {
            const isOpen = ref(false);
            const form = ref({ name: '', email: '' });

            return { isOpen, form };
        },
        template: `
            <div>
                <vs-button @click="isOpen = true">Open Modal</vs-button>
                <vs-modal v-model="isOpen">
                    <div>
                        <vs-input v-model="form.name" label="Name" />
                        <vs-input v-model="form.email" label="Email" />
                    </div>
                    <template #footer>
                        <modal-close-button primary @click="isOpen = false" />
                    </template>
                </vs-modal>
            </div>
        `,
    }),
};

export const HasContainer: Story = {
    render: (args: any) => ({
        components: { VsModal, ModalCloseButton, VsButton },
        setup() {
            const isOpen = ref(false);

            return { args, isOpen, containerStyle };
        },
        template: `
            <div :style="containerStyle">
                Render in this
                <vs-button @click="isOpen = true">Button</vs-button>
                <vs-modal v-model="isOpen" v-bind="args">
                    Here is modal body
                    <template #footer>
                        <modal-close-button primary @click="isOpen = false" />
                    </template>
                </vs-modal>
            </div>
        `,
    }),
    args: {
        hasContainer: true,
    },
};

export const HideScroll: Story = {
    render: (args: any) => ({
        components: { VsModal, ModalCloseButton, VsButton },
        setup() {
            const isOpen = ref(false);

            return { args, isOpen };
        },
        template: `
            <div>
                <vs-button @click="isOpen = true">Open Modal</vs-button>
                <vs-modal v-model="isOpen" v-bind="args">
                    <div :style="{ height: '1500px' }">
                        Here is modal body
                    </div>
                    <template #footer>
                        <modal-close-button primary @click="isOpen = false" />
                    </template>
                </vs-modal>
            </div>
        `,
    }),
    args: {
        hideScroll: true,
        size: 'md',
    },
};

export const InitialFocusRef: Story = {
    render: () => ({
        components: { VsModal, ModalCloseButton, VsButton, VsInput },
        setup() {
            const isOpen = ref(false);
            const inputRef = ref(null);

            return { isOpen, inputRef };
        },
        template: `
            <div>
                <vs-button @click="isOpen = true">Open Modal</vs-button>
                <vs-modal v-model="isOpen" :initialFocusRef="inputRef">
                    <div >
                        <vs-input ref="inputRef" />
                    </div>
                    <template #footer>
                        <modal-close-button primary @click="isOpen = false" />
                    </template>
                </vs-modal>
            </div>
        `,
    }),
};

export const StyleSet: Story = {
    args: {
        styleSet: {
            backgroundColor: '#FBE7C6',
            borderRadius: '1.6rem',
            contentFontColor: '#265073',
            height: '600px',
            width: '300px',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
