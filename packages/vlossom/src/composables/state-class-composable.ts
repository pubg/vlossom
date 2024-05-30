import { Ref, computed } from 'vue';
import { UIState } from '@/declaration';

export function useStateClass(state: Ref<UIState>) {
    const boxGlowByState = computed(() => `vs-state-box-${state.value}`);

    const textGlowByState = computed(() => `vs-text-glow-${state.value}`);

    return {
        boxGlowByState,
        textGlowByState,
    };
}
