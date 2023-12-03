"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";

export function DeleteModal() {
    const { user } = useUser();

    const [isDeleteModalOpen, setIsDeleteModalOpen, fileId] = useAppStore(
        (state) => [
            state.isDeleteModalOpen,
            state.setIsDeleteModalOpen,
            state.fileId,
        ]
    );

    async function deleteFile() {
        if (!user || !fileId) return;
        const toastId = toast.loading("Deleting...");
        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);
        // await deleteObject(fileRef);
        try {
            deleteObject(fileRef)
                .then(async () => {
                    console.log("File Deleted");
                    deleteDoc(doc(db, "users", user.id, "files", fileId)).then(
                        () => {
                            console.log("Deleted");
                        }
                    );
                    toast.success("Deleted Successfully", {
                        id: toastId,
                    });
                })
                .finally(() => {
                    setIsDeleteModalOpen(false);
                });
        } catch (error) {
            console.log("Uh-oh! An error occurred!", error);
            toast.error("Uh-oh! An error occurred!", {
                id: toastId,
            });
            // } finally {
            setIsDeleteModalOpen(false);
        }
    }

    return (
        <Dialog
            open={isDeleteModalOpen}
            onOpenChange={(isOpen) => {
                setIsDeleteModalOpen(isOpen);
            }}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will delete your file
                        permanently.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex space-x-2 py-3">
                    <Button
                        size="sm"
                        className="px-3 flex-1"
                        variant={"ghost"}
                        onClick={() => setIsDeleteModalOpen(false)}
                    >
                        <span className="sr-only">Cancel</span>
                        <span>Cancel</span>
                    </Button>
                    <Button
                        type="submit"
                        size="sm"
                        className="px-3 flex-1"
                        variant={"destructive"}
                        onClick={() => deleteFile()}
                    >
                        <span className="sr-only">Delete</span>
                        <span>Delete</span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
