import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsStepper from '@/components/vs-stepper/VsStepper.vue';
import { mockConsoleError } from '@/test/setup';

function mountComponent() {
    return mount(VsStepper);
}

describe('vs-stepper', () => {
    describe('props & slots', () => {
        it('props steps에 string 배열을 전달하면, 그 길이만큼 steps가 생기고 배열의 각 요소가 steps의 라벨로 지정된다', () => {
            // given
            const steps = ['step1', 'step2', 'step3'];
            const wrapper = mount(VsStepper, {
                props: {
                    steps: steps,
                },
            });

            // then
            expect(wrapper.html()).toContain('step1');
            expect(wrapper.html()).toContain('step2');
            expect(wrapper.html()).toContain('step3');
            expect(wrapper.vm.$options.props.steps.validator?.(steps)).toBe(true);
        });

        it('props steps에 전달된 string 배열이 중복되면 validator가 false를 리턴한다', () => {
            // given
            const steps = ['step1', 'step1'];
            const wrapper = mount(VsStepper, {
                props: {
                    steps: steps,
                },
            });

            // then
            expect(wrapper.vm.$options.props.steps.validator?.(steps)).toBe(false);
            expect(mockConsoleError).toHaveBeenCalledTimes(2);
        });

        it('각 스텝의 step slot을 통해 step에서 표시할 내용을 커스터마이징할 수 있다', () => {
            const wrapper = mount(VsStepper, {
                props: {
                    steps: ['A', 'B', 'C'],
                },
                slots: {
                    'A-step': 'step1',
                    'B-step': 'step2',
                    'C-step': 'step3',
                },
            });

            // then
            expect(wrapper.html()).toContain('step1');
            expect(wrapper.html()).toContain('step2');
            expect(wrapper.html()).toContain('step3');
        });

        it('각 스텝의 name slot을 통해 step 하단에 표시할 이름을 커스터마이징할 수 있다', () => {
            const wrapper = mount(VsStepper, {
                props: {
                    steps: ['A', 'B', 'C'],
                },
                slots: {
                    'A-name': 'name1',
                    'B-name': 'name2',
                    'C-name': 'name3',
                },
            });

            // then
            expect(wrapper.html()).toContain('name1');
            expect(wrapper.html()).toContain('name2');
            expect(wrapper.html()).toContain('name3');
        });
    });

    describe('select', () => {
        it('step 를 click 하면 selectedStep이 해당 step index로 변경된다 (update: modelValue)', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsStepper, {
                props: {
                    steps: ['step1', 'step2', 'step3'],
                    modelValue: 2,
                    'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            const target = wrapper.findAll('li')[1];
            await target.trigger('click');

            // then
            expect(wrapper.emitted('change')?.[0]).toEqual([1]);
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1]);
            expect(wrapper.vm.selected).toEqual(1);
            expect(target.attributes('aria-selected')).toBe('true');
        });

        it('disabled 인 step은 click 이벤트가 발생하지 않는다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsStepper, {
                props: {
                    steps: ['step1', 'step2', 'step3'],
                    modelValue: 2,
                    'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    disabled: [0],
                },
            });

            // when
            const steps = wrapper.findAll('li');
            await steps[1].trigger('click');
            await steps[0].trigger('click');

            // then
            expect(wrapper.emitted('change')?.[0]).toEqual([1]);
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1]);
            expect(wrapper.vm.selected).toEqual(1);
        });
    });

    describe('gap', () => {
        it('gap prop이 없으면 width는 auto이다', () => {
            // given
            const wrapper = mount(VsStepper, {
                props: {
                    steps: ['step1', 'step2', 'step3'],
                },
            });

            // then
            expect(wrapper.vm.fixedWidth).toEqual({ width: 'auto' });
        });

        describe('gap 타입이 number인 경우', () => {
            it('gap과 (전체 step의 개수 - 1)을 곱한 값이 width가 되고 단위는 px로 지정된다 ', () => {
                // given
                const gap = 300;
                const wrapper = mount(VsStepper, {
                    props: {
                        steps: ['step1', 'step2', 'step3'],
                        gap,
                    },
                });

                // then
                expect(wrapper.vm.fixedWidth).toEqual({ width: '600px' });
            });
        });

        describe('gap 타입이 string인 경우', () => {
            it('gap 에 단위가 포함되어 있다면 단위를 제외한 값과 (전체 step의 개수 - 1)을 곱한 값이 width가 되고 단위는 string에 포함된 단위로 지정된다 ', () => {
                // given
                const gap = '300%';
                const wrapper = mount(VsStepper, {
                    props: {
                        steps: ['step1', 'step2', 'step3'],
                        gap,
                    },
                });

                // then
                expect(wrapper.vm.fixedWidth).toEqual({ width: '600%' });
            });

            it('gap 에 단위가 없다면 gap과 (전체 step의 개수 - 1)을 곱한 값이 width가 되고 단위는 px로 지정된다 ', () => {
                // given
                const gap = '300';
                const wrapper = mount(VsStepper, {
                    props: {
                        steps: ['step1', 'step2', 'step3'],
                        gap,
                    },
                });

                // then
                expect(wrapper.vm.fixedWidth).toEqual({ width: '600px' });
            });
        });
    });
});
