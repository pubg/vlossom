import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import VsImage from './../VsImage.vue';

describe('vs-image', () => {
    describe('src', () => {
        it('props로 설정한 src는 error가 발생하지 않았을 때 computedSrc의 값이 된다', () => {
            // given
            const wrapper = mount(VsImage, {
                props: {
                    src: 'image-src',
                },
            });

            // then
            expect(wrapper.vm.computedSrc).toBe('image-src');
        });

        it('src 이미지를 불러오다가 error 발생할 시, fallback이 설정되지 않았다면 NO_IMAGE를 보여준다', async () => {
            // given
            const wrapper = mount(VsImage, {
                props: {
                    src: 'image-src',
                },
            });

            await wrapper.find('img').trigger('error');

            // then
            expect(wrapper.vm.computedSrc).not.toBe('image-src');
            expect(wrapper.vm.isNoImage).toBe(true);
        });
    });

    describe('fallback', () => {
        it('src 이미지를 불러오다가 error 발생할 시, fallback이 설정되어 있다면 fallback 이미지를 보여준다', async () => {
            // given
            const wrapper = mount(VsImage, {
                props: {
                    src: 'image-src',
                    fallback: 'fallback-src',
                },
            });

            // when
            await wrapper.find('img').trigger('error');

            // then
            expect(wrapper.vm.computedSrc).toBe('fallback-src');
        });

        it('fallback 이미지를 불러오다가 error가 발생하면 NO_IMAGE를 보여준다', async () => {
            // given
            const wrapper = mount(VsImage, {
                props: {
                    src: 'image-src',
                    fallback: 'fallback-src',
                },
            });

            // when
            await wrapper.find('img').trigger('error');
            await nextTick();
            await wrapper.find('img').trigger('error');

            // then
            expect(wrapper.vm.computedSrc).not.toBe('image-src');
            expect(wrapper.vm.computedSrc).not.toBe('fallback-src');
            expect(wrapper.vm.isNoImage).toBe(true);
        });
    });

    describe('lazy', () => {
        const mockIntersectionObserver = class IntersectionObserver {
            constructor() {}
            observe = () => null;
        };
        const originalIntersectionObserver = window.IntersectionObserver;

        it('lazy:true일 때, IntersectionObserver가 존재하면 image를 lazy loading 한다', () => {
            // given
            window.IntersectionObserver = mockIntersectionObserver as any;

            const wrapper = mount(VsImage, {
                props: {
                    src: 'image-src',
                    lazy: true,
                },
            });

            // then
            expect(wrapper.html()).not.toContain('image-src');
        });

        it('lazy:true일 때, IntersectionObserver가 없으면 image를 eager loading 한다', () => {
            // given
            window.IntersectionObserver = undefined as any;

            const wrapper = mount(VsImage, {
                props: {
                    src: 'image-src',
                    lazy: true,
                },
            });

            // then
            expect(wrapper.html()).toContain('image-src');
        });

        afterEach(() => {
            window.IntersectionObserver = originalIntersectionObserver;
        });
    });
});
