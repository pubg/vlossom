import { size, colorScheme } from '@/storybook';
import { userEvent, within } from '@storybook/test';
import { reactive } from 'vue';
import VsModal from './../VsModal.vue';
import VsButton from '@/components/vs-button/VsButton.vue';
import { ModalCloseButton } from './ModalCloseButton';
import { containerStyle } from './constants';
import { SIZES } from '@/declaration';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsModal> = {
    title: 'Chromatic/Layout Components/VsModal',
    component: VsModal,
    render: (args: any) => ({
        components: { VsModal, ModalCloseButton, VsButton },
        setup() {
            const isOpens = reactive([...Array(6).fill(false)]);

            function onClick(idx: number) {
                isOpens[idx] = true;
            }

            return { args, SIZES, isOpens, onClick, containerStyle };
        },
        template: `
            <div>
                <div v-for="(size, index) in SIZES" :style="{...containerStyle, marginBottom: '12px' }">
                    Render in this
                    <vs-button @click="onClick(index)">{{size}}</vs-button>
                    <vs-modal v-model="isOpens[index]" :size="size" v-bind="args">
                        <span>some contents</span>
                    </vs-modal>
                </div>

                <div :style="containerStyle">
                    Render in this
                    <vs-button @click="onClick(5)">Open Modal</vs-button>
                    <vs-modal v-model="isOpens[5]" size="xl" v-bind="args">
                        <template #header>
                            <div style="display:flex; justify-content: space-between">
                                Header
                            </div>
                        </template>
                        some contents
                        <template #footer>
                            Footer
                        </template>
                    </vs-modal>
                </div>
            </div>
        `,
    }),
    tags: ['autodocs'],
    argTypes: {
        size,
        colorScheme,
    },
    args: {
        hasContainer: true,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        SIZES.forEach(async (s) => {
            userEvent.click(canvas.getByText(s));
        });
        userEvent.click(canvas.getByText('Open Modal'));
    },
};

export default meta;
type Story = StoryObj<typeof VsModal>;

export const Default: Story = {};
