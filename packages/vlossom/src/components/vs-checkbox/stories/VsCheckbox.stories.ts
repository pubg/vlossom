import {
    chromaticParameters,
    colorScheme,
    getColorSchemeTemplate,
    getMetaArguments,
    state,
    getStateTemplate,
} from '@/storybook';
import { computed, ref } from 'vue';
import { UIState } from '@/declaration';
import { useVlossom } from '@/vlossom-framework';
import VsContainer from '@/components/vs-container/VsContainer.vue';
import VsCheckbox from '../VsCheckbox.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsCheckbox> = {
    title: 'Components/Input Components/VsCheckbox',
    component: VsCheckbox,
    render: (args: any) => ({
        components: { VsCheckbox },
        setup() {
            return { args };
        },
        template: '<vs-checkbox v-bind="args" />',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
        state,
    },
    args: {
        checkLabel: 'Checkbox',
    },
};

meta.args = getMetaArguments(VsCheckbox.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsCheckbox>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: () => ({
        components: { VsCheckbox },
        setup() {
            const colorOptions = [...colorScheme.options];
            return { colorOptions };
        },
        template: `
            <div>
				${getColorSchemeTemplate(`
					<vs-checkbox color-scheme="{{color}}" checkLabel="Checkbox" />
				`)}
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const State: Story = {
    render: (args: any) => ({
        components: { VsCheckbox },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getStateTemplate(`
                    <vs-checkbox v-bind="args" label="State ({{state}})" state="{{state}}" style="marginBottom: 16px" />
                `)}
            </div>
        `,
    }),
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Label: Story = {
    args: {
        label: 'Label',
    },
};

export const Messages: Story = {
    args: {
        messages: [{ state: UIState.Success, text: 'This is success message' }],
    },
};

export const Readonly: Story = {
    args: {
        readonly: true,
    },
};

export const Required: Story = {
    args: {
        label: 'Label',
        required: true,
    },
};

export const Indeterminate: Story = {
    render: (args: any) => ({
        components: { VsCheckbox },
        setup() {
            const children = ref([false, false]);
            const parent = ref(false);

            const indeterminate = computed(
                () => !children.value.every((child) => child) && children.value.some((child) => child),
            );

            const allTrue = computed(() => children.value.every((child) => child));
            const allFalse = computed(() => children.value.every((child) => !child));

            function updateParent(value: boolean) {
                if (indeterminate.value && !value) {
                    children.value = [true, true];
                } else {
                    parent.value = value;
                    children.value = [value, value];
                }
            }

            function updateChild(index: number, value: boolean) {
                children.value[index] = value;

                if (value && allTrue.value) {
                    parent.value = true;
                }
                if (!value && allFalse.value) {
                    parent.value = false;
                }
            }

            function updateChild1(value: boolean) {
                updateChild(0, value);
            }

            function updateChild2(value: boolean) {
                updateChild(1, value);
            }

            return {
                args,
                parent,
                children,
                indeterminate,
                updateParent,
                updateChild1,
                updateChild2,
                updateChild,
            };
        },
        template: `
            <div >
                <vs-checkbox v-model="parent" :indeterminate="indeterminate" check-label="Parent" @update:modelValue="updateParent"/>
				<div style="margin-top: 10px; margin-left: 30px;">
					<vs-checkbox v-model="children[0]" check-label="Child 1" @update:modelValue="updateChild1" />
					<vs-checkbox v-model="children[1]" check-label="Child 2" @update:modelValue="updateChild2" style="margin-top: 10px;" />
				</div>
            </div>
        `,
    }),
};

export const BeforeChange: Story = {
    args: {
        beforeChange: async () => {
            const $vs = useVlossom();
            return await $vs.confirm.open('Are you sure?');
        },
    },
};

export const Width: Story = {
    render: (args: any) => ({
        components: { VsCheckbox, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container>
                <vs-checkbox v-bind="args" />
                <vs-checkbox v-bind="args" />
            </vs-container>
        `,
    }),
    args: {
        width: { sm: '200px', md: '300px', lg: '400px', xl: '500px' },
    },
};

export const Grid: Story = {
    render: (args: any) => ({
        components: { VsCheckbox, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container>
                <vs-checkbox v-bind="args" />
                <vs-checkbox v-bind="args" />
            </vs-container>
        `,
    }),
    args: {
        grid: { md: 6, lg: 3 },
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: {
            borderRadius: '1.3rem',
            focusBoxShadow: '0 0 0 3px #81c798',
            labelFontColor: '#a0b0b9',
            labelFontSize: '0.8rem',
            checkboxColor: '#81c798',
            checkboxSize: '4rem',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
