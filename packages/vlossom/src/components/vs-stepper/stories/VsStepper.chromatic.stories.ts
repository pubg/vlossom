import { colorScheme, getMetaArguments } from '@/storybook';
import VsStepper from '../VsStepper.vue';
import { stepLength, disabledArgTypes, steps } from './constants';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsStepper> = {
    title: 'Chromatic/Layout Components/VsStepper',
    component: VsStepper,
    render: (args: any) => ({
        components: { VsStepper },
        setup() {
            const disabledArrs = [...Array(stepLength).keys()];
            return { args, steps, disabledArrs };
        },
        template: `
            <div>
                <vs-stepper v-bind="args"  :style="{ marginBottom: '20px' }"/>

                <vs-stepper v-bind="args" :disabled="disabledArrs" />
                
                <vs-stepper v-bind="args" gap="100px" />
            </div>
        `,
    }),
    argTypes: {
        colorScheme,
        disabled: disabledArgTypes,
    },
    args: {
        steps,
    },
};

meta.args = getMetaArguments(VsStepper.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsStepper>;

export const Default: Story = {};
