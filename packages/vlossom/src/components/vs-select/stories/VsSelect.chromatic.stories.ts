import { colorScheme, getMetaArguments, state } from '@/storybook';
import VsSelect from '../VsSelect.vue';
import { ref } from 'vue';

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
            return { args, modelValue1, modelValue2, modelValue3 };
        },
        template: `
            <div>
                <vs-select v-bind="args" label="Select" :style="{ marginBottom: '12px' }"/>
				
                <vs-select v-bind="args" label="Select (dense)" dense :style="{ marginBottom: '12px' }"/>
                
                <vs-select v-bind="args" v-model="modelValue1" label="Select Multiple" multiple :style="{ marginBottom: '12px' }"/>

                <vs-select v-bind="args" v-model="modelValue2" label="Select with ClosableChips" multiple closableChips :style="{ marginBottom: '12px' }"/>
                
                <vs-select v-bind="args" v-model="modelValue3" label="Select with CollapseChips" multiple collapseChips />				
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
