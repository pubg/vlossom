import { ref } from 'vue';
import VsIndexView from './../VsIndexView.vue';
import VsIndexItem from './../VsIndexItem.vue';
import VsButton from '@/components/vs-button/VsButton.vue';
import VsDivider from '@/components/vs-divider/VsDivider.vue';
import { CompA } from './CompA';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsIndexView> = {
    title: 'Chromatic/Layout Components/VsIndexView & VsIndexItem',
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
};

export default meta;
type Story = StoryObj<typeof VsIndexView>;

export const Default: Story = {};
