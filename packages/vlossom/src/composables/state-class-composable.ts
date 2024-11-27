import { Ref, computed } from 'vue';
import { UIState } from '@/declaration';

export function useStateClass(state: Ref<UIState>) {
    const stateClasses = computed(() => {
        const stated = ['info', 'success', 'error', 'warning'];

        const isStated = stated.includes(state.value);
        return {
            'vs-state-box': isStated,
            [`vs-state-box-${state.value}`]: isStated,
        };
    });

    return {
        stateClasses,
    };
}
