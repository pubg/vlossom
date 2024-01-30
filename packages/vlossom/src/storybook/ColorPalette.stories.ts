import { chromaticParameters } from '@/storybook/parameters';
import ColorPalette from './ColorPalette.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof ColorPalette> = {
    title: 'Styles/Color Palette',
    component: ColorPalette,
    render: () => ({
        components: { ColorPalette },
        template: '<color-palette />',
    }),
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ColorPalette>;

export const Default: Story = {
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};
