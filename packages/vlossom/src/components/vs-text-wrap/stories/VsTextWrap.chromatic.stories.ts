import { colorScheme, align, placement } from '@/storybook';
import { userEvent, within } from '@storybook/test';
import VsTextWrap from './../VsTextWrap.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsTextWrap> = {
    title: 'Chromatic/Base Components/VsTextWrap',
    component: VsTextWrap,
    render: (args: any) => ({
        components: { VsTextWrap },
        setup() {
            return { args };
        },
        template: `
            <div style="padding: 100px;">
                <vs-text-wrap v-bind="args" :style="{ marginBottom: '100px' }">This is text wrap. Hover here.</vs-text-wrap>
                
                <vs-text-wrap v-bind="args" copy  :style="{ marginBottom: '100px' }">This is text wrap. Hover here.</vs-text-wrap>
				
                <vs-text-wrap v-bind="args" link="https://google.com">https://google.com</vs-text-wrap>
            </div>`,
    }),
    argTypes: {
        colorScheme,
        align,
        placement,
        width: {
            control: {
                type: 'text',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const texts = canvas.getAllByText('This is text wrap. Hover here.');
        texts.forEach(async (text) => {
            await userEvent.hover(text, { delay: 300 });
        });

        const link = canvas.getByText('https://google.com');
        await userEvent.click(link, { delay: 300 });
    },
};

export default meta;
type Story = StoryObj<typeof VsTextWrap>;

export const Default: Story = {};
