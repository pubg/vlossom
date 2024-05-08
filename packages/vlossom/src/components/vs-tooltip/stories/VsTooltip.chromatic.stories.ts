import { colorScheme, align, placement } from '@/storybook';
import { userEvent, within } from '@storybook/test';
import { PLACEMENTS, ALIGNS } from '@/declaration';
import VsTooltip from './../VsTooltip.vue';
import VsDivider from '@/components/vs-divider/VsDivider.vue';
import VsButton from '@/components/vs-button/VsButton.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsTooltip> = {
    title: 'Chromatic/Base Components/VsTooltip',
    component: VsTooltip,
    render: (args: any) => ({
        components: { VsTooltip, VsDivider, VsButton },
        setup() {
            return { args, PLACEMENTS, ALIGNS };
        },
        template: `
            <div style="padding: 100px;">
                <div v-for="placement in PLACEMENTS" :key="placement" style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                    <vs-tooltip v-for="align in ALIGNS" :key="align" v-bind="args" :placement="placement" :align="align" style="margin: 0.3rem;">
                        <vs-button large style="width: 12rem;">placement: {{placement}} <br/> align: {{align}}</vs-button>
                        <template #tooltip>Tooltip</template>
                    </vs-tooltip>
                    <vs-divider/>
                </div>
            </div>`,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
        align,
        placement,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const buttons = canvas.getAllByRole('button');
        buttons.forEach(async (button) => {
            await userEvent.hover(button, { delay: 300 });
        });
    },
};

export default meta;
type Story = StoryObj<typeof VsTooltip>;

export const Default: Story = {};
