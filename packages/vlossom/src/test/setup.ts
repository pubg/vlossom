import { afterEach, beforeEach, vi, type MockInstance } from 'vitest';
import { config } from '@vue/test-utils';
import { VsStore } from '@/stores';
import * as exports from '@/stores';
import { createVlossom } from '@/index';

export let mockConsoleWarn: MockInstance | null = null;
export let mockConsoleError: MockInstance | null = null;

beforeEach(() => {
    const fakeStore = new VsStore();
    vi.spyOn(exports, 'store', 'get').mockReturnValue(fakeStore);
    mockConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    const vlossom = createVlossom();
    config.global.plugins = [vlossom];
});
afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    mockConsoleWarn = null;
    mockConsoleError = null;
});

const matchMediaMock = vi.fn((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
}));

vi.stubGlobal('matchMedia', matchMediaMock);

const resizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', resizeObserverMock);
