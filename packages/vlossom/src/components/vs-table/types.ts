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
    bodyBackgroundColor?: string;
    bodyBorder?: string;
    bodyFontColor?: string;
    bodyFontSize?: string;
    bodyFontWeight?: string;
    bodyMinHeight?: string;
    captionFontColor?: string;
    captionFontSize?: string;
    captionFontWeight?: string;
    captionSide?: string;
    captionTextAlign?: string;
    headerBackgroundColor?: string;
    headerBorder?: string;
    headerFontColor?: string;
    headerFontSize?: string;
    headerFontWeight?: string;
    headerMinHeight?: string;
    hoverBorder?: string;
    selectedBackgroundColor?: string;
    selectedFontColor?: string;
}
