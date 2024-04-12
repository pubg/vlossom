import { colorScheme, LOREM_IPSUM } from '@/storybook';
import VsAccordion from './../VsAccordion.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsAccordion> = {
    title: 'Chromatic/Layout Components/VsAccordion',
    component: VsAccordion,
    render: (args: any) => ({
        components: { VsAccordion },
        setup() {
            return { args };
        },
        template: `
            <vs-accordion v-bind="args">
                <template #title>Hello, Chromatic Vlossom!</template>
                ${LOREM_IPSUM}
            </vs-accordion>`,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsAccordion>;

export const Default: Story = {};
