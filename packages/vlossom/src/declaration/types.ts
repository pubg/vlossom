import type {
    VsButtonStyleSet,
    VsDividerStyleSet,
    VsInputStyleSet,
    VsPageStyleSet,
    VsSectionStyleSet,
} from '@/components/types';
import type { Ref } from 'vue';

export enum VsComponent {
    VsButton = 'VsButton',
    VsContainer = 'VsContainer',
    VsDivider = 'VsDivider',
    VsForm = 'VsForm',
    VsInput = 'VsInput',
    VsInputWrapper = 'VsInputWrapper',
    VsMessage = 'VsMessage',
    VsPage = 'VsPage',
    VsSection = 'VsSection',
    VsWrapper = 'VsWrapper',
}

export type ColorScheme = 'red' | 'amber' | 'green' | 'teal' | 'blue' | 'indigo' | 'purple' | 'pink';

export type GlobalColorScheme = { default?: ColorScheme } & { [key in VsComponent]?: ColorScheme };

export interface StyleSet {
    VsButton?: { [key: string]: VsButtonStyleSet };
    VsDivider?: { [key: string]: VsDividerStyleSet };
    VsInput?: { [key: string]: VsInputStyleSet };
    VsSection?: { [key: string]: VsSectionStyleSet };
    VsPage?: { [key: string]: VsPageStyleSet };
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
