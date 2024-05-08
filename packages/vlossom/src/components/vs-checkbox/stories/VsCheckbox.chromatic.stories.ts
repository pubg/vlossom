import { colorScheme, getMetaArguments, state } from '@/storybook';
import { UIState } from '@/declaration';
import VsCheckbox from '../VsCheckbox.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsCheckbox> = {
    title: 'Chromatic/Input Components/VsCheckbox',
    component: VsCheckbox,
    render: (args: any) => ({
        components: { VsCheckbox },
        setup() {
            const messages = [{ state: UIState.Success, text: 'This is success message' }];
            return { args, messages };
        },
        template: `
            <div>
                <vs-checkbox v-bind="args" label="Checkbox" :style="{ marginBottom: '12px' }"/>

                <vs-checkbox  v-bind="args" label="Required Checkbox" required :style="{ marginBottom: '12px' }"/>

                <vs-checkbox v-bind="args" label="Readonly Checkbox" readonly :style="{ marginBottom: '12px' }"/>

                <vs-checkbox v-bind="args" label="Disabled Checkbox" disabled :style="{ marginBottom: '12px' }"/>

                <vs-checkbox v-bind="args" label="Checkbox with Messages" :messages="messages" :style="{ marginBottom: '12px' }"/>

                <vs-checkbox v-bind="args" label="Indeterminate Checkbox" indeterminate check-label="indeterminate" />
            </div>
		`,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
        state,
    },
    args: {
        checkLabel: 'Checkbox',
    },
};

meta.args = getMetaArguments(VsCheckbox.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsCheckbox>;

export const Default: Story = {};
