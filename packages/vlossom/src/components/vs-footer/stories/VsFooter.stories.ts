import type { Meta, StoryObj } from '@storybook/vue3';
import { colorScheme } from '@/storybook/args';
import VsFooter from './../VsFooter.vue';

const meta: Meta<typeof VsFooter> = {
    title: 'Components/Layout Components/VsFooter',
    component: VsFooter,
    render: (args: any) => ({
        components: { VsFooter },
        setup() {
            return { args };
        },
        template: '<vs-footer v-bind="args"> This is Footer Content </vs-footer>',
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
    parameters: {
        a11y: {
            disable: true,
            /* To allow multiple footers (Please refer to the links below)
			- https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/contentinfo.html
			- https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/
			*/
        },
    },
    render: () => ({
        components: { VsFooter },
        setup() {
            const colorOptions = [...colorScheme.options];
            return { colorOptions };
        },
        template: `
			<div>
                <div :style="{marginBottom: '1rem'}" v-for="(color, index) in colorOptions" :key="index">
					<vs-footer :color-scheme="color"> This is Footer Content </vs-footer>
				</div>
			</div>
		`,
    }),
};

export const Primary: Story = {
    parameters: {
        a11y: {
            disable: true,
            /* To allow multiple footers (Please refer to the links below)
			- https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/contentinfo.html
			- https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/
			*/
        },
    },
    render: () => ({
        components: { VsFooter },
        setup() {
            const colorOptions = [...colorScheme.options];
            return { colorOptions };
        },
        template: `
			<div>
                <div :style="{marginBottom: '1rem'}" v-for="(color, index) in colorOptions" :key="index">
					<vs-footer :color-scheme="color" primary> This is Footer Content </vs-footer>
				</div>
			</div>
		`,
    }),
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
