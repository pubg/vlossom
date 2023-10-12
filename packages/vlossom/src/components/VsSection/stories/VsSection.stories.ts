import type { Meta, StoryObj } from '@storybook/vue3';

import VsSection from '../VsSection.vue';

const meta: Meta<typeof VsSection> = {
    title: 'Vlossom/VsSection',
    component: VsSection,
    render: (args: any, context) => ({
        components: { VsSection },
        setup() {
            return { args, context };
        },
        template: '<vs-section v-bind="args">This is Section Content</vs-section>',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme: {
            control: 'select',
            options: ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof VsSection>;

export const Default: Story = {};

export const ColorScheme: Story = {
    args: {
        colorScheme: 'red',
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: { backgroundColor: '#df120a', borderRadius: '0.8rem', padding: '4rem 2rem' },
    },
};

export const HasTitle: Story = {
    render: (args: any) => ({
        components: { VsSection },
        setup() {
            return { args };
        },
        template:
            '<vs-section v-bind="args"><template #title>This is Section Title</template><div>This is Section Content</div></vs-section>',
    }),
};
