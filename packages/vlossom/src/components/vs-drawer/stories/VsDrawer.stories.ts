import { placement, size, colorScheme, LOREM_IPSUM } from '@/storybook';
import { userEvent, within } from '@storybook/test';
import { ref } from 'vue';
import VsDrawer from './../VsDrawer.vue';
import VsButton from '@/components/vs-button/VsButton.vue';
import VsInput from '@/components/vs-input/VsInput.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const wrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '300px',
    overflow: 'hidden',
};

const meta: Meta<typeof VsDrawer> = {
    title: 'Components/Layout Components/VsDrawer',
    component: VsDrawer,
    render: (args: any) => ({
        components: { VsDrawer, VsButton },
        setup() {
            const isOpen = ref(false);

            return { args, isOpen, wrapperStyle };
        },
        template: `
            <div :style="wrapperStyle">
                <vs-button @click="isOpen = !isOpen">Toggle Drawer</vs-button>
                <vs-drawer v-model="isOpen" v-bind="args">
                    This is drawer
                </vs-drawer>
            </div>
        `,
    }),
    tags: ['autodocs'],
    argTypes: {
        placement,
        size,
        colorScheme,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await userEvent.click(canvas.getByRole('button'), { delay: 300 });
    },
};

export default meta;
type Story = StoryObj<typeof VsDrawer>;

export const Default: Story = {};

export const Placement: Story = {
    render: () => ({
        components: { VsDrawer, VsButton },
        setup() {
            const isOpen = ref(false);
            const placements = placement.options.filter((p) => p !== 'middle');
            const currentPlacement = ref('left');

            function setPlacement(value: string) {
                currentPlacement.value = value;
                isOpen.value = !isOpen.value;
            }

            return {
                isOpen,
                placements,
                currentPlacement,
                setPlacement,
                wrapperStyle,
            };
        },
        template: `
            <div :style="wrapperStyle">
				<vs-button v-for="placement in placements" :key="placement" @click="setPlacement(placement)">
                    {{ placement }}
				</vs-button>
                <vs-drawer v-model="isOpen" :placement="currentPlacement">
                    This is drawer
                </vs-drawer>
            </div>
        `,
    }),
    play: () => {},
};

export const Size: Story = {
    render: () => ({
        components: { VsDrawer, VsButton },
        setup() {
            const isOpen = ref(false);
            const sizes = [...size.options, '500px'];
            const currentSize = ref('sm');

            function setSize(value: string) {
                currentSize.value = value;
                isOpen.value = !isOpen.value;
            }

            return { isOpen, sizes, currentSize, setSize, wrapperStyle };
        },
        template: `
            <div :style="wrapperStyle">
                <vs-button v-for="size in sizes" :key="size" @click="setSize(size)">
                    {{ size }}
                </vs-button>
                <vs-drawer v-model="isOpen" :size="currentSize" dimmed>
                    This is drawer body
                </vs-drawer>
            </div>
        `,
    }),
    play: () => {},
};

export const Slots: Story = {
    render: () => ({
        components: { VsDrawer, VsButton },
        setup() {
            const isOpen = ref(false);

            return { isOpen, wrapperStyle };
        },
        template: `
            <div :style="wrapperStyle">
                <vs-button @click="isOpen = !isOpen">Toggle Drawer</vs-button>
                <vs-drawer v-model="isOpen" size="md">
                    <template #header>
                        <div style="padding: 1rem; border-bottom: 1px solid rgb(240, 240, 240); display:flex; justify-content: space-between">
                            This is drawer header
                        </div>
                    </template>

                    <div>
                        This is drawer body
                    </div>

                    <template #footer>
                        <div style="padding: 1rem; border-top: 1px solid rgb(240, 240, 240)">This is drawer footer</div>
                    </template>
                </vs-drawer>
            </div>
        `,
    }),
};

export const HideScroll: Story = {
    render: (args: any) => ({
        components: { VsDrawer, VsButton },
        setup() {
            const isOpen = ref(false);

            return { args, isOpen, wrapperStyle, LOREM_IPSUM };
        },
        template: `
            <div :style="wrapperStyle">
                <vs-button @click="isOpen = !isOpen">Toggle Drawer</vs-button>
                <vs-drawer v-model="isOpen" v-bind="args">
                    <div :style="{ height: '1500px' }">
                        {{ LOREM_IPSUM }}
                        {{ LOREM_IPSUM }}
                        {{ LOREM_IPSUM }}
                    </div>
                </vs-drawer>
            </div>
        `,
    }),
    args: {
        hideScroll: true,
    },
    play: () => {},
};

export const InitialFocusRef: Story = {
    render: () => ({
        components: { VsDrawer, VsInput, VsButton },
        setup() {
            const isOpen = ref(false);
            const inputRef = ref(null);

            return { isOpen, inputRef, wrapperStyle };
        },
        template: `
            <div :style="wrapperStyle">
                <vs-button @click="isOpen = !isOpen">Toggle Drawer</vs-button>
                <vs-drawer v-model="isOpen" :initialFocusRef="inputRef" size="md" dimmed>
                    <vs-input ref="inputRef" label="Name" placeholder="enter your name" />
                    <vs-input label="What do you like?" placeholder="enter your favorites       " />
                </vs-drawer>
            </div>
        `,
    }),
};

export const StyleSet: Story = {
    args: {
        styleSet: { backgroundColor: '#FBE7C6', size: '500px' },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
