"use client";

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useAppStore } from "@/store/store";
import { DeleteModal } from "../DeleteModal";
import { RenameModal } from "../RenameModal";

function DataTable({ columns, data }) {
    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const [setIsDeleteModalOpen, setFileId, setFilename, setIsRenameModalOpen] =
        useAppStore((state) => [
            state.setIsDeleteModalOpen,
            state.setFileId,
            state.setFilename,
            state.setIsRenameModalOpen,
        ]);

    const openDeleteModal = (fileId) => {
        setFileId(fileId);
        setIsDeleteModalOpen(true);
    };

    const openRenameModal = (fileId, filename) => {
        setFileId(fileId);
        setFilename(filename);
        setIsRenameModalOpen(true);
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                <DeleteModal />
                                <RenameModal />
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {/* Or you can change the format in columns.jsx (better) */}
                                        {cell.column.id === "timestamp" ? (
                                            <div className="flex flex-col">
                                                <div className="text-sm">
                                                    {new Date(
                                                        cell.getValue()
                                                    ).toLocaleDateString()}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(
                                                        cell.getValue()
                                                    ).toLocaleTimeString()}
                                                </div>
                                            </div>
                                        ) : cell.column.id === "filename" ? (
                                            <p
                                                onClick={() => {
                                                    openRenameModal(
                                                        row.original.id,
                                                        row.original.filename
                                                    );
                                                }}
                                                className="underline flex items-center text-blue-500 hover:cursor-pointer"
                                            >
                                                {cell.getValue()}{" "}
                                                <PencilIcon
                                                    size={15}
                                                    className="ml-2"
                                                />
                                            </p>
                                        ) : (
                                            flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )
                                        )}
                                    </TableCell>
                                ))}
                                <TableCell key={row.original.id}>
                                    <Button
                                        variant={"outline"}
                                        onClick={() =>
                                            openDeleteModal(row.original.id)
                                        }
                                    >
                                        <TrashIcon size={20} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No Files
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default DataTable;
