import { create } from "zustand";

export const useAppStore = create()((set) => ({
    fileId: null,
    setFileId: (fileId) => set((state) => ({ fileId })),

    filename: "",
    setFilename: (filename) => set((state) => ({ filename })),

    isDeleteModalOpen: false,
    setIsDeleteModalOpen: (open) =>
        set((state) => ({ isDeleteModalOpen: open })),

    isRenameModalOpen: false,
    setIsRenameModalOpen: (open) =>
        set((state) => ({ isRenameModalOpen: open })),
}));
