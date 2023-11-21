import type { Meta, StoryObj } from '@storybook/vue3';

import VsNameInput from '../VsNameInput.vue';
import { ref } from 'vue';

const meta: Meta<typeof VsNameInput> = {
    title: 'Components/Input Components/VsNameInput',
    component: VsNameInput,
    render: (args: any) => ({
        components: { VsNameInput },
        setup() {
            const value = ref({
                firstName: '',
                lastName: '',
            });
            return { value, args };
        },
        template: '<vs-name-input v-model="value" v-bind="args" />',
    }),
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VsNameInput>;

export const Default: Story = {};
