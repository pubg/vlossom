import VsValueTag from '../VsValueTag.vue';
import { colorScheme } from '@/storybook/args';
import { chromaticParameters } from '@/storybook/parameters';

import type { Meta, StoryObj } from '@storybook/vue3';

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
                <vs-value-tag color-scheme="red"><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag color-scheme="amber"><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag color-scheme="green"><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag color-scheme="teal"><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag color-scheme="blue"><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag color-scheme="indigo"><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag color-scheme="purple"><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag color-scheme="pink"><template #label>label</template><template #value>value</template></vs-value-tag>
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Primary: Story = {
    render: (args: any) => ({
        components: { VsValueTag },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-value-tag color-scheme="red" primary><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag color-scheme="amber" primary><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag color-scheme="green" primary><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag color-scheme="teal" primary><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag color-scheme="blue" primary><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag color-scheme="indigo" primary><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag color-scheme="purple" primary><template #label>label</template><template #value>value</template></vs-value-tag>
                <vs-value-tag color-scheme="pink" primary><template #label>label</template><template #value>value</template></vs-value-tag>
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: {
            backgroundColor: '#99b1ff',
            borderRadius: '0.3rem',
            color: '#392467',
            fontSize: '1.5rem',
            fontWeight: '550',
            padding: '0.18rem',
            labelWidth: '4rem',
            lineHeight: '3rem',
            width: '20rem',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
