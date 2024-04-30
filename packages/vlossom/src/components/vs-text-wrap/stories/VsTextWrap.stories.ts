import { chromaticParameters, colorScheme, align, placement, getColorSchemeTemplate } from '@/storybook';
import { PLACEMENTS, ALIGNS } from '@/declaration';
import VsTextWrap from './../VsTextWrap.vue';
import VsDivider from '@/components/vs-divider/VsDivider.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsTextWrap> = {
    title: 'Components/Base Components/VsTextWrap',
    component: VsTextWrap,
    render: (args: any) => ({
        components: { VsTextWrap },
        setup() {
            return { args };
        },
        template: '<vs-text-wrap v-bind="args">This is text wrap. Hover here.</vs-text-wrap>',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
        align,
        placement,
        width: {
            control: {
                type: 'text',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof VsTextWrap>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: () => ({
        components: { VsTextWrap },
        template: `
            ${getColorSchemeTemplate(`
            <vs-text-wrap color-scheme="{{ color }}" placement="right">This is {{ color }} text wrap. Hover here.</vs-text-wrap>
            `)}
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Copy: Story = {
    render: (args: any) => ({
        components: { VsTextWrap },
        setup() {
            return { args };
        },
        template:
            '<vs-text-wrap v-bind="args"><div>If you want to <b>copy</b> this text, <b>click</b> the <i>button on the <b>right</b>.</i></div></vs-text-wrap>',
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
    args: {
        copy: true,
    },
};

export const Link: Story = {
    render: (args: any) => ({
        components: { VsTextWrap },
        setup() {
            return { args };
        },
        template: '<vs-text-wrap v-bind="args">https://google.com</vs-text-wrap>',
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
    args: {
        link: 'https://google.com',
    },
};

export const NoTooltip: Story = {
    render: (args: any) => ({
        components: { VsTextWrap },
        setup() {
            return { args };
        },
        template: '<vs-text-wrap v-bind="args">This is text wrap without tooltip.</vs-text-wrap>',
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
    args: {
        noTooltip: true,
    },
};

export const PlacementAndAlign: Story = {
    render: (args: any) => ({
        components: { VsTextWrap, VsDivider },
        setup() {
            return { args, PLACEMENTS, ALIGNS };
        },
        template: `
        <div v-for="placement in PLACEMENTS" :key="placement" style="display: flex; justify-content: space-between; flex-wrap: wrap; text-align: center;">
            <vs-text-wrap v-for="align in ALIGNS" :key="align" v-bind="args" :placement="placement" :align="align" style="margin: 0.3rem;">placement: {{placement}} <br/> align: {{align}}</vs-text-wrap>
            <vs-divider/>
        </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Width: Story = {
    render: (args: any) => ({
        components: { VsTextWrap },
        setup() {
            return { args };
        },
        template: '<vs-text-wrap v-bind="args">Lorem ipsum dolor sit amet, consectetur adipisicing elit</vs-text-wrap>',
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
    args: {
        width: '310px',
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: {
            arrowColor: 'black',
            backgroundColor: 'white',
            borderColor: 'black',
            borderRadius: '0.4rem',
            boxShadow: 'none',
            fontColor: 'black',
            fontSize: '0.9rem',
            padding: '0.7rem 0.8rem',
            copyIconColor: '#394867',
            linkIconColor: '#526d82',
        },
        copy: true,
        link: 'https://google.com',
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
        copy: true,
        link: 'https://google.com',
    },
};
