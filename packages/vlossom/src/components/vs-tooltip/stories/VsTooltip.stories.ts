import type { Meta, StoryObj } from '@storybook/vue3';
import { colorScheme, align, placement } from '@/storybook/args';
import VsTooltip from './../VsTooltip.vue';
import { chromaticParameters } from '@/storybook/parameters';
import { PLACEMENTS, ALIGNS } from '@/declaration/constants';

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
                <vs-tooltip v-for="color in colorOptions" :key="color" :color-scheme="color" style="margin: 0.3rem;">
                    <vs-button :color-scheme="color">HOVER</vs-button>
                    <template #tooltip>Tooltip</template>
                </vs-tooltip>
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
            <vs-tooltip v-bind="args" clickable>
                <vs-button>Clickable</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const ContentsHover: Story = {
    render: (args: any) => ({
        components: { VsTooltip },
        setup() {
            return { args };
        },
        template: `
            <vs-tooltip v-bind="args" contents-hover>
                <vs-button>Contents Hover</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const EnterDelayAndLeaveDelay: Story = {
    render: (args: any) => ({
        components: { VsTooltip },
        setup() {
            return { args };
        },
        template: `
            <vs-tooltip v-bind="args" :enter-delay=500 :leave-delay=500>
                <vs-button>500ms, 500ms</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const DisableAnimation: Story = {
    render: (args: any) => ({
        components: { VsTooltip },
        setup() {
            return { args };
        },
        template: `
            <vs-tooltip v-bind="args" disable-animation>
                <vs-button>Disable Animation</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Disabled: Story = {
    render: (args: any) => ({
        components: { VsTooltip },
        setup() {
            return { args };
        },
        template: `
            <vs-tooltip v-bind="args" disabled>
                <vs-button>Disabled</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: {
            arrowColor: 'rgba(0, 0, 0, 0)',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: 'none',
            borderRadius: '0.3rem',
            boxShadow: 'none',
            fontColor: 'white',
            fontSize: '0.9rem',
            padding: '0.5rem 0.4rem',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
