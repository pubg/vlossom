import { ref, type Ref } from 'vue';
import { chromaticParameters, colorScheme, getColorSchemeTemplate } from '@/storybook';
import { VsIcon } from '@/icons';
import { userEvent, within } from '@storybook/test';
import VsChip from './../VsChip.vue';
import VsButton from '@/components/vs-button/VsButton.vue';

import type { Meta, StoryObj } from '@storybook/vue3';
import { COLORS } from '@/declaration';

const meta: Meta<typeof VsChip> = {
    title: 'Components/Base Components/VsChip',
    component: VsChip,
    render: (args: any) => ({
        components: { VsChip },
        setup() {
            return { args };
        },
        template: '<vs-chip v-bind="args">Chip</vs-chip>',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsChip>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: () => ({
        components: { VsChip },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-chip color-scheme="{{ color }}" style="margin-bottom: 0.3rem;">
                        Chip
                    </vs-chip>
                `)}
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Closable: Story = {
    render: () => ({
        components: { VsChip, VsButton },
        setup() {
            const opened: Ref<string[]> = ref([...COLORS]);
            function close(color: string) {
                opened.value = opened.value.filter((c) => c !== color);
            }
            function reset() {
                opened.value = [...COLORS];
            }

            return { opened, close, reset };
        },
        template: `
            <div>
                <vs-chip v-for="color in opened" :key="color" :color-scheme="color" closable @close="close(color)" style="margin-bottom: 0.3rem;">Chip</vs-chip>
                <vs-button v-if="!opened.length" @click="reset" dense>Reset</vs-button>
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const NoRound: Story = {
    render: () => ({
        components: { VsChip },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-chip color-scheme="{{color}}" no-round style="margin-bottom: 0.3rem;">
                        Chip
                    </vs-chip>
                `)}
            </div>
        `,
    }),
};

export const Primary: Story = {
    render: () => ({
        components: { VsChip },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-chip color-scheme="{{color}}" primary style="margin-bottom: 0.3rem;">
                        Chip
                    </vs-chip>
                `)}
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Icon: Story = {
    render: () => ({
        components: { VsChip, VsIcon },
        template: `
            <div>
				<vs-chip>
					<template #icon>
						<vs-icon icon="check" size="16px"/>
					</template>
					Chip
				</vs-chip>

				<vs-chip>
					<template #icon>
						<vs-icon icon="close" size="16px" />
					</template>
					Chip
				</vs-chip>
            </div>
        `,
    }),
};

export const ClickEventWithPrimary: Story = {
    render: () => ({
        components: { VsChip, VsIcon },
        setup() {
            const selected: Ref<string[]> = ref([]);
            function onClick(color: string) {
                if (selected.value.includes(color)) {
                    selected.value = selected.value.filter((c) => c !== color);
                } else {
                    selected.value.push(color);
                }
            }

            function isSelected(color: string) {
                return selected.value.includes(color);
            }

            return { COLORS, selected, onClick, isSelected };
        },
        template: `
            <div style="display:flex; align-items:center; flex-wrap: wrap;">
                ${getColorSchemeTemplate(`
                    <vs-chip color-scheme="{{ color }}" @click="onClick('{{ color }}')" :primary="isSelected('{{ color }}')" :style-set="{padding: '0 1rem'}" style="margin-bottom: 0.3rem;">
                        <template #icon>
                            <vs-icon v-if="isSelected('{{ color }}')" icon="check" size="16px" />
                        </template>
                        {{color}}
                    </vs-chip>
                `)}
            </div>
        `,
    }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await userEvent.click(canvas.getByText('red'), { delay: 150 });
        await userEvent.click(canvas.getByText('yellow'), { delay: 150 });
        await userEvent.click(canvas.getByText('blue'), { delay: 150 });
        await userEvent.click(canvas.getByText('blue'), { delay: 150 });
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: {
            backgroundColor: '#1e88e5',
            borderRadius: '0.2rem',
            fontColor: 'white',
            fontSize: '1.2rem',
            fontWeight: '500',
            height: '2rem',
            minHeight: '1rem',
            outlineBorder: '3px solid #304d30',
            padding: '0.8rem 1.5rem',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
