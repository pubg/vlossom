import type { Meta, StoryObj } from '@storybook/vue3';
import { colorScheme, align, position } from '@/storybook/args';
import VsTooltip from './../VsTooltip.vue';
import { chromaticParameters } from '@/storybook/parameters';

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
        position,
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

export const Position: Story = {
    render: (args: any) => ({
        components: { VsTooltip },
        setup() {
            return { args };
        },
        template: `
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
            <vs-tooltip v-bind="args" position="top" style="margin: 0.1rem;">
                <vs-button>Top</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
            <vs-tooltip v-bind="args" position="left" style="margin: 0.1rem;">
                <vs-button>Left</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
            <vs-tooltip v-bind="args" position="right" style="margin: 0.1rem;">
                <vs-button>Right</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
            <vs-tooltip v-bind="args" position="bottom" style="margin: 0.1rem;">
                <vs-button>Bottom</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
        </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Align: Story = {
    render: (args: any) => ({
        components: { VsTooltip },
        setup() {
            return { args };
        },
        template: `
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
            <vs-tooltip v-bind="args" align="left" style="margin: 0.3rem;">
                <vs-button>Left Align</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
            <vs-tooltip v-bind="args" align="center" style="margin: 0.3rem;">
                <vs-button>Center Align</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
            <vs-tooltip v-bind="args" align="right" style="margin: 0.3rem;">
                <vs-button>Right Align</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
        </div>
        <vs-divider/>
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
            <vs-tooltip v-bind="args" align="top" position="right" style="margin: 0.3rem;">
                <vs-button>Top Align</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
            <vs-tooltip v-bind="args" align="center" position="right" style="margin: 0.3rem;">
                <vs-button>Center Align</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
            <vs-tooltip v-bind="args" align="bottom" position="right" style="margin: 0.3rem;">
                <vs-button>Bottom Align</vs-button>
                <template #tooltip>Tooltip</template>
            </vs-tooltip>
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
            borderColor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '0.6rem',
            boxShadow: 'none',
            fontColor: 'white',
            fontSize: '1.1rem',
            padding: '0.8rem',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
