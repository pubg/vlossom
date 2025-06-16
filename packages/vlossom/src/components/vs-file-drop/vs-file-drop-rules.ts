import { Ref } from 'vue';
import { InputValueType } from './types';

interface FileDropRuleParams {
    multiple: Ref<boolean>;
}

export function useVsFileDropRules(params: FileDropRuleParams) {
    function verifyMultipleFileUpload(value: InputValueType): string {
        if (params.multiple.value) {
            return '';
        }

        if (Array.isArray(value) && value.length > 1) {
            return 'You can only upload one file';
        }

        return '';
    }

    return {
        verifyMultipleFileUpload,
    };
}
