import {  } from '@/declaration';
import VsMessage from './../VsMessage.vue';
import { chromaticParameters } from '@/storybook/parameters';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsMessage> = {
    title: 'Components/Base Components/VsMessage',
    component: VsMessage,
    render: (args: any) => ({
        components: { VsMessage },
        setup() {
            const message = { state: 'idle', text: 'my message' };
            return { args, message };
        },
        template: '<vs-message v-bind="args" :message="message" />',
    }),
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VsMessage>;

export const Default: Story = {};

export const State: Story = {
    render: (args: any) => ({
        components: { VsMessage },
        setup() {
            const messages = [
                { state: 'idle', text: 'idle message' },
                { state: 'info', text: 'info message' },
                { state: 'success', text: 'success message' },
                { state: 'warning', text: 'warning message' },
                { state: 'error', text: 'error message' },
            ];
            return { args, messages };
        },
        template: '<vs-message v-for="message in messages" :key="message.text" v-bind="args" :message="message" />',
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};
