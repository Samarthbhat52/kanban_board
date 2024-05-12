import { create } from "zustand";

interface boardIdProps {
  boardId: number | undefined;
  setBoardId: (boardId: number | undefined) => void;
}

const useBoardIdStore = create<boardIdProps>((set) => ({
  boardId: undefined,
  setBoardId: (boardId: number | undefined) => set({ boardId }),
}));

export default useBoardIdStore;
