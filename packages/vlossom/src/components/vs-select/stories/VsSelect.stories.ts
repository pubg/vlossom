import { colorScheme, getMetaArguments } from '@/storybook/args';
import VsSelect from '../VsSelect.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsSelect> = {
    title: 'Components/Input Components/VsSelect',
    component: VsSelect,
    render: (args: any) => ({
        components: { VsSelect },
        setup() {
            return { args };
        },
        template: '<vs-select v-bind="args" />',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
    args: {
        label: 'Select',
        options: ['apple', 'banana', 'carrot'],
    },
};

meta.args = getMetaArguments(VsSelect.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsSelect>;

export const Default: Story = {};

export const Autocomplete: Story = {
    args: {
        autocomplete: true,
    },
};

export const ClosableChips: Story = {
    args: {
        multiple: true,
        closableChips: true,
    },
};

export const CollapseChips: Story = {
    args: {
        multiple: true,
        collapseChips: true,
    },
};

export const Dense: Story = {
    args: {
        dense: true,
    },
};

export const Multiple: Story = {
    args: {
        multiple: true,
    },
};

export const Readonly: Story = {
    args: {
        readonly: true,
    },
};

export const SelectAll: Story = {
    args: {
        multiple: true,
        selectAll: true,
    },
};
