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
        VsCheckboxSet: typeof import('./components')['VsCheckboxSet'];
        VsChip: typeof import('./components')['VsChip'];
        VsContainer: typeof import('./components')['VsContainer'];
        VsDivider: typeof import('./components')['VsDivider'];
        VsDrawer: typeof import('./components')['VsDrawer'];
        VsFileInput: typeof import('./components')['VsFileInput'];
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
        VsNotice: typeof import('./components')['VsNotice'];
        VsPage: typeof import('./components')['VsPage'];
        VsPagination: typeof import('./components')['VsPagination'];
        VsProgress: typeof import('./components')['VsProgress'];
        VsRadio: typeof import('./components')['VsRadio'];
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
        VsTooltip: typeof import('./components')['VsTooltip'];

        // nodes
        VsBarNode: typeof import('./nodes')['VsBarNode'];
        VsCheckboxNode: typeof import('./nodes')['VsCheckboxNode'];
        VsFocusTrap: typeof import('./nodes')['VsFocusTrap'];
        VsRadioNode: typeof import('./nodes')['VsRadioNode'];
    }
}

export * from './vlossom-framework';
export * from './components';
export * from './composables';
export * from './declaration';
export * from './icons';
export * from './nodes';
export * from './utils';
