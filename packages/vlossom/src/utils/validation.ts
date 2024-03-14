import { ALIGNS, PLACEMENTS, type Align, type Placement } from '@/declaration';

export const validationUtil = {
    logPropError(componentName: string, message: string) {
        console.error(`[Vlossom] ${componentName} prop: ${message}`);
    },
    validatePlacementProp(componentName: string, placement: Placement) {
        const isValid = PLACEMENTS.includes(placement);
        if (!isValid) {
            this.logPropError(componentName, `placement must be one of ${PLACEMENTS.join(', ')}`);
        }
        return isValid;
    },
    validateAlignProp(componentName: string, align: Align) {
        const isValid = ALIGNS.includes(align);
        if (!isValid) {
            this.logPropError(componentName, `align must be one of ${ALIGNS.join(', ')}`);
        }
        return isValid;
    },
};
