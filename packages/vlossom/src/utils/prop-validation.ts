import { ALIGNS, PLACEMENTS, type Align, type Placement } from '@/declaration';
import { logUtil } from './log';

export const propValidationUtil = {
    validatePlacement(componentName: string, placement: Placement) {
        const isValid = PLACEMENTS.includes(placement);
        if (!isValid) {
            logUtil.logPropError(componentName, 'placement', `placement must be one of ${PLACEMENTS.join(', ')}`);
        }
        return isValid;
    },
    validateAlign(componentName: string, align: Align) {
        const isValid = ALIGNS.includes(align);
        if (!isValid) {
            logUtil.logPropError(componentName, 'align', `align must be one of ${ALIGNS.join(', ')}`);
        }
        return isValid;
    },
};
