import type { Meta, StoryObj } from '@storybook/vue3';
import { colorScheme } from '@/storybook/args';
import VsNotice from '../VsNotice.vue';
import { chromaticParameters } from '@/storybook/parameters';

const meta: Meta<typeof VsNotice> = {
    title: 'Components/Base Components/VsNotice',
    component: VsNotice,
    render: (args: any) => ({
        components: { VsNotice },
        setup() {
            return { args };
        },
        template: '<vs-notice v-bind="args">Hello! This is Notice</vs-notice>',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsNotice>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsNotice },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-notice color-scheme="red">Hello! This is red notice</vs-notice>
                <vs-notice color-scheme="amber">Hello! This is amber notice</vs-notice>
                <vs-notice color-scheme="green">Hello! This is green notice</vs-notice>
                <vs-notice color-scheme="teal">Hello! This is teal notice</vs-notice>
                <vs-notice color-scheme="blue">Hello! This is blue notice</vs-notice>
                <vs-notice color-scheme="indigo">Hello! This is indigo notice</vs-notice>
                <vs-notice color-scheme="purple">Hello! This is purple notice</vs-notice>
                <vs-notice color-scheme="pink">Hello! This is pink notice</vs-notice>
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Primary: Story = {
    render: (args: any) => ({
        components: { VsNotice },
        setup() {
            return { args };
        },
        template: `
            <div>
				<vs-notice color-scheme="red" primary>Hello! This is red notice</vs-notice>
                <vs-notice color-scheme="amber" primary>Hello! This is amber notice</vs-notice>
                <vs-notice color-scheme="green" primary>Hello! This is green notice</vs-notice>
                <vs-notice color-scheme="teal" primary>Hello! This is teal notice</vs-notice>
                <vs-notice color-scheme="blue" primary>Hello! This is blue notice</vs-notice>
                <vs-notice color-scheme="indigo" primary>Hello! This is indigo notice</vs-notice>
                <vs-notice color-scheme="purple" primary>Hello! This is purple notice</vs-notice>
                <vs-notice color-scheme="pink" primary>Hello! This is pink notice</vs-notice>
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: { backgroundColor: '#a5d6ad', fontSize: '2rem' },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
