import { Ref, computed } from 'vue';
import { UIState } from '@/declaration';

export function useStateClass(state: Ref<UIState>) {
    const stateClasses = computed(() => {
        const stated = [UIState.Info, UIState.Success, UIState.Error, UIState.Warning];

        const isStated = stated.includes(state.value);
        return {
            'vs-state-box': isStated,
            [`vs-state-box-${state.value}`]: isStated,
        };
    });

    const textGlowByState = computed(() => `vs-text-glow-${state.value}`);

    return {
        stateClasses,
        textGlowByState,
    };
}
