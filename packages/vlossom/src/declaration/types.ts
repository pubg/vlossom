import { COLORS, PLACEMENTS, ALIGNS, CSS_POSITION, SIZES } from './constants';

import type { Component, Ref } from 'vue';
import type {
    VsAccordionStyleSet,
    VsAvatarStyleSet,
    VsBlockStyleSet,
    VsButtonStyleSet,
    VsCheckboxNodeStyleSet,
    VsCheckboxStyleSet,
    VsCheckboxSetStyleSet,
    VsChipStyleSet,
    VsConfirmStyleSet,
    VsDividerStyleSet,
    VsDrawerStyleSet,
    VsFileInputStyleSet,
    VsFooterStyleSet,
    VsHeaderStyleSet,
    VsImageStyleSet,
    VsInputStyleSet,
    VsLabelValueStyleSet,
    VsLoadingStyleSet,
    VsMenuButtonStyleSet,
    VsModalNodeStyleSet,
    VsNoticeStyleSet,
    VsPageStyleSet,
    VsPaginationStyleSet,
    VsProgressStyleSet,
    VsRadioNodeStyleSet,
    VsRadioStyleSet,
    VsRadioSetStyleSet,
    VsSectionStyleSet,
    VsSelectStyleSet,
    VsStepperStyleSet,
    VsSwitchStyleSet,
    VsTableStyleSet,
    VsTabsStyleSet,
    VsTextareaStyleSet,
    VsTextWrapStyleSet,
    VsThemeButtonStyleSet,
    VsTooltipStyleSet,
} from '@/components';
import type { VsComponent } from './enums';

export type ColorScheme = (typeof COLORS)[number];

export type GlobalColorScheme = { default?: ColorScheme } & { [key in VsComponent]?: ColorScheme } & {
    [key: string]: ColorScheme;
};

export interface VsBoxStyleSet {
    backgroundColor?: string;
    fontColor?: string;
    fontSize?: string;
    fontWeight?: string | number;
    padding?: string;
}

export interface VsComponentStyleSet {
    VsAccordion?: { [key: string]: VsAccordionStyleSet };
    VsAvatar?: { [key: string]: VsAvatarStyleSet };
    VsBlock?: { [key: string]: VsBlockStyleSet };
    VsButton?: { [key: string]: VsButtonStyleSet };
    VsCheckbox?: { [key: string]: VsCheckboxStyleSet };
    VsCheckboxNode?: { [key: string]: VsCheckboxNodeStyleSet };
    VsCheckboxSet?: { [key: string]: VsCheckboxSetStyleSet };
    VsChip?: { [key: string]: VsChipStyleSet };
    VsConfirm?: { [key: string]: VsConfirmStyleSet };
    VsDivider?: { [key: string]: VsDividerStyleSet };
    VsDrawer?: { [key: string]: VsDrawerStyleSet };
    VsFileInput?: { [key: string]: VsFileInputStyleSet };
    VsFooter?: { [key: string]: VsFooterStyleSet };
    VsHeader?: { [key: string]: VsHeaderStyleSet };
    VsImage?: { [key: string]: VsImageStyleSet };
    VsInput?: { [key: string]: VsInputStyleSet };
    VsLabelValue?: { [key: string]: VsLabelValueStyleSet };
    VsLoading?: { [key: string]: VsLoadingStyleSet };
    VsMenuButton?: { [key: string]: VsMenuButtonStyleSet };
    VsModal?: { [key: string]: VsModalNodeStyleSet };
    VsModalNode?: { [key: string]: VsModalNodeStyleSet };
    VsNotice?: { [key: string]: VsNoticeStyleSet };
    VsPage?: { [key: string]: VsPageStyleSet };
    VsPagination?: { [key: string]: VsPaginationStyleSet };
    VsProgress?: { [key: string]: VsProgressStyleSet };
    VsRadio?: { [key: string]: VsRadioStyleSet };
    VsRadioNode?: { [key: string]: VsRadioNodeStyleSet };
    VsRadioSet?: { [key: string]: VsRadioSetStyleSet };
    VsSection?: { [key: string]: VsSectionStyleSet };
    VsSelect?: { [key: string]: VsSelectStyleSet };
    VsStepper?: { [key: string]: VsStepperStyleSet };
    VsSwitch?: { [key: string]: VsSwitchStyleSet };
    VsTable?: { [key: string]: VsTableStyleSet };
    VsTabs?: { [key: string]: VsTabsStyleSet };
    VsTextarea?: { [key: string]: VsTextareaStyleSet };
    VsTextWrap?: { [key: string]: VsTextWrapStyleSet };
    VsThemeButton?: { [key: string]: VsThemeButtonStyleSet };
    VsTooltip?: { [key: string]: VsTooltipStyleSet };
}

