import VsImage from './../VsImage.vue';
import { chromaticParameters } from '@/storybook/parameters';

import type { Meta, StoryObj } from '@storybook/vue3';

const src = 'https://cdn.pixabay.com/photo/2022/04/06/14/26/ornamental-plum-7115659_1280.jpg';
const fallback = 'https://cdn.pixabay.com/photo/2019/04/19/07/24/blossom-4138763_1280.jpg';
const lazy = 'https://cdn.pixabay.com/photo/2017/04/07/14/25/cat-2211076_1280.jpg';

const meta: Meta<typeof VsImage> = {
    title: 'Components/Base Components/VsImage',
    component: VsImage,
    render: (args: any) => ({
        components: { VsImage },
        setup() {
            return { args };
        },
        template: `<vs-image v-bind="args"/>`,
    }),
    args: {
        src,
    },
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof VsImage>;

export const Default: Story = {
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Fallback: Story = {
    render: (args: any) => ({
        components: { VsImage },
        setup() {
            return { args };
        },
        template: `<vs-image v-bind="args"/>`,
    }),
    args: {
        src: '',
        fallback,
    },
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Alt: Story = {
    render: (args: any) => ({
        components: { VsImage },
        setup() {
            return { args };
        },
        template: `<vs-image v-bind="args"/>`,
    }),
    args: {
        src: '',
        alt: 'alternative text',
    },
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Lazy: Story = {
    render: (args: any) => ({
        components: { VsImage },
        setup() {
            return { args };
        },
        template: `<vs-image v-bind="args"/>`,
    }),
    args: {
        src: lazy,
        lazy: true,
    },
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: {
            border: '3px solid black',
            borderRadius: '100%',
            width: '300px',
            height: '300px',
            objectFit: 'cover',
        },
    },
};
