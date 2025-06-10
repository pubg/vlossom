import { Ref } from 'vue';
import { InputValueType } from './types';

interface FileDropRuleParams {
    accept: Ref<string>;
    multiple: Ref<boolean>;
}

function parseAccept(accept: string): string {
    if (!accept) {
        return '';
    }
    return accept.replace(/./, ' ').trim();
}

export function useVsFileDropRules(params: FileDropRuleParams) {
    function verifyFileType(value: InputValueType): string {
        if (!params.accept.value || !value) {
            return '';
        }
        const accept = parseAccept(params.accept.value);
        const values: File[] = [value].flat();

        if (values.some((file) => !file.type.includes(accept))) {
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
