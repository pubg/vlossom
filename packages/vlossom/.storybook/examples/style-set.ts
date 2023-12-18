import type { StyleSet } from '@/declaration/types';
import type {
    VsButtonStyleSet,
    VsDividerStyleSet,
    VsInputStyleSet,
    VsSectionStyleSet,
    VsPageStyleSet,
} from '@/components';

const vsButton: VsButtonStyleSet = {
    backgroundColor: '#1e88e5',
    color: 'white',
};

const vsDivider: VsDividerStyleSet = {
    lineColor: '#7071e8',
    lineStyle: 'double',
    lineWidth: '3px',
};

const vsInput: VsInputStyleSet = {
    border: 'solid 1px #1e88e5',
    fontColor: '#1e88e5',
};

const vsSection: VsSectionStyleSet = {
    backgroundColor: '#90caf9',
    fontColor: 'white',
};

const vsPage: VsPageStyleSet = {
    fontColor: '#ff90bc',
    padding: '0.8rem 1.5rem',
};

export const styleSet: StyleSet = {
    VsButton: { myStyleSet: vsButton },
    VsDivider: { myStyleSet: vsDivider },
    VsInput: { myStyleSet: vsInput },
    VsSection: { myStyleSet: vsSection },
    VsPage: { myStyleSet: vsPage },
};
