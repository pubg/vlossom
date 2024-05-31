import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import VsSwitch from './../VsSwitch.vue';

function mountComponent() {
    return mount(VsSwitch);
}

describe('vs-switch', () => {
    describe('v-model', () => {
        it('modelValue의 초깃값을 설정할 수 있다', () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    modelValue: true,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // then
            expect(wrapper.vm.isChecked).toBe(true);
        });
        it('modelValue를 업데이트할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    modelValue: false,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            const target = wrapper.find('div.vs-switch-button');
            await target.trigger('click');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0][0]).toEqual(true);
        });
        it('modelValue를 업데이트해서 switch 값을 업데이트할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    modelValue: false,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            await wrapper.setProps({ modelValue: true });

            // then
            expect(wrapper.vm.isChecked).toBe(true);
        });
        it('modelValue가 null이면 false로 가공된다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    modelValue: null,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            await nextTick();

            // then
            expect(wrapper.vm.isChecked).toBe(false);
            expect(wrapper.props('modelValue')).toBe(false);
        });
        it('modelValue가 undefined이면 false로 가공된다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    modelValue: undefined,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            await nextTick();

            // then
            expect(wrapper.vm.isChecked).toBe(false);
            expect(wrapper.props('modelValue')).toBe(false);
        });
        it('modelValue에 null을 할당해도 falseValue로 보정해준다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    modelValue: false,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    trueValue: 'hello',
                    falseValue: 'world',
                },
            });

            // when
            await wrapper.setProps({ modelValue: null });

            // then
            expect(wrapper.vm.isChecked).toBe(false);
            expect(wrapper.vm.inputValue).toBe('world');
            expect(wrapper.props('modelValue')).toBe('world');
        });
    });

    describe('v-model ( array )', () => {
        describe('initial value', () => {
            it('modelValue가 null인 경우 빈 배열로 보정된다', () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                    props: {
                        multiple: true,
                        modelValue: null,
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // then
                expect(wrapper.vm.isChecked).toBe(false);
                expect(wrapper.vm.inputValue).toEqual([]);
            });

            it('modelValue 초깃값의 원소 중 하나라도 trueValue와 일치하면 switch의 값은 true이다', () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                    props: {
                        multiple: true,
                        modelValue: ['A'],
                        trueValue: 'A',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // then
                expect(wrapper.vm.isChecked).toBe(true);
                expect(wrapper.vm.inputValue).toEqual(['A']);
            });
            it('object array 타입으로 modelValue의 초깃값을 설정할 수 있다', () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                    props: {
                        multiple: true,
                        modelValue: [{ id: 'A' }],
                        trueValue: { id: 'A' },
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // then
                expect(wrapper.vm.isChecked).toBe(true);
            });
        });

        describe('modelValue와 switch 값을 업데이트할 수 있다', () => {
            it('modelValue에 null을 할당하면 빈 배열로 보정된다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                    props: {
                        multiple: true,
                        modelValue: ['A'],
                        trueValue: 'A',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.setProps({ modelValue: null });

                // then
                expect(wrapper.vm.isChecked).toBe(false);
                expect(wrapper.vm.inputValue).toEqual([]);
            });

            it('switch 값을 true로 업데이트하면 trueValue가 modelValue배열에 포함된다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                    props: {
                        multiple: true,
                        modelValue: [],
                        trueValue: 'A',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                const target = wrapper.find('div.vs-switch-button');
                await target.trigger('click');

                // then
                const updateModelValueEvent = wrapper.emitted('update:modelValue');
                expect(updateModelValueEvent).toHaveLength(1);
                expect(updateModelValueEvent?.[0][0]).toEqual(['A']);
            });
            it('array 타입 modelValue를 바꿔서 switch의 값을 업데이트 할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                    props: {
                        multiple: true,
                        modelValue: [],
                        trueValue: 'A',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.setProps({ modelValue: ['A'] });

                // then
                expect(wrapper.vm.isChecked).toBe(true);
            });
            it('object array 타입으로 modelValue 를 업데이트 할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                    props: {
                        multiple: true,
                        modelValue: [],
                        trueValue: { id: 'A' },
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                const target = wrapper.find('div.vs-switch-button');
                await target.trigger('click');

                // then
                const updateModelValueEvent = wrapper.emitted('update:modelValue');
                expect(updateModelValueEvent).toHaveLength(1);
                expect(updateModelValueEvent?.[0][0]).toEqual([{ id: 'A' }]);
            });
            it('object array 타입 modelValue를 바꿔서 switch의 값을 업데이트 할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                    props: {
                        multiple: true,
                        modelValue: [],
                        trueValue: { id: 'A' },
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.setProps({ modelValue: [{ id: 'A' }] });

                // then
                expect(wrapper.vm.isChecked).toBe(true);
            });
        });
    });

    describe('true / false value', () => {
        it('trueValue, falseValue를 설정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    trueValue: 'A',
                    falseValue: 'B',
                    modelValue: 'A',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // then
            expect(wrapper.vm.isChecked).toBe(true);
        });
        it('switch 를 true로 업데이트하면 modelValue를 trueValue 값으로 업데이트 한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    trueValue: 'A',
                    falseValue: 'B',
                    modelValue: 'B',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            const target = wrapper.find('div.vs-switch-button');
            await target.trigger('click');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0][0]).toEqual('A');
        });
        it('switch를 false로 업데이트하면 modelValue를 falseValue 값으로 업데이트 한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    trueValue: 'A',
                    falseValue: 'B',
                    modelValue: 'A',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            const target = wrapper.find('div.vs-switch-button');
            await target.trigger('click');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0][0]).toEqual('B');
        });
        it('object 타입 trueValue, falseValue를 설정할 수 있다', () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    trueValue: { id: 'A' },
                    falseValue: { id: 'B' },
                    modelValue: { id: 'A' },
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // then
            expect(wrapper.vm.isChecked).toBe(true);
        });
    });
    describe('true / false label', () => {
        it('false-label을 설정할 수 있다', () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    falseLabel: 'Rejected',
                    modelValue: false,
                },
            });

            // then
            const label = wrapper.find('.status-label[data-value=false]');
            expect(label.isVisible()).toBe(true);
            expect(label.text()).toBe('Rejected');
        });
        it('true-label을 설정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    trueLabel: 'Approved',
                    modelValue: false,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            const target = wrapper.find('div.vs-switch-button');
            await target.trigger('click');

            // then
            const label = wrapper.find('.status-label[data-value=true]');
            expect(label.isVisible()).toBe(true);
            expect(label.text()).toBe('Approved');
        });
    });

    describe('disabled', () => {
        it('disabled 일 때는 modelValue가 업데이트되지 않는다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    disabled: true,
                    modelValue: false,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            const target = wrapper.find('div.vs-switch-button');
            await target.trigger('click');

            // then
            expect(wrapper.emitted('update:modelValue')).toBeUndefined();
        });
    });

    describe('readonly', () => {
        it('readonly 일 때는 modelValue가 업데이트되지 않는다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    readonly: true,
                    modelValue: false,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            const target = wrapper.find('div.vs-switch-button');
            await target.trigger('click');

            // then
            expect(wrapper.emitted('update:modelValue')).toBeUndefined();
        });
    });
    describe('clear', () => {
        describe('multiple 이 true이고 v-model이 array 타입인 경우', () => {
            it('clear 함수를 호출하면 빈 배열로 업데이트된다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                    props: {
                        multiple: true,
                        trueValue: 'A',
                        modelValue: ['A', 'B'],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                wrapper.vm.clear();
                await nextTick();

                // then
                expect(wrapper.vm.isChecked).toBe(false);
                expect(wrapper.props('modelValue')).toEqual([]);
            });
        });

        describe('multiple 이 false 이거나 v-model이 array 타입이 아닌 경우', () => {
            it('clear 함수를 호출하면 falseValue 값으로 업데이트 할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                    props: {
                        modelValue: true,
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                wrapper.vm.clear();
                await nextTick();

                // then
                expect(wrapper.vm.isChecked).toBe(false);
                expect(wrapper.props('modelValue')).toBe(false);
            });
        });
    });
    describe('rules', () => {
        it('required 체크가 가능하다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    modelValue: true,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    required: true,
                },
            });

            // when
            await nextTick();
            await wrapper.find('input').setValue(false);

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.html()).toContain('required');
        });
    });
    describe('validate', () => {
        it('valid 할 때 validate 함수를 호출하면 true를 반환한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    modelValue: true,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    required: true,
                },
            });

            // then
            expect(wrapper.vm.validate()).toBe(true);
        });

        it('invalid 할 때 validate 함수를 호출하면 false를 반환한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    modelValue: false,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    required: true,
                },
            });

            // then
            expect(wrapper.vm.validate()).toBe(false);
        });
    });

    describe('before change', () => {
        afterEach(() => {
            vi.restoreAllMocks();
        });

        it('beforeChange 함수에 from, to 인자가 전달된다', async () => {
            // given
            const beforeChange = vi.fn().mockResolvedValue(true);
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    modelValue: false,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    beforeChange,
                },
            });

            // when
            await wrapper.find('input').setValue(true);

            // then
            expect(beforeChange).toHaveBeenCalledWith(false, true);
        });

        it('beforeChange 함수가 Promise<true>를 리턴하면 값이 업데이트 된다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    modelValue: false,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    beforeChange: () => Promise.resolve(true),
                },
            });

            // when
            await wrapper.find('div.vs-switch-button').trigger('click');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0][0]).toEqual(true);
        });

        it('beforeChange 함수가 Promise<false>를 리턴하면 값이 업데이트 되지 않는다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch, {
                props: {
                    modelValue: false,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    beforeChange: () => Promise.resolve(false),
                },
            });

            // when
            await wrapper.find('div.vs-switch-button').trigger('click');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toBeUndefined();
        });
    });

    describe('focus / blur', () => {
        it('focus 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch);
            // when
            await wrapper.find('div.vs-switch-button').trigger('focus');
            // then
            expect(wrapper.emitted('focus')).toHaveLength(1);
        });
        it('blur 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSwitch);

            // when
            await wrapper.find('div.vs-switch-button').trigger('blur');

            // then
            expect(wrapper.emitted('blur')).toHaveLength(1);
        });
    });
});
