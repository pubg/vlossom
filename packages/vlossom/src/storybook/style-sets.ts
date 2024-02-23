import type { StyleSet } from '@/declaration';
import type {
    VsAccordionStyleSet,
    VsAvatarStyleSet,
    VsBlockStyleSet,
    VsButtonStyleSet,
    VsCheckboxStyleSet,
    VsCheckboxSetStyleSet,
    VsChipStyleSet,
    VsDividerStyleSet,
    VsDrawerStyleSet,
    VsFileInputStyleSet,
    VsFooterStyleSet,
    VsHeaderStyleSet,
    VsImageStyleSet,
    VsInputStyleSet,
    VsLabelValueStyleSet,
    VsLoadingStyleSet,
    VsNoticeStyleSet,
    VsPageStyleSet,
    VsPaginationStyleSet,
    VsProgressStyleSet,
    VsSectionStyleSet,
    VsStepperStyleSet,
    VsTabsStyleSet,
    VsTextareaStyleSet,
    VsTextWrapStyleSet,
    VsThemeButtonStyleSet,
    VsTooltipStyleSet,
    VsValueTagStyleSet,
} from '@/components';

const vsAccordion: VsAccordionStyleSet = {
    border: '1px solid #1e88e5',
    borderRadius: '0.7rem',
    titleColor: '#1e88e5',
    titleBackgroundColor: '#f5f5f5',
    titlePadding: '1rem',
    contentsColor: '#1e88e5',
    contentsBackgroundColor: '#f5f5f5',
    contentsPadding: '0.2rem',
};

const vsAvatar: VsAvatarStyleSet = {
    backgroundColor: '#1e88e5',
    borderRadius: '50%',
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: '600',
    height: '5rem',
    width: '5rem',
};

const vsBlock: VsBlockStyleSet = {
    backgroundColor: '#000',
    color: '#fff',
};

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

const vsCheckboxSet: VsCheckboxSetStyleSet = {
    backgroundColor: '#0288d1',
    border: '2px solid #0288d1',
    borderRadius: '0.4rem',
    checkLabelColor: '#0288d1',
    fontSize: '1.2rem',
    height: '1.4rem',
    iconColor: '#ffb300',
    width: '1.4rem',
    checkboxMargin: '6rem',
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

const vsDrawer: VsDrawerStyleSet = {
    backgroundColor: '#D4F1F4',
    width: '100%',
};

const vsFileInput: VsFileInputStyleSet = {
    borderColor: '#D4E7C5',
    borderWidth: '1px',
    borderStyle: 'solid',
    backgroundColor: '#D4E7C5',
    color: '#99BC85',
    clearButtonColor: '#436850',
    fontSize: '0.8rem',
    prependBackgroundColor: '#86A789',
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

const vsImage: VsImageStyleSet = {
    border: '5px solid red',
    width: '400px',
    height: 'auto',
    objectFit: 'contain',
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

const vsLoading: VsLoadingStyleSet = {
    color: '#ff90bc',
    height: '20rem',
    width: '7rem',
    barWidth: '16%',
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
    color: '#ff90bc',
    padding: '0.8rem 1.5rem',
};

const vsPagination: VsPaginationStyleSet = {
    backgroundColor: '#1e88e5',
    borderRadius: '0.2rem',
    buttonHeight: '1.2rem',
    buttonWidth: '1.6rem',
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: '600',
    gap: '0.5rem',
    hoverBackgroundColor: '#5d4aa7',
    hoverColor: '#1e88e5',
    hoverFontSize: '1rem',
    hoverFontWeight: '600',
    selectedBackgroundColor: '#add8e6',
    selectedColor: '#1e88e5',
    selectedFontSize: '1.2rem',
    selectedFontWeight: '600',
};

const vsProgress: VsProgressStyleSet = {
    borderRadius: '0.2rem',
    height: '0.5rem',
    width: '100%',
};

const vsSection: VsSectionStyleSet = {
    backgroundColor: '#90caf9',
    color: 'white',
};

const vsStepper: VsStepperStyleSet = {
    activeBackgroundColor: 'white',
    activeColor: '#1e88e5',
    fontSize: '1.2rem',
    labelColor: '#90caf9',
    stepSize: '2rem',
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

const vsTextarea: VsTextareaStyleSet = {
    border: 'solid 1px #1e88e5',
    color: '#1e88e5',
};

const vsTextWrap: VsTextWrapStyleSet = {
    copyIconColor: '#d14d72',
    linkIconColor: '#643843',
};

const vsTooltip: VsTooltipStyleSet = {
    arrowColor: '#ffd1d1',
    arrowSize: '0.5rem',
    backgroundColor: '#ffe3e1',
    borderColor: '#ffd1d1',
    borderWeight: '3.5px',
    borderRadius: '0',
    color: '#ff6677',
    fontSize: '1.1rem',
    padding: '0.9rem 0.8rem',
};

const vsThemeButton: VsThemeButtonStyleSet = {
    backgroundColor: '#BACC81',
    color: '#013A20',
    hoverBackgroundColor: '#478C5C',
    width: '2rem',
};

const vsValueTag: VsValueTagStyleSet = {
    backgroundColor: '#b6c4b6',
    color: '#304d30',
    fontSize: '1rem',
    fontWeight: '480',
    width: '50%',
};

export const styleSet: StyleSet = {
    VsAccordion: { myStyleSet: vsAccordion },
    VsAvatar: { myStyleSet: vsAvatar },
    VsBlock: { myStyleSet: vsBlock },
    VsButton: { myStyleSet: vsButton },
    VsCheckbox: { myStyleSet: vsCheckbox },
    VsCheckboxSet: { myStyleSet: vsCheckboxSet },
    VsChip: { myStyleSet: vsChip },
    VsDivider: { myStyleSet: vsDivider },
    VsDrawer: { myStyleSet: vsDrawer },
    VsFileInput: { myStyleSet: vsFileInput },
    VsFooter: { myStyleSet: vsFooter },
    VsHeader: { myStyleSet: vsHeader },
    VsImage: { myStyleSet: vsImage },
    VsInput: { myStyleSet: vsInput },
    VsLabelValue: { myStyleSet: vsLabelValue },
    VsLoading: { myStyleSet: vsLoading },
    VsNotice: { myStyleSet: vsNotice },
    VsPage: { myStyleSet: vsPage },
    VsProgress: { myStyleSet: vsProgress },
    VsPagination: { myStyleSet: vsPagination },
    VsSection: { myStyleSet: vsSection },
    VsStepper: { myStyleSet: vsStepper },
    VsTabs: { myStyleSet: vsTabs },
    VsTextarea: { myStyleSet: vsTextarea },
    VsTextWrap: { myStyleSet: vsTextWrap },
    VsThemeButton: { myStyleSet: vsThemeButton },
    VsTooltip: { myStyleSet: vsTooltip },
    VsValueTag: { myStyleSet: vsValueTag },
};
