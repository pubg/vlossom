import { UIState } from '@/declaration';

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

export interface TableParams {
    page: number;
    itemsPerPage: number;
    sortTypes: { [key: string]: SortType };
    searchText: string;
}

export interface TableRow<T = any> {
    state?: (row: any, rowIndex?: number) => UIState;
    selectable?: (row: T, rowIndex?: number) => boolean;
    expandable?: (row: T, rowIndex?: number) => boolean;
}

export type TableFilter = { [key: string]: (rowData: { [key: string]: any }) => boolean };

export const SortType = {
    NONE: 0,
    ASCEND: 1,
    DESCEND: 2,
} as const;

export type SortType = (typeof SortType)[keyof typeof SortType];

export interface VsTableStyleSet {
    backgroundColor?: string;
    border?: string;
    captionFontColor?: string;
    captionFontSize?: string;
    captionFontWeight?: string | number;
    captionPadding?: string;
    captionSide?: string;
    captionTextAlign?: string;
    fontColor?: string;
    fontSize?: string;
    fontWeight?: string | number;
    headerBackgroundColor?: string;
    headerBorder?: string;
    headerFontColor?: string;
    headerFontSize?: string;
    headerFontWeight?: string | number;
    headerHeight?: string;
    hoverBorder?: string;
    rowHeight?: string;
    selectedBackgroundColor?: string;
    selectedFontColor?: string;
}
