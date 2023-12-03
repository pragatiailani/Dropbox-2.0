"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useAppStore } from "@/store/store";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";

export function RenameModal() {
    const { user } = useUser();
    const [input, setInput] = useState("");

    const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] =
        useAppStore((state) => [
            state.isRenameModalOpen,
            state.setIsRenameModalOpen,
            state.fileId,
            state.filename,
        ]);

    const renameFile = async () => {
        if (!user || !fileId) return;
        const toastId = toast.loading("Renaming...");
        await updateDoc(doc(db, "users", user.id, "files", fileId), {
            filename: input,
        });

        setInput("");
        setIsRenameModalOpen(false);

        toast.success("Renamed Successfully", {
            id: toastId,
        });
    };

    return (
        <Dialog
            open={isRenameModalOpen}
            onOpenChange={(isOpen) => {
                setIsRenameModalOpen(isOpen);
            }}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Rename the File</DialogTitle>
                </DialogHeader>
                <Input
                    id="link"
                    defaultValue={filename}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDownCapture={(e) => {
                        if (e.key === "Enter") {
                            renameFile();
                        }
                    }}
                />
                <DialogFooter className="flex justify-end space-x-2 py-3">
                    <Button
                        size="sm"
                        className="px-3"
                        variant="ghost"
                        onClick={() => setIsRenameModalOpen(false)}
                    >
                        <span className="sr-only">Cancel</span>
                        <span>Cancel</span>
                    </Button>
                    <Button
                        type="submit"
                        size="sm"
                        className="px-3"
                        onClick={() => {
                            renameFile();
                        }}
                    >
                        <span className="sr-only">Rename</span>
                        <span>Rename</span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
