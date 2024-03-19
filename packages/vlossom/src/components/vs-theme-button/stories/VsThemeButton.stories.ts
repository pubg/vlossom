import VsThemeButton from './../VsThemeButton.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsThemeButton> = {
    title: 'Components/Base Components/VsThemeButton',
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

export const StyleSet: Story = {
    args: {
        styleSet: {
            backgroundColor: '#DEB3AD',
            borderRadius: '1rem',
            fontColor: '#B95C50',
            hoverBackgroundColor: '#DE847B',
            width: '3rem',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
