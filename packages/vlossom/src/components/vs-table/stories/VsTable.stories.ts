import { chromaticParameters, colorScheme, getColorSchemeTemplate } from '@/storybook';
import { ref } from 'vue';
import VsTable from './../VsTable.vue';
import { VsIcon } from '@/icons';

import type { Meta, StoryObj } from '@storybook/vue3';

const items = [
    {
        id: 1,
        name: 'Apple',
        order: 4,
        checked: true,
        created: '2011-10-02',
        desc: 'Lorem Ipsum has been the industry ',
        additionalText: 'Additial Text for Apple: This content only shows when expanded',
    },
    {
        id: 2,
        name: 'Banana',
        order: 1,
        checked: true,
        created: '2021-01-01',
        desc: 'has been the tscrambled it tscrambled it the industrys standard dummy text',
        additionalText: 'Additial Text for Banana: This content only shows when expanded',
    },
    {
        id: 3,
        name: 'Carrot',
        order: 3,
        checked: false,
        created: '2021-07-15',
        desc: 'scrambled it to make a type specimen book',
        additionalText: 'Additial Text for Carrot: This content only shows when expanded',
    },
    {
        id: 4,
        name: 'Durian',
        order: 2,
        checked: false,
        created: '2021-10-11',
        desc: 'pecimen book. It has survived not only five centuries, but also the leap into electronic',
        additionalText: 'Additial Text for Durian: This content only shows when expanded',
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
            { label: 'ID', key: 'id', width: '7rem' },
            { label: 'Name', key: 'name', width: '10rem' },
            { label: 'Description', key: 'desc', width: '26rem' },
            { label: 'Check', key: 'checked', width: '7rem' },
        ],
        items,
    },
};

export default meta;
type Story = StoryObj<typeof VsTable>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsTable },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-table v-bind="args" color-scheme="{{ color }}" />
                `)}
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Dense: Story = {
    args: {
        dense: true,
    },
};

export const Search: Story = {
    render: (args: any) => ({
        components: { VsTable, VsIcon },
        setup() {
            const search = ref('');
            return { args, search };
        },
        template: `
            <div>
                <vs-input v-model="search" placeholder="Search" style="padding: 0.5rem">
                    <template #prepend-content>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" style="margin-left: 0.5rem">
                            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                        </svg>
                    </template>
                </vs-input>
                <vs-table v-bind="args" :search="search">
                    <template #item-checked="{ value }">
                        <vs-switch v-model="value"></vs-switch>
                    </template>
                </vs-table>
            </div>
        `,
    }),
    args: {
        headers: [
            { label: 'ID', key: 'id', width: '7rem' },
            { label: 'Name', key: 'name', width: '10rem' },
            { label: 'Description', key: 'desc', width: '26rem' },
            { label: 'Check', key: 'checked', width: '7rem', searchable: false },
        ],
        items,
    },
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Draggable: Story = {
    args: {
        draggable: true,
    },
};

export const Loading: Story = {
    args: {
        loading: true,
    },
};

export const NoData: Story = {
    args: {
        items: [],
    },
};

export const HeaderSlot: Story = {
    render: (args: any) => ({
        components: { VsTable, VsIcon },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-table v-bind="args">
                    <template #header-desc="{ header }">
                        {{ header.label }}
                        <vs-tooltip style="margin-left: 0.5rem">
                            <vs-icon icon="info" size="25px"/>
                            <template #tooltip>this is {{ header.label.toLowerCase() }}</template>
                        </vs-tooltip>
                    </template>
                    <template #header-checked="{ header }">
                        Liked
                    </template> 
                </vs-table>
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const ItemSlot: Story = {
    render: (args: any) => ({
        components: { VsTable },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-table v-bind="args">
                    <template #item-desc="{ value }">
                        <vs-text-wrap copy noTooltip width="18rem">{{ value }}</vs-text-wrap>
                    </template>
                    <template #item-checked="{ value }">
                        <vs-switch v-model="value"></vs-switch>
                    </template>
                </vs-table>
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Expandable: Story = {
    render: (args: any) => ({
        components: { VsTable },
        setup() {
            return { args };
        },
        template: `
			<div>
				<vs-table v-bind="args">
					<template #expand="{ item }">
						<div style="padding: 1rem">
							{{ item.additionalText }}
						</div>
					</template>
				</vs-table>
			</div>
		`,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};
