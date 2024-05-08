import { colorScheme, getMetaArguments, state } from '@/storybook';
import { UIState } from '@/declaration';
import VsSwitch from '../VsSwitch.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsSwitch> = {
    title: 'Chromatic/Input Components/VsSwitch',
    component: VsSwitch,
    render: (args: any) => ({
        components: { VsSwitch },
        setup() {
            const messages = [{ state: UIState.Success, text: 'This is success message' }];
            return { args, messages };
        },
        template: `
            <div>
                <vs-switch v-bind="args" label="Switch" :style="{ marginBottom: '12px' }"/>

                <vs-switch v-bind="args" label="Required Switch" required :style="{ marginBottom: '12px' }"/>

                <vs-switch v-bind="args" label="Readonly Switch" readonly :style="{ marginBottom: '12px' }"/>

                <vs-switch v-bind="args" label="Disabled Switch" disabled :style="{ marginBottom: '12px' }"/>

                <vs-switch v-bind="args" label="Switch with Messages" :messages="messages" :style="{ marginBottom: '12px' }"/>
               
                <vs-switch v-bind="args" label="Switch with custom labels" true-label="Approved" false-label="Rejected"/>
            </div>
		`,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
        state,
    },
};

meta.args = getMetaArguments(VsSwitch.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsSwitch>;

export const Default: Story = {};
