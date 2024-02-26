import { colorScheme, getColorSchemeTemplate, getMetaArguments } from '@/storybook/args';
import { chromaticParameters } from '@/storybook/parameters';
import VsSelect from '../VsSelect.vue';
import VsContainer from '@/components/vs-container/VsContainer.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const options = [...Array(200).keys()];

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
        // options: ['apple', 'banana', 'carrot', 'eggplant', 'fish', 'grape', 'honeydew', 'ice cream', 'jelly'],
        options: [...Array(200).keys()],
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

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const InfiniteScrolling15: Story = {
    args: {
        loadNumber: 15,
        label: 'Infinite Scrolling (Load Number : 15)',
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

export const Width: Story = {
    render: (args: any) => ({
        components: { VsSelect, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container>
                <vs-select v-bind="args" />
                <vs-select v-bind="args" />
            </vs-container>
        `,
    }),
    args: {
        options,
        width: { sm: '200px', md: '300px', lg: '400px', xl: '500px' },
    },
};

export const Grid: Story = {
    render: (args: any) => ({
        components: { VsSelect, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container>
                <vs-select v-bind="args" />
                <vs-select v-bind="args" />
            </vs-container>
        `,
    }),
    args: {
        options,
        grid: { sm: 6, md: 4, lg: 3 },
    },
};

export const StyleSet: Story = {
    args: {
        multiple: true,
        collapseChips: true,
        styleSet: {
            backgroundColor: '#ADBC9F',
            color: '#12372A',
            border: '1px solid #12372A',
            chipBackgroundColor: '#9B4444',
            chipColor: '#EEEEEE',
            collapseChipBackgroundColor: '#12372A',
            collapseChipColor: '#EEEEEE',
            hoverOptionBackgroundColor: '#12372A',
            hoverOptionColor: '#EEEEEE',
            selectedOptionBackgroundColor: '#12372A',
            selectedOptionColor: '#EEEEEE',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
