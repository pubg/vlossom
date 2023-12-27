import type { Meta, StoryObj } from '@storybook/vue3';

import VsLabelValue from '../VsLabelValue.vue';
import { colorScheme } from '@/storybook/args';

const value = `Lorem ipsum dolor sit amet consectetur adipisicing elit.
Possimus, voluptatem cum? Atque facilis mollitia distinctio
perferendis sed voluptates omnis sit maxime ad! Porro incidunt
voluptatem quaerat sint itaque, blanditiis excepturi!`;

const meta: Meta<typeof VsLabelValue> = {
    title: 'Components/Base Components/VsLabelValue',
    component: VsLabelValue,
    render: (args: any) => ({
        components: { VsLabelValue },
        setup() {
            return { args };
        },
        template: `<vs-label-value v-bind="args"><template #label>label</template><template #value>${value}</template></vs-label-value>`,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsLabelValue>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsLabelValue },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-label-value color-scheme="red"><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="amber"><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="green"><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="teal"><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="blue"><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="indigo"><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="purple"><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="pink"><template #label>label</template><template #value>${value}</template></vs-label-value>
            </div>
        `,
    }),
};

export const Primary: Story = {
    render: (args: any) => ({
        components: { VsLabelValue },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-label-value color-scheme="red" primary><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="amber" primary><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="green" primary><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="teal" primary><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="blue" primary><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="indigo" primary><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="purple" primary><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="pink" primary><template #label>label</template><template #value>${value}</template></vs-label-value>
            </div>
        `,
    }),
};

// export const StyleSet: Story = {
//     args: {
//         styleSet: {
//             backgroundColor: '#99b1ff',
//             borderRadius: '0.3rem',
//             color: '#392467',
//             fontSize: '1.5rem',
//             fontWeight: '550',
//             padding: '0.18rem',
//             labelWidth: '4rem',
//             lineHeight: '3rem',
//             width: '20rem',
//         },
//     },
// };

// export const PreDefinedStyleSet: Story = {
//     args: {
//         styleSet: 'myStyleSet',
//     },
// };
