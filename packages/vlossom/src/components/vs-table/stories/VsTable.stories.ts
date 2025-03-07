import { chromaticParameters, colorScheme, getColorSchemeTemplate } from '@/storybook';
import { Ref, ref } from 'vue';
import VsTable from './../VsTable.vue';
import { items } from './constants';
import { VsIcon } from '@/icons';

import type { Meta, StoryObj } from '@storybook/vue3';

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
            { label: 'Description', key: 'desc' },
            { label: 'Check', key: 'checked', width: '10rem' },
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
                    <vs-table v-bind="args" color-scheme="{{ color }}" :style="{ marginBottom: '20px' }"/>
                `)}
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Caption: Story = {
    render: (args: any) => ({
        components: { VsTable },
        setup() {
            return { args };
        },
        template: `
            <vs-table v-bind="args">
                <template #caption>
                    This is a table caption
                </template>
            </vs-table>
        `,
    }),
};

export const Dense: Story = {
    args: {
        dense: true,
    },
};

export const Selectable: Story = {
    render: (args: any) => ({
        components: { VsTable },
        setup() {
            const selected = ref([
                {
                    id: 1,
                    name: 'Apple',
                    order: 4,
                    checked: true,
                    created: '2022-10-02',
                    desc: 'Lorem Ipsum has been the industry ',
                    additionalText: 'Additial Text for Apple: This content only shows when expanded',
                },
                {
                    id: 2,
                    name: 'Banana',
                    order: 1,
                    checked: true,
                    created: '2024-01-01',
                    desc: 'has been the tscrambled it tscrambled it the industrys standard dummy text',
                    additionalText: 'Additial Text for Banana: This content only shows when expanded',
                },
            ]);
            return { args, selected };
        },
        template: `
            <vs-table v-bind="args" v-model:selected-items="selected" />
            <div style="height: 200px; margin-top: 1rem;">
                <h4>selected items :</h4>
                {{selected}}
            </div>
        `,
    }),
    args: {
        selectable: true,
    },
};

export const Search: Story = {
    args: {
        search: true,
    },
};

export const SearchText: Story = {
    render: (args: any) => ({
        components: { VsTable, VsIcon },
        setup() {
            const searchText = ref('');
            return { args, searchText };
        },
        template: `
            <div>
                <vs-input v-bind="args" v-model="searchText" placeholder="Search">
                    <template #prepend>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#FFFFFF" stroke="gray" stroke-width="30">
                            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                        </svg>
                    </template>
                </vs-input>
                <vs-table v-bind="args" :searchText="searchText">
                    <template #item-checked="{ value }">
                        <vs-switch v-model="value" no-message dense></vs-switch>
                    </template>
                </vs-table>
            </div>
        `,
    }),
    args: {
        headers: [
            { label: 'ID', key: 'id', width: '7rem' },
            { label: 'Name', key: 'name', width: '10rem' },
            { label: 'Description', key: 'desc' },
            { label: 'Check', key: 'checked', width: '10rem', searchable: false },
        ],
        items,
    },
};

export const Filter: Story = {
    render: (args: any) => ({
        components: { VsTable, VsIcon },
        setup() {
            const id: Ref<string | number> = ref('all');
            const checked = ref('false');
            const options = ['all', 1, 2, 3, 4];
            const filter = {
                id: (rowData: { [key: string]: any }): boolean => {
                    if (id.value === 'all') {
                        return true;
                    }
                    return id.value === rowData.id;
                },
                checked: (rowData: { [key: string]: any }): boolean => {
                    return checked.value === rowData.checked;
                },
            };
            return { args, id, checked, options, filter };
        },
        template: `
            <div>
                <vs-block v-bind="args" style="margin-bottom: 0.8rem">
                    <h3 style="margin-bottom: 0.5rem">Filter</h3>
                    <vs-select v-bind="args"  v-model="id" :options="options" label="id" no-clear style="margin-bottom: 0.5rem"/>
                    <vs-switch v-model="checked" label="checked" true-label="true" false-label="false" no-message/>
                </vs-block>
                <vs-table v-bind="args" :filter="filter"/>
            </div>
        `,
    }),
};

export const SortableHeader: Story = {
    args: {
        headers: [
            { label: 'ID', key: 'id', width: '8rem' },
            { label: 'Name', key: 'name', width: '12rem', sortable: true },
            { label: 'Order', key: 'order', width: '10rem', sortable: true },
            { label: 'Description', key: 'desc', width: '40rem' },
            { label: 'Created', key: 'created', width: '12rem', sortable: true },
        ],
    },
};

export const Draggable: Story = {
    args: {
        draggable: true,
    },
};

export const Pagination: Story = {
    args: {
        pagination: true,
        paginationOptions: [
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: 'All', value: -1 },
        ],
        pageEdgeButtons: true,
    },
};

export const Loading: Story = {
    args: {
        loading: true,
    },
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const NoData: Story = {
    args: {
        items: [],
    },
    parameters: {
        chromatic: chromaticParameters.theme,
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
                        <vs-text-wrap copy noTooltip width="26rem">{{ value }}</vs-text-wrap>
                    </template>
                    <template #item-checked="{ value }">
                        <vs-switch v-model="value" no-message dense></vs-switch>
                    </template>
                </vs-table>
            </div>
        `,
    }),
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
						<div>
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

export const ResponsiveFalse: Story = {
    args: {
        responsive: false,
    },
};

export const Primary: Story = {
    render: (args: any) => ({
        components: { VsTable },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-table color-scheme="{{ color }}" v-bind="args" :style="{ marginBottom: '20px' }"/>
                `)}
            </div>
        `,
    }),
    args: {
        primary: true,
    },
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const StyleSet: Story = {
    args: {
        pagination: true,
        selectable: true,
        styleSet: {
            backgroundColor: '#ffffff',
            border: '1px solid #dcD6f7',
            fontColor: '#0f4c75',
            fontSize: '1.4rem',
            rowHeight: '3rem',
            checkboxNode: {
                checkboxColor: '#0f4c75',
                borderRadius: '1rem',
                checkboxSize: '1.8rem',
            },
            pagination: {
                selectedButton: {
                    backgroundColor: '#0f4c75',
                },
            },
            caption: {
                side: 'top',
                fontWeight: 'bold',
                fontSize: '2rem',
                fontColor: '#0f4c75',
            },
            header: {
                backgroundColor: '#DEFCF9',
                border: '1px solid #DCD6F7',
                fontColor: '#0f4c75',
                fontSize: '1.4rem',
                fontWeight: '700',
                height: '3rem',
            },
            hoverBorder: '2px solid #DCD6F7',
            selectedBackgroundColor: '#DCD6F7',
            selectedFontColor: '#0f4c75',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
