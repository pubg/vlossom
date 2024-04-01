import { LabelValue } from '@/declaration';

export const DEFAULT_TABLE_ITEMS_PER_PAGE = 50;

export const DEFAULT_TABLE_PAGE_COUNT: LabelValue<number>[] = [
    { label: '50 items', value: 50 },
    { label: '100 items', value: 100 },
    { label: 'all items', value: -1 },
];
