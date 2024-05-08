import { UIState } from '@/declaration';
import VsMessage from './../VsMessage.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsMessage> = {
    title: 'Chromatic/Base Components/VsMessage',
    component: VsMessage,
    render: (args: any) => ({
        components: { VsMessage },
        setup() {
            const messages = [
                { state: UIState.Idle, text: 'idle message' },
                { state: UIState.Info, text: 'info message' },
                { state: UIState.Success, text: 'success message' },
                { state: UIState.Warning, text: 'warning message' },
                { state: UIState.Error, text: 'error message' },
            ];
            return { args, messages };
        },
        template: '<vs-message v-for="message in messages" :key="message.text" v-bind="args" :message="message" />',
    }),
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VsMessage>;

export const Default: Story = {};
