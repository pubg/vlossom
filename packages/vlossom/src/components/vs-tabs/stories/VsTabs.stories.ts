import { ref } from 'vue';
import VsTabs from '../VsTabs.vue';
import { colorScheme, getColorSchemeTemplate, numberArray } from '@/storybook/args';
import { chromaticParameters } from '@/storybook/parameters';
import { CheckIcon } from '@/icons';

import type { Meta, StoryObj } from '@storybook/vue3';

const disabledArgTypes = numberArray(3, true);
const tabs = ['tab1', 'tab2', 'tab3'];

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
    argTypes: {
        colorScheme,
        disabled: disabledArgTypes,
    },
    args: {
        tabs,
    },
};

export default meta;
type Story = StoryObj<typeof VsTabs>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: () => ({
        components: { VsTabs },
        setup() {
            const colorOptions = [...colorScheme.options];
            return { colorOptions, tabs };
        },
        template: `
			<div>
				${getColorSchemeTemplate(`
					<vs-tabs :tabs="tabs" color-scheme="{{ color }}" :style="{ marginBottom: '5px' }">
						Button
					</vs-tabs>
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

export const disabled: Story = {
    args: {
        disabled: [1],
    },
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const MobileFull: Story = {
    args: {
        mobileFull: true,
    },
    parameters: {
        chromatic: chromaticParameters.mobile,
    },
};

export const TabSlot: Story = {
    render: () => ({
        components: { VsTabs, CheckIcon },
        setup() {
            const selectedIdx = ref(0);
            return { tabs, selectedIdx };
        },
        template: `
			<vs-tabs :tabs="tabs" v-model="selectedIdx">
				<template #tab1>
					<span style="display:flex; align-items:center;">
						<check-icon v-if="selectedIdx === 0" aria-label="check" width="16px" height="16px"/>
						<span style="margin-left:5px">ITEM ONE</span>
					</span>
				</template>
				<template #tab2>
					<span style="display:flex; align-items:center;">
						<check-icon v-if="selectedIdx === 1" aria-label="check" width="16px" height="16px"/>
						<span style="margin-left:5px">ITEM TWO</span>
					</span>
				</template>
				<template #tab3>
					<span style="display:flex; align-items:center;">
						<check-icon v-if="selectedIdx === 2" aria-label="check" width="16px" height="16px"/>
						<span style="margin-left:5px">ITEM THREE</span>
					</span>
				</template>
			</vs-tabs>
		`,
    }),
};

export const StyleSet: Story = {
    args: {
        styleSet: { backgroundColor: '#90caf9', fontSize: '20px', height: '40px', color: '#1e88e5', tabWidth: '200px' },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
