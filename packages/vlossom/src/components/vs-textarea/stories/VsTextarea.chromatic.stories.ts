import { LOREM_IPSUM, colorScheme, getMetaArguments, state } from '@/storybook';
import VsTextarea from './../VsTextarea.vue';

import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

const meta: Meta<typeof VsTextarea> = {
    title: 'Chromatic/Input Components/VsTextarea',
    component: VsTextarea,
    render: (args: any) => ({
        components: { VsTextarea },
        setup() {
            const messages = [{ state: 'success', text: 'This is success message' }];
            const modelValue = ref(LOREM_IPSUM.trim());
            return { args, messages, modelValue };
        },
        template: `
            <div>
                <vs-textarea v-bind="args" label="Textarea" :style="{ marginBottom: '12px' }"/>

                <vs-textarea v-bind="args" v-model="modelValue" label="Textarea" :style="{ marginBottom: '12px' }"/>

                <vs-textarea  v-bind="args" label="Required Textarea" required :style="{ marginBottom: '12px' }"/>

                <vs-textarea v-bind="args" label="Readonly Textarea" readonly :style="{ marginBottom: '12px' }"/>

                <vs-textarea v-bind="args" label="Disabled Textarea" disabled :style="{ marginBottom: '12px' }"/>

                <vs-textarea v-bind="args" label="Textarea with Messages"  :messages="messages" :style="{ marginBottom: '12px' }"/>
            </div>`,
    }),
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
