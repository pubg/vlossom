import { colorScheme } from '@/storybook';
import VsNotice from './../VsNotice.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsNotice> = {
    title: 'Chromatic/Base Components/VsNotice',
    component: VsNotice,
    render: (args: any) => ({
        components: { VsNotice },
        setup() {
            return { args };
        },
        template: `
            <div style="display:flex; flex-direction:column;">
                <vs-notice v-bind="args" :style="{ marginBottom: '12px' }">Hello! This is Vlossom Notice Content</vs-notice>

                <vs-notice v-bind="args" :style="{ marginBottom: '12px' }">
                    <template #title><span>Please Note 📌</span></template>
                    Hello! This is Vlossom Notice Content
                </vs-notice>

                <vs-notice v-bind="args" :primary="false">Hello! This is Vlossom Notice Content</vs-notice>
            </div>`,
    }),
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsNotice>;

export const Default: Story = {};
