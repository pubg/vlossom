import { colorScheme, getColorSchemeTemplate } from '@/storybook/args';
import VsSection from './../VsSection.vue';
import { chromaticParameters } from '@/storybook/parameters';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsSection> = {
    title: 'Components/Layout Components/VsSection',
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
        colorScheme,
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
                ${getColorSchemeTemplate(`
                    <vs-section v-bind="args" color-scheme="{{ color }}">This is Section Contents</vs-section>
                `)}
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
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

export const StyleSet: Story = {
    args: {
        styleSet: { backgroundColor: '#99b1ff', borderRadius: '0.8rem', padding: '4rem 2rem' },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
