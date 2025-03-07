import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsTable from './../VsTable.vue';
import { TableHeader, TableParams } from './../types';
import { nextTick } from 'vue';

const headers: TableHeader[] = [
    { label: 'ID', key: 'id', width: '7rem' },
    { label: 'Name', key: 'name', width: '10rem', sortable: true },
    { label: 'Description', key: 'desc', searchable: false },
];

const items: { [key: string]: any }[] = [
    {
        id: 1,
        name: 'Apple',
        desc: 'apple',
        additionalText: 'Additional Text for Apple',
    },
    {
        id: 2,
        name: 'Banana',
        desc: 'banana',
        additionalText: 'Additional Text for Banana',
    },
    {
        id: 3,
        name: 'Carrot',
        desc: 'carrot',
        additionalText: 'Additional Text for Carrot',
    },
    {
        id: 4,
        name: 'Durian',
        desc: 'Apples tastes better than durians',
        additionalText: 'Additional Text for Durian',
    },
];

describe('VsTable', () => {
    describe('headers / items', () => {
        it('headers와 items 배열을 props로 할당하면 적절하게 table을 렌더할 수 있다', async () => {
            // given
            const wrapper = mount(VsTable, {
                props: {
                    headers,
                    items,
                },
            });

            // then
            // Check if table headers are rendered properly
            const thElements = wrapper.findAll('.vs-table-thead th');
            expect(thElements.length).toBe(headers.length);
            thElements.forEach((th, index) => {
                const headerLabel = headers[index].label;
                expect(th.text()).toBe(headerLabel);
            });

            // Check if table rows are rendered properly
            const tdElements = wrapper.findAll('tbody td');
            expect(tdElements.length).toBe(headers.length * items.length);
            tdElements.forEach((td, index) => {
                const itemData: string =
                    items[Math.floor(index / headers.length)][headers[index % headers.length].key].toString();
                expect(td.text()).toBe(itemData);
            });
        });

        it('path 형태의 header key를 설정해서 item을 만들 수 있다', () => {
            // given
            const pathHeaders: TableHeader[] = [{ label: 'Test', key: 'test.a.b', width: '7rem' }];

            const pathItems: { [key: string]: any }[] = [
                {
                    test: {
                        a: {
                            b: 'value',
                        },
                    },
                },
            ];

            // when
            const wrapper = mount(VsTable, {
                props: {
                    headers: pathHeaders,
                    items: pathItems,
                },
            });

            // then
            const tdElements = wrapper.findAll('tbody td');
            expect(tdElements[0].text()).toBe('value');
        });
    });

    describe('caption', () => {
        it('table의 caption 영역을 설정할 수 있다', async () => {
            // given
            const wrapper = mount(VsTable, {
                props: {
                    headers,
                    items,
                },
                slots: {
                    caption: 'CAPTION',
                },
            });

            // then
            const caption = wrapper.find('table caption');
            expect(caption.text()).toBe('CAPTION');
        });
    });

    describe('selectable', () => {
        // it('select-all checkbox의 값이 true가 되면, 모든 item들이 선택된다', async () => {
        //     // given
        //     const wrapper = mount(VsTable, {
        //         props: {
        //             headers,
        //             items,
        //             selectable: true,
        //             selectedItems: [],
        //             'onUpdate:selectedItems': (e) => wrapper.setProps({ selectedItems: e }),
        //         },
        //     });

        //     // when
        //     const selectAllCheckBox = wrapper.find('.vs-select-all').find('input');
        //     await selectAllCheckBox.trigger('click');
        //     await nextTick();

        //     // then
        //     const updateModelValueEvent = wrapper.emitted('update:selectedItems');
        //     expect(updateModelValueEvent?.[2][0]).toEqual(items);
        // });

        it('selectedItems가 items와 같을 때, select-all checkbox의 값이 true가 된다', async () => {
            // given
            const wrapper = mount(VsTable, {
                props: {
                    headers,
                    items,
                    selectable: true,
                    selectedItems: [],
                },
            });

            // when
            await wrapper.setProps({ selectedItems: [...items] });
            await nextTick();

            // then
            const selectAllCheckBox = wrapper.find('.vs-select-all').find('input');
            expect(selectAllCheckBox.element.checked).toBe(true);
        });

        // it('특정 item의 checkbox 값을 업데이트하면 selectedItems에 해당 item이 추가된다', async () => {
        //     // given
        //     const wrapper = mount(VsTable, {
        //         props: {
        //             headers,
        //             items,
        //             selectable: true,
        //             selectedItems: [],
        //             'onUpdate:selectedItems': (e) => wrapper.setProps({ selectedItems: e }),
        //         },
        //     });

        //     // when
        //     const firstItemCheckbox = wrapper.findComponent({ name: 'VsTableBodyRow' }).find('input[type="checkbox"]');
        //     await firstItemCheckbox.trigger('click');
        //     await nextTick();

        //     // then
        //     const updateModelValueEvent = wrapper.emitted('update:selectedItems');
        //     expect(updateModelValueEvent?.[2][0]).toEqual([items[0]]);
        // });
    });

    describe('search', () => {
        it('search 영역이 있고, 값이 업데이트 되면 table item들을 검색할 수 있다', async () => {
            // given
            const wrapper = mount(VsTable, {
                props: {
                    headers,
                    items,
                    search: true,
                },
            });

            // when
            await nextTick();
            const input = wrapper.find('.vs-search input');
            (input.element as any).value = 'apple';
            await input.trigger('input');
            await nextTick();

            // then
            expect(wrapper.find('.vs-search').exists()).toBe(true);
            const visibleRows = wrapper.findAll('tbody tr').filter((node) => node.isVisible());
            expect(visibleRows).toHaveLength(1);
            const containsApple = visibleRows.some((row) => row.text().includes('Apple'));
            const containsDurian = visibleRows.some((row) => row.text().includes('Durian'));
            expect(containsApple).toBe(true);
            expect(containsDurian).toBe(false);
        });
    });

    describe('search text', () => {
        it('searchText props를 통해 입력된 키워드로 table item들을 검색할 수 있다 (단, searchable:false인 key는 검색 대상에서 제외된다)', async () => {
            // given
            const wrapper = mount(VsTable, {
                props: {
                    headers,
                    items,
                    searchText: '',
                },
            });

            // when
            await wrapper.setProps({ searchText: 'apple' });
            await nextTick();

            // then
            const visibleRows = wrapper.findAll('tbody tr').filter((node) => node.isVisible());
            expect(visibleRows).toHaveLength(1);
            const containsApple = visibleRows.some((row) => row.text().includes('Apple'));
            const containsDurian = visibleRows.some((row) => row.text().includes('Durian'));
            expect(containsApple).toBe(true);
            expect(containsDurian).toBe(false);
        });
    });

    describe('filter', () => {
        it('filter props를 통해서 filter를 통과한 table item들만 렌더시킬 수 있다', async () => {
            // given
            const filter = {
                id: (rowData: { [key: string]: any }): boolean => {
                    return rowData.id < 2;
                },
            };
            const wrapper = mount(VsTable, {
                props: {
                    headers,
                    items,
                    filter,
                },
            });

            // then
            const visibleRows = wrapper.findAll('tbody tr').filter((node) => node.isVisible());
            const expectedVisible = ['Apple'];
            const expectedNotVisible = ['Banana', 'Carrot', 'Durian'];

            expectedVisible.forEach((item) => {
                const isVisible = visibleRows.some((row) => row.text().includes(item));
                expect(isVisible).toBe(true);
            });
            expectedNotVisible.forEach((item) => {
                const isVisible = visibleRows.some((row) => row.text().includes(item));
                expect(isVisible).toBe(false);
            });
        });
    });

    describe('sortable', () => {
        it('sortable:true인 header를 한 번 클릭하면 ascending order로 item들을 정렬할 수 있다', async () => {
            // given
            const wrapper = mount(VsTable, {
                props: { headers, items },
            });

            // when
            const nameHeader = wrapper
                .findAll('th')
                .filter((th) => th.text().includes('Name'))
                .at(0);
            await nameHeader?.trigger('click');
            await nextTick();

            // then
            const rows = wrapper.findAll('tbody tr');
            const sortedItems = ['Apple', 'Banana', 'Carrot', 'Durian'];
            rows.forEach((row, index) => {
                expect(row.find('td:nth-child(2)').text()).toBe(sortedItems[index]);
            });
        });

        it('sortable:true인 header를 두 번 클릭하면 descending order로 item들을 정렬할 수 있다', async () => {
            // given
            const wrapper = mount(VsTable, {
                props: { headers, items },
            });

            // when
            const nameHeader = wrapper
                .findAll('th')
                .filter((th) => th.text().includes('Name'))
                .at(0);
            await nameHeader?.trigger('click');
            await nextTick();
            await nameHeader?.trigger('click');
            await nextTick();

            // then
            const rows = wrapper.findAll('tbody tr');
            const sortedItems = ['Durian', 'Carrot', 'Banana', 'Apple'];
            rows.forEach((row, index) => {
                expect(row.find('td:nth-child(2)').text()).toBe(sortedItems[index]);
            });
        });
    });

    describe('pagination', () => {
        it('pagination:true 일 때, pagination과 pagination-options select가 렌더된다', () => {
            // given
            const wrapper = mount(VsTable, {
                props: {
                    headers,
                    items,
                    pagination: true,
                },
            });

            // then
            const paginationWrapper = wrapper.find('.vs-table-pagination .vs-pagination');
            const selectWrapper = wrapper.find('.vs-table-pagination-options');
            expect(paginationWrapper.exists()).toBe(true);
            expect(selectWrapper.exists()).toBe(true);
        });

        it('pagination options을 이용해서 page size를 변경할 수 있다', async () => {
            // given
            const wrapper = mount(VsTable, {
                props: {
                    headers,
                    items,
                    pagination: true,
                    paginationOptions: [
                        { label: '2', value: 2 },
                        { label: '3', value: 3 },
                        { label: '4', value: 4 },
                        { label: 'All', value: -1 },
                    ],
                },
            });

            // when
            const pageSizeSelect = wrapper.findComponent({ name: 'VsSelect' });
            await pageSizeSelect.vm.$emit('update:modelValue', 3);
            await nextTick();

            // then
            const displayedItems = wrapper.findAll('.vs-table-td[data-label="Name"]');
            expect(displayedItems).toHaveLength(3);
        });
    });

    describe('header slot', () => {
        it('header slot을 통해 table header를 커스터마이징 할 수 있다', () => {
            // given
            const wrapper = mount(VsTable, {
                props: { headers, items },
                slots: {
                    'header-id': '<template #header-id="{ header }">Custom ID Header</template>',
                },
            });

            // then
            const customIdHeader = wrapper
                .findAll('.vs-table-th')
                .filter((th) => th.text().includes('Custom ID Header'))[0];
            expect(customIdHeader.exists()).toBe(true);
        });
    });

    describe('item slot', () => {
        it('item slot을 통해 table body의 각 row를 커스터마이징 할 수 있다', () => {
            // given
            const wrapper = mount(VsTable, {
                props: { headers, items },
                slots: {
                    'item-name': '<template #item-name="{ value }">{{ value.toUpperCase() }}</template>',
                },
            });

            // then
            const nameCells = wrapper.findAll('.table-td').filter((td) => td.attributes()['data-label'] === 'Name');
            nameCells.forEach((cell, index) => {
                expect(cell.text()).toBe(items[index].name.toUpperCase());
            });
        });
    });

    describe('expandable', () => {
        it('table expand slot 안에 데이터를 넣을 수 있으며, expand 버튼을 클릭 시 해당 데이터가 화면에 렌더된다', async () => {
            // given
            const wrapper = mount(VsTable, {
                props: { headers, items },
                slots: {
                    expand: '<template #expand="{ item }">{{ item.additionalText }}</template>',
                },
            });

            // when
            const expandButton = wrapper.findAll('tr .vs-table-expandable-td button').at(0);
            await expandButton?.trigger('click');

            // then
            const expandedContent = wrapper.findAll('tr .vs-table-expanded-row-content').at(0);
            expect(expandedContent?.isVisible()).toBe(true);
            expect(expandedContent?.text()).toContain('Additional Text for Apple');
        });
    });

    describe('table params', () => {
        it('page 변경 시 update event가 emit된다', async () => {
            // given
            const wrapper = mount(VsTable, {
                props: {
                    headers,
                    items,
                    paginationOptions: [{ label: '2', value: 2 }],
                },
            });

            // when
            await wrapper.setProps({ page: 2 });
            await nextTick();

            // then
            const updateParamsEvent: TableParams[][] | undefined = wrapper.emitted('update');
            expect(updateParamsEvent).toBeTruthy();
            expect(updateParamsEvent?.[1]?.[0]).toHaveProperty('page', 2);
        });

        it('itemsPerPage 변경 시 update event가 emit된다', async () => {
            // given
            const wrapper = mount(VsTable, {
                props: {
                    headers,
                    items,
                    paginationOptions: [
                        { label: '2', value: 2 },
                        { label: '3', value: 3 },
                    ],
                },
            });

            // when
            await wrapper.setProps({ itemsPerPage: 3 });
            await nextTick();

            // then
            const updateParamsEvent: TableParams[][] | undefined = wrapper.emitted('update');
            expect(updateParamsEvent).toBeTruthy();
            expect(updateParamsEvent?.[1]?.[0]).toHaveProperty('itemsPerPage', 3);
        });

        it('searchText 변경 시 update event가 emit된다', async () => {
            // given
            const wrapper = mount(VsTable, {
                props: {
                    headers,
                    items,
                },
            });

            // when
            await wrapper.setProps({ searchText: 'text' });
            await nextTick();

            // then
            const updateParamsEvent: TableParams[][] | undefined = wrapper.emitted('update');
            expect(updateParamsEvent).toBeTruthy();
            expect(updateParamsEvent?.[1]?.[0]).toHaveProperty('searchText', 'text');
        });

        it('sort type 변경 시 update event가 emit된다', async () => {
            // given
            const wrapper = mount(VsTable, {
                props: {
                    headers,
                    items,
                },
            });

            // when
            const nameHeader = wrapper
                .findAll('th')
                .filter((th) => th.text().includes('Name'))
                .at(0);
            await nameHeader?.trigger('click');
            await nextTick();

            // then
            const updateParamsEvent: TableParams[][] | undefined = wrapper.emitted('update');
            expect(updateParamsEvent).toBeTruthy();
            expect(updateParamsEvent?.[1]?.[0]?.['sortTypes']).toHaveProperty('name', 1);
        });
    });
});
