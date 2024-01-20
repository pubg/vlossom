import { colorScheme } from '@/storybook/args';
import { chromaticParameters } from '@/storybook/parameters';
import VsDrawer from './../VsDrawer.vue';

import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

const meta: Meta<typeof VsDrawer> = {
    title: 'Components/Layout Components/VsDrawer',
    component: VsDrawer,
    render: (args: any) => ({
        components: { VsDrawer },
        setup() {
            const isOpen = ref(false);

            function open() {
                isOpen.value = true;
            }

            return { args, isOpen, open };
        },
        template: `
            <vs-button @click="open">Button</vs-button>
            <vs-drawer v-model="isOpen" v-bind="args">
                Here is drawer content
            </vs-drawer>
        `,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
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
                <vs-drawer v-model="isOpen" :color-scheme="currentColorScheme" v-bind="args">
                    Here is drawer content
                </vs-drawer>
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Placement: Story = {
    render: () => ({
        components: { VsDrawer },
        setup() {
            const isOpen = ref(false);

            const placements = ['top', 'bottom', 'left', 'right'];

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
                <vs-drawer v-model="isOpen" :placement="currentPlacement" v-bind="args">
                    Here is drawer content
                </vs-drawer>
            </div>
        `,
    }),
};

const containerStyle = {
    position: 'relative',
    width: '500px',
    height: '800px',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    border: '1px solid rgb(240, 240, 240)',
    borderRadius: '4px',
    padding: '2rem',
};

export const Container: Story = {
    render: () => ({
        components: { VsDrawer },
        setup() {
            const isOpen = ref(false);

            function open() {
                isOpen.value = true;
            }

            return { open, isOpen, containerStyle };
        },
        template: `
            <div :style="containerStyle">
                <vs-button @click="open">Button</vs-button>
                <vs-drawer v-model="isOpen" v-bind="args">
                    Here is drawer content
                </vs-drawer>
            </div>
        `,
    }),
};

// export const StyleSet: Story = {
//     args: {
//         styleSet: { backgroundColor: '#a5d6ad', fontSize: '2rem' },
//     },
// };

// export const PreDefinedStyleSet: Story = {
//     args: {
//         styleSet: 'myStyleSet',
//     },
// };
