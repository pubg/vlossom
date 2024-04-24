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
    VsModalStyleSet,
    VsNoticeStyleSet,
    VsPageStyleSet,
    VsPaginationStyleSet,
    VsProgressStyleSet,
    VsRadioStyleSet,
    VsRadioSetStyleSet,
    VsSectionStyleSet,
    VsSelectStyleSet,
    VsStepperStyleSet,
    VsSwitchStyleSet,
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
    titleFontColor: '#1e88e5',
    titleBackgroundColor: '#f5f5f5',
    titlePadding: '1rem',
    contentFontColor: '#1e88e5',
    contentBackgroundColor: '#f5f5f5',
    contentPadding: '0.2rem',
};

const vsAvatar: VsAvatarStyleSet = {
    backgroundColor: '#1e88e5',
    borderRadius: '50%',
    fontColor: '#fff',
    fontSize: '1.5rem',
    fontWeight: '600',
    height: '5rem',
    width: '5rem',
};

const vsBlock: VsBlockStyleSet = {
    backgroundColor: '#000',
    contentFontColor: '#fff',
};

const vsButton: VsButtonStyleSet = {
    backgroundColor: '#1e88e5',
    fontColor: 'white',
};

const vsCheckbox: VsCheckboxStyleSet = {
    borderRadius: '0.6rem',
    checkboxColor: '#ffb300',
    checkboxSize: '3rem',
    labelFontColor: '#0288d1',
    labelFontSize: '1.2rem',
};

const vsCheckboxSet: VsCheckboxSetStyleSet = {
    borderRadius: '0.6rem',
    checkboxColor: '#ffb300',
    checkboxSize: '3rem',
    labelFontColor: '#0288d1',
    labelFontSize: '1.2rem',
    checkboxGap: '6rem',
};

const vsChip: VsChipStyleSet = {
    backgroundColor: '#a5d6ad',
    borderRadius: '1.2rem',
    fontColor: '#304d30',
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
    fontColor: '#99BC85',
    clearButtonColor: '#436850',
    fontSize: '0.8rem',
    prependBackgroundColor: '#86A789',
};

const vsFooter: VsFooterStyleSet = {
    backgroundColor: 'gray',
    bottom: 0,
    fontColor: '#fff',
    display: 'flex',
    flex: '1 1 auto',
    height: '32px',
    padding: '2%',
    position: 'sticky',
    textAlign: 'start',
};

const vsHeader: VsHeaderStyleSet = {
    backgroundColor: 'gray',
    bottom: 'auto',
    fontColor: '#fff',
    display: 'flex',
    flex: '1 1 auto',
    height: '32px',
    padding: '2%',
    position: 'sticky',
    textAlign: 'start',
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
    fontColor: '#1e88e5',
};

const vsLabelValue: VsLabelValueStyleSet = {
    backgroundColor: '#f5f5f5',
    fontSize: '0.95rem',
    labelBackgroundColor: '#18122b',
    labelFontColor: '#ffffff',
    labelFontWeight: '550',
    labelWidth: '10%',
    padding: '2rem',
};

const vsLoading: VsLoadingStyleSet = {
    fontColor: '#ff90bc',
    height: '20rem',
    width: '7rem',
    barWidth: '16%',
};

const vsModal: VsModalStyleSet = {
    backgroundColor: '#FFF6E9',
    contentFontColor: '#0D9276',
    headerFontColor: '#40A2E3',
    padding: '3rem',
};

const vsNotice: VsNoticeStyleSet = {
    backgroundColor: '#ffc100',
    contentFontColor: '#fff',
    contentFontSize: '1.5rem',
    titleFontColor: '#1e5631',
    titleFontSize: '1rem',
};

const vsPage: VsPageStyleSet = {
    fontColor: '#ff90bc',
    padding: '0.8rem 1.5rem',
};

