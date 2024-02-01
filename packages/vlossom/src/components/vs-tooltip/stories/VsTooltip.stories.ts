import { colorScheme, align, placement, getColorSchemeTemplate } from '@/storybook/args';
import VsTooltip from './../VsTooltip.vue';
import { chromaticParameters } from '@/storybook/parameters';
import { PLACEMENTS, ALIGNS } from '@/declaration/constants';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsTooltip> = {
    title: 'Components/Base Components/VsTooltip',
    component: VsTooltip,
    render: (args: any) => ({
        components: { VsTooltip },
        setup() {
            return { args };
        },
        template: `
        <vs-tooltip v-bind="args">
            <vs-button>HOVER</vs-button>
            <template #tooltip>Tooltip</template>
        </vs-tooltip>
        `,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
        align,
        placement,
    },
};

export default meta;
type Story = StoryObj<typeof VsTooltip>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: () => ({
        components: { VsTooltip },
        setup() {
            const colorOptions = [...colorScheme.options];
            return { colorOptions };
        },
        template: `
            <div style="display: flex; flex-wrap: wrap;">
                ${getColorSchemeTemplate(`
                <vs-tooltip color-scheme="{{ color }}" style="margin: 0.3rem;">
                    <vs-button color-scheme="{{ color }}">HOVER</vs-button>
                    <template #tooltip>Tooltip</template>
                </vs-tooltip>
                `)}
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const PlacementAndAlign: Story = {
    render: (args: any) => ({
        components: { VsTooltip },
        setup() {
            return { args, PLACEMENTS, ALIGNS };
        },
        template: `
        <div v-for="placement in PLACEMENTS" :key="placement" style="display: flex; justify-content: space-between; flex-wrap: wrap;">
            <vs-tooltip v-for="align in ALIGNS" :key="align" v-bind="args" :placement="placement" :align="align" style="margin: 0.3rem;">
                <vs-button large style="width: 12rem;">placement: {{placement}} <br/> align: {{align}}</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
            <vs-divider/>
        </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Clickable: Story = {
    render: (args: any) => ({
        components: { VsTooltip },
        setup() {
            return { args };
        },
        template: `
            <vs-tooltip v-bind="args">
                <vs-button>Clickable</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
    args: {
        clickable: true,
    },
};

export const ContentsHover: Story = {
    render: (args: any) => ({
        components: { VsTooltip },
        setup() {
            return { args };
        },
        template: `
            <vs-tooltip v-bind="args">
                <vs-button>Contents Hover</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
    args: {
        contentsHover: true,
    },
};

export const EnterDelayAndLeaveDelay: Story = {
    render: (args: any) => ({
        components: { VsTooltip },
        setup() {
            return { args };
        },
        template: `
            <vs-tooltip v-bind="args">
                <vs-button>500ms, 500ms</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
    args: {
        enterDelay: 500,
        leaveDelay: 500,
    },
};

export const DisableAnimation: Story = {
    render: (args: any) => ({
        components: { VsTooltip },
        setup() {
            return { args };
        },
        template: `
            <vs-tooltip v-bind="args">
                <vs-button>Disable Animation</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
    args: {
        disableAnimation: true,
    },
};

export const Disabled: Story = {
    render: (args: any) => ({
        components: { VsTooltip },
        setup() {
            return { args };
        },
        template: `
            <vs-tooltip v-bind="args">
                <vs-button>Disabled</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
    args: {
        disabled: true,
    },
};

export const Margin: Story = {
    render: (args: any) => ({
        components: { VsTooltip },
        setup() {
            return { args };
        },
        template: `
            <vs-tooltip v-bind="args">
                <vs-button>margin = 7</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
    args: {
        margin: 7,
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: {
            arrowColor: 'rgba(0, 0, 0, 0)',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            borderColor: 'transparent',
            borderRadius: '0.4rem',
            boxShadow: 'none',
            color: 'white',
            fontSize: '0.9rem',
            padding: '0.4rem 0.5rem',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
