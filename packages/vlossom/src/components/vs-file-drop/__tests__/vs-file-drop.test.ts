import { describe, expect, it, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import VsFileDrop from '../VsFileDrop.vue';
import { h } from 'vue';

function createFile(name = 'test.png', type = 'image/png') {
    return new File(['dummy'], name, { type });
}

describe('vs-file-drop', () => {
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

    describe('입력된 파일이 있을 때', () => {
        let wrapper: VueWrapper<any>;
        const file = createFile();

        beforeEach(() => {
            // Given
            wrapper = mount(VsFileDrop, { props: { modelValue: file } });
        });

        it('입력된 파일 element 옆에 제거 버튼(X)이 노출된다', () => {
            // When
            const chip = wrapper.find('.vs-chip');
            const closeButton = chip.find('.vs-chip-close-button');

            // Then
            expect(closeButton.exists()).toBe(true);
        });

        it('입력된 파일 element 옆에 제거 버튼(X)을 클릭하면 파일이 제거된다', async () => {
            // Given
            const target = createFile('a.png');
            const files = [target, createFile('b.png')];
            wrapper = mount(VsFileDrop, { props: { modelValue: files } });

            // When
            const chip = wrapper.find(`.vs-chip[id="${target.name}"]`);
            const closeButton = chip.find('.vs-chip-close-button');
            await closeButton.trigger('click');

            // Then
            expect(wrapper.emitted('update:modelValue')).toBeTruthy();
            expect(wrapper.emitted('update:modelValue')?.length).toBe(1);
            expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual(files.filter((f) => f !== target));
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
            // Given
            const updateFiles = [createFile('test3.png')];

            // When
            await wrapper.vm.handleFileDialog({
                target: {
                    files: updateFiles,
                },
            } as unknown as Event);

            // Then
            expect(wrapper.emitted('update:modelValue')).toBeTruthy();
            expect(wrapper.emitted('update:modelValue')?.length).toBe(1);
            expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual(updateFiles);
        });

        it('입력된 파일이 존재해도, drag & drop으로 파일을 교체할 수 있다', async () => {
            // Given
            const updateFiles = [createFile('test3.png')];

            // When
            await wrapper.vm.handleFileDrop({
                dataTransfer: {
                    files: updateFiles,
                },
            } as unknown as DragEvent);

            // Then
            expect(wrapper.emitted('update:modelValue')).toBeTruthy();
            expect(wrapper.emitted('update:modelValue')?.length).toBe(1);
            expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual(updateFiles);
        });

        it('disable 상태일 때, 파일(콘텐츠) 제거 버튼이 노출되지 않아 입력된 파일을 제거할 수 없다', async () => {
            // Given
            await wrapper.setProps({ disabled: true });

            // When
            const clearButton = wrapper.find('.vs-chip-close-button');

            // Then
            expect(clearButton.exists()).toBeFalsy();
        });

        it('disabled 상태일 때 disabled 효과가 나타난다', async () => {
            // Given
            await wrapper.setProps({ disabled: true });

            // When
            await wrapper.trigger('mouseenter');

            // Then
            expect(wrapper.classes()).toContain('vs-disabled');
        });

        it('multiple이 true일 때 modelValue는 File[] 타입이다', () => {
            // Given
            const files = [createFile('a.png'), createFile('b.png')];
            wrapper = mount(VsFileDrop, { props: { modelValue: files, multiple: true } });

            // When
            const modelValue = wrapper.vm.$props.modelValue;

            // Then
            expect(Array.isArray(modelValue)).toBeTruthy();
        });

        it('multiple이 false일 때 modelValue는 File 타입이다', () => {
            // Given
            const fileA = createFile('a.png');
            wrapper = mount(VsFileDrop, { props: { modelValue: fileA, multiple: false } });

            // When
            const modelValue = wrapper.vm.$props.modelValue;

            // Then
            expect(File.prototype.isPrototypeOf(modelValue)).toBeTruthy();
        });

        it('multiple이 true일 때 입력된 파일의 갯수가 2개 이상일 때, wrapper 영역에 "{n} files"와 같이 표시된다', async () => {
            // Given
            const files = [createFile('a.png'), createFile('b.png')];
            wrapper = mount(VsFileDrop, { props: { modelValue: null, multiple: true } });
            const messages = wrapper.find('.vs-messages');

            // When
            wrapper.vm.handleFileDialog({
                // or handleFileDrop
                target: {
                    files,
                },
            } as unknown as Event);
            await wrapper.vm.$nextTick();

            // Then
            expect(messages.exists()).toBe(true);
            expect(messages.html()).toContain(`${files.length} files`);
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
                props: { modelValue: null },
                slots: { default: '<div>Custom Slot</div>' },
            });

            // When
            const content = slotWrapper.find('.vs-file-drop-content');
            const fileContents = content.findAll('.vs-chip');
            const customSlotText = slotWrapper.text();

            // Then
            expect(customSlotText).toContain('Custom Slot');
            expect(fileContents.length).toBe(0);
        });
    });

    describe('클릭해서 dialog로 파일을 추가할 수 있다', () => {
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
            await wrapper.vm.handleFileDialog({
                target: {
                    files,
                },
            } as unknown as Event);

            // Then
            expect(wrapper.emitted('update:modelValue')).toBeTruthy();
            expect(wrapper.emitted('update:modelValue')?.length).toBe(1);
            expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual(files);
        });

        it('multiple이 false일 때 여러 개의 파일을 추가하면 에러 메시지가 노출된다', async () => {
            // Given
            const files = [createFile('a.png'), createFile('b.png')];
            const wrapper = mount(VsFileDrop, { props: { multiple: false } });

            // When
            await wrapper.vm.handleFileDialog({
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
            await wrapper.vm.handleFileDialog({
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
            await wrapper.vm.handleFileDialog({
                target: {
                    files,
                },
            } as unknown as Event);

            // When
            await wrapper.vm.handleFileDialog({
                target: {
                    files: [],
                },
            } as unknown as Event);
            await wrapper.vm.$nextTick();

            // Then
            expect(wrapper.vm.inputValue).toEqual(files);
        });
    });

    describe('drag & drop으로 파일을 추가할 수 있다', () => {
        it('accept를 설정하면 원하는 타입의 파일만 drag & drop으로 파일을 추가할 수 있다', async () => {
            // Given
            const wrapper = mount(VsFileDrop, { props: { accept: 'image/png' } });
            const files = [createFile('a.png')];

            // When
            await wrapper.vm.handleFileDrop({
                dataTransfer: {
                    files,
                },
            } as unknown as DragEvent);
            await wrapper.vm.$nextTick();

            // Then
            expect(wrapper.emitted('drop')).toBeTruthy();
            expect(wrapper.emitted('drop')?.length).toBe(1);
            expect(wrapper.emitted('drop')?.[0][0]).toEqual(files);
            expect(wrapper.emitted('update:modelValue')).toBeTruthy();
            expect(wrapper.emitted('update:modelValue')?.length).toBe(1);
            expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual(files);
        });

        it('disable 상태일 때, drag & drop으로 파일을 추가할 수 없다', async () => {
            // Given
            const wrapper = mount(VsFileDrop, { props: { disabled: true } });
            const files = [createFile('test.png')];

            // When
            await wrapper.vm.handleFileDrop({
                dataTransfer: {
                    files,
                },
            } as unknown as DragEvent);
            await wrapper.vm.$nextTick();

            // Then
            expect(wrapper.emitted('drop')).toBeTruthy();
            expect(wrapper.emitted('drop')?.length).toBe(1);
            expect(wrapper.emitted('drop')?.[0][0]).toEqual(files);
            expect(wrapper.emitted('update:modelValue')).toBeFalsy();
        });

        it('파일을 drag하여 영역에 hover하면 ${placeholder} 메시지가 노출된다', async () => {
            // Given
            const wrapper = mount(VsFileDrop, { props: { modelValue: null, placeholder: 'Drop files here' } });
            const input = wrapper.find('input[type="file"]');

            // When
            await input.trigger('dragenter');
            await input.trigger('dragover');

            // Then
            expect(wrapper.text()).toContain(wrapper.vm.placeholder);
        });

        it('drag 이벤트가 발생하면 파일 드롭 영역이 하이라이트된다', async () => {
            // Given
            const wrapper = mount(VsFileDrop);
            const input = wrapper.find('input[type="file"]');

            // When
            await input.trigger('dragenter');
            await input.trigger('dragover');

            // Then
            expect(wrapper.classes()).toContain('vs-dragging');
        });

        it('drag 이벤트가 끝나면 파일 드롭 영역의 하이라이트가 제거된다', async () => {
            // Given
            const wrapper = mount(VsFileDrop);
            const input = wrapper.find('input[type="file"]');

            // When
            await input.trigger('dragenter');
            await input.trigger('dragover');
            await input.trigger('dragleave');
            await input.trigger('drop');

            // Then
            expect(wrapper.classes()).not.toContain('vs-dragging');
        });

        it('multiple이 true일 때 drag&drop으로 여러 파일을 추가할 수 있다', async () => {
            // Given
            const files = [createFile('a.png'), createFile('b.png')];
            const wrapper = mount(VsFileDrop, { props: { multiple: true } });

            // When
            await wrapper.vm.handleFileDrop({
                dataTransfer: {
                    files,
                },
            } as unknown as DragEvent);
            await wrapper.vm.$nextTick();

            // Then
            expect(wrapper.emitted('drop')).toBeTruthy();
            expect(wrapper.emitted('drop')?.length).toBe(1);
            expect(wrapper.emitted('drop')?.[0][0]).toEqual(files);
            expect(wrapper.emitted('update:modelValue')).toBeTruthy();
            expect(wrapper.emitted('update:modelValue')?.length).toBe(1);
            expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual(files);
        });

        it('multiple이 false일 때 drag&drop으로 여러 파일을 추가하면 에러 메시지가 노출된다', async () => {
            // Given
            const files = [createFile('a.png'), createFile('b.png')];
            const wrapper = mount(VsFileDrop, { props: { multiple: false } });

            // When
            //input.trigger('drop');
            await wrapper.vm.handleFileDrop({
                dataTransfer: {
                    files,
                },
            } as unknown as DragEvent);
            await wrapper.vm.$nextTick();

            // Then
            expect(wrapper.text()).toContain('You can only upload one file');
        });

        it('추가한 파일의 파일 명, 확장자, 파일 사이즈 정보가 리스트로 노출된다', async () => {
            // Given
            const files = [createFile('a.png'), createFile('b.png')];
            const wrapper = mount(VsFileDrop, { props: { multiple: true } });
            const droppedFileContents = wrapper.findAll('vs-chip');

            // When
            await wrapper.vm.handleFileDrop({
                dataTransfer: {
                    files,
                },
            } as unknown as DragEvent);
            await wrapper.vm.$nextTick();

            // Then
            expect(wrapper.emitted('drop')).toBeTruthy();
            expect(wrapper.emitted('drop')?.length).toBe(1);
            expect(wrapper.emitted('drop')?.[0][0]).toEqual(files);
            droppedFileContents.forEach((content, index) => {
                expect(content.html()).toContain(files[index].name);
                expect(content.html()).toContain(files[index].size);
            });
        });
    });

    describe('<slot>을 주입하여 유저 컨텐츠를 표현할 수 있다', () => {
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
                slots: {
                    default: (slotProps) => (slotProps.dragging ? h('div', 'Dragging!') : null),
                },
            });

            // When
            wrapper.vm.dragging = true;
            await wrapper.vm.$nextTick();

            // Then
            expect(wrapper.text()).toContain('Dragging!');
        });
    });

    describe('keyboard control', () => {
        it('탭 이벤트로 컴포넌트에 접근 가능하다', async () => {
            // Given
            const wrapper = mount(VsFileDrop);
            const input = wrapper.find('input[type="file"]');

            // When
            await input.trigger('focus');

            // Then
            expect(input.attributes('tabindex')).toBe('0');
        });

        it('탭 이벤트로 컴포넌트에 접근 가능하고, enter를 누르면 dialog가 출력된다', async () => {
            // Given
            const wrapper = mount(VsFileDrop);
            const input = wrapper.find('input[type="file"]');
            const clickSpy = vi.spyOn(input.element as HTMLInputElement, 'click');

            // When
            await input.trigger('focus');
            await input.trigger('keydown.enter');

            // Then
            expect(clickSpy).toHaveBeenCalled();
        });

        it('readonly 상태일 때, dialog가 노출되지 않는다', async () => {
            // Given
            const wrapper = mount(VsFileDrop, { props: { readonly: true } });
            const input = wrapper.find('input[type="file"]');
            const clickSpy = vi.spyOn(input.element as HTMLInputElement, 'click');

            // When
            await input.trigger('focus');
            await input.trigger('keydown.enter');

            // Then
            expect(clickSpy).not.toHaveBeenCalled();
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
            const clearBtn = wrapper.find('.vs-chip-close-button');

            // Then
            expect(clearBtn.attributes('tabindex')).toBe('-1');
        });
    });
});
