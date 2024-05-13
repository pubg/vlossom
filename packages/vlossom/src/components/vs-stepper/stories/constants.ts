import { numberArray } from '@/storybook';

const stepLength = 3;
const disabledArgTypes = numberArray(stepLength, true);
const steps = Array.from({ length: stepLength }, (_, idx) => `step${idx + 1}`);

export { stepLength, disabledArgTypes, steps };
