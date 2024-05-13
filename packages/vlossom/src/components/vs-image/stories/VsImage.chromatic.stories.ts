import { src, fallbackSrc, lazySrc } from './constants';
import VsImage from './../VsImage.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsImage> = {
    title: 'Chromatic/Base Components/VsImage',
    component: VsImage,
    render: (args: any) => ({
        components: { VsImage },
        setup() {
            return { args, fallbackSrc, lazySrc };
        },
        template: `
            <div style="display:flex; flex-direction:column;">
                <vs-image v-bind="args" :style="{ marginBottom: '12px' }"/>

                <vs-image v-bind="args" src='' :fallback="fallbackSrc" :style="{ marginBottom: '12px' }"/>

                <vs-image v-bind="args" src='' alt="alternative text" :style="{ marginBottom: '12px' }"/>
				
                <vs-image v-bind="args" :src="lazySrc" lazy alt="lazy loading"/>
            </div>`,
    }),
    args: {
        src,
    },
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof VsImage>;

export const Default: Story = {};
