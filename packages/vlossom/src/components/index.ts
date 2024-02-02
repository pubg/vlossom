export { type VsButtonStyleSet } from './vs-button/types';
export { default as VsButton } from './vs-button/VsButton.vue';

export { type VsCheckboxStyleSet } from './vs-checkbox/types';
export { default as VsCheckbox } from './vs-checkbox/VsCheckbox.vue';

export { default as VsCheckboxSet } from './vs-checkbox-set/VsCheckboxSet.vue';

export { type VsChipStyleSet } from './vs-chip/types';
export { default as VsChip } from './vs-chip/VsChip.vue';

export { default as VsContainer } from './vs-container/VsContainer.vue';

export { type VsDividerStyleSet } from './vs-divider/types';
export { default as VsDivider } from './vs-divider/VsDivider.vue';

export { type VsDrawerStyleSet } from './vs-drawer/types';
export { default as VsDrawer } from './vs-drawer/VsDrawer.vue';

export { default as VsFocusTrap } from './vs-focus-trap/VsFocusTrap.vue';

export { type VsFooterStyleSet } from './vs-footer/types';
export { default as VsFooter } from './vs-footer/VsFooter.vue';

export { default as VsForm } from './vs-form/VsForm.vue';

export { type VsHeaderStyleSet } from './vs-header/types';
export { default as VsHeader } from './vs-header/VsHeader.vue';

export { InputType, type VsInputStyleSet } from './vs-input/types';
export { default as VsInput } from './vs-input/VsInput.vue';

export { default as VsInputWrapper } from './vs-input-wrapper/VsInputWrapper.vue';

export { type VsLabelValueStyleSet } from './vs-label-value/types';
export { default as VsLabelValue } from './vs-label-value/VsLabelValue.vue';

export { default as VsMain } from './vs-main/VsMain.vue';

export { default as VsMessage } from './vs-message/VsMessage.vue';

export { type VsNoticeStyleSet } from './vs-notice/types';
export { default as VsNotice } from './vs-notice/VsNotice.vue';

export { type VsPageStyleSet } from './vs-page/types';
export { default as VsPage } from './vs-page/VsPage.vue';

export { type VsProgressStyleSet } from './vs-progress/types';
export { default as VsProgress } from './vs-progress/VsProgress.vue';

export { type VsSectionStyleSet } from './vs-section/types';
export { default as VsSection } from './vs-section/VsSection.vue';

export { type VsTabsStyleSet } from './vs-tabs/types';
export { default as VsTabs } from './vs-tabs/VsTabs.vue';

export { type VsTooltipStyleSet } from './vs-tooltip/types';
export { default as VsTooltip } from './vs-tooltip/VsTooltip.vue';

export { type VsValueTagStyleSet } from './vs-value-tag/types';
export { default as VsValueTag } from './vs-value-tag/VsValueTag.vue';

export { default as VsWrapper } from './vs-wrapper/VsWrapper.vue';

declare module 'vue' {
    interface GlobalComponents {
        VsButton: typeof import('./')['VsButton'];
        VsCheckbox: typeof import('./')['VsCheckbox'];
        VsCheckboxSet: typeof import('./')['VsCheckboxSet'];
        VsChip: typeof import('./')['VsChip'];
        VsContainer: typeof import('./')['VsContainer'];
        VsDivider: typeof import('./')['VsDivider'];
        VsDrawer: typeof import('./')['VsDrawer'];
        VsFocusTrap: typeof import('./')['VsFocusTrap'];
        VsFooter: typeof import('./')['VsFooter'];
        VsForm: typeof import('./')['VsForm'];
        VsHeader: typeof import('./')['VsHeader'];
        VsInput: typeof import('./')['VsInput'];
        VsInputWrapper: typeof import('./')['VsInputWrapper'];
        VsLabelValue: typeof import('./')['VsLabelValue'];
        VsMessage: typeof import('./')['VsMessage'];
        VsNotice: typeof import('./')['VsNotice'];
        VsPage: typeof import('./')['VsPage'];
        VsProgress: typeof import('./')['VsProgress'];
        VsSection: typeof import('./')['VsSection'];
        VsTabs: typeof import('./')['VsTabs'];
        VsTooltip: typeof import('./')['VsTooltip'];
        VsValueTag: typeof import('./')['VsValueTag'];
        VsWrapper: typeof import('./')['VsWrapper'];
    }
}
