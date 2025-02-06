import { UIState, VsBoxStyleSet } from '@/declaration';
import type { VsCheckboxNodeStyleSet, VsPaginationStyleSet, VsSelectStyleSet } from '..';

export interface TableHeader {
    label: string;
    key: string;
    searchable?: boolean;
    sortable?: boolean;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
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

export enum SortType {
    NONE,
    ASCEND,
    DESCEND,
}

export interface VsTableCaptionStyleSet extends VsBoxStyleSet {
    side?: string;
    textAlign?: string;
}

export interface VsTableHeaderStyleSet extends VsBoxStyleSet {
    border?: string;
    height?: string;
}

export interface VsTableStyleSet {
    backgroundColor?: string;
    border?: string;
    caption?: VsTableCaptionStyleSet;
    checkboxNode?: VsCheckboxNodeStyleSet;
    fontColor?: string;
    fontSize?: string;
    fontWeight?: string | number;
    hoverBorder?: string;
    pagination?: VsPaginationStyleSet;
    paginationSelect?: VsSelectStyleSet;
    tableHeader?: VsTableHeaderStyleSet;
    rowHeight?: string;
    selectedBackgroundColor?: string;
    selectedFontColor?: string;
}
