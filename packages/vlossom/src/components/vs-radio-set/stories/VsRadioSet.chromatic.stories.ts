import { colorScheme, getMetaArguments, state } from '@/storybook';
import { UIState } from '@/declaration';
import VsRadioSet from '../VsRadioSet.vue';

import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

const meta: Meta<typeof VsRadioSet> = {
    title: 'Chromatic/Input Components/VsRadioSet',
    component: VsRadioSet,
    render: (args: any) => ({
        components: { VsRadioSet },
        setup() {
            const messages = [{ state: UIState.Success, text: 'This is success message' }];
            const modelValue = ref('Apple');
            return { args, messages, modelValue };
        },
        template: `
            <div>
                <vs-radio-set v-bind="args" label="Radio Set" :style="{ marginBottom: '12px' }"/>
                
                <vs-radio-set v-bind="args" v-model="modelValue" label="Radio Set" :style="{ marginBottom: '12px' }"/>

                <vs-radio-set v-bind="args" label="Required Radio Set" required :style="{ marginBottom: '12px' }"/>

                <vs-radio-set v-bind="args" label="Readonly Radio Set" readonly :style="{ marginBottom: '12px' }"/>

                <vs-radio-set v-bind="args" label="Disabled Radio Set" disabled :style="{ marginBottom: '12px' }"/>

                <vs-radio-set v-bind="args" label="Radio Set with Messages" :messages="messages" :style="{ marginBottom: '12px' }"/>

                <vs-radio-set v-bind="args" label="Vertical Radio Set" vertical/>
            </div>
		`,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
        state,
    },
    args: {
        name: 'fruit',
        options: ['Apple', 'Banana', 'Carrot'],
    },
};

meta.args = getMetaArguments(VsRadioSet.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsRadioSet>;

export const Default: Story = {};
