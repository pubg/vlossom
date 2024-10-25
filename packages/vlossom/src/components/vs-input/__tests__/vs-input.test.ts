import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { UIState } from '@/declaration';
import VsInput from './../VsInput.vue';
import { InputType } from './../types';

describe('vs-input', () => {
    describe('v-model', () => {
        describe('string type', () => {
            it('modelValue의 string 타입 초깃값을 설정할 수 있다', async () => {
                // given
                const wrapper = mount(VsInput, {
                    props: {
                        modelValue: 'initialText',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // then
                expect(wrapper.find('input').element.value).toBe('initialText');
            });

            it('modelValue를 업데이트 할 수 있다', async () => {
                // given
                const wrapper = mount(VsInput, {
                    props: {
                        modelValue: '',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('input').setValue('test');

                // then
                const updateModelValueEvent = wrapper.emitted('update:modelValue');
                expect(updateModelValueEvent).toHaveLength(1);
                expect(updateModelValueEvent?.[0]).toEqual(['test']);
            });

            it('modelValue를 바꿔서 input 값을 업데이트 할 수 있다', async () => {
                // given
                const wrapper = mount(VsInput, {
                    props: {
                        modelValue: '',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.setProps({ modelValue: 'test' });

                // then
                expect(wrapper.find('input').element.value).toBe('test');
            });

            it('modelValue의 타입이 string이 아니면 string 타입으로 가공해준다', async () => {
                // given
                const wrapper = mount(VsInput, {
                    props: {
                        modelValue: 123,
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await nextTick();

                // then
                expect(wrapper.find('input').element.value).toBe('123');
                expect(wrapper.vm.inputValue).toBe('123');
            });

            it('modelValue에 null을 할당하면 빈 문자열로 가공해준다', async () => {
                // given
                const wrapper = mount(VsInput, {
                    props: {
                        modelValue: 'hello',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.setProps({ modelValue: null });

                // then
                expect(wrapper.vm.inputValue).toBe('');
            });
        });

        describe('number type', () => {
            it('modelValue의 number 타입 초깃값을 설정할 수 있다', async () => {
                // given
                const wrapper = mount(VsInput, {
                    props: {
                        modelValue: 123,
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        type: 'number' as InputType,
                    },
                });

                // then
                expect(wrapper.find('input').element.value).toBe('123');
            });

            it('modelValue를 업데이트 할 수 있다', async () => {
                // given
                const wrapper = mount(VsInput, {
                    props: {
                        modelValue: 8008,
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        type: 'number' as InputType,
                    },
                });

                // when
                await wrapper.find('input').setValue(8080);

                // then
                expect(wrapper.vm.inputValue).toBe(8080);
            });

            it('modelValue를 바꿔서 input 값을 업데이트 할 수 있다', async () => {
                // given
                const wrapper = mount(VsInput, {
                    props: {
                        modelValue: 5000,
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        type: 'number' as InputType,
                    },
                });

                // when
                await wrapper.setProps({ modelValue: 6000 });

                // then
                expect(wrapper.vm.inputValue).toBe(6000);
            });

            it('modelValue의 타입이 number가 아니면 number 타입으로 가공해준다', async () => {
                // given
                const wrapper = mount(VsInput, {
                    props: {
                        modelValue: '123',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        type: 'number' as InputType,
                    },
                });

                // when
                await nextTick();

                // then
                expect(wrapper.find('input').element.value).toBe('123');
                expect(wrapper.vm.inputValue).toBe(123);
            });
        });
    });

    describe('v-model modifier', () => {
        it('capitalize', async () => {
            // given
            const wrapper = mount(VsInput, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    modelModifiers: {
                        capitalize: true,
                    },
                },
            });

            // when
            await wrapper.find('input').setValue('test');

            // then
            expect(wrapper.props('modelValue')).toBe('Test');
        });

        it('lower', async () => {
            // given
            const wrapper = mount(VsInput, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    modelModifiers: {
                        lower: true,
                    },
                },
            });

            // when
            await wrapper.find('input').setValue('TEST');

            // then
            expect(wrapper.props('modelValue')).toBe('test');
        });

        it('upper', async () => {
            // given
            const wrapper = mount(VsInput, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    modelModifiers: {
                        upper: true,
                    },
                },
            });

            // when
            await wrapper.find('input').setValue('test');

            // then
            expect(wrapper.props('modelValue')).toBe('TEST');
        });
    });

    describe('autocomplete', () => {
        it('input element에 autocomplete를 설정할 수 있다', () => {
            // given
            // when
            const wrapper = mount(VsInput, {
                props: {
                    autocomplete: true,
                },
            });

            // then
            expect(wrapper.find('input').attributes('autocomplete')).toBe('on');
        });
    });

    describe('clear', () => {
        it('value가 있으면 clear 버튼이 활성화된다', async () => {
            // given
            const wrapper = mount(VsInput, {
                props: {
                    modelValue: 'initialText',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // then
            const clearButton = wrapper.find<HTMLButtonElement>('button.vs-clear-button');
            expect(clearButton.element.disabled).toBeFalsy();
            expect(clearButton.classes()).toContain('show');
        });

        it('value가 없으면 clear 버튼이 활성화되지 않는다', async () => {
            // given
            const wrapper = mount(VsInput, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            await wrapper.find('.vs-input').trigger('mouseover');

            // then
            const clearButton = wrapper.find<HTMLButtonElement>('button.vs-clear-button');
            expect(clearButton.element.disabled).toBeTruthy();
            expect(clearButton.classes()).not.toContain('show');
        });

        it('clear 버튼을 누르면 input 값을 초기화 할 수 있다', async () => {
            // given
            const wrapper = mount(VsInput, {
                props: {
                    modelValue: 'initialText',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            await wrapper.find('.vs-input').trigger('mouseover');
            await wrapper.find('button').trigger('click');

            // then
            expect(wrapper.find('input').element.value).toBe('');
            expect(wrapper.props('modelValue')).toBe('');
        });

        it('clear 함수를 호출하면 input 값을 초기화 할 수 있다', async () => {
            // given
            const wrapper = mount(VsInput, {
                props: {
                    modelValue: 'initialText',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            wrapper.vm.clear();
            await nextTick();

            // then
            expect(wrapper.find('input').element.value).toBe('');
        });
    });

    describe('prepend / append', () => {
        it('prepend content slot을 설정할 수 있다', async () => {
            // given
            const wrapper = mount(VsInput, {
                slots: {
                    prepend: 'this is content',
                },
            });

            // then
            expect(wrapper.find('div.vs-prepend').exists()).toBe(true);
            expect(wrapper.html()).toContain('this is content');
        });

        it('append content slot을 설정할 수 있다', async () => {
            // given
            const wrapper = mount(VsInput, {
                slots: {
                    append: 'this is content',
                },
            });

            // then
            expect(wrapper.find('div.vs-append').exists()).toBe(true);
            expect(wrapper.html()).toContain('this is content');
        });
    });

    describe('focus / blur', () => {
        it('focus 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper = mount(VsInput);

            // when
            await wrapper.find('input').trigger('focus');

            // then
            expect(wrapper.emitted('focus')).toHaveLength(1);
        });

        it('blur 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper = mount(VsInput);

            // when
            await wrapper.find('input').trigger('blur');

            // then
            expect(wrapper.emitted('blur')).toHaveLength(1);
        });
    });

    describe('enter', () => {
        it('enter 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper = mount(VsInput);

            // when
            await wrapper.find('input').trigger('keyup.enter');

            // then
            expect(wrapper.emitted('enter')).toHaveLength(1);
        });
    });

    describe('rules', () => {
        it('required 체크가 가능하다', async () => {
            // given
            const wrapper = mount(VsInput, {
                props: {
                    modelValue: 'test',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    required: true,
                },
            });

            // when
            await nextTick();
            await wrapper.find('input').setValue('');

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.vm.computedMessages[0].state).toEqual(UIState.Error);
            expect(wrapper.vm.computedMessages[0].text).toEqual('required');
        });

        it('input type이 number가 아닐 때 max 길이 체크가 가능하다', async () => {
            // given
            const wrapper = mount(VsInput, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    max: 3,
                },
            });

            // when
            await nextTick();
            await wrapper.find('input').setValue('test');

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.vm.computedMessages[0].state).toEqual(UIState.Error);
            expect(wrapper.vm.computedMessages[0].text).toEqual('max length: 3');
        });

        it('input type이 number가 아닐 때 min 길이 체크가 가능하다', async () => {
            // given
            const wrapper = mount(VsInput, {
                props: {
                    modelValue: 'test',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    min: 3,
                },
            });

            // when
            await nextTick();
            await wrapper.find('input').setValue('te');

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.vm.computedMessages[0].state).toEqual(UIState.Error);
            expect(wrapper.vm.computedMessages[0].text).toEqual('min length: 3');
        });

        it('input type이 number 일 때 max 값 체크가 가능하다', async () => {
            // given
            const wrapper = mount(VsInput, {
                props: {
                    modelValue: 0,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    type: 'number' as InputType,
                    max: 3,
                },
            });

            // when
            await nextTick();
            await wrapper.find('input').setValue('4');

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.vm.computedMessages[0].state).toEqual(UIState.Error);
            expect(wrapper.vm.computedMessages[0].text).toEqual('max value: 3');
        });

        it('input type이 number 일 때 min 값 체크가 가능하다', async () => {
            // given
            const wrapper = mount(VsInput, {
                props: {
                    modelValue: 4,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    type: 'number' as InputType,
                    min: 3,
                },
            });

            // when
            await nextTick();
            await wrapper.find('input').setValue('2');

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.vm.computedMessages[0].state).toEqual(UIState.Error);
            expect(wrapper.vm.computedMessages[0].text).toEqual('min value: 3');
        });
    });

    describe('validate', () => {
        it('valid 할 때 validate 함수를 호출하면 true를 리턴한다', async () => {
            // given
            const wrapper = mount(VsInput, {
                props: {
                    modelValue: 'test',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    required: true,
                },
            });

            // then
            expect(wrapper.vm.validate()).toBe(true);
        });

        it('invalid 할 때 validate 함수를 호출하면 false를 리턴한다', async () => {
            // given
            const wrapper = mount(VsInput, {
                props: {
                    modelValue: '',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    required: true,
                },
            });

            // then
            expect(wrapper.vm.validate()).toBe(false);
        });
    });
});