export type StyleSet = VsComponentStyleSet & { [key: string]: { [key: string]: any } };
export interface VlossomOptions {
    components?: VsComponent[];
    colorScheme?: GlobalColorScheme;
    styleSet?: StyleSet;
    theme?: 'light' | 'dark';
    darkThemeClass?: string;
    detectOSTheme?: boolean;
    radiusRatio?: number;
}

export interface Breakpoints {
    xs?: string | number;
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
}

export type UIState = 'idle' | 'success' | 'info' | 'error' | 'warning' | 'selected';

export interface StateMessage {
    state: UIState;
    text: string;
}

export type Rule<T = any> = ((v: T) => string) | ((v: T) => PromiseLike<string>);
export type Message<T = any> = StateMessage | ((v: T) => StateMessage) | ((v: T) => PromiseLike<StateMessage>);

export interface InputComponentParams<T = unknown> {
    inputValue: Ref<T>;
    modelValue: Ref<T>;
    id?: Ref<string>;
    disabled?: Ref<boolean>;
    readonly?: Ref<boolean>;
    messages?: Ref<Message<T>[]>;
    rules?: Ref<Rule<T>[]>;
    defaultRules?: Rule<T>[];
    noDefaultRules?: Ref<boolean>;
    state?: Ref<UIState>;
    callbacks?: {
        onChange?: (newValue: T, oldValue: T) => void;
        onMounted?: () => void;
        onClear?: () => void;
    };
}

export interface StringModifiers {
    capitalize?: boolean;
    lower?: boolean;
    upper?: boolean;
}

export interface VsFormProvide {
    disabled: Ref<boolean>;
    readonly: Ref<boolean>;
    changedObj: Ref<Record<string, boolean>>;
    validObj: Ref<Record<string, boolean>>;
    validateFlag: Ref<boolean>;
    clearFlag: Ref<boolean>;
    updateChanged: (id: string, changed: boolean) => void;
    updateValid: (id: string, valid: boolean) => void;
    removeFromForm: (id: string) => void;
}

export interface BarLayout {
    position: (typeof CSS_POSITION)[number];
    height: string;
}

export interface DrawerLayout {
    drawerOpen: boolean;
    placement: Exclude<Placement, 'middle'>;
    size: string;
}

export interface DrawerLayouts {
    left: DrawerLayout;
    top: DrawerLayout;
    right: DrawerLayout;
    bottom: DrawerLayout;
}
export interface VsLayoutProvide {
    header: Ref<BarLayout>;
    footer: Ref<BarLayout>;
    drawers: Ref<DrawerLayouts>;
    setHeaderLayout: (headerLayout: BarLayout) => void;
    setFooterLayout: (footerLayout: BarLayout) => void;
    setDrawerLayout: (drawerLayout: DrawerLayout) => void;
}

export type Placement = (typeof PLACEMENTS)[number];

export type Size = (typeof SIZES)[number];

export type SizeProp = Size | string | number;

export interface LabelValue<T = any> {
    label: string;
    value: T;
}

export type Align = (typeof ALIGNS)[number];

export interface Focusable {
    focus(): void;
    blur(): void;
}

export interface AttachInfo {
    placement?: Exclude<Placement, 'middle'>;
    align?: Align;
    margin?: number;
    followWidth?: boolean;
}

export type OverlayCallbacks<T = void> = { [eventName: string]: (...args: any[]) => T | Promise<T> };

export interface ModalOptions<T> {
    component: string | Component;
    props?: Record<string, any>;
    container?: string;
    // sync with getOverlayProps function
    colorScheme?: ColorScheme;
    styleSet?: string | T;
    callbacks?: OverlayCallbacks;
    dimClose?: boolean;
    dimmed?: boolean;
    escClose?: boolean;
    focusLock?: boolean;
    id?: string;
    initialFocusRef?: HTMLElement | null;
    scrollLock?: boolean;
    size?: string | number | { width?: string | number; height?: string | number };
}

export interface ToastOptions<T> {
    container?: string;
    colorScheme?: ColorScheme;
    styleSet?: string | T;
    align?: Align;
    autoClose?: boolean;
    placement?: Exclude<Placement, 'left' | 'right'>;
    primary?: boolean;
    timeout?: number;
    logger?: (message: string | Component) => string;
}

export interface ToastInfo<T> extends ToastOptions<T> {
    id: string;
    content: string | Component;
}
