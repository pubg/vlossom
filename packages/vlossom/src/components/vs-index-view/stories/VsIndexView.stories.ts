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
            const compKey = ref(0);
            function updateModel(value: number) {
                // Manually update modelValue and rerender the component
                args.modelValue = value;
                compKey.value++;
            }

            return { args, tabs, compKey, updateModel };
        },
        template: `
			<div :key="!args.keepAlive && compKey">  <!-- key is used to force re-render of the component (Only in Storybook) -->
				<vs-tabs :tabs="tabs" @update:modelValue="updateModel" v-bind="args"/>
				<vs-index-view v-bind="args" >
					<vs-index-item key="A"> <CompA /></vs-index-item>
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
