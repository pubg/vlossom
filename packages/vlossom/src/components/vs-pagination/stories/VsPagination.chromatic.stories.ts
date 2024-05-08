import { colorScheme } from '@/storybook';
import VsPagination from './../VsPagination.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsPagination> = {
    title: 'Chromatic/Base Components/VsPagination',
    component: VsPagination,
    render: (args: any) => ({
        components: { VsPagination },
        setup() {
            const length = 20;
            const showingLength = 5;
            return { args, length, showingLength };
        },
        template: `
            <div style="display:flex; flex-direction:column;">
                <vs-pagination v-bind="args" :length="length" />

                <vs-pagination v-bind="args" :length="length" edgeButtons />

                <vs-pagination v-bind="args" :length="length" edgeButtons :showingLength="showingLength"/>

                <vs-pagination v-bind="args" :length="length" disabled />
            </div>`,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsPagination>;

export const Default: Story = {};
