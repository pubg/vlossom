import { defineComponent, ref } from 'vue';
import VsIndexView from '../VsIndexView.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const CompA = defineComponent({
    template: `
		<p>Component: A</p>
    	<span>count: {{ count }}</span>
    	<vs-button :style="{ width: '10px', marginLeft: '10px', marginTop: '10px'}" @click="count++">+</vs-button>
	`,
    data() {
        const count = ref(0);
        return { count };
    },
});

const tabs = ['CompA', 'CompB'];

const meta: Meta<typeof VsIndexView> = {
    title: 'Components/Layout Components/VsIndexView & VsIndexItem',
    component: VsIndexView,
    render: (args: any) => ({
        components: { CompA },
        setup() {
            const selectedIndex = ref(0);
            function updateModel(value: number) {
                // Manually update modelValue
                selectedIndex.value = value;
            }

            return { args, tabs, selectedIndex, updateModel };
        },
        template: `
			<div>
				<vs-tabs :tabs="tabs" v-model="selectedIndex" @update:modelValue="updateModel" v-bind="args"/>
				<vs-index-view v-model="selectedIndex" v-bind="args">
					<vs-index-item key="A"> <CompA /> </vs-index-item>
					<vs-index-item key="B"> This is the content of Component B </vs-index-item>
				</vs-index-view>
			</div>
		`,
    }),
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VsIndexView>;

export const Default: Story = {};

export const KeepAlive: Story = {
    args: {
        keepAlive: true,
    },
};

const steps = ['step1', 'step2', 'step3'];

export const WithStepper: Story = {
    render: (args: any) => ({
        setup() {
            const selectedIndex = ref(0);
            function updateModel(value: number) {
                // Manually update modelValue
                selectedIndex.value = value;
            }

            return { args, steps, selectedIndex, updateModel };
        },
        template: `
			<div>
				<vs-stepper v-model="selectedIndex" :steps="steps" @update:modelValue="updateModel" v-bind="args" />
				<vs-index-view v-model="selectedIndex" v-bind="args">
					<vs-index-item key="step1"> <h3> Step 1 Content </h3> </vs-index-item>
					<vs-index-item key="step2"> <h3> Step 2 Content </h3> </vs-index-item>
					<vs-index-item key="step3"> <h3> Step 3 Content </h3> </vs-index-item>
				</vs-index-view>
			</div>
		`,
    }),
};
