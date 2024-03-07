import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { UIState } from '@/declaration';
import VsToast from '../VsToast.vue';

describe('vs-toast', () => {
    describe('toastInfo', () => {
        it('text를 렌더할 수 있다', () => {
            // given
            const wrapper = mount(VsToast, {
                props: {
                    toastInfo: {
                        id: '1',
                        text: 'Hello',
                        autoClose: true,
                        duration: 3000,
                        placement: 'top',
                        align: 'center',
                    },
                },
            });

            expect(wrapper.text()).toContain('Hello');
        });

        describe('autoClose', () => {
            it('autoClose 가 true 인 경우, close-button이 렌더되지 않는다', () => {
                // given
                const wrapper = mount(VsToast, {
                    props: {
                        toastInfo: {
                            id: '1',
                            text: 'Hello',
                            autoClose: true,
                            duration: 3000,
                            placement: 'top',
                            align: 'center',
                        },
                    },
                });

                expect(wrapper.find('.close-button').exists()).toBe(false);
            });
            it('autoClose 가 false 인 경우, close-button이 렌더된다', () => {
                // given
                const wrapper = mount(VsToast, {
                    props: {
                        toastInfo: {
                            id: '1',
                            text: 'Hello',
                            autoClose: false,
                            placement: 'top',
                            align: 'center',
                        },
                    },
                });

                expect(wrapper.find('.close-button').exists()).toBe(true);
            });
        });

        describe('colorScheme and state', () => {
            it('colorScheme이 주어진 경우, 해당 색상으로 렌더된다', () => {
                // given
                const wrapper = mount(VsToast, {
                    props: {
                        toastInfo: {
                            id: '1',
                            text: 'Hello',
                            autoClose: true,
                            duration: 3000,
                            placement: 'top',
                            align: 'center',
                            colorScheme: 'red',
                        },
                    },
                });

                expect(wrapper.classes()).toContain('vs-red');
            });

            describe('colorScheme이 주어지지 않은 경우', () => {
                it('state가 없는 경우, color-scheme 은 default 이다', () => {
                    // given
                    const wrapper = mount(VsToast, {
                        props: {
                            toastInfo: {
                                id: '1',
                                text: 'Hello',
                                autoClose: true,
                                duration: 3000,
                                placement: 'top',
                                align: 'center',
                            },
                        },
                    });

                    expect(wrapper.classes()).toContain('vs-default');
                });

                it('state가 success 인 경우, color-scheme 은 green 이다', () => {
                    // given
                    const wrapper = mount(VsToast, {
                        props: {
                            toastInfo: {
                                id: '1',
                                text: 'Hello',
                                autoClose: true,
                                duration: 3000,
                                placement: 'top',
                                align: 'center',
                                state: UIState.Success,
                            },
                        },
                    });

                    expect(wrapper.classes()).toContain('vs-green');
                });
                it('state가 info 인 경우, color-scheme 은 light-blue 이다', () => {
                    // given
                    const wrapper = mount(VsToast, {
                        props: {
                            toastInfo: {
                                id: '1',
                                text: 'Hello',
                                autoClose: true,
                                duration: 3000,
                                placement: 'top',
                                align: 'center',
                                state: UIState.Info,
                            },
                        },
                    });

                    expect(wrapper.classes()).toContain('vs-light-blue');
                });
                it('state가 error 인 경우, color-scheme 은 red 이다', () => {
                    // given
                    const wrapper = mount(VsToast, {
                        props: {
                            toastInfo: {
                                id: '1',
                                text: 'Hello',
                                autoClose: true,
                                duration: 3000,
                                placement: 'top',
                                align: 'center',
                                state: UIState.Error,
                            },
                        },
                    });

                    expect(wrapper.classes()).toContain('vs-red');
                });
                it('state가 warn 인 경우, color-scheme 은 orange 이다', () => {
                    // given
                    const wrapper = mount(VsToast, {
                        props: {
                            toastInfo: {
                                id: '1',
                                text: 'Hello',
                                autoClose: true,
                                duration: 3000,
                                placement: 'top',
                                align: 'center',
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
                const wrapper = mount(VsToast, {
                    props: {
                        toastInfo: {
                            id: '1',
                            text: 'Hello',
                            autoClose: true,
                            duration: 3000,
                            placement: 'top',
                            align: 'start',
                        },
                    },
                });

                expect(wrapper.attributes('style')).toContain('align-self: flex-start;');
            });

            it('align이 end인 경우, toast는 오른쪽으로 정렬된다', () => {
                // given
                const wrapper = mount(VsToast, {
                    props: {
                        toastInfo: {
                            id: '1',
                            text: 'Hello',
                            autoClose: true,
                            duration: 3000,
                            placement: 'top',
                            align: 'end',
                        },
                    },
                });

                expect(wrapper.attributes('style')).toContain('align-self: flex-end;');
            });

            it('align이 center인 경우, toast는 가운데로 정렬된다', () => {
                // given
                const wrapper = mount(VsToast, {
                    props: {
                        toastInfo: {
                            id: '1',
                            text: 'Hello',
                            autoClose: true,
                            duration: 3000,
                            placement: 'top',
                            align: 'center',
                        },
                    },
                });

                expect(wrapper.attributes('style')).toContain('align-self: center;');
            });
        });
    });
});
