import { placement, size, colorScheme } from '@/storybook';
import { userEvent, within } from '@storybook/test';
import { reactive } from 'vue';
import VsDrawer from './../VsDrawer.vue';
import VsButton from '@/components/vs-button/VsButton.vue';
import { DrawerCloseButton, contentStyle, containerStyle } from './constants';
import { PLACEMENTS, SIZES } from '@/declaration';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsDrawer> = {
    title: 'Chromatic/Layout Components/VsDrawer',
    component: VsDrawer,
    render: (args: any) => ({
        components: { VsDrawer, DrawerCloseButton, VsButton },
        setup() {
            const isOpens = reactive([...Array(10).fill(false)]);

            function onClick(idx: number) {
                isOpens[idx] = true;
            }

            return { args, isOpens, onClick, SIZES, PLACEMENTS, containerStyle, contentStyle };
        },
        template: `
            <div>
                <div v-for="(size, index) in SIZES" :style="{...containerStyle, marginBottom: '12px' }">
                    Render in this
                    <vs-button @click="onClick(index)">{{size}}</vs-button>
                    <vs-drawer v-model="isOpens[index]" :size="size" v-bind="args">
                        <div :style="contentStyle">
                            {{size}}
                        </div>
                    </vs-drawer>
                </div>

                <div v-for="(placement, index) in PLACEMENTS" :style="{...containerStyle, marginBottom: '12px' }">
                    Render in this
                    <vs-button @click="onClick(index+5)">{{placement}}</vs-button>
                    <vs-drawer v-model="isOpens[index+5]" :placement="placement" v-bind="args">
                        <div :style="contentStyle">
                           {{placement}}
                        </div>
                    </vs-drawer>
                </div>

                <div :style="containerStyle">
                    Render in this
                    <vs-button @click="onClick(9)">Open Drawer</vs-button>
                    <vs-drawer v-model="isOpens[9]" size="xl" v-bind="args">
                        <template #header>
                            <div style="padding: 1rem; border-bottom: 1px solid rgb(240, 240, 240); display:flex; justify-content: space-between">
                                Here is drawer header
                                <drawer-close-button @click="isOpen = false" />
                            </div>
                        </template>

                        <div :style="contentStyle">
                            Here is drawer body
                        </div>

                        <template #footer>
                            <div style="padding: 1rem; border-top: 1px solid rgb(240, 240, 240)">Here is drawer footer</div>
                        </template>
                    </vs-drawer>
                </div>
            </div>
        `,
    }),
    argTypes: {
        placement,
        size,
        colorScheme,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        SIZES.forEach(async (s) => {
            userEvent.click(canvas.getByText(s));
        });

        PLACEMENTS.forEach(async (p) => {
            userEvent.click(canvas.getByText(p));
        });

        userEvent.click(canvas.getByText('Open Drawer'));
    },
};

export default meta;
type Story = StoryObj<typeof VsDrawer>;

export const Default: Story = {};
