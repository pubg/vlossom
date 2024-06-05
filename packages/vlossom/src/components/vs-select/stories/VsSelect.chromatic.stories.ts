import { colorScheme, getMetaArguments, state } from '@/storybook';
import { UIState } from '@/declaration';
import { ref } from 'vue';
import VsSelect from './../VsSelect.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const options = [
    'apple',
    'banana',
    'carrot',
    'egg',
    'fish',
    'grape',
    'lemon',
    'strawberry',
    'tomato',
    'yogurt',
    'watermelon',
    'orange',
    'pear',
    'kiwi',
];

const meta: Meta<typeof VsSelect> = {
    title: 'Chromatic/Input Components/VsSelect',
    component: VsSelect,
    render: (args: any) => ({
        components: { VsSelect },
        setup() {
            const modelValue1 = ref(['apple', 'banana', 'carrot']);
            const modelValue2 = ref(['apple', 'banana', 'carrot']);
            const modelValue3 = ref(['apple', 'banana', 'carrot']);

            const messages = [{ state: UIState.Success, text: 'This is success message' }];
            return { args, modelValue1, modelValue2, modelValue3, messages };
        },
        template: `
            <div>
                <vs-select v-bind="args" label="Select" :style="{ marginBottom: '12px' }"/>

                <vs-select v-bind="args" label="Required Select" required :style="{ marginBottom: '12px' }"/>

                <vs-select v-bind="args" label="Readonly Select" readonly :style="{ marginBottom: '12px' }"/>

                <vs-select v-bind="args" label="Disabled Select" disabled :style="{ marginBottom: '12px' }"/>

                <vs-select v-bind="args" label="Select with Messages" :messages="messages" :style="{ marginBottom: '12px' }"/>

                <vs-select v-bind="args" label="Dense Select" dense :style="{ marginBottom: '12px' }"/>

                <vs-select v-bind="args" v-model="modelValue1" label="Select Multiple" multiple :style="{ marginBottom: '12px' }"/>

                <vs-select v-bind="args" v-model="modelValue2" label="Select Multiple with ClosableChips" multiple closableChips :style="{ marginBottom: '12px' }"/>

                <vs-select v-bind="args" v-model="modelValue3" label="Select Multiple with CollapseChips" multiple collapseChips />
            </div>`,
    }),
    argTypes: {
        colorScheme,
        state,
    },
    args: {
        placeholder: 'select me',
        options,
    },
};

meta.args = getMetaArguments(VsSelect.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsSelect>;

export const Default: Story = {};
