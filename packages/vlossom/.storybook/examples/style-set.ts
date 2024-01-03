import type { StyleSet } from '@/declaration/types';
import type {
    VsButtonStyleSet,
    VsDividerStyleSet,
    VsInputStyleSet,
    VsLabelValueStyleSet,
    VsNoticeStyleSet,
    VsPageStyleSet,
    VsProgressStyleSet,
    VsSectionStyleSet,
    VsValueTagStyleSet,
} from '@/components/types';

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

const vsLabelValue: VsLabelValueStyleSet = {
    backgroundColor: '#f5f5f5',
    fontSize: '0.95rem',
    labelBackgroundColor: '#18122b',
    labelColor: '#ffffff',
    labelFontWeight: '550',
    labelWidth: '10%',
    padding: '2rem',
};

const vsNotice: VsNoticeStyleSet = {
    backgroundColor: '#1e88e5',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '500',
    subTitleFontSize: '1.2rem',
    subTitleFontWeight: '600',
};

const vsSection: VsSectionStyleSet = {
    backgroundColor: '#90caf9',
    fontColor: 'white',
};

const vsPage: VsPageStyleSet = {
    fontColor: '#ff90bc',
    padding: '0.8rem 1.5rem',
};

const vsProgress: VsProgressStyleSet = {
    borderRadius: '0.2rem',
    height: '0.5rem',
    width: '100%',
};

const vsValueTag: VsValueTagStyleSet = {
    backgroundColor: '#b6c4b6',
    color: '#304d30',
    fontSize: '1rem',
    fontWeight: '480',
    width: '50%',
};


export const styleSet: StyleSet = {
    VsButton: { myStyleSet: vsButton },
    VsDivider: { myStyleSet: vsDivider },
    VsInput: { myStyleSet: vsInput },
    VsLabelValue: { myStyleSet: vsLabelValue },
    VsNotice: { myStyleSet: vsNotice },
    VsPage: { myStyleSet: vsPage },
    VsProgress: { myStyleSet: vsProgress },
    VsSection: { myStyleSet: vsSection },
    VsValueTag: { myStyleSet: vsValueTag },
};
