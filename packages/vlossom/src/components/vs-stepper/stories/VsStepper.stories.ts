import { computed, ref, type Ref } from 'vue';
import VsStepper from '../VsStepper.vue';
import { colorScheme, getColorSchemeTemplate, getMetaArguments, numberArray } from '@/storybook/args';
import { chromaticParameters } from '@/storybook/parameters';
import { VsIcon } from '@/icons';
import VsContainer from '@/components/vs-container/VsContainer.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const arrayArgTypes = numberArray(3, true);
const steps = ['step1', 'step2', 'step3'];

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
        disabled: arrayArgTypes,
        completed: arrayArgTypes,
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
        components: { VsStepper, VsContainer },
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
            <vs-container column-gap="40px">
				<vs-stepper v-bind="args" />
				<vs-stepper v-bind="args" />
            </vs-container>
        `,
    }),
    args: {
        grid: { md: 6, lg: 3 },
    },
};

// export const Linear: Story = {
//     render: (args: any) => ({
//         components: { VsStepper, VsIcon },
//         setup() {
//             const selectedIdx = ref(0);
//             function updateModel(value: number) {
//                 selectedIdx.value = value;
//             }

//             const completed: Ref<number[]> = ref([]);

//             function goPrev() {
//                 if (selectedIdx.value === 0) {
//                     return;
//                 }
//                 completed.value.pop();
//                 selectedIdx.value--;
//             }

//             function goNext() {
//                 if (selectedIdx.value === steps.length - 1) {
//                     return;
//                 }
//                 completed.value.push(selectedIdx.value);
//                 selectedIdx.value++;
//             }

//             const isLastStep = computed(() => selectedIdx.value === steps.length - 1);

//             function reset() {
//                 completed.value = [];
//                 selectedIdx.value = 0;
//             }

//             return { args, steps, selectedIdx, updateModel, goPrev, goNext, reset, isLastStep, completed };
//         },
//         template: `
// 			<div>
// 				<vs-stepper v-bind="args" style="margin-left:50px;" v-model="selectedIdx" :steps="steps" :completed="completed" :modelValue="selectedIdx" @update:modelValue="updateModel">
// 					<template #step1>
// 						<span style="display:flex; align-items:center;">
// 							<vs-icon v-if="selectedIdx === 0" icon="check" size="16px" />
// 							<span style="margin-left:5px">Select campaign settings</span>
// 						</span>
// 					</template>
// 					<template #step2>
// 						<span style="display:flex; align-items:center;">
// 							<vs-icon v-if="selectedIdx === 1" icon="check" size="16px" />
// 							<span style="margin-left:5px">Select group</span>
// 						</span>
// 					</template>
// 					<template #step3>
// 						<span style="display:flex; align-items:center;">
// 							<vs-icon v-if="selectedIdx === 2" icon="check" size="16px" />
// 							<div style="display:flex; flex-direction:column; align-items:center;">
// 								<div style="margin-left:5px">Create item</div>
// 								<div style="font-size:12px;">last step</div>
// 							</div>
// 						</span>
// 					</template>
// 				</vs-stepper>
// 				<div style="display:flex; justify-content:space-between;">
// 					<vs-button @click="goPrev()" :disabled="selectedIdx === 0">Uncomplete Step</vs-button>
// 					<vs-button v-if="isLastStep" @click="reset()">Reset</vs-button>
// 					<vs-button v-else @click="goNext()">Complete Step</vs-button>
// 				</div>
// 			</div>
// 		`,
//     }),
//     args: {
//         linear: true,
//         width: '90%',
//     },
// };

export const StyleSet: Story = {
    args: {
        styleSet: {
            activeBackgroundColor: '#FFF512',
            activeColor: '#090907',
            fontSize: '16px',
            labelColor: '#000',
            stepSize: '40px',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
