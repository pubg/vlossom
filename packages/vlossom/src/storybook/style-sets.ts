import type { StyleSet } from '@/declaration';
import type {
    VsButtonStyleSet,
    VsCheckboxStyleSet,
    VsChipStyleSet,
    VsDividerStyleSet,
    VsFooterStyleSet,
    VsHeaderStyleSet,
    VsInputStyleSet,
    VsLabelValueStyleSet,
    VsNoticeStyleSet,
    VsPageStyleSet,
    VsProgressStyleSet,
    VsSectionStyleSet,
    VsTabsStyleSet,
    VsTooltipStyleSet,
    VsValueTagStyleSet,
} from '@/components';

const vsButton: VsButtonStyleSet = {
    backgroundColor: '#1e88e5',
    color: 'white',
};

const vsCheckbox: VsCheckboxStyleSet = {
    backgroundColor: '#0288d1',
    border: '2px solid #0288d1',
    borderRadius: '0.4rem',
    checkLabelColor: '#0288d1',
    fontSize: '1.2rem',
    height: '1.4rem',
    iconColor: '#ffb300',
    width: '1.4rem',
};

const vsChip: VsChipStyleSet = {
    backgroundColor: '#a5d6ad',
    borderRadius: '1.2rem',
    color: '#304d30',
    height: '3rem',
    minHeight: '2rem',
    padding: '0.8rem 1.5rem',
};

const vsDivider: VsDividerStyleSet = {
    lineColor: '#7071e8',
    lineStyle: 'double',
    lineWidth: '3px',
};

const vsFooter: VsFooterStyleSet = {
    backgroundColor: 'grey',
    bottom: 0,
    color: '#fff',
    display: 'flex',
    flex: '1 1 auto',
    height: '32px',
    left: 0,
    padding: '2%',
    position: 'absolute',
    textAlign: 'start',
    right: 'auto',
    top: 'auto',
    width: '100%',
};

const vsHeader: VsHeaderStyleSet = {
    backgroundColor: 'grey',
    bottom: 'auto',
    boxShadow: 'none',
    color: '#fff',
    display: 'flex',
    flex: '1 1 auto',
    height: '32px',
    left: 'auto',
    padding: '2%',
    position: 'sticky',
    textAlign: 'start',
    right: 'auto',
    top: '50%',
    width: '100%',
    zIndex: 9999,
};

const vsInput: VsInputStyleSet = {
    border: 'solid 1px #1e88e5',
    color: '#1e88e5',
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

const vsPage: VsPageStyleSet = {
    fontColor: '#ff90bc',
    padding: '0.8rem 1.5rem',
};

const vsProgress: VsProgressStyleSet = {
    borderRadius: '0.2rem',
    height: '0.5rem',
    width: '100%',
};

const vsSection: VsSectionStyleSet = {
    backgroundColor: '#90caf9',
    fontColor: 'white',
};

const vsTabs: VsTabsStyleSet = {
    backgroundColor: '#008db2',
    borderBottomColor: '#0288d1',
    color: '#ff8919',
    fontSize: '1rem',
    fontWeight: '500',
    gap: '2px',
    height: '80px',
    padding: '2%',
    tabWidth: '400px',
};

const vsTooltip: VsTooltipStyleSet = {
    arrowColor: '#ffd1d1',
    arrowSize: '0.5rem',
    backgroundColor: '#ffe3e1',
    borderColor: '#ffd1d1',
    borderWeight: '0.25rem',
    borderRadius: '0',
    fontColor: '#ff6677',
    fontSize: '1.1rem',
    padding: '0.9rem 0.8rem',
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
    VsCheckbox: { myStyleSet: vsCheckbox },
    VsCheckboxSet: { myStyleSet: vsCheckbox },
    VsChip: { myStyleSet: vsChip },
    VsDivider: { myStyleSet: vsDivider },
    VsFooter: { myStyleSet: vsFooter },
    VsHeader: { myStyleSet: vsHeader },
    VsInput: { myStyleSet: vsInput },
    VsLabelValue: { myStyleSet: vsLabelValue },
    VsNotice: { myStyleSet: vsNotice },
    VsPage: { myStyleSet: vsPage },
    VsProgress: { myStyleSet: vsProgress },
    VsSection: { myStyleSet: vsSection },
    VsTabs: { myStyleSet: vsTabs },
    VsTooltip: { myStyleSet: vsTooltip },
    VsValueTag: { myStyleSet: vsValueTag },
};
