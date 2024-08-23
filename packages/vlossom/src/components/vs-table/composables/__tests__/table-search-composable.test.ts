import { describe, expect, it } from 'vitest';
import { Ref, ref } from 'vue';
import { useTableSearch } from './../table-search-composable';
import { TableHeader, TableItem } from './../../types';

describe('useTableSearch', () => {
    describe('search targets', () => {
        it('기본적으로 모든 header의 key는 검색 가능한 대상이다', () => {
            // given
            const headers: Ref<TableHeader[]> = ref([
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Name' },
                { key: 'age', label: 'Age' },
                { key: 'shopping', label: 'Shopping' },
            ]);

            // when
            const { searchTargetKeys } = useTableSearch(headers, ref([]));

            // then
            expect(searchTargetKeys.value).toEqual(['id', 'name', 'age', 'shopping']);
        });

        it('searchable: false 설정으로 검색 대상에서 제외할 수 있다', () => {
            // given
            const headers: Ref<TableHeader[]> = ref([
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Name' },
                { key: 'age', label: 'Age', searchable: false },
                { key: 'shopping', label: 'Shopping', searchable: false },
            ]);

            // when
            const { searchTargetKeys } = useTableSearch(headers, ref([]));

            // then
            expect(searchTargetKeys.value).toEqual(['id', 'name']);
        });

        it('기본 header의 key값 외에도 검색 가능한 key를 추가할 수 있다', () => {
            // given
            const headers: Ref<TableHeader[]> = ref([
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Name' },
            ]);

            // when
            const { searchTargetKeys } = useTableSearch(headers, ref(['email', 'tel']));

            // then
            expect(searchTargetKeys.value).toEqual(['id', 'name', 'email', 'tel']);
        });

        it('path 형태의 key값을 설정할 수 있다', () => {
            // given
            const headers: Ref<TableHeader[]> = ref([
                { key: 'id', label: 'ID' },
                { key: 'shopping.item', label: 'Shopping Item' },
                { key: 'shopping.ingredients', label: 'Ingredients' },
                { key: 'shopping.ingredients.fat', label: 'Fat' },
            ]);

            // when
            const { searchTargetKeys } = useTableSearch(headers, ref([]));

            // then
            expect(searchTargetKeys.value).toEqual([
                'id',
                'shopping.item',
                'shopping.ingredients',
                'shopping.ingredients.fat',
            ]);
        });
    });

    describe('getSearchedTableItems', () => {
        const items: TableItem[] = [
            {
                id: 'item-1',
                data: {
                    name: 'John Doe',
                    shopping: {
                        date: '2021-09-01',
                        items: [
                            { item: 'Apple', price: 1.5, ingredients: { fat: '5%', sugar: '10%' } },
                            { item: 'Banana', price: 2.5, ingredients: { fat: '10%', sugar: '4%' } },
                        ],
                    },
                },
            },
            {
                id: 'item-2',
                data: {
                    name: 'Jane Doe',
                    shopping: {
                        date: '2021-09-02',
                        items: [
                            { item: 'Orange', price: 3.5, ingredients: { fat: '15%', sugar: '8%' } },
                            { item: 'Grapes', price: 4.5, ingredients: { fat: '20%', sugar: '12%' } },
                        ],
                    },
                },
            },
            {
                id: 'item-3',
                data: {
                    name: 'Alice',
                    shopping: {
                        date: '2021-09-03',
                        items: [
                            { item: 'Pineapple', price: 5.5, ingredients: { fat: '25%', sugar: '16%' } },
                            { item: 'Mango', price: 6.5, ingredients: { fat: '30%', sugar: '20%' } },
                        ],
                    },
                },
            },
            { id: 'item-4', data: { name: 'Bob', shopping: {} } },
        ];

        it('keyword가 빈 값이면 table items를 그대로 반환한다', () => {
            // given
            const headers: Ref<TableHeader[]> = ref([{ key: 'name', label: 'Name' }]);

            // when
            const { getSearchedTableItems } = useTableSearch(headers, ref([]));
            const result = getSearchedTableItems(items, ref(''));

            // then
            expect(result).toEqual(items);
        });

        it('keyword가 빈 스페이스로 이루어져 있으면 table items를 그대로 반환한다', () => {
            // given
            const headers: Ref<TableHeader[]> = ref([{ key: 'name', label: 'Name' }]);

            // when
            const { getSearchedTableItems } = useTableSearch(headers, ref([]));
            const result = getSearchedTableItems(items, ref('   '));

            // then
            expect(result).toEqual(items);
        });

        it('keyword가 data에 포함되어 있으면 해당 아이템을 반환한다', () => {
            // given
            const headers: Ref<TableHeader[]> = ref([{ key: 'name', label: 'Name' }]);

            // when
            const { getSearchedTableItems } = useTableSearch(headers, ref([]));
            const result = getSearchedTableItems(items, ref('Doe'));

            // then
            expect(result).length(2);
            expect(result).toEqual([items[0], items[1]]);
        });

        it('검색 가능하지 않은 key(searchable: false)의 값은 검색되지 않는다', () => {
            /// given
            const headers: Ref<TableHeader[]> = ref([{ key: 'name', label: 'Name', searchable: false }]);

            // when
            const { getSearchedTableItems } = useTableSearch(headers, ref([]));
            const result = getSearchedTableItems(items, ref('Doe'));

            // then
            expect(result).length(0);
            expect(result).toEqual([]);
        });

        it('header에 없더라도 searchableKeys로 추가된 data를 검색할 수 있다', () => {
            // given
            const headers: Ref<TableHeader[]> = ref([{ key: 'name', label: 'Name' }]);

            // when
            const { getSearchedTableItems } = useTableSearch(headers, ref(['shopping']));
            const result = getSearchedTableItems(items, ref('Banana'));

            // then
            expect(result).length(1);
            expect(result).toEqual([items[0]]);
        });

        it('keyword에 key 자체를 입력해도 검색되지는 않는다', () => {
            // given
            const headers: Ref<TableHeader[]> = ref([
                { key: 'name', label: 'Name' },
                { key: 'shopping', label: 'Shopping' },
            ]);

            // when
            const { getSearchedTableItems } = useTableSearch(headers, ref([]));
            const result = getSearchedTableItems(items, ref('shopping'));

            // then
            expect(result).length(0);
        });

        it('key가 path 형태일 때도 검색이 가능하다', () => {
            // given
            const headers: Ref<TableHeader[]> = ref([{ key: 'shopping.items', label: 'Shopping Item' }]);

            // when
            const { getSearchedTableItems } = useTableSearch(headers, ref([]));
            const result = getSearchedTableItems(items, ref('Banana'));

            // then
            expect(result).length(1);
            expect(result).toEqual([items[0]]);
        });

        it('key값으로 등록되지 않은 path의 경우엔 검색되지 않는다', () => {
            // given
            const headers: Ref<TableHeader[]> = ref([{ key: 'shopping.items', label: 'Shopping Item' }]);

            // when
            const { getSearchedTableItems } = useTableSearch(headers, ref([]));
            const result = getSearchedTableItems(items, ref('2021-09-01'));

            // then
            expect(result).length(0);
        });
    });
});
