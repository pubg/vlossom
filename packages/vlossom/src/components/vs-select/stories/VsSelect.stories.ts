import {
    colorScheme,
    getColorSchemeTemplate,
    chromaticParameters,
    getMetaArguments,
    state,
    getStateTemplate,
} from '@/storybook';
import VsSelect from '../VsSelect.vue';
import VsContainer from '@/components/vs-container/VsContainer.vue';

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
        state,
    },
    args: {
        label: 'Select',
        placeholder: 'select me',
        options,
    },
};

meta.args = getMetaArguments(VsSelect.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsSelect>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsSelect },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-select v-bind="args" color-scheme="{{ color }}" style="marginBottom: 20px" />
                `)}
            </div>
        `,
    }),
    args: {
        label: 'Select',
        options,
    },
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const State: Story = {
    render: (args: any) => ({
        components: { VsSelect },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getStateTemplate(`
                    <vs-select v-bind="args" label="State ({{state}})" state="{{state}}" style="marginBottom: 16px" />
                `)}
            </div>
        `,
    }),
};

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
    parameters: {
        chromatic: chromaticParameters.theme,
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
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const InfiniteScrolling: Story = {
    args: {
        options: [...Array(200).keys()],
        lazyLoadNum: 15,
        label: 'Infinite Scrolling (Load Number : 15)',
    },
};

export const Multiple: Story = {
    args: {
        multiple: true,
    },
};

export const MultipleWithAutocomplete: Story = {
    args: {
        multiple: true,
        autocomplete: true,
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

export const OptionsHeaderSlot: Story = {
    render: (args: any) => ({
        components: { VsSelect },
        setup() {
            return { args };
        },
        template: `
            <vs-select v-bind="args">
                <template #options-header>
                    <div style="padding: 1rem 1.2rem; background-color: #7f86d7; color: #EEEEEE">Options Header</div>
                </template>
            </vs-select>
        `,
    }),
    args: {
        options,
    },
};

export const OptionsFooterSlot: Story = {
    render: (args: any) => ({
        components: { VsSelect },
        setup() {
            return { args };
        },
        template: `
            <vs-select v-bind="args">
                <template #options-footer>
                    <div style="padding: 1rem 1.2rem; background-color: #7f86d7; color: #EEEEEE">Options Footer</div>
                </template>
            </vs-select>
        `,
    }),
    args: {
        options,
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
            fontColor: '#12372A',
            border: '1px solid #12372A',
            chipBackgroundColor: '#9B4444',
            chipFontColor: '#EEEEEE',
            collapseChipBackgroundColor: '#12372A',
            collapseChipFontColor: '#EEEEEE',
            height: '3rem',
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
