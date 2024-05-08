import { colorScheme } from '@/storybook';
import { Ref, ref } from 'vue';
import VsTable from './../VsTable.vue';
import { items } from './constants';
import { VsIcon } from '@/icons';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsTable> = {
    title: 'Chromatic/Base Components/VsTable',
    component: VsTable,
    render: (args: any) => ({
        components: { VsTable, VsIcon },
        setup() {
            const selected = items.slice(0, 2);

            const search = ref('');

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

            const paginationOptions = [
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: '4', value: 4 },
                { label: 'All', value: -1 },
            ];
            return { args, selected, search, id, checked, options, filter, paginationOptions };
        },
        template: `
            <div>
                <vs-table v-bind="args" :style="{ marginBottom: '50px' }"/>

                <vs-table v-bind="args" caption="Fruit Shopping List" :style="{ marginBottom: '50px' }"/>
            
                <vs-table v-bind="args" dense :style="{ marginBottom: '50px' }"/>

                <div :style="{ marginBottom: '0px' }">
                    <vs-table v-bind="args" selectable v-model:selected-items="selected" :style="{ marginBottom: '50px' }" />
                    <div style="margin-top: 1rem;">
                        <h4>selected items :</h4>
                        {{selected}}
                    </div>
                </div>

                <div :style="{ marginBottom: '50px' }">
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

                <div :style="{ marginBottom: '50px' }">
                    <vs-block style="margin-bottom: 0.8rem">
                        <h3 style="margin-bottom: 0.5rem">Filter</h3>
                        <vs-select v-model="id" :options="options" label="id" no-clear style="margin-bottom: 0.5rem"/>
                        <vs-switch v-model="checked" label="checked" true-label="true" false-label="false"/>
                    </vs-block>
                    <vs-table v-bind="args" :filter="filter"/>
                </div>

                <vs-table v-bind="args" draggable :style="{ marginBottom: '50px' }"/>
                 
                <vs-table v-bind="args" pagination pageEdgeButtons :paginationOptions="paginationOptions" :style="{ marginBottom: '50px' }"/>

                <vs-table v-bind="args" loading :style="{ marginBottom: '50px' }"/>

                <vs-table v-bind="args" :items="[]" :style="{ marginBottom: '50px' }"/>

                <div  :style="{ marginBottom: '50px' }">
                    <vs-table v-bind="args">
                        <template #item-desc="{ value }">
                            <vs-text-wrap copy noTooltip width="18rem">{{ value }}</vs-text-wrap>
                        </template>
                	    <template #item-checked="{ value }">
                	        <vs-switch v-model="value"></vs-switch>
                        </template>
                    </vs-table>
                </div>

                <div  :style="{ marginBottom: '50px' }">
                    <vs-table v-bind="args">
                	    <template #item-desc="{ value }">
                		    <vs-text-wrap copy noTooltip width="18rem">{{ value }}</vs-text-wrap>
                	    </template>
                	    <template #item-checked="{ value }">
                		    <vs-switch v-model="value"></vs-switch>
                	    </template>
                    </vs-table>
                </div>

                <div>
                    <vs-table v-bind="args">
                        <template #expand="{ item }">
                            <div style="padding: 1rem">
                                {{ item.additionalText }}
                            </div>
                        </template>
                    </vs-table>
                </div>
            </div>
        `,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
    args: {
        headers: [
            { label: 'ID', key: 'id', width: '5rem' },
            { label: 'Name', key: 'name', width: '8rem', sortable: true },
            { label: 'Order', key: 'order', width: '8rem', sortable: true },
            { label: 'Description', key: 'desc' },
            { label: 'Created', key: 'created', width: '12rem', sortable: true },
            { label: 'Check', key: 'checked', width: '7rem', searchable: false },
        ],
        items,
    },
};

export default meta;
type Story = StoryObj<typeof VsTable>;

export const Default: Story = {};
