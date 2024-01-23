import { colorScheme, getColorSchemeTemplate } from '@/storybook/args';
import VsNotice from '../VsNotice.vue';
import { chromaticParameters } from '@/storybook/parameters';

import type { Meta, StoryObj } from '@storybook/vue3';

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
                ${getColorSchemeTemplate(`
                    <vs-notice color-scheme="{{ color }}">Hello! This is Vlossom {{ color }} notice</vs-notice>
                `)}
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
                ${getColorSchemeTemplate(`
                    <vs-notice color-scheme="{{ color }}" primary>Hello! This is Vlossom {{ color }} notice</vs-notice>
                `)}
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
