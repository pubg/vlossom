import { colorScheme } from '@/storybook';
import VsTabs from './../VsTabs.vue';
import { tabLength, disabledArgTypes, tabs } from './constants';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsTabs> = {
    title: 'Chromatic/Layout Components/VsTabs',
    component: VsTabs,
    render: (args: any) => ({
        components: { VsTabs },
        setup() {
            const disabledArrs = [...Array(tabLength).keys()];
            return { args, tabs, disabledArrs };
        },
        template: `
            <div>
                <vs-tabs v-bind="args" :style="{ marginBottom: '20px' }"/>

                <vs-tabs v-bind="args" :disabled="disabledArrs" :style="{ marginBottom: '20px' }"/>

                <vs-tabs v-bind="args" scrollButtons="show" :style="{ marginBottom: '20px' }"/>

                <vs-tabs v-bind="args" dense/>
            </div>`,
    }),
    args: {
        tabs,
    },
    argTypes: {
        colorScheme,
        disabled: disabledArgTypes,
        tabButtons: {
            control: 'select',
            options: ['hide', 'auto', 'show'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof VsTabs>;

export const Default: Story = {};
