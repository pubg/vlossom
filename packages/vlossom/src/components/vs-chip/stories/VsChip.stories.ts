import type { Meta, StoryObj } from '@storybook/vue3';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { colorScheme } from '@/storybook/args';
import VsChip from './../VsChip.vue';
import Check from '@/assets/icons/check';
import Person from '@/assets/icons/person';

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
        setup() {
            const coloredChips = ref([...colorScheme.options]);
            return { coloredChips };
        },
        template: `
            <div>
				<vs-chip v-for="(color, index) in coloredChips" :key="index" :color-scheme="color">
					Chip	
				</vs-chip>
            </div>
        `,
    }),
};

export const Closable: Story = {
    render: () => ({
        components: { VsChip },
        setup() {
            const initialColoredChips = colorScheme.options.map((color, index) => ({ id: index, color: color }));
            const coloredChips = ref(initialColoredChips);
            const close = (index: number) => {
                coloredChips.value = coloredChips.value.filter((_, i) => i !== index);
            };
            const reset = () => {
                coloredChips.value = initialColoredChips;
            };

            return { coloredChips, close, reset };
        },
        template: `
            <div>
			<vs-chip v-for="({color, id}, index) in coloredChips" :key="id" :color-scheme="color" 
					closable @close="close(index)"
				>
					Chip	
				</vs-chip>
				<vs-button v-if="!coloredChips.length" color-scheme="blue" @click="reset" dense> Reset </vs-button>
            </div>
        `,
    }),
};

export const NoRound: Story = {
    render: () => ({
        components: { VsChip },
        setup() {
            const coloredChips = ref([...colorScheme.options]);
            return { coloredChips };
        },
        template: `
            <div>
				<vs-chip v-for="(color, index) in coloredChips" :key="index" :color-scheme="color" 
					no-round
				>
					Chip	
				</vs-chip>
            </div>
        `,
    }),
};

export const Primary: Story = {
    render: () => ({
        components: { VsChip },
        setup() {
            const coloredChips = ref([...colorScheme.options]);
            return { coloredChips };
        },
        template: `
            <div>
				<vs-chip v-for="(color, index) in coloredChips" :key="index" :color-scheme="color" 
					primary
				>
					Chip	
				</vs-chip>
            </div>
        `,
    }),
};

export const StyleSet: Story = {
    args: {
        styleSet: {
            backgroundColor: '#1e88e5',
            borderRadius: '0.2rem',
            color: 'white',
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

export const LeadingIcon: Story = {
    render: () => ({
        components: { VsChip, Check, Person },
        template: `
            <div>
				<vs-chip>
					<template #leading-icon>
						<check aria-label="check" width="16px" height="16px"/>
					</template>
					Chip	
				</vs-chip>

				<vs-chip>
					<template #leading-icon>
						<person aria-label="person" width="16px" height="16px"/>
					</template>
					Chip	
				</vs-chip>
            </div>
        `,
    }),
};

export const ClickEventWithPrimary: Story = {
    render: () => ({
        components: { VsChip, Check },
        setup() {
            const coloredChips = ref(colorScheme.options.map((color, index) => ({ id: index, color: color })));

            const selectedChips: Ref<number[]> = ref([]);
            const onClick = (id: number) => {
                if (selectedChips.value.includes(id)) {
                    selectedChips.value = selectedChips.value.filter((chipId) => chipId !== id);
                } else {
                    selectedChips.value.push(id);
                }
            };

            const isSelected = (id: number) => selectedChips.value.includes(id);

            return { coloredChips, selectedChips, onClick, isSelected };
        },
        template: `
            <div style="display:flex; align-items:center">
				<vs-chip v-for="({color, id}, index) in coloredChips" :key="id" :color-scheme="color" 
					@click="onClick(id)" :primary="isSelected(id)"
				>
					<template #leading-icon>
						<check v-if="isSelected(id)" aria-label="check" width="16px" height="16px"/>
					</template>
					Chip	
				</vs-chip>
            </div>
        `,
    }),
};
