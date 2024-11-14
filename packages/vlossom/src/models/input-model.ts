import { PropType } from 'vue';
import { Message, Rule, UIState } from '@/declaration';
import { utils } from '@/utils';

interface VsInputProps<T> {
    ariaLabel: { type: StringConstructor; default: null };
    dense: { type: BooleanConstructor; default: boolean };
    disabled: { type: BooleanConstructor; default: boolean };
    id: { type: StringConstructor; default: string };
    label: { type: StringConstructor; default: string };
    messages: { type: PropType<Message<T>[]>; default: () => Message<T>[] };
    name: { type: StringConstructor; default: string };
    noClear: { type: BooleanConstructor; default: boolean };
    noDefaultRules: { type: BooleanConstructor; default: boolean };
    noMessage: { type: BooleanConstructor; default: boolean };
    placeholder: { type: StringConstructor; default: string };
    readonly: { type: BooleanConstructor; default: boolean };
    required: { type: BooleanConstructor; default: boolean };
    rules: { type: PropType<Rule<T>[]>; default: () => Rule<T>[] };
    state: { type: PropType<UIState>; default: UIState };
    visible: { type: BooleanConstructor; default: boolean };

    // v-model
    changed: { type: BooleanConstructor; default: boolean };
    valid: { type: BooleanConstructor; default: boolean };
}

export function getInputProps<T = unknown, K extends keyof VsInputProps<T> = never>(
    ...excludes: K[]
): Omit<VsInputProps<T>, K> {
    return utils.object.omit(
        {
            ariaLabel: { type: String, default: null },
            dense: { type: Boolean, default: false },
            disabled: { type: Boolean, default: false },
            id: { type: String, default: '' },
            label: { type: String, default: '' },
            messages: { type: Array as PropType<Message<T>[]>, default: () => [] },
            name: { type: String, default: '' },
            noClear: { type: Boolean, default: false },
            noDefaultRules: { type: Boolean, default: false },
            noMessage: { type: Boolean, default: false },
            placeholder: { type: String, default: '' },
            readonly: { type: Boolean, default: false },
            required: { type: Boolean, default: false },
            rules: { type: Array as PropType<Rule<T>[]>, default: () => [] },
            state: { type: String as PropType<UIState>, default: UIState.Idle },
            visible: { type: Boolean, default: true },

            // v-model
            changed: { type: Boolean, default: false },
            valid: { type: Boolean, default: false },
        },
        excludes,
    );
}
