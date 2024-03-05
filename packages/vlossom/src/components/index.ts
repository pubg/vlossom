export { type VsAccordionStyleSet } from './vs-accordion/types';
export { default as VsAccordion } from './vs-accordion/VsAccordion.vue';

export { type VsAvatarStyleSet } from './vs-avatar/types';
export { default as VsAvatar } from './vs-avatar/VsAvatar.vue';

export { type VsBlockStyleSet } from './vs-block/types';
export { default as VsBlock } from './vs-block/VsBlock.vue';

export { type VsButtonStyleSet } from './vs-button/types';
export { default as VsButton } from './vs-button/VsButton.vue';

export { type VsCheckboxStyleSet } from './vs-checkbox/types';
export { default as VsCheckbox } from './vs-checkbox/VsCheckbox.vue';

export { type VsCheckboxSetStyleSet } from './vs-checkbox-set/types';
export { default as VsCheckboxSet } from './vs-checkbox-set/VsCheckboxSet.vue';

export { type VsChipStyleSet } from './vs-chip/types';
export { default as VsChip } from './vs-chip/VsChip.vue';

export { default as VsContainer } from './vs-container/VsContainer.vue';

export { type VsDividerStyleSet } from './vs-divider/types';
export { default as VsDivider } from './vs-divider/VsDivider.vue';

export { type VsDrawerStyleSet } from './vs-drawer/types';
export { default as VsDrawer } from './vs-drawer/VsDrawer.vue';

export { type VsFileInputStyleSet } from './vs-file-input/types';
export { default as VsFileInput } from './vs-file-input/VsFileInput.vue';

export { default as VsFocusTrap } from './vs-focus-trap/VsFocusTrap.vue';

export { type VsFooterStyleSet } from './vs-footer/types';
export { default as VsFooter } from './vs-footer/VsFooter.vue';

export { default as VsForm } from './vs-form/VsForm.vue';

export { type VsHeaderStyleSet } from './vs-header/types';
export { default as VsHeader } from './vs-header/VsHeader.vue';

export { type VsImageStyleSet } from './vs-image/types';
export { default as VsImage } from './vs-image/VsImage.vue';

export { default as VsIndexView } from './vs-index-view/VsIndexView.vue';
export { default as VsIndexItem } from './vs-index-view/VsIndexItem.vue';

export { InputType, type VsInputStyleSet } from './vs-input/types';
export { default as VsInput } from './vs-input/VsInput.vue';

export { default as VsInputWrapper } from './vs-input-wrapper/VsInputWrapper.vue';

export { type VsLabelValueStyleSet } from './vs-label-value/types';
export { default as VsLabelValue } from './vs-label-value/VsLabelValue.vue';

export { type VsLoadingStyleSet } from './vs-loading/types';
export { default as VsLoading } from './vs-loading/VsLoading.vue';

export { default as VsMain } from './vs-main/VsMain.vue';

export { default as VsMessage } from './vs-message/VsMessage.vue';

export { type VsModalStyleSet } from './vs-modal/types';
export { default as VsModal } from './vs-modal/VsModal.vue';

export { type VsNoticeStyleSet } from './vs-notice/types';
export { default as VsNotice } from './vs-notice/VsNotice.vue';

export { type VsPageStyleSet } from './vs-page/types';
export { default as VsPage } from './vs-page/VsPage.vue';

export { type VsPaginationStyleSet } from './vs-pagination/types';
export { default as VsPagination } from './vs-pagination/VsPagination.vue';

export { type VsProgressStyleSet } from './vs-progress/types';
export { default as VsProgress } from './vs-progress/VsProgress.vue';

export { type VsRadioStyleSet } from './vs-radio/types';
export { default as VsRadio } from './vs-radio/VsRadio.vue';

export { type VsRadioSetStyleSet } from './vs-radio-set/types';
export { default as VsRadioSet } from './vs-radio-set/VsRadioSet.vue';

export { type VsSectionStyleSet } from './vs-section/types';
export { default as VsSection } from './vs-section/VsSection.vue';

