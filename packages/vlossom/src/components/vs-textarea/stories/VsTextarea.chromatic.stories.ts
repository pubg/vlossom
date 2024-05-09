import { colorScheme, getMetaArguments, state } from '@/storybook';
import { UIState } from '@/declaration';
import VsTextarea from './../VsTextarea.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsTextarea> = {
    title: 'Chromatic/Input Components/VsTextarea',
    component: VsTextarea,
    render: (args: any) => ({
        components: { VsTextarea },
        setup() {
            const messages = [{ state: UIState.Success, text: 'This is success message' }];
            return { args, messages };
        },
        template: `
            <div>
                <vs-textarea v-bind="args" label="Textarea" :style="{ marginBottom: '12px' }"/>

                <vs-textarea  v-bind="args" label="Required Textarea" required :style="{ marginBottom: '12px' }"/>

                <vs-textarea v-bind="args" label="Readonly Textarea" readonly :style="{ marginBottom: '12px' }"/>

                <vs-textarea v-bind="args" label="Disabled Textarea" disabled :style="{ marginBottom: '12px' }"/>

                <vs-textarea v-bind="args" label="Textarea with Messages"  :messages="messages" :style="{ marginBottom: '12px' }"/>
            </div>`,
    }),
    tags: ['autodocs'],
    args: {
        placeholder: 'enter text',
    },
    argTypes: {
        colorScheme,
        state,
    },
};

meta.args = getMetaArguments(VsTextarea.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsTextarea>;

export const Default: Story = {};
