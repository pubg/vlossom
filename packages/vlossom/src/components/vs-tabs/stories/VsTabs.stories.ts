import { ref } from 'vue';
import { chromaticParameters, colorScheme, getColorSchemeTemplate } from '@/storybook';
import VsTabs from './../VsTabs.vue';
import VsContainer from '@/components/vs-container/VsContainer.vue';
import { VsIcon } from '@/icons';
import { SCROLL_BUTTONS } from './../types';
import { disabledArgTypes, tabs } from './constants';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsTabs> = {
    title: 'Components/Layout Components/VsTabs',
    component: VsTabs,
    render: (args: any) => ({
        components: { VsTabs },
        setup() {
            return { args, tabs };
        },
        template: '<vs-tabs v-bind="args" />',
    }),
    tags: ['autodocs'],
    args: {
        tabs,
    },
    argTypes: {
        colorScheme,
        disabled: disabledArgTypes,
        scrollButtons: {
            control: 'select',
            options: SCROLL_BUTTONS,
        },
    },
};

export default meta;
type Story = StoryObj<typeof VsTabs>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: () => ({
        components: { VsTabs },
        setup() {
            return { tabs };
        },
        template: `
			<div>
				${getColorSchemeTemplate(`
					<vs-tabs :tabs="tabs" color-scheme="{{ color }}" :style="{ marginBottom: '10px' }" />
				`)}
			</div>
			`,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Dense: Story = {
    args: {
        dense: true,
    },
};

export const Disabled: Story = {
    args: {
        disabled: [1],
    },
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const ScrollButtons: Story = {
    args: {
        scrollButtons: 'auto',
    },
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Width: Story = {
    render: (args: any) => ({
        components: { VsTabs, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container grid row-gap="20px">
                <vs-tabs v-bind="args" />
                <vs-tabs v-bind="args" />
            </vs-container>
        `,
    }),
    args: {
        width: { md: '100%', lg: '50%' },
    },
};

export const Grid: Story = {
    render: (args: any) => ({
        components: { VsTabs, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container grid column-gap="40px">
				<vs-tabs v-bind="args" />
				<vs-tabs v-bind="args" />
            </vs-container>
        `,
    }),
    args: {
        grid: { md: 6, lg: 3 },
    },
};

export const TabSlot: Story = {
    render: () => ({
        components: { VsTabs, VsIcon },
        setup() {
            const selectedIdx = ref(0);
            return { tabs, selectedIdx };
        },
        template: `
			<vs-tabs :tabs="tabs" v-model="selectedIdx">
				<template #tab1>
					<span style="display:flex; align-items:center;">
						<vs-icon v-if="selectedIdx === 0" icon="check" size="16px" />
						<span style="margin-left:5px">ITEM ONE</span>
					</span>
				</template>
				<template #tab2>
					<span style="display:flex; align-items:center;">
						<vs-icon v-if="selectedIdx === 1" icon="check" size="16px" />
						<span style="margin-left:5px">ITEM TWO</span>
					</span>
				</template>
				<template #tab3>
					<span style="display:flex; align-items:center;">
						<vs-icon v-if="selectedIdx === 2" icon="check" size="16px" />
						<span style="margin-left:5px">ITEM THREE</span>
					</span>
				</template>
			</vs-tabs>
		`,
    }),
};

export const StyleSet: Story = {
    args: {
        styleSet: {
            backgroundColor: '#90caf9',
            fontSize: '20px',
            height: '40px',
            fontColor: '#1e88e5',
            tabWidth: '200px',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
