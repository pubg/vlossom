import type {
    VsButtonStyleSet,
    VsChipStyleSet,
    VsDividerStyleSet,
    VsInputStyleSet,
    VsLabelValueStyleSet,
    VsNoticeStyleSet,
    VsPageStyleSet,
    VsProgressStyleSet,
    VsSectionStyleSet,
    VsValueTagStyleSet,
} from '@/components/types';
import type { Ref } from 'vue';

export enum VsComponent {
    VsButton = 'VsButton',
    VsChip = 'VsChip',
    VsContainer = 'VsContainer',
    VsDivider = 'VsDivider',
    VsForm = 'VsForm',
    VsInput = 'VsInput',
    VsInputWrapper = 'VsInputWrapper',
    VsLabelValue = 'VsLabelValue',
    VsMessage = 'VsMessage',
    VsNotice = 'VsNotice',
    VsPage = 'VsPage',
    VsProgress = 'VsProgress',
    VsSection = 'VsSection',
    VsValueTag = 'VsValueTag',
    VsWrapper = 'VsWrapper',
}

export type ColorScheme = 'red' | 'amber' | 'green' | 'teal' | 'blue' | 'indigo' | 'purple' | 'pink';

export type GlobalColorScheme = { default?: ColorScheme } & { [key in VsComponent]?: ColorScheme };

export interface StyleSet {
    VsButton?: { [key: string]: VsButtonStyleSet };
    VsChip?: { [key: string]: VsChipStyleSet };
    VsDivider?: { [key: string]: VsDividerStyleSet };
    VsInput?: { [key: string]: VsInputStyleSet };
    VsLabelValue?: { [key: string]: VsLabelValueStyleSet };
    VsNotice?: { [key: string]: VsNoticeStyleSet };
    VsPage?: { [key: string]: VsPageStyleSet };
    VsProgress?: { [key: string]: VsProgressStyleSet };
    VsSection?: { [key: string]: VsSectionStyleSet };
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
    xs?: string | number;
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
}

export enum UIState {
    IDLE = 'idle',
    SUCCESS = 'success',
    INFO = 'info',
    DANGER = 'danger',
    WARN = 'warning',
    SELECTED = 'selected',
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
