import { numberArray } from '@/storybook';

const tabLength = 15;
const disabledArgTypes = numberArray(tabLength, true);
const tabs = Array.from({ length: tabLength }, (_, idx) => `tab${idx + 1}`);

export { tabLength, disabledArgTypes, tabs };
