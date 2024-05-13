import { computed, ref, type Ref } from 'vue';
import { colorScheme, getColorSchemeTemplate, getMetaArguments } from '@/storybook';
import { chromaticParameters } from '@/storybook/parameters';
import VsContainer from '@/components/vs-container/VsContainer.vue';
import VsStepper from '../VsStepper.vue';
import VsButton from '@/components/vs-button/VsButton.vue';
import { VsIcon } from '@/icons';
import { disabledArgTypes, steps } from './constants';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsStepper> = {
    title: 'Components/Layout Components/VsStepper',
    component: VsStepper,
    render: (args: any) => ({
        components: { VsStepper },
        setup() {
            return { args };
        },
        template: '<vs-stepper v-bind="args" />',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
        disabled: disabledArgTypes,
    },
    args: {
        steps,
    },
};

meta.args = getMetaArguments(VsStepper.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsStepper>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsStepper },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-stepper v-bind="args" color-scheme="{{ color }}" />
			   `)}
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
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

export const Gap: Story = {
    render: (args: any) => ({
        components: { VsStepper },
        setup() {
            return { args };
        },
        template: '<vs-stepper v-bind="args" />',
    }),
    args: {
        gap: '300px',
    },
};

export const Width: Story = {
    render: (args: any) => ({
        components: { VsStepper, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container>
                <vs-stepper v-bind="args"/>
                <vs-stepper v-bind="args" />
            </vs-container>
        `,
    }),
    args: {
        width: { md: '300px', lg: '400px' },
    },
};

export const Grid: Story = {
    render: (args: any) => ({
        components: { VsStepper, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container grid column-gap="40px">
				<vs-stepper v-bind="args" />
				<vs-stepper v-bind="args" />
            </vs-container>
        `,
    }),
    args: {
        grid: { md: 6, lg: 3 },
    },
};

export const CustomSlots: Story = {
    render: (args: any) => ({
        components: { VsStepper, VsIcon, VsButton },
        setup() {
            const selectedIdx = ref(0);
            function updateModel(value: number) {
                // Manually update modelValue
                selectedIdx.value = value;
            }

            const completed: Ref<number[]> = ref([]);

            function goPrev() {
                if (selectedIdx.value === 0) {
                    return;
                }
                completed.value.pop();
                selectedIdx.value--;
            }

            function goNext() {
                if (selectedIdx.value === steps.length - 1) {
                    return;
                }
                completed.value.push(selectedIdx.value);
                selectedIdx.value++;
            }

            function reset() {
                completed.value = [];
                selectedIdx.value = 0;
            }

            const isLastStep = computed(() => selectedIdx.value === steps.length - 1);

            function isCompleted(index: number) {
                return completed.value.includes(index);
            }

            function isSelected(index: number) {
                return selectedIdx.value === index;
            }

            return {
                args,
                steps,
                selectedIdx,
                updateModel,
                goPrev,
                goNext,
                reset,
                isLastStep,
                isSelected,
                isCompleted,
            };
        },
        template: `
			<div>
				<vs-stepper style="margin-left:50px;" v-model="selectedIdx" :steps="steps" @update:modelValue="updateModel" v-bind="args">
					<template #step1-step>
						<vs-icon v-if="isCompleted(0) && !isSelected(0)" icon="check" />
					</template>
					<template #step1-name>
						<span style="display:flex; align-items:center;">
							<vs-icon v-if="isSelected(0)" icon="check" size="16px" />
							<span style="margin-left:5px">Select campaign settings</span>
						</span>
					</template>
					<template #step2-step>
						<vs-icon v-if="isCompleted(1) && !isSelected(1)" icon="check" />
					</template>
					<template #step2-name>
						<span style="display:flex; align-items:center;">
							<vs-icon v-if="isSelected(1)" icon="check" size="16px" />
							<span style="margin-left:5px">Select group</span>
						</span>
					</template>
					<template #step3-step>
						<vs-icon v-if="isCompleted(2) && !isSelected(2)" icon="check" />
					</template>
					<template #step3-name>
						<span style="display:flex; align-items:center;">
							<vs-icon v-if="isSelected(2)" icon="check" size="16px" />
							<div style="display:flex; flex-direction:column; align-items:center;">
								<div style="margin-left:5px">Create item</div>
								<div style="font-size:12px;">last step</div>
							</div>
						</span>
					</template>
				</vs-stepper>
				<div style="display:flex; justify-content:space-between;">
					<vs-button @click="goPrev()" :disabled="isSelected(0)">Reset Current Step</vs-button>
					<vs-button v-if="isLastStep" @click="reset()">Reset All</vs-button>
					<vs-button v-else @click="goNext()">Complete Current Step</vs-button>
				</div>
			</div>
		`,
    }),
    args: {
        width: '90%',
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: {
            activeBackgroundColor: '#FFF512',
            activeColor: '#090907',
            fontSize: '16px',
            labelFontColor: '#000',
            stepSize: '40px',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
