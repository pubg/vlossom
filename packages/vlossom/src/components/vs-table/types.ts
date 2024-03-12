export interface TableHeader {
    label: string;
    key: string;
    searchable?: boolean;
    sortable?: boolean;
    width?: string;
    filter?: (value: any, item?: any) => any;
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

export interface VsTableStyleSet {}
