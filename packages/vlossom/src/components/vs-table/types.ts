import { UIState } from '@/declaration';

export interface TableHeader {
    label: string;
    key: string;
    searchable?: boolean;
    sortable?: boolean;
    width?: string;
    filter?: (value: any, item?: any) => any;
}

export interface TableRow<T = any> {
    state?: (row: any, rowIndex?: number) => UIState;
    selectable?: (row: T, rowIndex?: number) => boolean;
    expandable?: (row: T, rowIndex?: number) => boolean;
}

export interface TableItem {
    id: string;
    data: { [key: string]: any };
}

export type TableFilter = { [key: string]: (rowData: { [key: string]: any }) => boolean };

export enum SortType {
    NONE,
    ASCEND,
    DESCEND,
}

export interface VsTableStyleSet {
    //[TODO] add style set
}
