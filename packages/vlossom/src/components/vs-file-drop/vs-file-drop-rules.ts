import { Ref } from 'vue';
import { InputValueType } from './types';

interface FileDropRuleParams {
    accept: Ref<string>;
    multiple: Ref<boolean>;
}

export function useVsFileDropRules(params: FileDropRuleParams) {
    function verifyFileType(value: InputValueType): string {
        if (!params.accept.value || !value) {
            return '';
        }
        const values: File[] = [value].flat();

        if (values.some((file) => !file.type.startsWith(params.accept.value))) {
            return `Only ${params.accept.value} files are allowed`;
        }

        return '';
    }

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
        verifyFileType,
        verifyMultipleFileUpload,
    };
}
