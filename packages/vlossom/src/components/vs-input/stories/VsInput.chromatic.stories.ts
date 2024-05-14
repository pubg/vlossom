import { colorScheme, getMetaArguments, state } from '@/storybook';
import { UIState } from '@/declaration';
import { VsIcon } from '@/icons';
import { InputType } from '../types';
import VsInput from '../VsInput.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsInput> = {
    title: 'Chromatic/Input Components/VsInput',
    component: VsInput,
    render: (args: any) => ({
        components: { VsInput, VsIcon },
        setup() {
            const messages = [{ state: UIState.Success, text: 'This is success message' }];
            const modelValue = 'John Doe';
            return { args, messages, modelValue };
        },
        template: `
            <div>
                <vs-input v-bind="args" label="Input" :style="{ marginBottom: '12px' }"/>
                
                <vs-input v-bind="args" v-model="modelValue"  label="Input" :style="{ marginBottom: '12px' }"/>

                <vs-input  v-bind="args" label="Required Input" required :style="{ marginBottom: '12px' }"/>

                <vs-input v-bind="args" label="Readonly Input" readonly :style="{ marginBottom: '12px' }"/>

                <vs-input v-bind="args" label="Disabled Input" disabled :style="{ marginBottom: '12px' }"/>

                <vs-input v-bind="args" label="Input with Messages"  :messages="messages" :style="{ marginBottom: '12px' }"/>
                
                <vs-input v-bind="args" label="Dense Input" dense :style="{ marginBottom: '12px' }"/>
                
                <vs-input v-bind="args" label="Input with Prepend Button" dense :style="{ marginBottom: '12px' }">
                    <template #prepend-button>
                        <svg aria-label="edit" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20">
                            <path fill="currentColor" d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                        </svg>
                    </template>
                </vs-input>

                <vs-input v-bind="args" label="Input with Append Button" dense :style="{ marginBottom: '12px' }">
                    <template #append-button>
                        <vs-icon icon="check" /> 
                    </template>
                </vs-input>

                <vs-input v-bind="args" label="Input with Prepend Content" dense :style="{ marginBottom: '12px' }">
                    <template #prepend-content>
                        <div style="padding: 3px">prepend</div>
                    </template>
                </vs-input>

                <vs-input v-bind="args" label="Input with Append Content" dense :style="{ marginBottom: '12px' }">
                    <template #append-content>
                        <div style="padding: 3px">append</div>
                    </template>
                </vs-input>
            </div>
		`,
    }),
    args: {
        placeholder: 'this is placeholder',
    },
    argTypes: {
        colorScheme,
        type: {
            control: 'radio',
            options: Object.values(InputType),
        },
        state,
    },
};

meta.args = getMetaArguments(VsInput.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsInput>;

export const Default: Story = {};
