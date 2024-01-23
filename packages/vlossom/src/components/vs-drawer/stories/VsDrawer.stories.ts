import { colorScheme, placement, size } from '@/storybook/args';
import { chromaticParameters } from '@/storybook/parameters';
import VsDrawer from './../VsDrawer.vue';
import CloseIcon from '@/icons/CloseIcon.vue';

import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

const DrawerCloseButton = {
    components: { CloseIcon },
    template: `
        <close-icon style="cursor: pointer" />
    `,
};

const contentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    color: 'var(--vs-font-color)',
};

const meta: Meta<typeof VsDrawer> = {
    title: 'Components/Layout Components/VsDrawer',
    component: VsDrawer,
    render: (args: any) => ({
        components: { VsDrawer, DrawerCloseButton },
        setup() {
            const isOpen = ref(false);

            return { args, isOpen, contentStyle };
        },
        template: `
            <vs-button @click="isOpen = true">Open Drawer</vs-button>
            <vs-drawer v-model="isOpen" v-bind="args">
                <div :style="contentStyle">
                    Here is drawer content
                    <drawer-close-button @click="isOpen = false" />
                </div>
            </vs-drawer>
        `,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
        placement,
        size,
    },
};

export default meta;
type Story = StoryObj<typeof VsDrawer>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: () => ({
        components: { VsDrawer, DrawerCloseButton },
        setup() {
            const isOpen = ref(false);

            const colorOptions = [...colorScheme.options];

            const currentColorScheme = ref(colorOptions[0]);

            function setColorScheme(color: string) {
                currentColorScheme.value = color;
                isOpen.value = true;
            }

            return { isOpen, colorOptions, currentColorScheme, setColorScheme, contentStyle };
        },
        template: `
            <div>
				<vs-button v-for="color in colorOptions" :key="color" :color-scheme="color" @click="setColorScheme(color)">
                    {{ color }}
				</vs-button>
                <vs-drawer v-model="isOpen" :color-scheme="currentColorScheme">
                    <div :style="contentStyle">
                        Here is drawer content
                        <drawer-close-button @click="isOpen = false" />
                    </div>
                </vs-drawer>
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Dimmed: Story = {
    render: (args: any) => ({
        components: { VsDrawer, DrawerCloseButton },
        setup() {
            const isOpen = ref(false);

            return { args, isOpen, contentStyle };
        },
        template: `
            <div>
                <vs-button @click="isOpen = true">Open Drawer</vs-button>
                <vs-drawer v-model="isOpen" v-bind="args">
                    <div :style="contentStyle">
                        Here is drawer content
                        <drawer-close-button @click="isOpen = false" />
                    </div>
                </vs-drawer>
            </div>
        `,
    }),
    args: {
        dimmed: true,
    },
};

export const CloseOnOverlayClick: Story = {
    args: {
        dimmed: true,
        closeOnOverlayClick: true,
    },
};

export const Placement: Story = {
    render: () => ({
        components: { VsDrawer, DrawerCloseButton },
        setup() {
            const isOpen = ref(false);

            const placements = placement.options;

            const currentPlacement = ref('left');

            function setPlacement(value: string) {
                currentPlacement.value = value;
                isOpen.value = true;
            }

            return { isOpen, placements, currentPlacement, setPlacement, contentStyle };
        },
        template: `
            <div>
				<vs-button v-for="placement in placements" :key="placement" @click="setPlacement(placement)">
                    {{ placement }}
				</vs-button>
                <vs-drawer v-model="isOpen" :placement="currentPlacement">
                    <div :style="contentStyle">
                        Here is drawer content
                        <drawer-close-button @click="isOpen = false" />
                    </div>
                </vs-drawer>
            </div>
        `,
    }),
};

export const Size: Story = {
    render: () => ({
        components: { VsDrawer, DrawerCloseButton },
        setup() {
            const isOpen = ref(false);

            const sizes = size.options;

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
                        Here is drawer content
                        <drawer-close-button @click="isOpen = false" />
                    </div>
                </vs-drawer>
            </div>
        `,
    }),
};

export const Header: Story = {
    render: () => ({
        components: { VsDrawer, DrawerCloseButton },
        setup() {
            const isOpen = ref(false);

            return { isOpen, contentStyle };
        },
        template: `
            <div>
                <vs-button @click="isOpen = true">Open Drawer</vs-button>
                <vs-drawer v-model="isOpen">
                    <template #header>
                        <div style="padding: 1rem; border-bottom: 1px solid rgb(240, 240, 240); color: var(--vs-font-color)">Here is header</div>
                    </template>

                    <div :style="contentStyle">
                        Here is drawer content
                        <drawer-close-button @click="isOpen = false" />
                    </div>
                </vs-drawer>
            </div>
        `,
    }),
};

export const Footer: Story = {
    render: () => ({
        components: { VsDrawer, DrawerCloseButton },
        setup() {
            const isOpen = ref(false);

            return { isOpen, contentStyle };
        },
        template: `
            <div>
                <vs-button @click="isOpen = true">Open Drawer</vs-button>
                <vs-drawer v-model="isOpen">
                    <div :style="contentStyle">
                        Here is drawer content
                        <drawer-close-button @click="isOpen = false" />
                    </div>

                    <template #footer>
                        <div style="padding: 1rem; border-top: 1px solid rgb(240, 240, 240); color: var(--vs-font-color)">Here is footer</div>
                    </template>
                </vs-drawer>
            </div>
        `,
    }),
};

const containerStyle = {
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    border: '1px solid rgb(240, 240, 240)',
    borderRadius: '4px',
    height: '800px',
    overflow: 'hidden',
    padding: '2rem',
    width: '600px',
};

export const HasContainer: Story = {
    render: (args: any) => ({
        components: { VsDrawer, DrawerCloseButton },
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
                        Here is drawer content
                        <drawer-close-button @click="isOpen = false" />
                    </div>
                </vs-drawer>
            </div>
        `,
    }),
    args: {
        hasContainer: true,
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: { width: '300px' },
    },
};

// export const PreDefinedStyleSet: Story = {
//     args: {
//         styleSet: 'myStyleSet',
//     },
// };
