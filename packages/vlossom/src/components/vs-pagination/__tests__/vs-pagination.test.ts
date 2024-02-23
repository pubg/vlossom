import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import VsPagination from './../VsPagination.vue';

function mountComponent() {
    return mount(VsPagination);
}

describe('vs-pagination', () => {
    describe('page select', () => {
        it('아무 선택도 하지 않은 상태라면 1 페이지가 선택되어 있다', () => {
            // given
            const length = 5;

            // when
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                },
            });

            // then
            expect(wrapper.find('.page-buttons').find('.page-button.selected').text()).toBe('1');
        });

        it('각 page 버튼을 누르면 선택된 페이지를 바꿀 수 있다', async () => {
            // given
            const length = 5;

            // when
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                },
            });

            // when
            await wrapper.find('.page-buttons').find('.page-button:nth-child(2)').trigger('click');

            // then
            expect(wrapper.find('.page-buttons').find('.page-button.selected').text()).toBe('2');
        });

        it('modelValue가 변경되면 선택된 페이지가 바뀐다', async () => {
            // given
            const length = 5;
            const modelValue = 3;
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                    modelValue,
                    'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
                },
            });

            // when
            await wrapper.setProps({ modelValue: 5 });

            // then
            expect(wrapper.find('.page-buttons').find('.page-button.selected').text()).toBe('5');
        });

        it('페이지를 변경하면 v-model로 binding 된 값이 바뀐다', async () => {
            // given
            const length = 5;
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                    modelValue: 3,
                    'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
                },
            });

            // when
            await wrapper.find('.page-buttons').find('.page-button:nth-child(4)').trigger('click');

            // then
            expect(wrapper.find('.page-buttons').find('.page-button.selected').text()).toBe('4');
            expect(wrapper.emitted('update:modelValue')).toEqual([[4]]);
        });
    });

    describe('length', () => {
        it('10 이하의 length를 설정하면 length만큼 페이지 버튼이 생긴다', () => {
            // given
            const length = 5;

            // when
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                },
            });

            // then
            expect(wrapper.find('.page-buttons').findAll('.page-button').length).toBe(length);
        });

        it('10 이상의 length를 설정하면 showingLength의 기본값인 10개만 페이지 버튼이 보인다', () => {
            // given
            const length = 20;

            // when
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                },
            });

            // then
            expect(wrapper.find('.page-buttons').findAll('.page-button').length).toBe(10);
            expect(wrapper.find('.page-buttons').findAll('.page-button')[0].text()).toBe('1');
            expect(wrapper.find('.page-buttons').findAll('.page-button')[9].text()).toBe('10');
        });

        it('10 이상의 length를 설정하고, 마지막 페이지가 선택되어 있다면 뒷쪽 10개의 페이지 버튼이 보인다', () => {
            // given
            const length = 20;
            const modelValue = 20;

            // when
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                    modelValue,
                },
            });

            // then
            expect(wrapper.find('.page-buttons').findAll('.page-button').length).toBe(10);
            expect(wrapper.find('.page-buttons').findAll('.page-button')[0].text()).toBe('11');
            expect(wrapper.find('.page-buttons').findAll('.page-button')[9].text()).toBe('20');
        });

        it('10 이상의 length를 설정하고, 중간 페이지가 선택되어 있다면 중간 10개의 페이지 버튼이 보인다', () => {
            // given
            const length = 20;
            const modelValue = 10;

            // when
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                    modelValue,
                },
            });

            // then
            expect(wrapper.find('.page-buttons').findAll('.page-button').length).toBe(10);
            expect(wrapper.find('.page-buttons').findAll('.page-button')[0].text()).toBe('5');
            expect(wrapper.find('.page-buttons').findAll('.page-button')[9].text()).toBe('14');
        });

        it('showingLength를 설정하면 해당 값만큼 페이지 버튼이 보인다', () => {
            // given
            const length = 15;
            const showingLength = 5;

            // when
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                    showingLength,
                },
            });

            // then
            expect(wrapper.find('.page-buttons').findAll('.page-button').length).toBe(showingLength);
        });
    });

    describe('control buttons', () => {
        it('goFirst 버튼을 누르면 1 페이지를 선택한다', async () => {
            // given
            const length = 20;
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                    edgeButtons: true,
                    modelValue: 10,
                    'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
                },
            });

            // when
            wrapper.findAll('.page-button')[0].trigger('click');
            await nextTick();

            // then
            expect(wrapper.find('.page-buttons').find('.page-button.selected').text()).toBe('1');
            expect(wrapper.emitted('update:modelValue')).toEqual([[1]]);
        });

        it('goPrev 버튼을 누르면 이전 페이지를 선택한다', async () => {
            // given
            const length = 20;
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                    edgeButtons: true,
                    modelValue: 10,
                    'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
                },
            });

            // when
            wrapper.findAll('.page-button')[1].trigger('click');
            await nextTick();

            // then
            expect(wrapper.find('.page-buttons').find('.page-button.selected').text()).toBe('9');
            expect(wrapper.emitted('update:modelValue')).toEqual([[9]]);
        });

        it('goNext 버튼을 누르면 다음 페이지를 선택한다', async () => {
            // given
            const length = 20;
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                    edgeButtons: true,
                    modelValue: 10,
                    'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
                },
            });

            // when
            wrapper.findAll('.page-button')[wrapper.findAll('.page-button').length - 2].trigger('click');
            await nextTick();

            // then
            expect(wrapper.find('.page-buttons').find('.page-button.selected').text()).toBe('11');
            expect(wrapper.emitted('update:modelValue')).toEqual([[11]]);
        });

        it('goLast 버튼을 누르면 마지막 페이지를 선택한다', async () => {
            // given
            const length = 20;
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                    edgeButtons: true,
                    modelValue: 10,
                    'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
                },
            });

            // when
            wrapper.findAll('.page-button')[wrapper.findAll('.page-button').length - 1].trigger('click');
            await nextTick();

            // then
            expect(wrapper.find('.page-buttons').find('.page-button.selected').text()).toBe('20');
            expect(wrapper.emitted('update:modelValue')).toEqual([[20]]);
        });
    });

    describe('slots', () => {
        it('page button slot에 원하는 내용을 넣을 수 있다', () => {
            // given
            const length = 5;

            // when
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                },
                slots: {
                    page: '<span>page {{ params.page }}</span>',
                },
            });

            // then
            expect(wrapper.find('.page-buttons').find('.page-button:nth-child(2)').text()).toBe('page 2');
        });

        it('goFirst slot에 원하는 내용을 넣을 수 있다', () => {
            // given
            const length = 20;
            const firstText = '<<';

            // when
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                    edgeButtons: true,
                },
                slots: {
                    first: firstText,
                },
            });

            // then
            expect(wrapper.findAll('.page-button')[0].text()).toBe(firstText);
        });

        it('goLast slot에 원하는 내용을 넣을 수 있다', () => {
            // given
            const length = 20;
            const lastText = '>>';

            // when
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                    edgeButtons: true,
                },
                slots: {
                    last: lastText,
                },
            });

            // then
            expect(wrapper.findAll('.page-button')[wrapper.findAll('.page-button').length - 1].text()).toBe(lastText);
        });

        it('prev slot에 원하는 내용을 넣을 수 있다', () => {
            // given
            const length = 20;
            const prevText = '<';

            // when
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                    edgeButtons: true,
                },
                slots: {
                    prev: prevText,
                },
            });

            // then
            expect(wrapper.findAll('.page-button')[1].text()).toBe(prevText);
        });

        it('next slot에 원하는 내용을 넣을 수 있다', () => {
            // given
            const length = 20;
            const nextText = '>';

            // when
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                    edgeButtons: true,
                },
                slots: {
                    next: nextText,
                },
            });

            // then
            expect(wrapper.findAll('.page-button')[wrapper.findAll('.page-button').length - 2].text()).toBe(nextText);
        });
    });

    describe('interface', () => {
        it('goFirst()로 첫 페이지를 선택할 수 있다', async () => {
            // given
            const length = 20;
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                    modelValue: 10,
                    'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
                },
            });

            // when
            wrapper.vm.goFirst();
            await nextTick();

            // then
            expect(wrapper.find('.page-buttons').find('.page-button.selected').text()).toBe('1');
            expect(wrapper.emitted('update:modelValue')).toEqual([[1]]);
        });

        it('goLast()로 마지막 페이지를 선택할 수 있다', async () => {
            // given
            const length = 20;
            const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                props: {
                    length,
                    modelValue: 10,
                    'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
                },
            });

            // when
            wrapper.vm.goLast();
            await nextTick();

            // then
            expect(wrapper.find('.page-buttons').find('.page-button.selected').text()).toBe('20');
            expect(wrapper.emitted('update:modelValue')).toEqual([[20]]);
        });

        describe('goPrev()', () => {
            it('이전 페이지를 선택할 수 있다', async () => {
                // given
                const length = 20;
                const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                    props: {
                        length,
                        modelValue: 10,
                        'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
                    },
                });

                // when
                wrapper.vm.goPrev();
                await nextTick();

                // then
                expect(wrapper.find('.page-buttons').find('.page-button.selected').text()).toBe('9');
                expect(wrapper.emitted('update:modelValue')).toEqual([[9]]);
            });

            it('1 페이지에서 호출하면 1페이지에 그대로 있는다', async () => {
                // given
                const length = 20;
                const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                    props: {
                        length,
                        modelValue: 1,
                        'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
                    },
                });

                // when
                wrapper.vm.goPrev();
                await nextTick();

                // then
                expect(wrapper.find('.page-buttons').find('.page-button.selected').text()).toBe('1');
                expect(wrapper.emitted('update:modelValue')).toBeUndefined();
            });
        });

        describe('goNext()', () => {
            it('다음 페이지를 선택할 수 있다', async () => {
                // given
                const length = 20;
                const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                    props: {
                        length,
                        modelValue: 10,
                        'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
                    },
                });

                // when
                wrapper.vm.goNext();
                await nextTick();

                // then
                expect(wrapper.find('.page-buttons').find('.page-button.selected').text()).toBe('11');
                expect(wrapper.emitted('update:modelValue')).toEqual([[11]]);
            });

            it('마지막 페이지에서 호출하면 그대로 있는다', () => {
                // given
                const length = 20;
                const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                    props: {
                        length,
                        modelValue: 20,
                        'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
                    },
                });

                // when
                wrapper.vm.goNext();

                // then
                expect(wrapper.find('.page-buttons').find('.page-button.selected').text()).toBe('20');
                expect(wrapper.emitted('update:modelValue')).toBeUndefined();
            });
        });

        describe('setPage()', () => {
            it('원하는 페이지로 변경 가능하다', async () => {
                // given
                const length = 20;
                const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                    props: {
                        length,
                        modelValue: 10,
                        'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
                    },
                });

                // when
                wrapper.vm.setPage(5);
                await nextTick();

                // then
                expect(wrapper.find('.page-buttons').find('.page-button.selected').text()).toBe('5');
                expect(wrapper.emitted('update:modelValue')).toEqual([[5]]);
            });

            it('0이하의 page를 입력하면 1 페이지가 선택된다', async () => {
                // given
                const length = 20;
                const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                    props: {
                        length,
                        modelValue: 10,
                        'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
                    },
                });

                // when
                wrapper.vm.setPage(0);
                await nextTick();

                // then
                expect(wrapper.find('.page-buttons').find('.page-button.selected').text()).toBe('1');
                expect(wrapper.emitted('update:modelValue')).toEqual([[1]]);
            });

            it('length보다 큰 page를 입력하면 마지막 페이지가 선택된다', async () => {
                // given
                const length = 20;
                const wrapper: ReturnType<typeof mountComponent> = mount(VsPagination, {
                    props: {
                        length,
                        modelValue: 10,
                        'onUpdate:modelValue': (value: number) => wrapper.setProps({ modelValue: value }),
                    },
                });

                // when
                wrapper.vm.setPage(30);
                await nextTick();

                // then
                expect(wrapper.find('.page-buttons').find('.page-button.selected').text()).toBe('20');
                expect(wrapper.emitted('update:modelValue')).toEqual([[20]]);
            });
        });
    });
});
