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
    VsMenuButtonStyleSet,
    VsModalNodeStyleSet,
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
    VsTableStyleSet,
    VsTabsStyleSet,
    VsTextareaStyleSet,
    VsTextWrapStyleSet,
    VsThemeButtonStyleSet,
    VsTooltipStyleSet,
} from '@/components';

const vsAccordion: VsAccordionStyleSet = {
    backgroundColor: '#f5f5f5',
    border: '1px solid #1e88e5',
    borderRadius: '0.7rem',
    fontColor: '#1e88e5',
    padding: '0.2rem',
    title: {
        backgroundColor: '#f5f5f5',
        fontColor: '#1e88e5',
        padding: '1rem',
    },
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
    fontColor: '#fff',
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
    height: '2rem',
    padding: '0.8rem 1.5rem',
};

const vsDivider: VsDividerStyleSet = {
    border: '1px solid #7071e8',
    margin: '2rem 3rem',
};

const vsDrawer: VsDrawerStyleSet = {
    backgroundColor: '#D4F1F4',
    size: '300px',
};

const vsFileInput: VsFileInputStyleSet = {
    border: '1px solid #D4E7C5',
    backgroundColor: '#D4E7C5',
    fontColor: '#99BC85',
    fontSize: '0.8rem',
    iconBackgroundColor: '#86A789',
};

const vsFooter: VsFooterStyleSet = {
    backgroundColor: 'gray',
    fontColor: '#fff',
    height: '32px',
    padding: '2%',
};

const vsHeader: VsHeaderStyleSet = {
    backgroundColor: 'gray',
    fontColor: '#fff',
    height: '32px',
    padding: '2%',
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
    fontSize: '1.5rem',
    label: {
        backgroundColor: '#18122b',
        fontColor: '#ffffff',
        fontWeight: '550',
        width: '10%',
    },
    padding: '2rem',
};

const vsLoading: VsLoadingStyleSet = {
    fontColor: '#ff90bc',
    height: '20rem',
    width: '7rem',
    barWidth: '16%',
};

const vsMenuButton: VsMenuButtonStyleSet = {
    backgroundColor: '#1e88e5',
    border: '1px solid #1e88e5',
    borderRadius: '0.3rem',
    fontColor: '#fff',
};

const vsModal: VsModalNodeStyleSet = {
    backgroundColor: '#FFF6E9',
    fontColor: '#0D9276',
    fontSize: '1.2rem',
    width: '50%',
    height: '50%',
    padding: '3rem',
};

const vsNotice: VsNoticeStyleSet = {
    backgroundColor: '#ffc100',
    fontColor: '#fff',
    fontSize: '1.5rem',
    title: {
        fontColor: '#1e5631',
        fontSize: '3rem',
        padding: '0 2rem',
        backgroundColor: '#fdd000',
    },
};

const vsPage: VsPageStyleSet = {
    fontColor: '#ff90bc',
    padding: '0.8rem 1.5rem',
};

const vsPagination: VsPaginationStyleSet = {
    buttons: {
        backgroundColor: '#1e88e5',
        borderRadius: '0.2rem',
        height: '3rem',
        width: '2.6rem',
        fontColor: '#fff',
        fontSize: '1.5rem',
        fontWeight: '600',
    },
    gap: '0.5rem',
    selectedButton: {
        border: '2px solid blue',
        backgroundColor: '#add8e6',
        fontColor: '#1e88e5',
        fontSize: '2rem',
        fontWeight: '600',
    },
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
    optionHover: {
        backgroundColor: '#C9D7DD',
        fontColor: '#637A9F',
    },
    optionSelected: {
        backgroundColor: '#637A9F',
        fontColor: '#FFF3CF',
    },
};

const vsStepper: VsStepperStyleSet = {
    activeColor: '#1e88e5',
    fontSize: '1.2rem',
    labelFontColor: '#90caf9',
    stepSize: '2rem',
};

const vsSwitch: VsSwitchStyleSet = {
    borderRadius: '100px',
    false: {
        backgroundColor: '#de1a24',
        fontColor: '#fff',
        handleColor: '#fff',
    },
    fontSize: '1.2rem',
    handleSize: '30px',
    height: '50px',
    true: {
        backgroundColor: '#056517',
        fontColor: '#fff',
        handleColor: '#fff',
    },
    width: '100px',
};

const vsTable: VsTableStyleSet = {
    backgroundColor: 'transparent',
    border: '1px solid #eeeeee',
    fontColor: '#393E46',
    fontSize: '1.5rem',
    rowHeight: '4rem',
    caption: {
        fontColor: '#393E46',
        fontSize: '1.5rem',
        fontWeight: '600',
        textAlign: 'left',
    },
    header: {
        backgroundColor: '#222831',
        fontColor: '#00adb5',
        fontSize: '1.5rem',
        fontWeight: '500',
        height: '2.5rem',
    },
    hoverBorder: '1px solid #00adb5',
    selectedBackgroundColor: '#00adb5',
    selectedFontColor: '#eeeeee',
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
    iconColor: '#013A20',
    width: '2rem',
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
    VsMenuButton: { myStyleSet: vsMenuButton },
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
    VsTable: { myStyleSet: vsTable },
    VsTabs: { myStyleSet: vsTabs },
    VsTextarea: { myStyleSet: vsTextarea },
    VsTextWrap: { myStyleSet: vsTextWrap },
    VsThemeButton: { myStyleSet: vsThemeButton },
    VsTooltip: { myStyleSet: vsTooltip },
};
