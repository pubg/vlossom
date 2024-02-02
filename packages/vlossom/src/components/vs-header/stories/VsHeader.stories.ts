import { colorScheme, align, getColorSchemeTemplate, cssPosition } from '@/storybook/args';
import { chromaticParameters } from '@/storybook/parameters';
import VsHeader from './../VsHeader.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsHeader> = {
    title: 'Components/Layout Components/VsHeader',
    component: VsHeader,
    render: (args: any) => ({
        components: { VsHeader },
        setup() {
            const content = `Lorem ipsum dolor sit amet consectetur adipisicing elit.
			Possimus, voluptatem cum? Atque facilis mollitia distinctio
			perferendis sed voluptates omnis sit maxime ad! Porro incidunt
			voluptatem quaerat sint itaque, blanditiis excepturi!`;

            return { content, args };
        },
        template: `
			<div style="height:200px; background-color:#fff; position: relative; width: 100%">
				<vs-header v-bind="args" > This is Header Content </vs-header>
				{{content}}
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
                    <vs-header color-scheme="{{ color }}" :style="{ marginBottom: '1rem' }">
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
    render: (args: any) => ({
        components: { VsHeader },
        setup() {
            const styleSet = {
                height: '200px',
            };
            return { args, styleSet };
        },
        template: `
			<vs-header v-bind="args" :styleSet="styleSet" > This is Header Content </vs-header>
		`,
    }),
    args: {
        verticalAlign: 'start',
    },
};

export const VerticalAlignEnd: Story = {
    render: (args: any) => ({
        components: { VsHeader },
        setup() {
            const styleSet = {
                height: '200px',
            };
            return { args, styleSet };
        },
        template: `
			<vs-header v-bind="args" :styleSet="styleSet" > This is Header Content </vs-header>
		`,
    }),
    args: {
        verticalAlign: 'end',
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: { backgroundColor: '#000', color: '#fff', height: '60px', padding: '10px', textAlign: 'center' },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
