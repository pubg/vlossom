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
            function updateModel(value: number) {
                // Manually update modelValue
                args.modelValue = value;
            }

            return { args, tabs, updateModel };
        },
        template: `
			<div>
				<vs-tabs :tabs="tabs" @update:modelValue="updateModel" v-bind="args"/>
				<vs-index-view v-bind="args" >
					<vs-index-item> <CompA /></vs-index-item>
					<vs-index-item> This is the content of Component B </vs-index-item>
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
