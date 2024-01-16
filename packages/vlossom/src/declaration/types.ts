import type {
    VsButtonStyleSet,
    VsCheckboxStyleSet,
    VsChipStyleSet,
    VsDividerStyleSet,
    VsFooterStyleSet,
    VsInputStyleSet,
    VsLabelValueStyleSet,
    VsNoticeStyleSet,
    VsPageStyleSet,
    VsProgressStyleSet,
    VsSectionStyleSet,
    VsTooltipStyleSet,
    VsValueTagStyleSet,
} from '@/components';
import type { Ref } from 'vue';
import type { VsComponent, UIState } from './enums';

export type ColorScheme = 'red' | 'amber' | 'green' | 'teal' | 'blue' | 'indigo' | 'purple' | 'pink';

export type GlobalColorScheme = { default?: ColorScheme } & { [key in VsComponent]?: ColorScheme };

export interface StyleSet {
    VsButton?: { [key: string]: VsButtonStyleSet };
    VsCheckbox?: { [key: string]: VsCheckboxStyleSet };
    VsChip?: { [key: string]: VsChipStyleSet };
    VsDivider?: { [key: string]: VsDividerStyleSet };
    VsFooter?: { [key: string]: VsFooterStyleSet };
    VsInput?: { [key: string]: VsInputStyleSet };
    VsLabelValue?: { [key: string]: VsLabelValueStyleSet };
    VsNotice?: { [key: string]: VsNoticeStyleSet };
    VsPage?: { [key: string]: VsPageStyleSet };
    VsProgress?: { [key: string]: VsProgressStyleSet };
    VsSection?: { [key: string]: VsSectionStyleSet };
    VsTooltip?: { [key: string]: VsTooltipStyleSet };
    VsValueTag?: { [key: string]: VsValueTagStyleSet };
}

export interface VlossomStore {
    globalColorScheme: GlobalColorScheme;
    styleSets: StyleSet;
}

export interface VlossomOptions {
    theme?: 'light' | 'dark';
    components?: VsComponent[];
    colorScheme?: GlobalColorScheme;
    styleSet?: StyleSet;
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
    message: string;
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

export type VerticalAlign = 'top' | 'bottom' | '';

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

export enum Direction {
    Top = 'top',
    Right = 'right',
    Bottom = 'bottom',
    Left = 'left',
}

export enum Align {
    Top = 'top',
    Right = 'right',
    Center = 'center',
    Bottom = 'bottom',
    Left = 'left',
}

export interface AttachInfo {
    position?: Direction | string;
    align?: Align | string;
    margin?: number;
    followWidth?: boolean;
    minWidth?: number;
    maxWidth?: number;
}