export { type VsSelectStyleSet } from './vs-select/types';
export { default as VsSelect } from './vs-select/VsSelect.vue';

export { type VsStepperStyleSet } from './vs-stepper/types';
export { default as VsStepper } from './vs-stepper/VsStepper.vue';

export { type VsSwitchStyleSet } from './vs-switch/types';
export { default as VsSwitch } from './vs-switch/VsSwitch.vue';

export { type VsTabsStyleSet } from './vs-tabs/types';
export { default as VsTabs } from './vs-tabs/VsTabs.vue';

export { type VsTextareaStyleSet } from './vs-textarea/types';
export { default as VsTextarea } from './vs-textarea/VsTextarea.vue';

export { type VsTextWrapStyleSet } from './vs-text-wrap/types';
export { default as VsTextWrap } from './vs-text-wrap/VsTextWrap.vue';

export { type VsThemeButtonStyleSet } from './vs-theme-button/types';
export { default as VsThemeButton } from './vs-theme-button/VsThemeButton.vue';

export { type VsTooltipStyleSet } from './vs-tooltip/types';
export { default as VsTooltip } from './vs-tooltip/VsTooltip.vue';

export { type VsValueTagStyleSet } from './vs-value-tag/types';
export { default as VsValueTag } from './vs-value-tag/VsValueTag.vue';

export { default as VsWrapper } from './vs-wrapper/VsWrapper.vue';

declare module 'vue' {
    interface GlobalComponents {
        VsAccordion: typeof import('./')['VsAccordion'];
        VsAvatar: typeof import('./')['VsAvatar'];
        VsBlock: typeof import('./')['VsBlock'];
        VsButton: typeof import('./')['VsButton'];
        VsCheckbox: typeof import('./')['VsCheckbox'];
        VsCheckboxSet: typeof import('./')['VsCheckboxSet'];
        VsChip: typeof import('./')['VsChip'];
        VsContainer: typeof import('./')['VsContainer'];
        VsDivider: typeof import('./')['VsDivider'];
        VsDrawer: typeof import('./')['VsDrawer'];
        VsFileInput: typeof import('./')['VsFileInput'];
        VsFocusTrap: typeof import('./')['VsFocusTrap'];
        VsFooter: typeof import('./')['VsFooter'];
        VsForm: typeof import('./')['VsForm'];
        VsHeader: typeof import('./')['VsHeader'];
        VsImage: typeof import('./')['VsImage'];
        VsIndexView: typeof import('./')['VsIndexView'];
        VsIndexItem: typeof import('./')['VsIndexItem'];
        VsInput: typeof import('./')['VsInput'];
        VsInputWrapper: typeof import('./')['VsInputWrapper'];
        VsLabelValue: typeof import('./')['VsLabelValue'];
        VsLoading: typeof import('./')['VsLoading'];
        VsMessage: typeof import('./')['VsMessage'];
        VsModal: typeof import('./')['VsModal'];
        VsNotice: typeof import('./')['VsNotice'];
        VsPage: typeof import('./')['VsPage'];
        VsPagination: typeof import('./')['VsPagination'];
        VsProgress: typeof import('./')['VsProgress'];
        VsRadio: typeof import('./')['VsRadio'];
        VsRadioSet: typeof import('./')['VsRadioSet'];
        VsSection: typeof import('./')['VsSection'];
        VsSelect: typeof import('./')['VsSelect'];
        VsStepper: typeof import('./')['VsStepper'];
        VsSwitch: typeof import('./')['VsSwitch'];
        VsTabs: typeof import('./')['VsTabs'];
        VsTextarea: typeof import('./')['VsTextarea'];
        VsTextWrap: typeof import('./')['VsTextWrap'];
        VsThemeButton: typeof import('./')['VsThemeButton'];
        VsTooltip: typeof import('./')['VsTooltip'];
        VsValueTag: typeof import('./')['VsValueTag'];
        VsWrapper: typeof import('./')['VsWrapper'];
    }
}
