import { colorScheme, LOREM_IPSUM } from '@/storybook';
import VsLabelValue from './../VsLabelValue.vue';
import VsButton from '@/components/vs-button/VsButton.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsLabelValue> = {
    title: 'Chromatic/Base Components/VsLabelValue',
    component: VsLabelValue,
    render: (args: any) => ({
        components: { VsLabelValue, VsButton },
        setup() {
            return { args };
        },
        template: `
            <div style="display:flex; flex-direction:column;">
                <vs-label-value v-bind="args" verticalAlign="start"><template #label>label</template><template #value>${LOREM_IPSUM}</template></vs-label-value>

                <vs-label-value v-bind="args" verticalAlign="align"><template #label>label</template><template #value>${LOREM_IPSUM}</template></vs-label-value>

                <vs-label-value v-bind="args" verticalAlign="end"><template #label>label</template><template #value>${LOREM_IPSUM}</template></vs-label-value>

                <vs-label-value v-bind="args" primary><template #label>label</template><template #value>${LOREM_IPSUM}</template></vs-label-value>

                <vs-label-value v-bind="args">
                    <template #label>label</template>
                    <template #value>${LOREM_IPSUM}</template>
                    <template #actions><vs-button dense primary>action</vs-button></template>
                </vs-label-value>
            </div>`,
    }),
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsLabelValue>;

export const Default: Story = {};
