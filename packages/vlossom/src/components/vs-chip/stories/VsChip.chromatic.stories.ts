import { colorScheme } from '@/storybook';
import { VsIcon } from '@/icons';
import VsChip from './../VsChip.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsChip> = {
    title: 'Chromatic/Base Components/VsChip',
    component: VsChip,
    render: (args: any) => ({
        components: { VsChip, VsIcon },
        setup() {
            return { args };
        },
        template: `
            <div style="display:flex; align-items:center;">
                <vs-chip v-bind="args">Chip</vs-chip>

                <vs-chip v-bind="args" primary>Chip</vs-chip>
				
                <vs-chip v-bind="args" closable>Chip</vs-chip>
				
                <vs-chip v-bind="args" no-round>Chip</vs-chip>

                <vs-chip>
                    <template #icon>
                        <vs-icon icon="check" size="16px"/>
                    </template>
                    Chip
                </vs-chip>
            </div>`,
    }),
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsChip>;

export const Default: Story = {};
