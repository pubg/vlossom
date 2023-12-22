import type { Meta, StoryObj } from '@storybook/vue3';

import VsValueTag from '../VsValueTag.vue';
import { colorScheme } from '@/storybook/args';

const meta: Meta<typeof VsValueTag> = {
    title: 'Components/Base Components/VsValueTag',
    component: VsValueTag,
    render: (args: any) => ({
        components: { VsValueTag },
        setup() {
            return { args };
        },
        template:
            '<vs-value-tag v-bind="args"><template #label>label</template><template #value>value</template></vs-value-tag>',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsValueTag>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsValueTag },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-value-tag v-bind="args" color-scheme="red"><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag v-bind="args" color-scheme="amber"><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag v-bind="args" color-scheme="green"><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag v-bind="args" color-scheme="teal"><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag v-bind="args" color-scheme="blue"><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag v-bind="args" color-scheme="indigo"><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag v-bind="args" color-scheme="purple"><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag v-bind="args" color-scheme="pink"><template #label>label</template><template #value>value</template></vs-value-tag>
            </div>
        `,
    }),
};

export const Primary: Story = {
    render: (args: any) => ({
        components: { VsValueTag },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-value-tag v-bind="args" color-scheme="red" primary><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag v-bind="args" color-scheme="amber" primary><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag v-bind="args" color-scheme="green" primary><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag v-bind="args" color-scheme="teal" primary><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag v-bind="args" color-scheme="blue" primary><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag v-bind="args" color-scheme="indigo" primary><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag v-bind="args" color-scheme="purple" primary><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag v-bind="args" color-scheme="pink" primary><template #label>label</template><template #value>value</template></vs-value-tag>
            </div>
        `,
    }),
};

export const StyleSet: Story = {
    args: {
        styleSet: {
            backgroundColor: '#99b1ff',
            borderRadius: '0.3rem',
            color: '#392467',
            fontSize: '1.5rem',
            fontWeight: '500',
            padding: '0.18rem',
            labelWidth: '4rem',
            width: '20rem',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
