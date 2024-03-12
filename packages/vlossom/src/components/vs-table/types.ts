export interface TableHeader {
    label: string;
    key: string;
    searchable?: boolean;
    sortable?: boolean;
    width?: string;
    filter?: (value: any, item?: any) => any;
}

export interface TableRow {
    selectable?: (row: any, rowIndex?: number) => boolean;
    expandable?: (row: any, rowIndex?: number) => boolean;
}

export interface TableItem {
    id: string;
    data: { [key: string]: any };
}

export interface VsTableStyleSet {}
