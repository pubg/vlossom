import { chromaticParameters, colorScheme, align, getColorSchemeTemplate, cssPosition, LOREM_IPSUM } from '@/storybook';
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
				<vs-footer v-bind="args" > This is Footer Content </vs-footer>
				${LOREM_IPSUM}
			</div>
		`,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
        verticalAlign: align,
        position: cssPosition,
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
                    <vs-footer color-scheme="{{ color }}" :style="{ marginBottom: '1rem' }">
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

export const VerticalAlignTop: Story = {
    render: (args: any) => ({
        components: { VsFooter },
        setup() {
            const styleSet = {
                height: '200px',
            };
            return { args, styleSet };
        },
        template: `
			<vs-footer v-bind="args" :styleSet="styleSet" > This is Footer Content </vs-footer>
		`,
    }),
    args: {
        verticalAlign: 'start',
    },
};

export const VerticalAlignBottom: Story = {
    render: (args: any) => ({
        components: { VsFooter },
        setup() {
            const styleSet = {
                height: '200px',
            };
            return { args, styleSet };
        },
        template: `
			<vs-footer v-bind="args" :styleSet="styleSet" > This is Footer Content </vs-footer>
		`,
    }),
    args: {
        verticalAlign: 'end',
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: {
            backgroundColor: '#000',
            color: '#fff',
            height: '60px',
            padding: '10px',
            position: 'absolute',
            textAlign: 'center',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
