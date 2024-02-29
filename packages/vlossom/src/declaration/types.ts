import type {
    VsAccordionStyleSet,
    VsAvatarStyleSet,
    VsBlockStyleSet,
    VsButtonStyleSet,
    VsCheckboxStyleSet,
    VsChipStyleSet,
    VsDividerStyleSet,
    VsDrawerStyleSet,
    VsFileInputStyleSet,
    VsFooterStyleSet,
    VsHeaderStyleSet,
    VsImageStyleSet,
    VsInputStyleSet,
    VsLabelValueStyleSet,
    VsLoadingStyleSet,
    VsNoticeStyleSet,
    VsPageStyleSet,
    VsPaginationStyleSet,
    VsProgressStyleSet,
    VsSectionStyleSet,
    VsSelectStyleSet,
    VsStepperStyleSet,
    VsSwitchStyleSet,
    VsTabsStyleSet,
    VsTextareaStyleSet,
    VsTextWrapStyleSet,
    VsThemeButtonStyleSet,
    VsTooltipStyleSet,
    VsValueTagStyleSet,
} from '@/components';
import { COLORS, PLACEMENTS, ALIGNS, CSS_POSITION, SIZES } from './constants';
import type { Ref } from 'vue';
import type { VsComponent, UIState } from './enums';

export type ColorScheme = (typeof COLORS)[number];

export type GlobalColorScheme = { default?: ColorScheme } & { [key in VsComponent]?: ColorScheme };

export interface StyleSet {
    VsAccordion?: { [key: string]: VsAccordionStyleSet };
    VsAvatar?: { [key: string]: VsAvatarStyleSet };
    VsBlock?: { [key: string]: VsBlockStyleSet };
    VsButton?: { [key: string]: VsButtonStyleSet };
    VsCheckbox?: { [key: string]: VsCheckboxStyleSet };
    VsCheckboxSet?: { [key: string]: VsCheckboxStyleSet };
    VsChip?: { [key: string]: VsChipStyleSet };
    VsDivider?: { [key: string]: VsDividerStyleSet };
    VsDrawer?: { [key: string]: VsDrawerStyleSet };
    VsFileInput?: { [key: string]: VsFileInputStyleSet };
    VsFooter?: { [key: string]: VsFooterStyleSet };
    VsHeader?: { [key: string]: VsHeaderStyleSet };
    VsImage?: { [key: string]: VsImageStyleSet };
    VsInput?: { [key: string]: VsInputStyleSet };
    VsLabelValue?: { [key: string]: VsLabelValueStyleSet };
    VsLoading?: { [key: string]: VsLoadingStyleSet };
    VsNotice?: { [key: string]: VsNoticeStyleSet };
    VsPage?: { [key: string]: VsPageStyleSet };
    VsPagination?: { [key: string]: VsPaginationStyleSet };
    VsProgress?: { [key: string]: VsProgressStyleSet };
    VsSection?: { [key: string]: VsSectionStyleSet };
    VsSelect?: { [key: string]: VsSelectStyleSet };
    VsStepper?: { [key: string]: VsStepperStyleSet };
    VsSwitch?: { [key: string]: VsSwitchStyleSet };
    VsTabs?: { [key: string]: VsTabsStyleSet };
    VsTextarea?: { [key: string]: VsTextareaStyleSet };
    VsTextWrap?: { [key: string]: VsTextWrapStyleSet };
    VsThemeButton?: { [key: string]: VsThemeButtonStyleSet };
    VsTooltip?: { [key: string]: VsTooltipStyleSet };
    VsValueTag?: { [key: string]: VsValueTagStyleSet };
}

export interface VlossomOptions {
    theme?: 'light' | 'dark';
    components?: VsComponent[];
    colorScheme?: GlobalColorScheme;
    styleSet?: StyleSet;
    detectOSTheme?: boolean;
}

export interface Breakpoints {
    base?: string | number;
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
}

export interface StateMessage {
    state: UIState;
    text: string;
}

export type Rule<T = any> = ((v: T) => string) | ((v: T) => PromiseLike<string>);
export type Message<T = any> = StateMessage | ((v: T) => StateMessage) | ((v: T) => PromiseLike<StateMessage>);

export interface InputComponentOptions<T = unknown> {
    messages?: Ref<Message<T>[]>;
    rules?: Ref<Rule<T>[]>;
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
    labelObj: Ref<Record<string, string>>;
    changedObj: Ref<Record<string, boolean>>;
    validObj: Ref<Record<string, boolean>>;
    validateFlag: Ref<boolean>;
    clearFlag: Ref<boolean>;
    updateLabel: (id: string, label: string) => void;
    updateChanged: (id: string, changed: boolean) => void;
    updateValid: (id: string, valid: boolean) => void;
    removeFromForm: (id: string) => void;
}

export type Align = (typeof ALIGNS)[number];

export type TextAlign =
    | 'start'
    | 'end'
    | 'left'
    | 'right'
    | 'center'
    | 'justify'
    | 'justify-all'
    | 'match-parent'
    | 'inherit';

export interface AttachInfo {
    placement?: Placement;
    align?: Align;
    margin?: number;
    followWidth?: boolean;
}

export type CssPosition = (typeof CSS_POSITION)[number];

export type Placement = (typeof PLACEMENTS)[number];

export type Size = (typeof SIZES)[number];
