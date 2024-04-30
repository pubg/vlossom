import { defineComponent, ref } from 'vue';
import VsIndexView from '../VsIndexView.vue';
import VsIndexItem from '../VsIndexItem.vue';
import VsContainer from '@/components/vs-container/VsContainer.vue';
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';
import VsButton from '@/components/vs-button/VsButton.vue';
import VsDivider from '@/components/vs-divider/VsDivider.vue';
import { LOREM_IPSUM } from '@/storybook';

import type { Meta, StoryObj } from '@storybook/vue3';

const CompA = defineComponent({
    components: { VsButton },
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

const meta: Meta<typeof VsIndexView> = {
    title: 'Components/Layout Components/VsIndexView & VsIndexItem',
    component: VsIndexView,
    render: (args: any) => ({
        components: { VsIndexView, VsIndexItem, VsButton, VsDivider, CompA },
        setup() {
            const selectedIndex = ref(0);
            function updateModel(value: number) {
                // Manually update modelValue
                selectedIndex.value = value;
            }

            return { args, selectedIndex, updateModel };
        },
        template: `
			<div>
				<div>
					<vs-button dense :primary="selectedIndex === 0" @click="selectedIndex = 0"> Select A </vs-button>
					<vs-button dense :primary="selectedIndex === 1" @click="selectedIndex = 1"> Select B </vs-button>
				</div>
				<vs-divider/>
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

export const KeepAliveFalse: Story = {
    args: {
        keepAlive: false,
    },
};

export const WithTabs: Story = {
    render: (args: any) => ({
        components: { VsIndexView, VsIndexItem, CompA },
        setup() {
            const tabs = ['CompA', 'CompB'];

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
};

export const WithStepper: Story = {
    render: (args: any) => ({
        components: { VsIndexView, VsIndexItem },
        setup() {
            const steps = ['step1', 'step2', 'step3'];

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

export const Width: Story = {
    render: (args: any) => ({
        components: { VsIndexView, VsIndexItem, VsContainer },
        setup() {
            return { args };
        },
        template: `
			<vs-container row-gap="20px">
				<vs-index-view v-bind="args">
					<vs-index-item key="A"><h1> First Index View </h1>${LOREM_IPSUM}</vs-index-item>
				</vs-index-view>

				<vs-index-view v-bind="args">
					<vs-index-item key="A"><h1> Second Index View </h1>${LOREM_IPSUM}</vs-index-item>
				</vs-index-view>
			</vs-container>
        `,
    }),
    args: {
        width: { md: '100%', lg: '50%' },
    },
};

export const WidthWithTabs: Story = {
    render: (args: any) => ({
        components: { VsIndexView, VsIndexItem, VsContainer, VsWrapper, CompA },
        setup() {
            const tabAList = ['Tab A', 'Tab B'];
            const tabBList = ['Tab A', 'Tab B'];

            const tabA = ref(0);
            const tabB = ref(0);
            function updateTabA(value: number) {
                tabA.value = value;
            }
            function updateTabB(value: number) {
                tabB.value = value;
            }

            return { args, tabAList, tabBList, tabA, tabB, updateTabA, updateTabB };
        },
        template: `
			<vs-container row-gap="20px">
				<vs-wrapper :width="args.width" :grid="args.grid">
					<vs-tabs :tabs="tabAList" v-model="tabA" @update:modelValue="updateTabA" v-bind="args"/>
					<vs-index-view v-model="tabA" v-bind="args">
						<vs-index-item key="A"> <CompA /> </vs-index-item>
						<vs-index-item key="B"> This is the content of Component B </vs-index-item>
					</vs-index-view>
				</vs-wrapper>

				<vs-wrapper :width="args.width" :grid="args.grid">
					<vs-tabs :tabs="tabBList" v-model="tabB" @update:modelValue="updateTabB" v-bind="args"/>
					<vs-index-view v-model="tabB" v-bind="args">
						<vs-index-item key="A"> <CompA /> </vs-index-item>
						<vs-index-item key="B"> This is the content of Component B </vs-index-item>
					</vs-index-view>
				</vs-wrapper>
			</vs-container>
        `,
    }),
    args: {
        width: { md: '100%', lg: '50%' },
    },
};

export const Grid: Story = {
    render: (args: any) => ({
        components: { VsIndexView, VsIndexItem, VsContainer },
        setup() {
            return { args };
        },
        template: `
			<vs-container column-gap="40px">
				<vs-index-view v-bind="args">
					<vs-index-item key="A"><h1> First Index View </h1>${LOREM_IPSUM}</vs-index-item>
				</vs-index-view>

				<vs-index-view v-bind="args">
					<vs-index-item key="A"><h1> Second Index View </h1>${LOREM_IPSUM}</vs-index-item>
				</vs-index-view>
			</vs-container>
        `,
    }),
    args: {
        grid: { md: 6, lg: 3 },
    },
};

export const GridWithTabs: Story = {
    render: (args: any) => ({
        components: { VsIndexView, VsIndexItem, VsContainer, VsWrapper, CompA },
        setup() {
            const tabAList = ['Tab A', 'Tab B'];
            const tabBList = ['Tab A', 'Tab B'];

            const tabA = ref(0);
            const tabB = ref(0);
            function updateTabA(value: number) {
                tabA.value = value;
            }
            function updateTabB(value: number) {
                tabB.value = value;
            }

            return { args, tabAList, tabBList, tabA, tabB, updateTabA, updateTabB };
        },
        template: `
        <vs-container column-gap="40px">
			<vs-wrapper :width="args.width" :grid="args.grid">
				<vs-tabs :tabs="tabAList" v-model="tabA" @update:modelValue="updateTabA" v-bind="args"/>
				<vs-index-view v-model="tabA" v-bind="args">
					<vs-index-item key="A"> <CompA /> </vs-index-item>
					<vs-index-item key="B"> This is the content of Component B </vs-index-item>
				</vs-index-view>
			</vs-wrapper>

			<vs-wrapper :width="args.width" :grid="args.grid">
				<vs-tabs :tabs="tabBList" v-model="tabB" @update:modelValue="updateTabB" v-bind="args"/>
				<vs-index-view v-model="tabB" v-bind="args">
					<vs-index-item key="A"> <CompA /> </vs-index-item>
					<vs-index-item key="B"> This is the content of Component B </vs-index-item>
				</vs-index-view>
			</vs-wrapper>
		</vs-container>
        `,
    }),
    args: {
        grid: { md: 6, lg: 3 },
    },
};
