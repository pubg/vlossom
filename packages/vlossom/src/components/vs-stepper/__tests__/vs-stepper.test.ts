import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsStepper from './../VsStepper.vue';
import { mockConsoleWarn } from '@/test/setup';

describe('vs-steps', () => {
    const steps = ['step1', 'step2', 'step3', 'step4', 'step5'];

    describe('steps', () => {
        it('steps를 설정한 만큼 step이 생성된다', () => {
            // given
            const wrapper = mount(VsStepper, {
                props: { steps },
            });

            // when
            const stepItems = wrapper.findAll('.vs-step-item');

            // then
            expect(stepItems).toHaveLength(steps.length);
        });

        it('disabled에 설정한 탭은 disabled 되어 있다', () => {
            // given
            const disabled = [0, 2];
            const wrapper = mount(VsStepper, {
                props: { steps, disabled },
            });

            // when
            const stepItems = wrapper.findAll('.vs-step-item');

            // then
            expect(stepItems.filter((t) => t.classes().includes('vs-disabled'))).toHaveLength(disabled.length);
        });

        it('disabled의 범위가 전체 length를 벗어나면 warning message를 보여준다', () => {
            // given
            const disabled = [100];
            mount(VsStepper, {
                props: { steps, disabled },
            });

            // then
            expect(mockConsoleWarn).toHaveBeenCalled();
        });
    });

    describe('step select', () => {
        it('초기 index는 0이다', () => {
            // given
            const wrapper = mount(VsStepper, {
                props: { steps },
            });

            // then
            expect(wrapper.vm.selectedIndex).toEqual(0);
        });

        it('step을 click하면 선택된 index가 바뀐다', async () => {
            // given
            const wrapper = mount(VsStepper, {
                props: {
                    steps,
                    modelValue: 0,
                    'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            const stepItems = wrapper.findAll('.vs-step-item');
            await stepItems[2].trigger('click');

            // then
            expect(wrapper.vm.selectedIndex).toEqual(2);
            expect(wrapper.vm.modelValue).toEqual(2);
        });

        describe('step index with modelValue', () => {
            it('modelValue로 원하는 index로 변경할 수 있다', async () => {
                // given
                const wrapper = mount(VsStepper, {
                    props: {
                        steps,
                        modelValue: 2,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(2);
                await wrapper.setProps({ modelValue: 3 });
                expect(wrapper.vm.selectedIndex).toEqual(3);
            });

            it('-1로 초깃값을 설정하면 step을 선택하지 않은 상태로 render 된다', () => {
                // given
                const wrapper = mount(VsStepper, {
                    props: {
                        steps,
                        modelValue: -1,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // then
                const selectedTab = wrapper.find('.vs-step-item.vs-selected');
                expect(selectedTab.exists()).toBeFalsy();
                expect(wrapper.vm.selectedIndex).toEqual(-1);
            });

            it('modelValue를 -1로 전달하면 step을 선택하지 않는다', async () => {
                // given
                const wrapper = mount(VsStepper, {
                    props: {
                        steps,
                        modelValue: 0,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.setProps({ modelValue: -1 });

                // then
                const selectedTab = wrapper.find('.vs-step-item.vs-selected');
                expect(selectedTab.exists()).toBeFalsy();
                expect(wrapper.vm.selectedIndex).toEqual(-1);
            });

            it('modelValue가 -1보다 작으면 index가 -1로 보정된다', async () => {
                // given
                const wrapper = mount(VsStepper, {
                    props: {
                        steps,
                        modelValue: 0,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.setProps({ modelValue: -5 });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(-1);
            });

            it('modelValue가 steps length보다 크면 index가 -1로 보정된다', async () => {
                // given
                const wrapper = mount(VsStepper, {
                    props: {
                        steps,
                        modelValue: 0,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.setProps({ modelValue: 10 });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(-1);
            });
        });

        describe('첫번째 탭이 disabled 상태이면 선택 가능한 첫번째 탭으로 index를 보정한다', () => {
            it('초기 상태에 index 0이 disabled이면 그 다음 선택 가능한 다음 step으로 index가 보정된다', () => {
                // given
                const disabled = [0, 1];
                const wrapper = mount(VsStepper, {
                    props: { steps, disabled },
                });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(2);
            });

            it('modelValue가 disabled step에 지정되면 index가 -1로 보정된다', async () => {
                // given
                const disabled = [3];
                const wrapper = mount(VsStepper, {
                    props: {
                        steps,
                        disabled,
                        modelValue: 0,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.setProps({ modelValue: 3 });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(-1);
            });

            it('선택 가능한 step이 하나도 없으면 index를 -1로 보정한다', async () => {
                // given
                const disabled = [0, 1, 2, 3, 4];
                const wrapper = mount(VsStepper, {
                    props: {
                        steps,
                        disabled,
                    },
                });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(-1);
            });
        });

        describe('steps 변경됐을 때', () => {
            it('첫번쨰 탭으로 index를 보정한다', async () => {
                // given
                const wrapper = mount(VsStepper, {
                    props: { steps },
                });

                // when
                await wrapper.setProps({ steps: ['step6', 'step7', 'step8'] });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(0);
            });

            it('첫번째 탭이 disabled 상태이면 선택 가능한 첫번째 탭으로 index를 보정한다', async () => {
                // given
                const wrapper = mount(VsStepper, {
                    props: { steps },
                });

                // when
                await wrapper.setProps({ steps: ['step6', 'step7', 'step8'], disabled: [0, 1] });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(2);
            });
        });
    });

    describe('keyboard control', () => {
        describe('left arrow 키를 눌렀을 때', () => {
            it('왼쪽 step을 선택한다', async () => {
                // given
                const wrapper = mount(VsStepper, {
                    props: {
                        steps,
                        modelValue: 2,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-step-item.vs-selected').trigger('keydown', { code: 'ArrowLeft' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(1);
                expect(wrapper.vm.modelValue).toEqual(1);
            });

            it('왼쪽에 disabled 된 step이 있다면 이전 선택 가능한 step을 선택한다', async () => {
                // given
                const wrapper = mount(VsStepper, {
                    props: {
                        steps,
                        disabled: [2],
                        modelValue: 3,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-step-item.vs-selected').trigger('keydown', { code: 'ArrowLeft' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(1);
                expect(wrapper.vm.modelValue).toEqual(1);
            });

            it('더 왼쪽으로 갈 수 없다면 index가 유지된다', async () => {
                // given
                const wrapper = mount(VsStepper, {
                    props: {
                        steps,
                        disabled: [0, 1],
                        modelValue: 2,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-step-item.vs-selected').trigger('keydown', { code: 'ArrowLeft' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(2);
                expect(wrapper.vm.modelValue).toEqual(2);
            });
        });

        describe('right arrow 키를 눌렀을 때', () => {
            it('오른쪽 step을 선택한다', async () => {
                // given
                const wrapper = mount(VsStepper, {
                    props: {
                        steps,
                        modelValue: 2,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-step-item.vs-selected').trigger('keydown', { code: 'ArrowRight' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(3);
                expect(wrapper.vm.modelValue).toEqual(3);
            });

            it('오른쪽에 disabled 된 step이 있다면 다음 선택 가능한 step을 선택한다', async () => {
                // given
                const wrapper = mount(VsStepper, {
                    props: {
                        steps,
                        disabled: [2],
                        modelValue: 1,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-step-item.vs-selected').trigger('keydown', { code: 'ArrowRight' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(3);
                expect(wrapper.vm.modelValue).toEqual(3);
            });

            it('더 왼쪽으로 갈 수 없다면 index가 유지된다', async () => {
                // given
                const wrapper = mount(VsStepper, {
                    props: {
                        steps,
                        disabled: [3, 4],
                        modelValue: 2,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-step-item.vs-selected').trigger('keydown', { code: 'ArrowRight' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(2);
                expect(wrapper.vm.modelValue).toEqual(2);
            });
        });

        describe('home 키를 눌렀을 때', () => {
            it('맨 처음 step을 선택한다', async () => {
                // given
                const wrapper = mount(VsStepper, {
                    props: {
                        steps,
                        modelValue: 2,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-step-item.vs-selected').trigger('keydown', { code: 'Home' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(0);
                expect(wrapper.vm.modelValue).toEqual(0);
            });

            it('disabled가 있을 때 앞쪽에서 선택 가능한 맨 앞 step을 선택한다', async () => {
                // given
                const wrapper = mount(VsStepper, {
                    props: {
                        steps,
                        disabled: [0, 1],
                        modelValue: 4,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-step-item.vs-selected').trigger('keydown', { code: 'Home' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(2);
                expect(wrapper.vm.modelValue).toEqual(2);
            });
        });

        describe('end 키를 눌렀을 때', () => {
            it('맨 마지막 step을 선택한다', async () => {
                // given
                const wrapper = mount(VsStepper, {
                    props: {
                        steps,
                        modelValue: 2,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-step-item.vs-selected').trigger('keydown', { code: 'End' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(4);
                expect(wrapper.vm.modelValue).toEqual(4);
            });

            it('disabled가 있을 때 뒤쪽에서 선택 가능한 맨 마지막 step을 선택한다', async () => {
                // given
                const wrapper = mount(VsStepper, {
                    props: {
                        steps,
                        disabled: [3, 4],
                        modelValue: 0,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-step-item.vs-selected').trigger('keydown', { code: 'End' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(2);
                expect(wrapper.vm.modelValue).toEqual(2);
            });
        });
    });
});
