import './styles/index.scss';
import type { Vlossom } from './vlossom-framework';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $vs: Vlossom;
    }

    interface GlobalComponents {
        // components
        VsAccordion: typeof import('./components')['VsAccordion'];
        VsAvatar: typeof import('./components')['VsAvatar'];
        VsBlock: typeof import('./components')['VsBlock'];
        VsButton: typeof import('./components')['VsButton'];
        VsCheckbox: typeof import('./components')['VsCheckbox'];
        VsCheckboxNode: typeof import('./components')['VsCheckboxNode'];
        VsCheckboxSet: typeof import('./components')['VsCheckboxSet'];
        VsChip: typeof import('./components')['VsChip'];
        VsConfirm: typeof import('./components')['VsConfirm'];
        VsContainer: typeof import('./components')['VsContainer'];
        VsContentRenderer: typeof import('./components')['VsContentRenderer'];
        VsDivider: typeof import('./components')['VsDivider'];
        VsDrawer: typeof import('./components')['VsDrawer'];
        VsFileInput: typeof import('./components')['VsFileInput'];
        VsFocusTrap: typeof import('./components')['VsFocusTrap'];
        VsFooter: typeof import('./components')['VsFooter'];
        VsForm: typeof import('./components')['VsForm'];
        VsHeader: typeof import('./components')['VsHeader'];
        VsImage: typeof import('./components')['VsImage'];
        VsIndexItem: typeof import('./components')['VsIndexItem'];
        VsIndexView: typeof import('./components')['VsIndexView'];
        VsInput: typeof import('./components')['VsInput'];
        VsInputWrapper: typeof import('./components')['VsInputWrapper'];
        VsLabelValue: typeof import('./components')['VsLabelValue'];
        VsLayout: typeof import('./components')['VsLayout'];
        VsLoading: typeof import('./components')['VsLoading'];
        VsMessage: typeof import('./components')['VsMessage'];
        VsModal: typeof import('./components')['VsModal'];
        VsModalNode: typeof import('./components')['VsModalNode'];
        VsModalView: typeof import('./components')['VsModalView'];
        VsNotice: typeof import('./components')['VsNotice'];
        VsPage: typeof import('./components')['VsPage'];
        VsPagination: typeof import('./components')['VsPagination'];
        VsProgress: typeof import('./components')['VsProgress'];
        VsRadio: typeof import('./components')['VsRadio'];
        VsRadioNode: typeof import('./components')['VsRadioNode'];
        VsRadioSet: typeof import('./components')['VsRadioSet'];
        VsResponsive: typeof import('./components')['VsResponsive'];
        VsSection: typeof import('./components')['VsSection'];
        VsSelect: typeof import('./components')['VsSelect'];
        VsSkeleton: typeof import('./components')['VsSkeleton'];
        VsStepper: typeof import('./components')['VsStepper'];
        VsSwitch: typeof import('./components')['VsSwitch'];
        VsTable: typeof import('./components')['VsTable'];
        VsTabs: typeof import('./components')['VsTabs'];
        VsTextWrap: typeof import('./components')['VsTextWrap'];
        VsTextarea: typeof import('./components')['VsTextarea'];
        VsThemeButton: typeof import('./components')['VsThemeButton'];
        VsToast: typeof import('./components')['VsToast'];
        VsToastView: typeof import('./components')['VsToastView'];
        VsTooltip: typeof import('./components')['VsTooltip'];
    }
}

export * from './vlossom-framework';
export * from './components';
export * from './composables';
export * from './declaration';
export * from './icons';
export * from './models';
export * from './utils';
