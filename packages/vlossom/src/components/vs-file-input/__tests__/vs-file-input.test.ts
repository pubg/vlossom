import { describe, expect, it, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import VsFileInput from '../VsFileInput.vue';
import { nextTick } from 'vue';

function mountComponent() {
    return mount(VsFileInput);
}

const file = new File(['content'], 'test-file.txt', { type: 'text/plain' });
const file2 = new File(['content'], 'test-file2.txt', { type: 'text/plain' });

const event = {
    target: {
        files: [file],
    },
};

const multipleEvent = {
    target: {
        files: [file, file2],
    },
};

describe('vs-file-input', () => {
    describe('default mode', () => {
        let wrapper: ReturnType<typeof mountComponent>;

        beforeEach(() => {
            wrapper = mount(VsFileInput, {
                props: {
                    modelValue: null,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                },
            });
        });

        describe('v-model', () => {
            it('modelValue를 업데이트 할 수 있다', async () => {
                // when
                wrapper.vm.updateValue(event as any);
                await nextTick();

                // then
                expect(wrapper.vm.inputValue).toEqual(file);
            });

            it('modelValue의 초깃값이 배열이라면 null로 보정한다', async () => {
                //given
                wrapper = mount(VsFileInput, {
                    props: {
                        modelValue: [],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await nextTick();

                // then
                expect(wrapper.vm.inputValue).toBe(null);
            });

            it('modelValue에 배열을 할당하면 null로 보정한다', async () => {
                // given
                wrapper = mount(VsFileInput, {
                    props: {
                        modelValue: null,
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.setProps({ modelValue: [] });

                // then
                expect(wrapper.vm.inputValue).toBe(null);
            });
        });

        describe('file label', () => {
            it('file 정보를 보여준다', async () => {
                // when
                wrapper.vm.updateValue(event as any);
                await nextTick();

                // then
                expect(wrapper.html()).toContain('test-file.txt');
            });
        });

        describe('clear', () => {
            it('input 영역을 mouse over 하면 clear 버튼이 나타난다', async () => {
                // when
                wrapper.vm.updateValue(event as any);

                await wrapper.find('input').trigger('mouseover');

                // then
                expect(wrapper.find('button').exists()).toBe(true);
            });

            it('value가 없으면 input 영역을 mouse over 하여도 clear 버튼이 나타나지 않는다', async () => {
                // when
                await wrapper.find('input').trigger('mouseover');

                // then
                expect(wrapper.find('button').exists()).toBe(false);
            });

            it('clear 버튼을 누르면 input 값을 초기화 할 수 있다', async () => {
                // when
                wrapper.vm.updateValue(event as any);

                await wrapper.find('input').trigger('mouseover');
                await wrapper.find('button').trigger('click');

                // then
                const updateModelValueEvent = wrapper.emitted('update:modelValue');
                expect(updateModelValueEvent).toHaveLength(2);
                expect(updateModelValueEvent?.[1]).toEqual([null]);
            });

            it('clear 함수를 호출하면 input 값을 초기화 할 수 있다', async () => {
                // when
                wrapper.vm.updateValue(event as any);
                await nextTick();

                wrapper.vm.clear();
                await nextTick();

                // then
                const updateModelValueEvent = wrapper.emitted('update:modelValue');
                expect(updateModelValueEvent).toHaveLength(2);
                expect(updateModelValueEvent?.[1]).toEqual([null]);
            });
        });

        describe('rules', () => {
            it('required 체크가 가능하다', async () => {
                // given
                wrapper = mount(VsFileInput, {
                    props: {
                        modelValue: null,
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        required: true,
                    },
                });

                // when
                wrapper.vm.updateValue(event as any);
                await nextTick();

                wrapper.vm.updateValue({
                    target: {
                        files: [],
                    },
                } as any);
                await nextTick();

                // then
                expect(wrapper.vm.computedMessages).toHaveLength(1);
                expect(wrapper.html()).toContain('required');
            });
        });

        describe('validate', () => {
            it('valid 할 때 validate 함수를 호출하면 true를 리턴한다', async () => {
                // given
                wrapper = mount(VsFileInput, {
                    props: {
                        modelValue: null,
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        required: true,
                    },
                });

                //when
                wrapper.vm.updateValue(event as any);
                await nextTick();

                // then
                expect(wrapper.vm.validate()).toBe(true);
            });

            it('invalid 할 때 validate 함수를 호출하면 false를 리턴한다', async () => {
                // given
                wrapper = mount(VsFileInput, {
                    props: {
                        modelValue: null,
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        required: true,
                    },
                });

                // then
                expect(wrapper.vm.validate()).toBe(false);
            });
        });
    });

    describe('multiple mode', () => {
        let wrapper: ReturnType<typeof mountComponent>;

        beforeEach(() => {
            wrapper = mount(VsFileInput, {
                props: {
                    modelValue: [],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    multiple: true,
                },
            });
        });

        describe('v-model', () => {
            it('modelValue를 업데이트 할 수 있다', async () => {
                // when
                wrapper.vm.updateValue(multipleEvent as any);
                await nextTick();

                // then
                const updateModelValueEvent = wrapper.emitted('update:modelValue');
                expect(updateModelValueEvent).toHaveLength(1);
                expect(updateModelValueEvent?.[0]).toEqual([[file, file2]]);
            });

            it('modelValue가 배열이 아니라면 빈 배열로 보정한다', async () => {
                // given
                wrapper = mount(VsFileInput, {
                    props: {
                        modelValue: null,
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        multiple: true,
                    },
                });

                // when
                await nextTick();

                // then
                expect(wrapper.vm.inputValue).toEqual([]);
            });

            it('modelValue에 배열이 아닌 값을 할당하면 빈 배열로 보정한다', async () => {
                // given
                wrapper = mount(VsFileInput, {
                    props: {
                        modelValue: file,
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        multiple: true,
                    },
                });

                // when
                await nextTick();

                // then
                expect(wrapper.vm.inputValue).toEqual([]);
            });
        });

        describe('file label', () => {
            it('file 정보를 보여준다', async () => {
                // when
                wrapper.vm.updateValue(multipleEvent as any);
                await nextTick();

                // then
                expect(wrapper.html()).toContain('test-file.txt (+ 1 files)');
            });
        });

        describe('clear', () => {
            it('input 영역을 mouse over 하면 clear 버튼이 나타난다', async () => {
                // when
                wrapper.vm.updateValue(multipleEvent as any);

                await wrapper.find('input').trigger('mouseover');

                // then
                expect(wrapper.find('button').exists()).toBe(true);
            });

            it('value가 없으면 input 영역을 mouse over 하여도 clear 버튼이 나타나지 않는다', async () => {
                // when
                await wrapper.find('input').trigger('mouseover');

                // then
                expect(wrapper.find('button').exists()).toBe(false);
            });

            it('clear 버튼을 누르면 input 값을 초기화 할 수 있다', async () => {
                // when
                wrapper.vm.updateValue(multipleEvent as any);

                await wrapper.find('input').trigger('mouseover');
                await wrapper.find('button').trigger('click');

                // then
                const updateModelValueEvent = wrapper.emitted('update:modelValue');
                expect(updateModelValueEvent).toHaveLength(2);
                expect(updateModelValueEvent?.[1]).toEqual([[]]);
            });

            it('clear 함수를 호출하면 input 값을 초기화 할 수 있다', async () => {
                // when
                wrapper.vm.updateValue(multipleEvent as any);
                await nextTick();

                wrapper.vm.clear();
                await nextTick();

                // then
                const updateModelValueEvent = wrapper.emitted('update:modelValue');
                expect(updateModelValueEvent).toHaveLength(2);
                expect(updateModelValueEvent?.[1]).toEqual([[]]);
            });
        });

        describe('rules', () => {
            it('required 체크가 가능하다', async () => {
                // given
                wrapper = mount(VsFileInput, {
                    props: {
                        modelValue: [],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        required: true,
                    },
                });

                // when
                wrapper.vm.updateValue(multipleEvent as any);
                await nextTick();

                wrapper.vm.updateValue({
                    target: {
                        files: [],
                    },
                } as any);
                await nextTick();

                // then
                expect(wrapper.vm.computedMessages).toHaveLength(1);
                expect(wrapper.html()).toContain('required');
            });
        });

        describe('validate', () => {
            it('valid 할 때 validate 함수를 호출하면 true를 리턴한다', async () => {
                // given
                wrapper = mount(VsFileInput, {
                    props: {
                        modelValue: [],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        required: true,
                        multiple: true,
                    },
                });

                //when
                wrapper.vm.updateValue(multipleEvent as any);
                await nextTick();

                // then
                expect(wrapper.vm.validate()).toBe(true);
            });

            it('invalid 할 때 validate 함수를 호출하면 false를 리턴한다', async () => {
                // given
                wrapper = mount(VsFileInput, {
                    props: {
                        modelValue: [],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        required: true,
                        multiple: true,
                    },
                });

                // then
                expect(wrapper.vm.validate()).toBe(false);
            });
        });
    });
});
