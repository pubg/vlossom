import type { Meta, StoryObj } from '@storybook/vue3';
import { colorScheme } from '@/storybook/args';
import VsProgress from './../VsProgress.vue';

const meta: Meta<typeof VsProgress> = {
    title: 'Components/Base Components/VsProgress',
    component: VsProgress,
    render: (args: any) => ({
        components: { VsProgress },
        setup() {
            return { args };
        },
        template: '<vs-progress v-bind="args" />',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsProgress>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsProgress },
        setup() {
            return { args };
        },
        template: `
			<div>
				<vs-progress color-scheme="red" :value="10"/>
				<vs-progress color-scheme="amber" :value="20"/>
				<vs-progress color-scheme="green" :value="30"/>
				<vs-progress color-scheme="teal" :value="40"/>
				<vs-progress color-scheme="blue" :value="50"/>
				<vs-progress color-scheme="indigo" :value="60"/>
				<vs-progress color-scheme="purple" :value="70"/>
				<vs-progress color-scheme="pink" :value="80"/>
			</div>
		`,
    }),
};

export const Primary: Story = {
    render: (args: any) => ({
        components: { VsProgress },
        setup() {
            return { args };
        },
        template: `
			<div>
				<vs-progress color-scheme="red" primary :value="20" :max="200"/>
				<vs-progress color-scheme="amber" primary :value="40" :max="200"/>
				<vs-progress color-scheme="green" primary :value="60" :max="200"/>
				<vs-progress color-scheme="teal" primary :value="80" :max="200"/>
				<vs-progress color-scheme="blue" primary :value="100" :max="200"/>
				<vs-progress color-scheme="indigo" primary :value="120" :max="200"/>
				<vs-progress color-scheme="purple" primary :value="140" :max="200"/>
				<vs-progress color-scheme="pink" primary :value="160" :max="200"/>
			</div>
		`,
    }),
};

export const StyleSet: Story = {
    args: {
        styleSet: { width: '50%', height: '2rem', borderRadius: '0.1rem' },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
