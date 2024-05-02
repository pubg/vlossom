import { colorScheme, getMetaArguments, state } from '@/storybook';
import VsSelect from '../VsSelect.vue';

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
    title: 'Chromatic/Layout Components/VsSelect',
    component: VsSelect,
    render: (args: any) => ({
        components: { VsSelect },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-select v-bind="args" label="Select" :style="{ marginBottom: '12px' }"/>
				
                <vs-select v-bind="args" label="Select With Header" :style="{ marginBottom: '12px' }">
                    <template #options-header>
                        <div style="padding: 1rem 1.2rem; background-color: #7f86d7; color: #EEEEEE">Options Header</div>
                    </template>
                </vs-select>

                <vs-select v-bind="args" label="Select With Footer">
                    <template #options-footer>
                        <div style="padding: 1rem 1.2rem; background-color: #7f86d7; color: #EEEEEE">Options Footer</div>
                    </template>
                </vs-select>
            </div>`,
    }),
    tags: ['autodocs'],
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
