import type { StyleSet, StyleSets } from '../src/declaration/types';
import type { VsButtonStyleSet, VsInputStyleSet, VsSectionStyleSet } from '../src/components';

const vsButton: VsButtonStyleSet = {
    backgroundColor: '#1e88e5',
    color: 'white',
};

const vsInput: VsInputStyleSet = {
    border: 'solid 1px #1e88e5',
    fontColor: '#1e88e5',
};

const vsSection: VsSectionStyleSet = {
    backgroundColor: '#90caf9',
    fontColor: 'white',
};

const exampleStyleSet: StyleSet = {
    vsButton,
    vsInput,
    vsSection,
};

export const styleSets: StyleSets = {
    myStyleSet: exampleStyleSet,
};
