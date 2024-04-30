import { chromaticParameters, colorScheme, align, getColorSchemeTemplate, cssPosition, LOREM_IPSUM } from '@/storybook';
import VsHeader from './../VsHeader.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsHeader> = {
    title: 'Components/Layout Components/VsHeader',
    component: VsHeader,
    render: (args: any) => ({
        components: { VsHeader },
        setup() {
            return { args };
        },
        template: `
			<div style="height:200px; background-color:#fff; position: relative; width: 100%">
				<vs-header v-bind="args"> This is Header Content </vs-header>
				<div style="padding-top:50px;">${LOREM_IPSUM}</div>
			</div>
		`,
    }),
    tags: ['autodocs'],
    args: {
        position: 'absolute',
    },
    argTypes: {
        colorScheme,
        verticalAlign: align,
        position: cssPosition,
    },
};
export default meta;
type Story = StoryObj<typeof VsHeader>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: () => ({
        components: { VsHeader },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-header color-scheme="{{ color }}" :style="{ marginBottom: '1rem' }">
						This is Header Content
                    </vs-header>
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
        components: { VsHeader },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-header color-scheme="{{ color }}" :style="{ marginBottom: '1rem' }" primary>
						This is Header Content
                    </vs-header>
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

export const VerticalAlignStart: Story = {
    args: {
        verticalAlign: 'start',
    },
};

export const VerticalAlignEnd: Story = {
    args: {
        verticalAlign: 'end',
    },
};

export const StyleSet: Story = {
    args: {
        position: undefined,
        height: undefined,
        styleSet: {
            backgroundColor: '#000',
            fontColor: '#fff',
            height: '60px',
            left: 0,
            padding: '10px',
            position: 'fixed',
            textAlign: 'center',
            top: 0,
            boxShadow: '0 0 10px rgba(0, 0, 0, 1)',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        position: undefined,
        height: undefined,
        styleSet: 'myStyleSet',
    },
};
