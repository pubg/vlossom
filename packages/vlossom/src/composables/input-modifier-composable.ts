import { Ref } from 'vue';
import { StringModifiers } from '@/declaration';

export function useStringModifier(modifiers: Ref<StringModifiers>) {
    function modifyStringValue(value: string): string {
        if (Object.keys(modifiers.value).length === 0) {
            return value;
        }

        let modified = value;

        if (modifiers.value.capitalize) {
            modified = value.charAt(0).toUpperCase() + value.slice(1);
        }
        if (modifiers.value.lower) {
            modified = value.toLowerCase();
        }
        if (modifiers.value.upper) {
            modified = value.toUpperCase();
        }

        return modified;
    }

    return { modifyStringValue };
}
