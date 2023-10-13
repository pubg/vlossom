import type { Meta, StoryObj } from '@storybook/vue3';

import VsSection from '../VsSection.vue';

const meta: Meta<typeof VsSection> = {
    title: 'Vlossom/VsSection',
    component: VsSection,
    render: (args: any) => ({
        components: { VsSection },
        setup() {
            return { args };
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
    render: (args: any) => ({
        components: { VsSection },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-section v-bind="args" color-scheme="red">This is Section Content</vs-section>
                <vs-section v-bind="args" color-scheme="orange">This is Section Content</vs-section>
                <vs-section v-bind="args" color-scheme="yellow">This is Section Content</vs-section>
                <vs-section v-bind="args" color-scheme="green">This is Section Content</vs-section>
                <vs-section v-bind="args" color-scheme="teal">This is Section Content</vs-section>
                <vs-section v-bind="args" color-scheme="blue">This is Section Content</vs-section>
                <vs-section v-bind="args" color-scheme="indigo">This is Section Content</vs-section>
                <vs-section v-bind="args" color-scheme="purple">This is Section Content</vs-section>
                <vs-section v-bind="args" color-scheme="pink">This is Section Content</vs-section>
            </div>
        `,
    }),
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
        template: `
            <vs-section v-bind="args">
                <template #title>This is Section Title</template>
                This is Section Content
            </vs-section>
        `,
    }),
};
