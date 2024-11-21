import { computed, onMounted, Ref, ref } from 'vue';
import { utils } from '@/utils';

// This composable is used to generate a unique ID for SSR components
export function useLazyId(id: Ref<string>) {
    const innerId = ref('');
    const computedId = computed(() => id.value || innerId.value);

    onMounted(() => {
        innerId.value = utils.string.createID();
    });

    return {
        innerId,
        computedId,
    };
}
