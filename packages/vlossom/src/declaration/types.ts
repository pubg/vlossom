import type {
    VsButtonStyleSet,
    VsDividerStyleSet,
    VsInputStyleSet,
    VsPageStyleSet,
    VsSectionStyleSet,
} from '@/components';
import type { Ref } from 'vue';

export enum VsComponent {
    VsButton = 'VsButton',
    VsDivider = 'VsDivider',
    VsForm = 'VsForm',
    VsInput = 'VsInput',
    VsPage = 'VsPage',
    VsSection = 'VsSection',
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

export interface VlossomOptions {
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
