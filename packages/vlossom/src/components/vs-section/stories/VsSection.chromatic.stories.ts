import { colorScheme, LOREM_IPSUM } from '@/storybook';
import VsSection from './../VsSection.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsSection> = {
    title: 'Chromatic/Layout Components/VsSection',
    component: VsSection,
    render: (args: any) => ({
        components: { VsSection },
        setup() {
            return { args };
        },
        template: `
            <vs-section v-bind="args" color-scheme="{{ color }}">
                <template #title><h3>Hello, vs-section!</h3></template>
                ${LOREM_IPSUM}
            </vs-section>`,
    }),
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsSection>;

export const Default: Story = {};
