import { colorScheme, getMetaArguments, state } from '@/storybook';
import VsFileDrop from './../VsFileDrop.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsFileDrop> = {
    title: 'Chromatic/Input Components/VsFileDrop',
    component: VsFileDrop,
    render: (args: any) => ({
        components: { VsFileDrop },
        setup() {
            const messages = [{ state: 'success', text: 'This is success message' }];
            return { args, messages };
        },
        template: `
            <div>
                <vs-file-drop v-bind="args" label="File Drop" :style="{ marginBottom: '12px' }"/>

                <vs-file-drop v-bind="args" label="Required File Drop" required :style="{ marginBottom: '12px' }"/>

                <vs-file-drop v-bind="args" label="Readonly File Drop" readonly :style="{ marginBottom: '12px' }"/>

                <vs-file-drop v-bind="args" label="Disabled File Drop" disabled :style="{ marginBottom: '12px' }"/>

                <vs-file-drop v-bind="args" label="File Drop with Messages" :messages="messages" :style="{ marginBottom: '12px' }"/>
               
                <vs-file-drop v-bind="args" label="Dense File Drop" dense/>
            </div>
		`,
    }),
    args: {
        placeholder: 'this is placeholder',
        label: 'File Drop',
    },
    argTypes: {
        colorScheme,
        state,
    },
};

meta.args = getMetaArguments(VsFileDrop.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsFileDrop>;

export const Default: Story = {};
