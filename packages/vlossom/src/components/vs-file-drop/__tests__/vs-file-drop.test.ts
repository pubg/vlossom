import { describe, expect, it, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import VsFileDrop from '../VsFileDrop.vue';

function createFile(name = 'test.png', type = 'image/png') {
    return new File(['dummy'], name, { type });
}

/**
 * V2: AI only

1. 명세 Wiki를 작성함

  명세는 속성에 따른 동작을 정의하는 것이 아니라, 유스케이스(컨텍스트가 있는 상황과 기대되는 결과)를 정의한다.

2. Cursor에게 Wiki를 기반으로 TC 작성(1)을 요청함

  적절히 스위트를 분리하도록 요청한다

  내가 명세하지 않은 임의의 TC를 생성하지 않도록 한다

  보다보니까 TC가 그럴 법하면 Wiki 명세와 함께 추가한다

3. 기대되는 UI를 이미지(2)와, 기대하는 코드 스니펫(3) 형태를 기존 코드에서 첨부하여 기본 코드 골격을 작성한다.

  repository 컨텍스트를 참고해달라고 요청한다

4. 테스트 스위트를 ‘하나 씩’ 만족하도록 개발을 요청한다.

  이 때, 테스트 자체가 잘못된 경우(false positive)는 한땀 한땀봐야 한다…

5. 모든 테스트를 통과하면 직접 컴퍼넌트 사용성을 테스트한다.
 */

describe.only('vs-file-drop', () => {
    describe('입력된 파일이 없을 때', () => {
        let wrapper: VueWrapper<any>;

        beforeEach(() => {
            // Given
            wrapper = mount(VsFileDrop, { props: { modelValue: null } });
        });

        it('modelValue는 null이다', () => {
            // When
            const modelValue = wrapper.props('modelValue');

            // Then
            expect(modelValue).toBeNull();
        });

        it('컴포넌트에 hover하면 wrapper 영역에 피드백이 노출된다', async () => {
            // When
            await wrapper.trigger('mouseenter');

            // Then
            expect(wrapper.classes()).toContain('vs-hover');
        });

        it('컴포넌트에서 마우스 커서가 벗어나면 hover 클래스가 제거된다', async () => {
            // When
            await wrapper.trigger('mouseenter');
            await wrapper.trigger('mouseleave');

            // Then
            expect(wrapper.classes()).not.toContain('vs-hover');
        });

        it('disabled 상태일 때 hover하면 피드백이 노출되지 않는다', async () => {
            // Given
            await wrapper.setProps({ disabled: true });

            // When
            await wrapper.trigger('mouseenter');

            // Then
            expect(wrapper.classes()).not.toContain('vs-hover');
        });

        it('disabled 상태일 때 disabled 효과가 나타난다', async () => {
            // Given
            await wrapper.setProps({ disabled: true });

            // When
            await wrapper.trigger('mouseenter');

            // Then
            expect(wrapper.classes()).toContain('vs-disabled');
        });

        it('content 영역에 placeholder가 노출된다', () => {
            // When
            const content = wrapper.find('.vs-file-drop-content');
            const placeholder = content.find('.vs-file-drop-placeholder');

            // Then
            expect(placeholder.exists()).toBe(true);
        });

        it('사용자가 Slot을 정의하면 placeholder가 노출되지 않는다', () => {
            // Given
            const slotWrapper = mount(VsFileDrop, {
                props: { modelValue: null },
                slots: { default: '<div>Custom Slot</div>' },
            });

            // When
            const content = slotWrapper.find('.vs-file-drop-content');
            const placeholder = content.find('.vs-file-drop-placeholder');
            const customSlotText = slotWrapper.text();

            // Then
            expect(customSlotText).toContain('Custom Slot');
            expect(placeholder.exists()).toBe(false);
        });
    });

    describe.todo('입력된 파일이 있을 때', () => {
        let wrapper: VueWrapper<any>;
        const file = createFile();

        beforeEach(() => {
            // Given
            wrapper = mount(VsFileDrop, { props: { modelValue: file } });
        });

        it('입력된 파일 element 옆에 제거 버튼(X)이 노출된다', () => {
            // When
            const clearButton = wrapper.find('.vs-file-drop-clear');

            // Then
            expect(clearButton.exists()).toBe(true);
        });

        it('컴포넌트에 hover하면 wrapper 영역에 피드백이 노출된다', async () => {
            // When
            await wrapper.trigger('mouseenter');

            // Then
            expect(wrapper.classes()).toContain('vs-hover');
        });

        it('disable 상태일 때 피드백이 노출되지 않는다', async () => {
            // Given
            await wrapper.setProps({ disabled: true });

            // When
            await wrapper.trigger('mouseenter');

            // Then
            expect(wrapper.classes()).not.toContain('vs-hover');
        });

        it('입력된 파일이 존재해도, 다시 클릭하면 dialog로 파일을 교체할 수 있다', async () => {
            // When
            const input = wrapper.find('input[type="file"]');
            await input.trigger('click');

            // Then
            expect(input.exists()).toBe(true);
        });

        it('입력된 파일이 존재해도, drag & drop으로 파일을 교체할 수 있다', async () => {
            // Given
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(createFile('test2.png'));

            // When
            await wrapper.trigger('drop', { dataTransfer });

            // Then
            expect(wrapper.emitted()).toHaveProperty('update:modelValue');
        });

        it('disable 상태일 때, 파일(콘텐츠) 제거 버튼이 노출되지 않아 입력된 파일을 제거할 수 없다', async () => {
            // Given
            await wrapper.setProps({ disabled: true });

            // When
            const clearButton = wrapper.find('.vs-file-drop-clear');

            // Then
            expect(clearButton.exists()).toBe(false);
        });

        it('disable 상태일 때, 영역에 hover하면 cursor가 disable로 노출된다', async () => {
            // Given
            await wrapper.setProps({ disabled: true });

            // When
            await wrapper.trigger('mouseenter');

            // Then
            expect(wrapper.element.style.cursor).toBe('not-allowed');
        });

        it('multiple이 true일 때 modelValue는 File[] 타입이다', () => {
            // Given
            const files = [createFile('a.png'), createFile('b.png')];
            wrapper = mount(VsFileDrop, { props: { modelValue: files, multiple: true } });

            // When
            const modelValue = wrapper.vm.$props.modelValue;

            // Then
            expect(Array.isArray(modelValue)).toBe(true);
        });

        it('multiple이 false일 때 modelValue는 File 타입이다', () => {
            // Given
            const fileA = createFile('a.png');
            wrapper = mount(VsFileDrop, { props: { modelValue: fileA, multiple: false } });

            // When
            const modelValue = wrapper.vm.$props.modelValue;

            // Then
            expect(modelValue).toBeInstanceOf(fileA);
        });

        it('multiple이 true일 때 입력된 파일의 갯수가 2개 이상일 때, wrapper 영역에 "{n} files"와 같이 표시된다', () => {
            // Given
            const files = [createFile('a.png'), createFile('b.png')];
            wrapper = mount(VsFileDrop, { props: { modelValue: files, multiple: true } });

            // When
            const text = wrapper.text();

            // Then
            expect(text).toMatch(/2 files/);
        });

        it('multiple이 true일 때 files array를 빈 배열로 할당하면 입력된 files가 비워진다', async () => {
            // Given
            const files = [createFile('a.png')];
            wrapper = mount(VsFileDrop, { props: { modelValue: files, multiple: true } });

            // When
            await wrapper.setProps({ modelValue: [] });

            // Then
            expect(wrapper.vm.$props.modelValue).toEqual([]);
        });

        it('multiple이 true일 때 files array에 변경이 있으면 반영된다', async () => {
            // Given
            const files = [createFile('a.png')];
            wrapper = mount(VsFileDrop, { props: { modelValue: files, multiple: true } });
            const newFiles = [createFile('b.png')];

            // When
            await wrapper.setProps({ modelValue: newFiles });

            // Then
            expect(wrapper.vm.$props.modelValue).toEqual(newFiles);
        });

        it('사용자가 Slot을 정의하면 파일 명, 확장자, 파일 사이즈 정보가 리스트로 노출되지 않는다', () => {
            // Given
            const slotWrapper = mount(VsFileDrop, {
                props: { modelValue: [createFile('a.png')] },
                slots: { default: '<div>Custom Slot</div>' },
            });

            // When
            const content = slotWrapper.text();

            // Then
            expect(content).toContain('Custom Slot');
            expect(content).not.toContain('a.png');
        });
    });

    describe.todo('클릭해서 dialog로 파일을 추가할 수 있다', () => {
        it('accept를 설정하면 원하는 타입의 파일만 dialog에서 확인할 수 있다', () => {
            // Given
            const wrapper = mount(VsFileDrop, { props: { accept: 'image/png' } });

            // When
            const input = wrapper.find('input[type="file"]');

            // Then
            expect(input.attributes('accept')).toBe('image/png');
        });

        it('disable 상태일 때, dialog로 파일을 추가할 수 없도록 click 이벤트를 막는다', async () => {
            // Given
            const wrapper = mount(VsFileDrop, { props: { disabled: true } });

            // When
            const input = wrapper.find('input[type="file"]');

            // Then
            expect(await input.trigger('click')).toBeFalsy();
        });

        it('multiple이 true일 때 dialog에서 여러 파일을 선택하면 모두 등록된다', async () => {
            // Given
            const files = [createFile('a.png'), createFile('b.png')];
            const wrapper = mount(VsFileDrop, { props: { multiple: true } });

            // When
            // const input = wrapper.find('input[type="file"]');
            // input.trigger('change');
            // To test `FileList` passed as target in nodeJs environment, we need to handle above as follows.
            await wrapper.vm.updateValue({
                target: {
                    files,
                },
            } as unknown as Event);

            // Then
            expect(wrapper.emitted('update:modelValue')).toBeTruthy();
            expect(wrapper.emitted('update:modelValue')?.length).toBe(1);
            expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual(files);
        });

        it('multiple이 false일 때 dialog에서 여러 파일을 선택하면 파일이 등록되지 않는다', async () => {
            // Given
            const files = [createFile('a.png'), createFile('b.png')];
            const wrapper = mount(VsFileDrop, { props: { multiple: false } });

            // When
            await wrapper.vm.updateValue({
                target: {
                    files,
                },
            } as unknown as Event);

            // Then
            expect(wrapper.emitted('update:modelValue')).toBeFalsy();
        });

        it('multiple이 false일 때 여러 개의 파일을 추가하면 에러 메시지가 노출된다', async () => {
            // Given
            const files = [createFile('a.png'), createFile('b.png')];
            const wrapper = mount(VsFileDrop, { props: { multiple: false } });

            // When
            await wrapper.vm.updateValue({
                target: {
                    files,
                },
            } as unknown as Event);
            await wrapper.vm.$nextTick();

            // Then
            expect(wrapper.vm.computedMessages).toHaveLength(1);
            expect(wrapper.vm.computedMessages[0]).toEqual({
                text: 'You can only upload one file',
                state: 'error',
            });
        });

        it('추가한 모든 파일의 파일 명, 확장자, 파일 사이즈 정보가 노출된다', async () => {
            // Given
            const files = [createFile('a.png'), createFile('b.exe'), createFile('c.txt')];
            const wrapper = mount(VsFileDrop, { props: { multiple: true } });
            const droppedFileContents = wrapper.findAll('vs-chip');

            // When
            await wrapper.vm.updateValue({
                target: {
                    files,
                },
            } as unknown as Event);
            await wrapper.vm.$nextTick();

            // Then
            droppedFileContents.forEach((content, index) => {
                expect(content.html()).toContain(files[index].name);
                expect(content.html()).toContain(files[index].size);
            });
        });

        it('dialog에서 파일 입력을 취소하면, 기존의 파일이 유지된다', async () => {
            // Given
            const files = [createFile('a.png'), createFile('b.exe'), createFile('c.txt')];
            const wrapper = mount(VsFileDrop, { props: { multiple: true } });
            await wrapper.vm.updateValue({
                target: {
                    files,
                },
            } as unknown as Event);

            // When
            await wrapper.vm.updateValue({
                target: {
                    files: [],
                },
            } as unknown as Event);
            await wrapper.vm.$nextTick();

            // Then
            expect(wrapper.vm.inputValue).toEqual(files);
        });
    });

    describe.todo('drag & drop으로 파일을 추가할 수 있다', () => {
        it('accept를 설정하면 원하는 타입의 파일만 drag & drop으로 파일을 추가할 수 있다', () => {
            // Given
            const wrapper = mount(VsFileDrop, { props: { accept: 'image/png' } });

            // When
            const input = wrapper.find('input[type="file"]');

            // Then
            expect(input.attributes('accept')).toBe('image/png');
        });

        it('disable 상태일 때, drag & drop으로 파일을 추가할 수 없다', async () => {
            // Given
            const wrapper = mount(VsFileDrop, { props: { disabled: true } });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(createFile());

            // When
            await wrapper.trigger('drop', { dataTransfer });

            // Then
            expect(wrapper.emitted('update:modelValue')).toBeFalsy();
        });

        it('파일을 drag하여 영역에 hover하면 drop here 메시지가 노출된다', async () => {
            // Given
            const wrapper = mount(VsFileDrop, { props: { modelValue: null } });

            // When
            await wrapper.trigger('dragenter');

            // Then
            expect(wrapper.text()).toContain('drop here');
        });

        it('multiple이 true일 때 drag&drop으로 여러 파일을 추가할 수 있다', async () => {
            // Given
            const files = [createFile('a.png'), createFile('b.png')];
            const dataTransfer = new DataTransfer();
            files.forEach((f) => dataTransfer.items.add(f));
            const wrapper = mount(VsFileDrop, { props: { multiple: true } });

            // When
            await wrapper.trigger('drop', { dataTransfer });

            // Then
            expect(wrapper.emitted('update:modelValue')).toBeTruthy();
            expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual(files);
        });

        it('multiple이 false일 때 drag&drop으로 여러 파일을 추가하면 어떤 파일도 등록되지 않고 에러 메시지가 노출된다', async () => {
            // Given
            const files = [createFile('a.png'), createFile('b.png')];
            const dataTransfer = new DataTransfer();
            files.forEach((f) => dataTransfer.items.add(f));
            const wrapper = mount(VsFileDrop, { props: { multiple: false } });

            // When
            await wrapper.trigger('drop', { dataTransfer });

            // Then
            expect(wrapper.emitted('update:modelValue')).toBeFalsy();
            expect(wrapper.vm.computedMessages[0]?.text).toBe('You can only upload one file');
        });

        it('추가한 파일의 파일 명, 확장자, 파일 사이즈 정보가 리스트로 노출된다', async () => {
            // Given
            const files = [createFile('a.png'), createFile('b.png')];
            const wrapper = mount(VsFileDrop, { props: { multiple: true } });

            // When
            // const input = wrapper.find('input[type="file"]');
            // input.trigger('change');
            // To test `FileList` passed as target in nodeJs environment, we need to handle above as follows.
            await wrapper.vm.updateValue({
                target: {
                    files,
                },
            } as unknown as Event);

            // Then
            expect(wrapper.text()).toContain('a.png');
            expect(wrapper.text()).toContain('b.png');
            expect(wrapper.text()).toContain('image/png');
            expect(wrapper.text()).toContain('100px');
            expect(wrapper.text()).toContain('200px');
        });
    });

    describe.todo('Slot으로 컨텐츠를 표현할 수 있다', () => {
        it('Slot은 content 영역을 직접 대체한다', () => {
            // Given
            const wrapper = mount(VsFileDrop, {
                slots: { default: '<div>Custom Content</div>' },
            });

            // When
            const content = wrapper.text();

            // Then
            expect(content).toContain('Custom Content');
        });

        it('사용자는 modelValue를 사용하여 content를 정의할 수 있다', () => {
            // Given
            const wrapper = mount(VsFileDrop, {
                props: { modelValue: createFile() },
                slots: { default: '<div>File Slot</div>' },
            });

            // When
            const content = wrapper.text();

            // Then
            expect(content).toContain('File Slot');
        });

        it('사용자는 dragging 상태를 사용하여 content를 정의할 수 있다', async () => {
            // Given
            const wrapper = mount(VsFileDrop, {
                slots: { default: '<div v-if="dragging">Dragging!</div>' },
            });

            // When
            await wrapper.setData({ dragging: true });

            // Then
            expect(wrapper.text()).toContain('Dragging!');
        });
    });

    describe.todo('크기를 조정할 수 있다', () => {
        it('크기를 설정 안 했을 때 기본 값을 가진다', () => {
            // Given
            const wrapper = mount(VsFileDrop);

            // When
            const style = wrapper.attributes('style');

            // Then
            expect(style).toContain('width: 100%');
            expect(style).toContain('height: 100%');
        });

        it('설정 했을 때 height와 width 크기를 조정할 수 있다', () => {
            // Given
            const wrapper = mount(VsFileDrop, { props: { width: '300px', height: '200px' } });

            // When
            const style = wrapper.attributes('style');

            // Then
            expect(style).toContain('width: 300px');
            expect(style).toContain('height: 200px');
        });
    });

    describe.todo('keyboard control', () => {
        it('탭 이벤트로 컴포넌트에 접근 가능하고, enter를 누르면 dialog가 출력된다', async () => {
            // Given
            const wrapper = mount(VsFileDrop);

            // When
            await wrapper.trigger('focus');
            await wrapper.trigger('keydown.enter');

            // Then
            expect(wrapper.emitted()).toBeTruthy(); // 최소한 이벤트가 발생했는지 확인
        });

        it('readonly 상태일 때, dialog가 노출되지 않는다', async () => {
            // Given
            const wrapper = mount(VsFileDrop, { props: { readonly: true } });

            // When
            await wrapper.trigger('focus');
            await wrapper.trigger('keydown.enter');

            // Then
            expect(wrapper.emitted('openDialog')).toBeFalsy(); // dialog 오픈 이벤트가 emit되지 않아야 함
        });

        it('disable 상태일 때, 탭 이벤트로 접근할 수 없다', async () => {
            // Given
            const wrapper = mount(VsFileDrop, { props: { disabled: true } });

            // When
            await wrapper.trigger('focus');

            // Then
            expect(wrapper.element.tabIndex).toBe(-1);
        });

        it('각 파일에 해당하는 컨텐츠 제거 버튼으로 탭 이동이 불가능하다', () => {
            // Given
            const wrapper = mount(VsFileDrop, { props: { modelValue: createFile() } });

            // When
            const clearBtn = wrapper.find('.vs-file-drop-clear');

            // Then
            expect(clearBtn.attributes('tabindex')).toBe('-1');
        });
    });
});
