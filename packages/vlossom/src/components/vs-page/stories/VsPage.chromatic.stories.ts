import VsPage from '../VsPage.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsPage> = {
    title: 'Chromatic/Layout Components/VsPage',
    component: VsPage,
    render: (args: any) => ({
        components: { VsPage },
        setup() {
            return { args };
        },
        template: `
        <vs-page v-bind="args">
            <template #title>This is Page Title</template>
            <template #description>This is Page Description</template>
            This is Page Content. Page Title and Page Description is added via slot.
        </vs-page>
    `,
    }),
};

export default meta;
type Story = StoryObj<typeof VsPage>;

export const Default: Story = {};
