import { create } from 'zustand';

interface FlythroughState {
    targetTime: number | null;
    setTargetTime: (time: number | null) => void;
}

export const useFlythroughStore = create<FlythroughState>((set) => ({
    targetTime: null,
    setTargetTime: (time) => set({ targetTime: time }),
}));
