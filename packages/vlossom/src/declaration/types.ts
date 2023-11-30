import type { VsButtonStyleSet, VsInputStyleSet, VsSectionStyleSet } from '@/components';

export type ColorScheme = 'red' | 'amber' | 'green' | 'teal' | 'blue' | 'indigo' | 'purple' | 'pink';

export interface GlobalColorScheme {
    default?: ColorScheme;
    vsButton?: ColorScheme;
    vsInput?: ColorScheme;
    vsSection?: ColorScheme;
}

export interface StyleSet {
    vsButton?: { [key: string]: VsButtonStyleSet };
    vsInput?: { [key: string]: VsInputStyleSet };
    vsSection?: { [key: string]: VsSectionStyleSet };
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
