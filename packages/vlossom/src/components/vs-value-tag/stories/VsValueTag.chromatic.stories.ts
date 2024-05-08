import { colorScheme } from '@/storybook';
import VsValueTag from '../VsValueTag.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsValueTag> = {
    title: 'Chromatic/Base Components/VsValueTag',
    component: VsValueTag,
    render: (args: any) => ({
        components: { VsValueTag },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-value-tag v-bind="args" :style="{ marginBottom: '12px' }"><template #label>label</template><template #value>value</template></vs-value-tag>		

                <vs-value-tag v-bind="args" primary><template #label>label</template><template #value>value</template></vs-value-tag>				
            </div>`,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsValueTag>;

export const Default: Story = {};
