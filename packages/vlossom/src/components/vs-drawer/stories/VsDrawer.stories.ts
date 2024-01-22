import { colorScheme, placement, size } from '@/storybook/args';
import { chromaticParameters } from '@/storybook/parameters';
import VsDrawer from './../VsDrawer.vue';
import CloseIcon from '@/icons/CloseIcon.vue';

import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

const meta: Meta<typeof VsDrawer> = {
    title: 'Components/Layout Components/VsDrawer',
    component: VsDrawer,
    render: (args: any) => ({
        components: { VsDrawer, CloseIcon },
        setup() {
            const isOpen = ref(false);

            return { args, isOpen };
        },
        template: `
            <vs-button @click="isOpen = true">Open Drawer</vs-button>
            <vs-drawer v-model="isOpen" v-bind="args">
                <close-icon @click="isOpen = false" />
                Here is drawer content
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
        components: { VsDrawer },
        setup() {
            const isOpen = ref(false);

            const colorOptions = [...colorScheme.options];

            const currentColorScheme = ref(colorOptions[0]);

            function setColorScheme(color: string) {
                currentColorScheme.value = color;
                isOpen.value = true;
            }

            return { isOpen, colorOptions, currentColorScheme, setColorScheme };
        },
        template: `
            <div>
				<vs-button v-for="color in colorOptions" :key="color" :color-scheme="color" @click="setColorScheme(color)">
                    {{ color }}
				</vs-button>
                <vs-drawer v-model="isOpen" :color-scheme="currentColorScheme">
                    Here is drawer content
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
        components: { VsDrawer },
        setup() {
            const isOpen = ref(false);

            return { args, isOpen };
        },
        template: `
            <div>
                <vs-button @click="isOpen = true">Open Drawer</vs-button>
                <vs-drawer v-model="isOpen" v-bind="args">
                    Here is drawer content
                </vs-drawer>
            </div>
        `,
    }),
    args: {
        dimmed: true,
    },
};

export const CloseOnDimmedClick: Story = {
    render: (args: any) => ({
        components: { VsDrawer },
        setup() {
            const isOpen = ref(false);

            return { args, isOpen };
        },
        template: `
            <div>
                <vs-button @click="isOpen = true">Open Drawer</vs-button>
                <vs-drawer v-model="isOpen" v-bind="args">
                    Here is drawer content
                </vs-drawer>
            </div>
        `,
    }),
    args: {
        dimmed: true,
        closeOnDimmed: true,
    },
};

export const Placement: Story = {
    render: () => ({
        components: { VsDrawer },
        setup() {
            const isOpen = ref(false);

            const placements = placement.options;

            const currentPlacement = ref('left');

            function setPlacement(value: string) {
                currentPlacement.value = value;
                isOpen.value = true;
            }

            return { isOpen, placements, currentPlacement, setPlacement };
        },
        template: `
            <div>
				<vs-button v-for="placement in placements" :key="placement" @click="setPlacement(placement)">
                    {{ placement }}
				</vs-button>
                <vs-drawer v-model="isOpen" :placement="currentPlacement">
                    Here is drawer content
                </vs-drawer>
            </div>
        `,
    }),
};

export const Size: Story = {
    render: () => ({
        components: { VsDrawer },
        setup() {
            const isOpen = ref(false);

            const sizes = size.options;

            const currentSize = ref('sm');

            function setSize(value: string) {
                currentSize.value = value;
                isOpen.value = true;
            }

            return { isOpen, sizes, currentSize, setSize };
        },
        template: `
            <div>
                <vs-button v-for="size in sizes" :key="size" @click="setSize(size)">
                    {{ size }}
                </vs-button>
                <vs-drawer v-model="isOpen" :size="currentSize">
                    Here is drawer content
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

export const Header: Story = {
    render: () => ({
        components: { VsDrawer },
        setup() {
            const isOpen = ref(false);

            return { isOpen };
        },
        template: `
            <div>
                <vs-button @click="isOpen = true">Open Drawer</vs-button>
                <vs-drawer v-model="isOpen">
                    <template #header>
                        <div style="padding: 1rem; border-bottom: 1px solid rgb(240, 240, 240);">Here is header</div>
                    </template>

                    Here is drawer content
                </vs-drawer>
            </div>
        `,
    }),
};

export const Footer: Story = {
    render: () => ({
        components: { VsDrawer },
        setup() {
            const isOpen = ref(false);

            return { isOpen };
        },
        template: `
            <div>
                <vs-button @click="isOpen = true">Open Drawer</vs-button>
                <vs-drawer v-model="isOpen">
                    Here is drawer content

                    <template #footer>
                        <div style="padding: 1rem; border-top: 1px solid rgb(240, 240, 240);">Here is footer</div>
                    </template>
                </vs-drawer>
            </div>
        `,
    }),
};

export const HasContainer: Story = {
    render: (args: any) => ({
        components: { VsDrawer },
        setup() {
            const isOpen = ref(false);

            return { args, isOpen, containerStyle };
        },
        template: `
            <div :style="containerStyle">
                Render in this
                <vs-button @click="isOpen = true">Button</vs-button>
                <vs-drawer v-model="isOpen" v-bind="args">
                    Here is drawer content
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