const vsPagination: VsPaginationStyleSet = {
    backgroundColor: '#1e88e5',
    borderRadius: '0.2rem',
    buttonHeight: '1.2rem',
    buttonWidth: '1.6rem',
    fontColor: '#fff',
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
    barColor: 'skyblue',
    valueColor: 'blue',
    borderRadius: '0.2rem',
    height: '0.5rem',
    width: '100%',
};

const vsRadio: VsRadioStyleSet = {
    labelFontColor: '#4e9865',
    labelFontSize: '1.2rem',
    radioColor: '#1e88e5',
    radioSize: '1.6rem',
};

const vsRadioSet: VsRadioSetStyleSet = {
    labelFontColor: '#1e88e5',
    labelFontSize: '1.2rem',
    radioColor: '#18e835',
    radioSize: '1.8rem',
    radioGap: '4rem',
};

const vsSection: VsSectionStyleSet = {
    backgroundColor: '#90caf9',
    fontColor: 'white',
};

const vsSelect: VsSelectStyleSet = {
    backgroundColor: '#FFF3CF',
    border: '1px solid #637A9F',
    fontColor: '#637A9F',
    fontSize: '1rem',
    hoverOptionBackgroundColor: '#C9D7DD',
    hoverOptionColor: '#637A9F',
    selectedOptionBackgroundColor: '#637A9F',
    selectedOptionColor: '#FFF3CF',
};

const vsStepper: VsStepperStyleSet = {
    activeBackgroundColor: 'white',
    activeColor: '#1e88e5',
    fontSize: '1.2rem',
    labelFontColor: '#90caf9',
    stepSize: '2rem',
};

const vsSwitch: VsSwitchStyleSet = {
    borderRadius: '100px',
    falseBackgroundColor: '#de1a24',
    falseBorderColor: '#000',
    falseBorderWidth: '0',
    falseFontColor: '#fff',
    falseHandleColor: '#fff',
    fontSize: '1.2rem',
    handleSize: '30px',
    height: '50px',
    trueBackgroundColor: '#056517',
    trueBorderColor: 'ivory',
    trueBorderWidth: '0',
    trueFontColor: '#fff',
    trueHandleColor: '#fff',
    width: '100px',
};

const vsTabs: VsTabsStyleSet = {
    backgroundColor: '#008db2',
    borderBottomColor: '#0288d1',
    fontColor: '#ff8919',
    fontSize: '1rem',
    fontWeight: '500',
    gap: '2px',
    height: '80px',
    padding: '2%',
    tabWidth: '400px',
};

const vsTextarea: VsTextareaStyleSet = {
    border: 'solid 1px #1e88e5',
    fontColor: '#1e88e5',
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
    borderWidth: '3.5px',
    borderRadius: '0',
    fontColor: '#ff6677',
    fontSize: '1.1rem',
    padding: '0.9rem 0.8rem',
};

const vsThemeButton: VsThemeButtonStyleSet = {
    backgroundColor: '#BACC81',
    fontColor: '#013A20',
    hoverBackgroundColor: '#478C5C',
    width: '2rem',
};

const vsValueTag: VsValueTagStyleSet = {
    backgroundColor: '#b6c4b6',
    fontColor: '#304d30',
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
    VsModal: { myStyleSet: vsModal },
    VsNotice: { myStyleSet: vsNotice },
    VsPage: { myStyleSet: vsPage },
    VsPagination: { myStyleSet: vsPagination },
    VsProgress: { myStyleSet: vsProgress },
    VsRadio: { myStyleSet: vsRadio },
    VsRadioSet: { myStyleSet: vsRadioSet },
    VsSection: { myStyleSet: vsSection },
    VsSelect: { myStyleSet: vsSelect },
    VsStepper: { myStyleSet: vsStepper },
    VsSwitch: { myStyleSet: vsSwitch },
    VsTabs: { myStyleSet: vsTabs },
    VsTextarea: { myStyleSet: vsTextarea },
    VsTextWrap: { myStyleSet: vsTextWrap },
    VsThemeButton: { myStyleSet: vsThemeButton },
    VsTooltip: { myStyleSet: vsTooltip },
    VsValueTag: { myStyleSet: vsValueTag },
};
