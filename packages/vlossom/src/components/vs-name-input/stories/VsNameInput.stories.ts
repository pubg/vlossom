import type { Meta, StoryObj } from '@storybook/vue3';

import VsNameInput, { NameInputValue } from '../VsNameInput.vue';
import { ref } from 'vue';

const meta: Meta<typeof VsNameInput> = {
    title: 'Components/Input Components/VsNameInput',
    component: VsNameInput,
    render: (args: any) => ({
        components: { VsNameInput },
        setup() {
            const value: any = ref(null);
            const changed = ref(false);
            const valid = ref(false);
            const widthObj = { lg: '150px', md: '200px', sm: '250px' };
            const widthStr = '200px';

            const firstNameRequiredCheck = ({ firstName }: NameInputValue) =>
                firstName ? '' : 'firstName is required';
            const lastNameRequiredCheck = ({ lastName }: NameInputValue) => (lastName ? '' : 'lastName is required');
            const namePromiseCheck = (_: NameInputValue) => {
                console.log(_);
                return Promise.resolve('Name Promise Check');
            };

            // setTimeout(() => (value.value = { firstName: 'HI', lastName: 'Vlossom' }), 1000);
            return {
                value,
                changed,
                valid,
                args,
                widthObj,
                widthStr,
                messages: [
                    // () => Promise.resolve({ state: UIState.INFO, message: 'info message' }),
                    // () => Promise.resolve({ state: UIState.SUCCESS, message: 'success message' }),
                    // () => Promise.resolve({ state: UIState.WARN, message: 'warning message' }),
                ],
                rules: [namePromiseCheck, firstNameRequiredCheck, lastNameRequiredCheck],
            };
        },
        template:
            '<vs-name-input v-model="value" v-bind="args" v-model:changed="changed" v-model:valid="valid" :messages="messages" :rules="rules"/>{{value}}',
    }),
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VsNameInput>;

export const Default: Story = {};
