import { computed, getCurrentInstance } from 'vue';

export function useModel() {
    const internalInstance = getCurrentInstance();

    function checkVModel(prop: string) {
        const hasVModel = computed(
            () => !!internalInstance?.vnode.props?.[prop] && !!internalInstance?.vnode.props?.[`onUpdate:${prop}`],
        );
        return hasVModel;
    }

    return {
        checkVModel,
    };
}
