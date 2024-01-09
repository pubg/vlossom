import type { Meta, StoryObj } from '@storybook/vue3';

import VsPage from '../VsPage.vue';
import { modes } from '@/storybook/chromatic-modes';

const meta: Meta<typeof VsPage> = {
    title: 'Components/Layout Components/VsPage',
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
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VsPage>;

export const Default: Story = {
    parameters: {
        chromatic: {
            modes: {
                light: modes.light,
                dark: modes.dark,
            },
        },
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: { padding: '1.2rem 3rem', fontColor: '#3559e0', headerMargin: '0 0 4rem 0' },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
