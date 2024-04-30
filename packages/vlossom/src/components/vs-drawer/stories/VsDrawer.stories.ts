import { placement, size, colorScheme } from '@/storybook';
import { userEvent, within } from '@storybook/test';
import { ref } from 'vue';
import { VsIcon } from '@/icons';
import VsDrawer from './../VsDrawer.vue';
import VsButton from '@/components/vs-button/VsButton.vue';
import VsInput from '@/components/vs-input/VsInput.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const DrawerCloseButton = {
    components: { VsIcon },
    template: `
        <vs-icon icon="close" style="cursor: pointer" />
    `,
};

const contentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
};

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

const meta: Meta<typeof VsDrawer> = {
    title: 'Components/Layout Components/VsDrawer',
    component: VsDrawer,
    render: (args: any) => ({
        components: { VsDrawer, DrawerCloseButton, VsButton },
        setup() {
            const isOpen = ref(false);

            return { args, isOpen, contentStyle };
        },
        template: `
            <vs-button @click="isOpen = true">Open Drawer</vs-button>
            <vs-drawer v-model="isOpen" v-bind="args">
                <div :style="contentStyle">
                    Here is drawer body
                    <drawer-close-button @click="isOpen = false" />
                </div>
            </vs-drawer>
        `,
    }),
    tags: ['autodocs'],
    argTypes: {
        placement,
        size,
        colorScheme,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await userEvent.click(canvas.getByRole('button'), { delay: 300 });
    },
};

export default meta;
type Story = StoryObj<typeof VsDrawer>;

export const Default: Story = {};

export const Placement: Story = {
    render: () => ({
        components: { VsDrawer, DrawerCloseButton, VsButton },
        setup() {
            const isOpen = ref(false);
            const placements = placement.options;
            const currentPlacement = ref('left');

            function setPlacement(value: string) {
                currentPlacement.value = value;
                isOpen.value = true;
            }

            return {
                isOpen,
                placements,
                currentPlacement,
                setPlacement,
                contentStyle,
            };
        },
        template: `
            <div>
				<vs-button v-for="placement in placements" :key="placement" @click="setPlacement(placement)">
                    {{ placement }}
				</vs-button>
                <vs-drawer v-model="isOpen" :placement="currentPlacement">
                    <div :style="contentStyle">
                        Here is drawer body
                        <drawer-close-button @click="isOpen = false" />
                    </div>
                </vs-drawer>
            </div>
        `,
    }),
    play: () => {},
};

export const Size: Story = {
    render: () => ({
        components: { VsDrawer, DrawerCloseButton, VsButton },
        setup() {
            const isOpen = ref(false);
            const sizes = [...size.options, '500px'];
            const currentSize = ref('sm');

            function setSize(value: string) {
                currentSize.value = value;
                isOpen.value = true;
            }

            return { isOpen, sizes, currentSize, setSize, contentStyle };
        },
        template: `
            <div>
                <vs-button v-for="size in sizes" :key="size" @click="setSize(size)">
                    {{ size }}
                </vs-button>
                <vs-drawer v-model="isOpen" :size="currentSize">
                    <div :style="contentStyle">
                        Here is drawer body
                        <drawer-close-button @click="isOpen = false" />
                    </div>
                </vs-drawer>
            </div>
        `,
    }),
    play: () => {},
};

export const Header: Story = {
    render: () => ({
        components: { VsDrawer, DrawerCloseButton, VsButton },
        setup() {
            const isOpen = ref(false);

            return { isOpen, contentStyle };
        },
        template: `
            <div>
                <vs-button @click="isOpen = true">Open Drawer</vs-button>
                <vs-drawer v-model="isOpen">
                    <template #header>
                        <div style="padding: 1rem; border-bottom: 1px solid rgb(240, 240, 240); display:flex; justify-content: space-between">
                            Here is drawer header
                            <drawer-close-button @click="isOpen = false" />
                        </div>
                    </template>

                    <div :style="contentStyle">
                        Here is drawer body
                    </div>
                </vs-drawer>
            </div>
        `,
    }),
};

export const Footer: Story = {
    render: () => ({
        components: { VsDrawer, DrawerCloseButton, VsButton },
        setup() {
            const isOpen = ref(false);

            return { isOpen, contentStyle };
        },
        template: `
            <div>
                <vs-button @click="isOpen = true">Open Drawer</vs-button>
                <vs-drawer v-model="isOpen">
                    <div :style="contentStyle">
                        Here is drawer body
                        <drawer-close-button @click="isOpen = false" />
                    </div>

                    <template #footer>
                        <div style="padding: 1rem; border-top: 1px solid rgb(240, 240, 240)">Here is drawer footer</div>
                    </template>
                </vs-drawer>
            </div>
        `,
    }),
};

export const HasContainer: Story = {
    render: (args: any) => ({
        components: { VsDrawer, DrawerCloseButton, VsButton },
        setup() {
            const isOpen = ref(false);

            return { args, isOpen, containerStyle, contentStyle };
        },
        template: `
            <div :style="containerStyle">
                Render in this
                <vs-button @click="isOpen = true">Button</vs-button>
                <vs-drawer v-model="isOpen" v-bind="args">
                    <div :style="contentStyle">
                        Here is drawer body
                        <drawer-close-button @click="isOpen = false" />
                    </div>
                </vs-drawer>
            </div>
        `,
    }),
    args: {
        hasContainer: true,
        size: 'md',
    },
};

export const HideScroll: Story = {
    render: (args: any) => ({
        components: { VsDrawer, DrawerCloseButton, VsButton },
        setup() {
            const isOpen = ref(false);

            return { args, isOpen, contentStyle };
        },
        template: `
            <div>
                <vs-button @click="isOpen = true">Open Drawer</vs-button>
                <vs-drawer v-model="isOpen" v-bind="args">
                    <div :style="{...contentStyle, height: '1500px'}">
                        Here is drawer body
                        <drawer-close-button @click="isOpen = false" />
                    </div>
                </vs-drawer>
            </div>
        `,
    }),
    args: {
        hideScroll: true,
    },
};

export const InitialFocusRef: Story = {
    render: () => ({
        components: { VsDrawer, DrawerCloseButton, VsInput, VsButton },
        setup() {
            const isOpen = ref(false);
            const inputRef = ref(null);

            return { isOpen, contentStyle, inputRef };
        },
        template: `
            <div>
                <vs-button @click="isOpen = true">Open Drawer</vs-button>
                <vs-drawer v-model="isOpen" :initialFocusRef="inputRef">
                    <div :style="contentStyle">
                        Here is drawer body
                        <drawer-close-button @click="isOpen = false" />
                    </div>
                    <vs-input ref="inputRef" />
                </vs-drawer>
            </div>
        `,
    }),
};

export const StyleSet: Story = {
    args: {
        styleSet: { backgroundColor: '#FBE7C6', height: '500px', width: '200px' },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
