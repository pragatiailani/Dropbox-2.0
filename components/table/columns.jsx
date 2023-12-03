"use client";

import { COLOR_EXTENSION_MAP } from "@/constant";
import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from "react-file-icon";

export const columns = [
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ renderValue, ...props }) => {
            const type = renderValue();
            const extension = type.split("/")[1]; // image/jpeg => [image, jpeg]
            return (
                <div className="w-10">
                    <FileIcon
                        extension={extension}
                        labelColor={COLOR_EXTENSION_MAP[extension]}
                        {...defaultStyles[extension]}
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "filename",
        header: "Filename",
    },
    {
        accessorKey: "timestamp",
        header: "Date Added",
    },
    {
        accessorKey: "size",
        header: "Size",
        cell: ({ renderValue, ...props }) => {
            return <span>{prettyBytes(renderValue())}</span>;
        },
    },
    {
        // If you opted to use the <Link> component from Next  instead of the <a> tag this will cause an error with hot reload down the road when you go to test in dropping a new file for the instant file loading, you will either need to swap back to <a> or find a work around.
        accessorKey: "downloadURL",
        header: "Link",
        cell: ({ renderValue, ...props }) => (
            <a
                href={renderValue()}
                target="_blank"
                className="underline text-blue-500 hover:text-blue-600"
            >
                Download
            </a>
        ),
    },
];
