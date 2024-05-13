import { colorScheme, getMetaArguments, state } from '@/storybook';
import { UIState } from '@/declaration';
import VsRadio from './../VsRadio.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsRadio> = {
    title: 'Chromatic/Input Components/VsRadio',
    component: VsRadio,
    render: (args: any) => ({
        components: { VsRadio },
        setup() {
            const messages = [{ state: UIState.Success, text: 'This is success message' }];
            return { args, messages };
        },
        template: `
            <div>
                <vs-radio v-bind="args" label="Radio" :style="{ marginBottom: '12px' }"/>
                
                <vs-radio v-bind="args" label="Radio" checked :style="{ marginBottom: '12px' }"/>

                <vs-radio v-bind="args" label="Required Radio" required :style="{ marginBottom: '12px' }"/>

                <vs-radio v-bind="args" label="Readonly Radio" readonly :style="{ marginBottom: '12px' }"/>

                <vs-radio v-bind="args" label="Disabled Radio" disabled :style="{ marginBottom: '12px' }"/>

                <vs-radio v-bind="args" label="Radio with Messages" :messages="messages"/>
            </div>
		`,
    }),
    argTypes: {
        colorScheme,
        state,
    },
    args: {
        radioLabel: 'Radio Input',
        name: 'test',
        radioValue: 'test',
    },
};

meta.args = getMetaArguments(VsRadio.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsRadio>;

export const Default: Story = {};
