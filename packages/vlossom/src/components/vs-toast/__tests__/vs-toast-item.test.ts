import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsToastItem from '../VsToastItem.vue';
import { UIState } from '@/declaration';

describe('vs-toast-item', () => {
    describe('toastInfo', () => {
        it('text를 렌더할 수 있다', () => {
            // given
            const wrapper = mount(VsToastItem, {
                props: {
                    toastInfo: {
                        id: '1',
                        text: 'Hello',
                    },
                },
            });

            expect(wrapper.text()).toContain('Hello');
        });

        describe('autoClose', () => {
            it('autoClose 가 true 인 경우, close-button이 렌더되지 않는다', () => {
                // given
                const wrapper = mount(VsToastItem, {
                    props: {
                        toastInfo: {
                            id: '1',
                            text: 'Hello',
                            autoClose: true,
                        },
                    },
                });

                expect(wrapper.find('.close-button').exists()).toBe(false);
            });
            it('autoClose 가 false 인 경우, close-button이 렌더된다', () => {
                // given
                const wrapper = mount(VsToastItem, {
                    props: {
                        toastInfo: {
                            id: '1',
                            text: 'Hello',
                            autoClose: false,
                        },
                    },
                });

                expect(wrapper.find('.close-button').exists()).toBe(true);
            });
        });

        describe('colorScheme and state', () => {
            it('colorScheme이 주어진 경우, 해당 색상으로 렌더된다', () => {
                // given
                const wrapper = mount(VsToastItem, {
                    props: {
                        toastInfo: {
                            id: '1',
                            text: 'Hello',
                            colorScheme: 'red',
                        },
                    },
                });

                expect(wrapper.classes()).toContain('vs-red');
            });

            describe('colorScheme이 주어지지 않은 경우', () => {
                it('state가 없는 경우, color-scheme 은 indigo 이다', () => {
                    // given
                    const wrapper = mount(VsToastItem, {
                        props: {
                            toastInfo: {
                                id: '1',
                                text: 'Hello',
                            },
                        },
                    });

                    expect(wrapper.classes()).toContain('vs-indigo');
                });

                it('state가 success 인 경우, color-scheme 은 green 이다', () => {
                    // given
                    const wrapper = mount(VsToastItem, {
                        props: {
                            toastInfo: {
                                id: '1',
                                text: 'Hello',
                                state: UIState.Success,
                            },
                        },
                    });

                    expect(wrapper.classes()).toContain('vs-green');
                });
                it('state가 info 인 경우, color-scheme 은 light-blue 이다', () => {
                    // given
                    const wrapper = mount(VsToastItem, {
                        props: {
                            toastInfo: {
                                id: '1',
                                text: 'Hello',
                                state: UIState.Info,
                            },
                        },
                    });

                    expect(wrapper.classes()).toContain('vs-light-blue');
                });
                it('state가 error 인 경우, color-scheme 은 red 이다', () => {
                    // given
                    const wrapper = mount(VsToastItem, {
                        props: {
                            toastInfo: {
                                id: '1',
                                text: 'Hello',
                                state: UIState.Error,
                            },
                        },
                    });

                    expect(wrapper.classes()).toContain('vs-red');
                });
                it('state가 warn 인 경우, color-scheme 은 orange 이다', () => {
                    // given
                    const wrapper = mount(VsToastItem, {
                        props: {
                            toastInfo: {
                                id: '1',
                                text: 'Hello',
                                state: UIState.Warning,
                            },
                        },
                    });

                    expect(wrapper.classes()).toContain('vs-orange');
                });
            });
        });

        describe('align', () => {
            it('align이 start인 경우, toast는 왼쪽으로 정렬된다', () => {
                // given
                const wrapper = mount(VsToastItem, {
                    props: {
                        toastInfo: {
                            id: '1',
                            text: 'Hello',
                            align: 'start',
                        },
                    },
                });

                expect(wrapper.attributes('style')).toContain('align-self: flex-start;');
            });

            it('align이 end인 경우, toast는 오른쪽으로 정렬된다', () => {
                // given
                const wrapper = mount(VsToastItem, {
                    props: {
                        toastInfo: {
                            id: '1',
                            text: 'Hello',
                            align: 'end',
                        },
                    },
                });

                expect(wrapper.attributes('style')).toContain('align-self: flex-end;');
            });

            it('align이 center인 경우, toast는 가운데로 정렬된다', () => {
                // given
                const wrapper = mount(VsToastItem, {
                    props: {
                        toastInfo: {
                            id: '1',
                            text: 'Hello',
                            align: 'center',
                        },
                    },
                });

                expect(wrapper.attributes('style')).toContain('align-self: center;');
            });
        });
    });
});
