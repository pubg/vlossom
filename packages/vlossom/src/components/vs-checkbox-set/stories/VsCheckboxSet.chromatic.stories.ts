import { colorScheme, getMetaArguments, state } from '@/storybook';
import { UIState } from '@/declaration';
import VsCheckboxSet from '../VsCheckboxSet.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsCheckboxSet> = {
    title: 'Chromatic/Input Components/VsCheckboxSet',
    component: VsCheckboxSet,
    render: (args: any) => ({
        components: { VsCheckboxSet },
        setup() {
            const messages = [{ state: UIState.Success, text: 'This is success message' }];
            return { args, messages };
        },
        template: `
            <div>
                <vs-checkbox-set v-bind="args" label="Checkbox Set" :style="{ marginBottom: '12px' }"/>

                <vs-checkbox-set v-bind="args" label="Required Checkbox Set" required :style="{ marginBottom: '12px' }"/>

                <vs-checkbox-set v-bind="args" label="Readonly Checkbox Set" readonly :style="{ marginBottom: '12px' }"/>

                <vs-checkbox-set v-bind="args" label="Disabled Checkbox Set" disabled :style="{ marginBottom: '12px' }"/>

                <vs-checkbox-set v-bind="args" label="Checkbox Set with Messages" :messages="messages" :style="{ marginBottom: '12px' }"/>

                <vs-checkbox-set v-bind="args" label="Vertical Checkbox Set" vertical/>
            </div>
		`,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
        state,
    },
    args: {
        options: ['Apple', 'Banana', 'Carrot'],
    },
};

meta.args = getMetaArguments(VsCheckboxSet.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsCheckboxSet>;

export const Default: Story = {};
