import VsThemeButton from './../VsThemeButton.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsThemeButton> = {
    title: 'Chromatic/Base Components/VsThemeButton',
    component: VsThemeButton,
    render: (args: any) => ({
        components: { VsThemeButton },
        setup() {
            return { args };
        },
        template: '<vs-theme-button v-bind="args" />',
    }),
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VsThemeButton>;

export const Default: Story = {};
