import { afterEach, beforeEach, vi } from 'vitest';
import { VsStore } from '@/store';
import * as exports from '@/store';

beforeEach(() => {
    const fakeStore = new VsStore();
    vi.spyOn(exports, 'store', 'get').mockReturnValue(fakeStore);
});
afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
});
