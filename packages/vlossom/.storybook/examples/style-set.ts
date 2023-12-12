import type { StyleSet } from '@/declaration/types';
import type { VsButtonStyleSet, VsInputStyleSet, VsSectionStyleSet, VsDividerStyleSet } from '@/components';

const vsButton: VsButtonStyleSet = {
    backgroundColor: '#1e88e5',
    color: 'white',
};

const vsInput: VsInputStyleSet = {
    border: 'solid 1px #1e88e5',
    fontColor: '#1e88e5',
};

const vsSection: VsSectionStyleSet = {
    backgroundColor: '#90caf9',
    fontColor: 'white',
};

const vsDivider: VsDividerStyleSet = {
    lineColor: '#7071e8',
    lineWidth: '3px',
    lineStyle: 'double'
};

export const styleSet: StyleSet = {
    VsButton: { myStyleSet: vsButton },
    VsInput: { myStyleSet: vsInput },
    VsSection: { myStyleSet: vsSection },
    VsDivider: { myStyleSet: vsDivider },
};
