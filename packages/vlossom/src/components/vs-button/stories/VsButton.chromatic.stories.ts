import { colorScheme } from '@/storybook';
import VsButton from './../VsButton.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsButton> = {
    title: 'Chromatic/Base Components/VsButton',
    component: VsButton,
    render: (args: any) => ({
        components: { VsButton },
        setup() {
            return { args };
        },
        template: `
            <div style="display:flex; align-items:center;">
                <vs-button v-bind="args">Button</vs-button>

                <vs-button v-bind="args" outline>Button</vs-button>
				
                <vs-button v-bind="args" primary>Button</vs-button>

                <vs-button v-bind="args" disabled>Button</vs-button>
				
                <vs-button v-bind="args" loading>Button</vs-button>

                <vs-button v-bind="args" dense>Button</vs-button>

                <vs-button v-bind="args" large>Button</vs-button>
            </div>`,
    }),
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsButton>;

export const Default: Story = {};
