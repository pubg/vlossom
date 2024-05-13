import { colorScheme } from '@/storybook';
import VsAvatar from './../VsAvatar.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsAvatar> = {
    title: 'Chromatic/Base Components/VsAvatar',
    component: VsAvatar,
    render: (args: any) => ({
        components: { VsAvatar },
        setup() {
            return { args };
        },
        template: `
            <div style="display:flex; align-items:center;">
                <vs-avatar v-bind="args">VS</vs-avatar>

                <vs-avatar v-bind="args">
                    <img src="https://upload.wikimedia.org/wikipedia/en/a/a6/Pok%C3%A9mon_Pikachu_art.png" alt="pikachu">
                </vs-avatar>
            </div>`,
    }),
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsAvatar>;

export const Default: Story = {};
