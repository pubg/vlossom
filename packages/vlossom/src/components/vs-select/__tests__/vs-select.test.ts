import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import VsSelect from './../VsSelect.vue';
import { nextTick } from 'vue';

function mountComponent() {
    return mount(VsSelect);
}

describe('vs-select', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
    });

    describe('options', () => {
        it('primitive options를 설정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    options: ['A', 'B', 'C'],
                },
                global: {
                    stubs: {
                        teleport: true,
                    },
                },
            });

            //when
            await wrapper.find('.vs-select').trigger('click');

            // then
            expect(wrapper.findAll('.vs-option')).toHaveLength(3);
            expect(wrapper.html()).toContain('A');
            expect(wrapper.html()).toContain('B');
            expect(wrapper.html()).toContain('C');
        });

        it('object options를 설정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    options: [
                        { label: 'A', value: 'a' },
                        { label: 'B', value: 'b' },
                        { label: 'C', value: 'c' },
                    ],
                    optionLabel: 'label',
                    optionValue: 'value',
                },
                global: {
                    stubs: {
                        teleport: true,
                    },
                },
            });

            //when
            await wrapper.find('.vs-select').trigger('click');

            // then
            expect(wrapper.findAll('.vs-option')).toHaveLength(3);
            expect(wrapper.html()).toContain('A');
            expect(wrapper.html()).toContain('B');
            expect(wrapper.html()).toContain('C');
        });

        it('options가 변경되면 select value 중 일치하는 값은 남는다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    modelValue: ['B', 'C'],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                    multiple: true,
                },
            });

            // when
            await wrapper.setProps({ options: ['C', 'D', 'E'] });

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0]).toEqual([['C']]);
        });

        it('options가 변경되어도 이전 값과 deep equal 하면 select value가 그대로 유지된다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    modelValue: ['A'],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                },
            });

            // when
            await wrapper.setProps({ options: ['A', 'B', 'C'] });

            // then
            expect(wrapper.emitted('update:modelValue')).toBeUndefined();
        });

        it('options-header slot을 설정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    options: ['A', 'B', 'C'],
                },
                slots: {
                    'options-header': '<div>header</div>',
                },
                global: {
                    stubs: {
                        teleport: true,
                    },
                },
            });

            //when
            await wrapper.find('.vs-select').trigger('click');

            // then
            expect(wrapper.html()).toContain('header');
        });

        it('options-footer slot을 설정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    options: ['A', 'B', 'C'],
                },
                slots: {
                    'options-footer': '<div>footer</div>',
                },
                global: {
                    stubs: {
                        teleport: true,
                    },
                },
            });

            //when
            await wrapper.find('.vs-select').trigger('click');

            // then
            expect(wrapper.html()).toContain('footer');
        });
    });

    describe('v-model', () => {
        describe('primitive options', () => {
            it('modelValue의 초깃값을 설정할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                    props: {
                        modelValue: 'A',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        options: ['A', 'B', 'C'],
                    },
                });

                // then
                expect(wrapper.vm.inputRef?.value).toBe('A');
            });

            it('modelValue를 업데이트 할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                    props: {
                        modelValue: 'A',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        options: ['A', 'B', 'C'],
                    },
                    global: {
                        stubs: {
                            teleport: true,
                        },
                    },
                });

                // when
                await wrapper.find('.vs-select').trigger('click');
                await wrapper.findAll('.vs-option')[1].trigger('click');

                // then
                const updateModelValueEvent = wrapper.emitted('update:modelValue');
                expect(updateModelValueEvent).toHaveLength(1);
                expect(updateModelValueEvent?.[0]).toEqual(['B']);
            });

            it('modelValue를 바꿔서 select 값을 업데이트 할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                    props: {
                        modelValue: 'A',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        options: ['A', 'B', 'C'],
                    },
                });

                // when
                await wrapper.setProps({ modelValue: 'B' });

                // then
                expect(wrapper.vm.inputRef?.value).toBe('B');
            });
        });

        describe('object options', () => {
            const optionProps = {
                options: [
                    { label: 'A', value: 'a' },
                    { label: 'B', value: 'b' },
                    { label: 'C', value: 'c' },
                ],
                optionLabel: 'label',
                optionValue: 'value',
            };

            it('modelValue의 초깃값을 설정할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                    props: {
                        modelValue: 'a',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        ...optionProps,
                    },
                });

                // then
                expect(wrapper.vm.inputRef?.value).toBe('A');
            });

            it('modelValue를 업데이트 할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                    props: {
                        modelValue: 'a',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        ...optionProps,
                    },
                    global: {
                        stubs: {
                            teleport: true,
                        },
                    },
                });

                // when
                await wrapper.find('.vs-select').trigger('click');
                await wrapper.findAll('.vs-option')[1].trigger('click');

                // then
                const updateModelValueEvent = wrapper.emitted('update:modelValue');
                expect(updateModelValueEvent).toHaveLength(1);
                expect(updateModelValueEvent?.[0]).toEqual(['b']);
            });

            it('modelValue를 바꿔서 select 값을 업데이트 할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                    props: {
                        modelValue: 'a',
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        ...optionProps,
                    },
                });

                // when
                await wrapper.setProps({ modelValue: 'b' });

                // then
                expect(wrapper.vm.inputRef?.value).toBe('B');
            });
        });

        describe('multiple with primitive options', () => {
            it('modelValue의 초깃값을 설정할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                    props: {
                        modelValue: ['A', 'B'],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        options: ['A', 'B', 'C'],
                        multiple: true,
                    },
                });

                // then
                expect(wrapper.findAllComponents({ name: 'VsChip' })).toHaveLength(2);
                expect(wrapper.findAllComponents({ name: 'VsChip' })[0].html()).toContain('A');
                expect(wrapper.findAllComponents({ name: 'VsChip' })[1].html()).toContain('B');
                expect(wrapper.find('.vs-select-input').exists()).toBe(false);
            });

            it('modelValue를 업데이트 할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                    props: {
                        modelValue: ['A', 'B'],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        options: ['A', 'B', 'C'],
                        multiple: true,
                    },
                    global: {
                        stubs: {
                            teleport: true,
                        },
                    },
                });

                // when
                await wrapper.find('.vs-select').trigger('click');
                await wrapper.findAll('.vs-option')[2].trigger('click');

                // then
                const updateModelValueEvent = wrapper.emitted('update:modelValue');
                expect(updateModelValueEvent).toHaveLength(1);
                expect(updateModelValueEvent?.[0]).toEqual([['A', 'B', 'C']]);
            });

            it('modelValue가 null이면 빈 배열로 보정한다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                    props: {
                        modelValue: null,
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        options: ['A', 'B', 'C'],
                        multiple: true,
                    },
                });

                // then
                expect(wrapper.vm.inputValue).toEqual([]);
            });

            it('modelValue를 null로 할당하면 빈 배열로 보정한다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                    props: {
                        modelValue: ['A', 'B'],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        options: ['A', 'B', 'C'],
                        multiple: true,
                    },
                });

                // when
                await wrapper.setProps({ modelValue: null });

                // then
                expect(wrapper.vm.inputValue).toEqual([]);
            });

            it('modelValue를 바꿔서 select 값을 업데이트 할 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                    props: {
                        modelValue: ['A', 'B'],
                        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                        options: ['A', 'B', 'C'],
                        multiple: true,
                    },
                });

                // when
                await wrapper.setProps({ modelValue: ['B', 'C'] });

                // then
                expect(wrapper.findAllComponents({ name: 'VsChip' })).toHaveLength(2);
                expect(wrapper.findAllComponents({ name: 'VsChip' })[0].html()).toContain('B');
                expect(wrapper.findAllComponents({ name: 'VsChip' })[1].html()).toContain('C');
            });
        });
    });

    describe('select option(s) behavior', () => {
        it('옵션을 선택하면 선택된 옵션 값이 보여지고 옵션 리스트 창은 닫힌다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    options: ['A', 'B', 'C'],
                },
                global: {
                    stubs: {
                        teleport: true,
                    },
                },
            });

            // when
            await wrapper.find('.vs-select').trigger('click');
            await wrapper.findAll('.vs-option')[1].trigger('click');
            await vi.advanceTimersByTime(500);

            // then
            expect(wrapper.vm.inputRef?.value).toBe('B');
            expect(wrapper.find('ul.vs-select-options').exists()).toBe(false);
        });

        it('multiple이 true일 때 옵션을 선택하면 선택한 옵션 값이 chip 형태로 보여지고 옵션 리스트 창은 여전히 존재한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    options: ['A', 'B', 'C'],
                    multiple: true,
                },
                global: {
                    stubs: {
                        teleport: true,
                    },
                },
            });

            // when
            await wrapper.find('.vs-select').trigger('click');
            await wrapper.findAll('.vs-option')[1].trigger('click');

            // then
            expect(wrapper.findComponent({ name: 'VsChip' }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: 'VsChip' }).html()).toContain('B');
            expect(wrapper.find('ul.vs-select-options').exists()).toBe(true);
        });

        it('multiple이 true일 때 선택된 옵션을 다시 선택하면 선택한 옵션 값이 chip 리스트에서 사라지고 옵션 리스트 창은 여전히 존재한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    modelValue: ['A', 'B'],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                    multiple: true,
                },
                global: {
                    stubs: {
                        teleport: true,
                    },
                },
            });

            // when
            await wrapper.find('.vs-select').trigger('click');
            await wrapper.findAll('.vs-option')[1].trigger('click');

            // then
            expect(wrapper.findAllComponents({ name: 'VsChip' })).toHaveLength(1);
            expect(wrapper.findComponent({ name: 'VsChip' }).html()).toContain('A');
            expect(wrapper.find('ul.vs-select-options').exists()).toBe(true);
            expect(wrapper.find('.vs-select-input').exists()).toBe(false);
        });

        it('selectAll이 true일 때 모든 옵션을 선택할 수 있는 옵션을 제공한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    modelValue: [],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                    multiple: true,
                    selectAll: true,
                },
                global: {
                    stubs: {
                        teleport: true,
                    },
                },
            });

            // when
            await wrapper.find('.vs-select').trigger('click');
            await wrapper.find('.vs-select-all').trigger('click');

            // then
            expect(wrapper.find('.vs-select-all').exists()).toBe(true);
            expect(wrapper.vm.inputValue).toEqual(['A', 'B', 'C']);
        });
    });

    describe('click outside', () => {
        it('옵션 리스트가 열려 있는 상태에서 외부를 클릭하면 옵션 리스트가 닫힌다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    options: ['A', 'B', 'C'],
                },
                global: {
                    stubs: {
                        teleport: true,
                    },
                },
                attachTo: document.body,
            });

            await wrapper.find('.vs-select').trigger('click');

            // when
            await vi.advanceTimersByTime(0);
            document.body.click();
            await nextTick();
            await vi.advanceTimersByTime(500);

            // then
            expect(document.body.querySelector('ul.vs-select-options')).toBeNull();
        });

        it('multiple 상태의 select의 옵션 리스트가 열려 있을 때 해당 select의 옵션을 선택해도 리스트가 닫히지 않는다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    options: ['A', 'B', 'C'],
                    multiple: true,
                },
                global: {
                    stubs: {
                        teleport: true,
                    },
                },
                attachTo: document.body,
            });

            await wrapper.find('.vs-select').trigger('click');

            // when
            await wrapper.findAll('ul.vs-select-options .vs-option')[1].trigger('click');
            await nextTick();

            // then
            expect(wrapper.find('ul.vs-select-options').exists()).toBe(true);
        });
    });

    describe('closableChips', () => {
        it('closableChips이 true일 때 각 chip들에 x 버튼이 추가되어 삭제할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    modelValue: ['A', 'B', 'C'],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                    multiple: true,
                    closableChips: true,
                },
                global: {
                    stubs: {
                        teleport: true,
                    },
                },
            });

            // when
            await wrapper.findComponent({ name: 'VsChip' }).find('button').trigger('click');

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0]).toEqual([['B', 'C']]);
        });
    });

    describe('collapseChips', () => {
        it('collapseChips이 true일 때 chip 리스트는 + n-1 형태로 요약돼서 보여진다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    modelValue: ['A', 'B', 'C'],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                    multiple: true,
                    collapseChips: true,
                },
                global: {
                    stubs: {
                        teleport: true,
                    },
                },
            });

            // then
            expect(wrapper.findAllComponents({ name: 'VsChip' })).toHaveLength(2);
            expect(wrapper.findAllComponents({ name: 'VsChip' })[1].html()).toContain('+ 2');
        });
    });

    describe('autocomplete', () => {
        it('autocomplete을 true로 설정하면 자동완성 기능을 사용할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    autocomplete: true,
                    options: ['apple', 'banana', 'carrot'],
                },
                global: {
                    stubs: {
                        teleport: true,
                    },
                },
            });

            // when
            await wrapper.find('.vs-select').trigger('click');
            await wrapper.find('.vs-select-input').setValue('ba');
            await vi.advanceTimersByTime(500);

            // then
            expect(wrapper.findAll('.vs-option')).toHaveLength(1);
            expect(wrapper.html()).toContain('banana');
        });

        it('autocomplete가 true이면, input 이벤트가 발생할 때 옵션 리스트가 열리고, 옵션 필터가 초기화된다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    autocomplete: true,
                    options: ['apple', 'banana', 'carrot'],
                },
                global: {
                    stubs: {
                        teleport: true,
                    },
                },
            });

            wrapper.vm.filteredOptions = [
                { id: '1', value: 'apple' },
                { id: '2', value: 'banana' },
            ];

            // when
            const input = wrapper.find('.vs-select-input');
            await input.setValue('apple');

            // then
            expect(wrapper.find('ul.vs-select-options').exists()).toBe(true);
            expect(wrapper.vm.filteredOptions).toHaveLength(3);
        });
    });

    describe('focus management', () => {
        let wrapper: ReturnType<typeof mountComponent>;

        beforeEach(() => {
            wrapper = mount(VsSelect, {
                props: {
                    options: ['A', 'B', 'C'],
                },
                global: {
                    stubs: {
                        teleport: true,
                    },
                },
                attachTo: document.body,
            });
        });

        describe('keyboard interaction', () => {
            it('combobox가 focus를 받은 상태에서 Enter 키를 누르면 옵션 리스트를 열고 닫을 수 있다', async () => {
                // when
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'Enter' });
                // then
                expect(wrapper.find('ul.vs-select-options').exists()).toBe(true);

                // when
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'Enter' });
                await vi.advanceTimersByTime(500);
                // then
                expect(wrapper.find('ul.vs-select-options').exists()).toBe(false);
            });

            it('combobox가 focus를 받은 상태에서 Space 키를 누르면 옵션 리스트를 열 수 있다', async () => {
                // when
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'Space' });
                // then
                expect(wrapper.find('ul.vs-select-options').exists()).toBe(true);
            });

            it('combobox가 focus를 받은 상태에서 Arrow Down 키를 누르면 옵션 리스트가 열리고 listbox의 첫번째 옵션으로 focus가 이동한다', async () => {
                // when
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'Space' });
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'ArrowDown' });

                // then
                expect(wrapper.find('ul.vs-select-options').exists()).toBe(true);
                const firstId = wrapper.find('ul.vs-select-options').find('li').attributes('id');
                expect(wrapper.find('ul.vs-select-options').attributes('aria-activedescendant')).toBe(firstId);
            });

            it('옵션 리스트를 열고 Arrow Down 키를 누르면 listbox의 첫번째 옵션으로 focus가 이동하고 Enter 키를 누르면 그 옵션이 선택된다', async () => {
                // when
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'Enter' });
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'ArrowDown' });

                // then
                const firstId = wrapper.find('ul.vs-select-options').find('li').attributes('id');
                expect(wrapper.find('.vs-select-input').attributes('aria-activedescendant')).toBe(firstId);

                // when
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'ArrowDown' });
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'Enter' });

                // then
                expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
                expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['B']);
                expect(wrapper.vm.inputRef?.value).toBe('B');
            });

            it('Arrow Up 키를 누르면 위에 있는 옵션으로 이동하고 Space 바를 누르면 그 옵션이 선택된다', async () => {
                // when
                await wrapper.find('.vs-select').trigger('click');
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'ArrowDown' });
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'ArrowDown' });
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'ArrowUp' });
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'Space' });

                // then
                expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
                expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['A']);
                expect(wrapper.vm.inputRef?.value).toBe('A');
            });

            it('Escape 키를 누르면 옵션 리스트가 닫힌다', async () => {
                // when
                await wrapper.find('.vs-select').trigger('click');
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'Escape' });
                await vi.advanceTimersByTime(500);

                // then
                expect(wrapper.find('ul.vs-select-options').exists()).toBe(false);
            });

            it('Tab 키를 누르면 focus 중인 옵션이 선택되고 옵션 리스트가 닫힌다', async () => {
                // when
                await wrapper.find('.vs-select').trigger('click');
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'ArrowDown' });
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'ArrowDown' });
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'Tab' });
                await vi.advanceTimersByTime(500);

                // then
                expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
                expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['B']);
                expect(wrapper.vm.inputRef?.value).toBe('B');
                expect(wrapper.find('ul.vs-select-options').exists()).toBe(false);
            });

            it('multiple이 true일 때도 Tab 키를 누르면 focus 중인 옵션이 선택되고 옵션 리스트가 닫힌다', async () => {
                // given
                wrapper.setProps({ multiple: true });

                // when
                await wrapper.find('.vs-select').trigger('click');
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'ArrowDown' });
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'ArrowDown' });
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'Tab' });
                await vi.advanceTimersByTime(500);

                // then
                expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
                expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['B']]);
                expect(wrapper.find('ul.vs-select-options').exists()).toBe(false);
            });
        });

        describe('mouse event', () => {
            it('옵션 리스트에서 mouse move event가 발생되면 mouse가 올라가 있던 옵션 기준으로 focus가 이동한다', async () => {
                // when
                await wrapper.find('.vs-select').trigger('click');
                await wrapper.findAll('.vs-option')[1].trigger('mousemove');
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'ArrowDown' });
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'Enter' });

                // then
                expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
                expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['C']);
                expect(wrapper.vm.inputRef?.value).toBe('C');
            });
        });

        describe('combobox focus', () => {
            it('옵션을 선택하고 옵션창이 닫히면 combobox로 focus가 간다', async () => {
                // when
                await wrapper.find('.vs-select').trigger('click');
                await wrapper.findAll('.vs-option')[1].trigger('click');
                await vi.advanceTimersByTime(500);

                // then
                expect(wrapper.find('.vs-select-input').element).toBe(document.activeElement);
            });

            it('Escape 키를 눌러서 옵션창이 닫히면 combobox로 focus가 간다', async () => {
                // when
                await wrapper.find('.vs-select').trigger('click');
                await wrapper.find('.vs-select-input').trigger('keydown', { code: 'Escape' });
                await vi.advanceTimersByTime(500);

                // then
                expect(wrapper.find('.vs-select-input').element).toBe(document.activeElement);
            });
        });
    });

    describe('clear', () => {
        it('clear 함수를 호출하면 modelValue를 null로 초기화 할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    modelValue: 'A',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                },
            });

            // when
            await wrapper.vm.clear();

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0]).toEqual([null]);
        });

        it('multiple이 true일 때 clear 함수를 호출하면 modelValue를 빈 배열로 초기화 할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    modelValue: ['A', 'B'],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                    multiple: true,
                },
            });

            // when
            await wrapper.vm.clear();

            // then
            const updateModelValueEvent = wrapper.emitted('update:modelValue');
            expect(updateModelValueEvent).toHaveLength(1);
            expect(updateModelValueEvent?.[0]).toEqual([[]]);
        });
    });

    describe('aria-label', () => {
        it('aria-label을 설정할 수 있다', () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    ariaLabel: 'aria-label',
                },
            });

            // then
            expect(wrapper.find('.vs-select-input').attributes('aria-label')).toBe('aria-label');
        });
    });

    describe('focus / blur', () => {
        it('focus 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    options: ['A', 'B', 'C'],
                },
            });

            // when
            await wrapper.find('.vs-select-input').trigger('focus');

            // then
            expect(wrapper.emitted('focus')).toHaveLength(1);
        });

        it('blur 이벤트를 발생시킬 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    options: ['A', 'B', 'C'],
                },
            });

            // when
            await wrapper.find('.vs-select-input').trigger('blur');

            // then
            expect(wrapper.emitted('blur')).toHaveLength(1);
        });
    });

    describe('rules', () => {
        it('required 체크가 가능하다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    modelValue: 'A',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                    required: true,
                },
            });

            // when
            await wrapper.find('.vs-select-input').trigger('mouseover');
            await wrapper.find('button.vs-clear-button').trigger('click');

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.html()).toContain('required');
        });

        it('multiple이 true일 때, 최대로 선택 가능한 아이템 수를 max props를 통해 제한하고 체크할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    modelValue: [],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                    max: 1,
                    multiple: true,
                },
                global: {
                    stubs: {
                        teleport: true,
                    },
                },
            });

            // when
            await wrapper.find('.vs-select').trigger('click');
            await wrapper.findAll('.vs-option')[1].trigger('click');
            await wrapper.findAll('.vs-option')[2].trigger('click');

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.html()).toContain('max number of items: 1');
        });

        it('multiple이 true일 때, 최소로 선택 가능한 아이템 수를 min props를 통해 제한하고 체크할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    modelValue: [],
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                    min: 2,
                    multiple: true,
                },
                global: {
                    stubs: {
                        teleport: true,
                    },
                },
            });

            // when
            await wrapper.find('.vs-select').trigger('click');
            await wrapper.findAll('.vs-option')[1].trigger('click');

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.html()).toContain('min number of items: 2');
        });
    });

    describe('validate', () => {
        it('valid 할 때 validate 함수를 호출하면 true를 반환한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    modelValue: 'A',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                    required: true,
                },
            });

            // then
            expect(wrapper.vm.validate()).toBe(true);
        });

        it('invalid 할 때 validate 함수를 호출하면 false를 반환한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsSelect, {
                props: {
                    modelValue: null,
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: ['A', 'B', 'C'],
                    required: true,
                },
            });

            // then
            expect(wrapper.vm.validate()).toBe(false);
        });
    });
});
