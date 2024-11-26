import { colorScheme, getMetaArguments, state } from '@/storybook';
import VsFileInput from './../VsFileInput.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsFileInput> = {
    title: 'Chromatic/Input Components/VsFileInput',
    component: VsFileInput,
    render: (args: any) => ({
        components: { VsFileInput },
        setup() {
            const messages = [{ state: 'success', text: 'This is success message' }];
            return { args, messages };
        },
        template: `
            <div>
                <vs-file-input v-bind="args" label="File Input" :style="{ marginBottom: '12px' }"/>

                <vs-file-input v-bind="args" label="Required File Input" required :style="{ marginBottom: '12px' }"/>

                <vs-file-input v-bind="args" label="Readonly File Input" readonly :style="{ marginBottom: '12px' }"/>

                <vs-file-input v-bind="args" label="Disabled File Input" disabled :style="{ marginBottom: '12px' }"/>

                <vs-file-input v-bind="args" label="File Input with Messages" :messages="messages" :style="{ marginBottom: '12px' }"/>
               
                <vs-file-input v-bind="args" label="Dense File Input" dense/>
            </div>
		`,
    }),
    args: {
        placeholder: 'this is placeholder',
        label: 'File Input',
    },
    argTypes: {
        colorScheme,
        state,
    },
};

meta.args = getMetaArguments(VsFileInput.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsFileInput>;

export const Default: Story = {};
