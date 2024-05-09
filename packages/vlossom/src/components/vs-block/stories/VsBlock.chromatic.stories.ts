import { colorScheme } from '@/storybook';
import VsBlock from './../VsBlock.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsBlock> = {
    title: 'Chromatic/Layout Components/VsBlock',
    component: VsBlock,
    render: (args: any) => ({
        components: { VsBlock },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-block v-bind="args":style="{ marginBottom: '12px' }">This is block content</vs-block>
                
                <vs-block v-bind="args":style="{ marginBottom: '12px' }">
                    <template #title>This is block title</template>
                    This is block content
                </vs-block>
            </div>`,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsBlock>;

export const Default: Story = {};
