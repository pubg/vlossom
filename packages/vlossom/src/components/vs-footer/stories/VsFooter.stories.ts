import { chromaticParameters, colorScheme, getColorSchemeTemplate, LOREM_IPSUM } from '@/storybook';
import VsFooter from './../VsFooter.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsFooter> = {
    title: 'Components/Layout Components/VsFooter',
    component: VsFooter,
    render: (args: any) => ({
        components: { VsFooter },
        setup() {
            return { args };
        },
        template: `
			<div style="height:200px; background-color:#fff; position: relative; width: 100%">
				<div style="padding-bottom:50px;">${LOREM_IPSUM}</div>
				<vs-footer v-bind="args" > This is Footer Content </vs-footer>
			</div>
		`,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
};
export default meta;
type Story = StoryObj<typeof VsFooter>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: () => ({
        components: { VsFooter },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-footer color-scheme="{{ color }}" :style="{ marginBottom: '1rem' }">
						This is Footer Content
                    </vs-footer>
                `)}
            </div>
		`,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Primary: Story = {
    render: () => ({
        components: { VsFooter },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-footer color-scheme="{{ color }}" :style="{ marginBottom: '1rem' }" primary>
						This is Footer Content
                    </vs-footer>
                `)}
            </div>
		`,
    }),
    args: {
        primary: true,
    },
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: {
            backgroundColor: '#000',
            fontColor: '#fff',
            height: '60px',
            padding: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 1)',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
