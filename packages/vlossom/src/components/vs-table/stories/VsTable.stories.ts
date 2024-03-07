import { chromaticParameters, colorScheme, align, placement, getColorSchemeTemplate } from '@/storybook';
import { PLACEMENTS, ALIGNS } from '@/declaration';
import VsTable from './../VsTable.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const items = [
    {
        id: 1,
        name: 'smithoo',
        order: 4,
        checked: true,
        created: '2011-10-02',
        desc: 'Lorem Ipsum has been the industry ',
    },
    {
        id: 2,
        name: 'gmldus',
        order: 1,
        checked: true,
        created: '2021-01-01',
        desc: 'has been the tscrambled it tscrambled it the industrys standard dummy text',
    },
    {
        id: 3,
        name: 'seaneez',
        order: 3,
        checked: false,
        created: '2021-07-15',
        desc: 'scrambled it to make a type specimen book',
    },
    {
        id: 4,
        name: 'yeriiiii',
        order: 2,
        checked: true,
        created: '2021-10-11',
        desc: 'pecimen book. It has survived not only five centuries, but also the leap into electronic',
    },
];

const meta: Meta<typeof VsTable> = {
    title: 'Components/Base Components/VsTable',
    component: VsTable,
    render: (args: any) => ({
        components: { VsTable },
        setup() {
            return { args };
        },
        template: `
            <vs-table v-bind="args"/>
        `,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
    args: {
        headers: [
            { label: 'ID', key: 'id', width: '10rem' },
            { label: 'Name', key: 'name', width: '10rem' },
            { label: 'Description', key: 'desc', width: '30rem' },
        ],
        items,
    },
};

export default meta;
type Story = StoryObj<typeof VsTable>;

export const Default: Story = {};
