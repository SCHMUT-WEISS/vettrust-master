/* eslint-disable security/detect-object-injection, indent */
import { useMemo } from "react";
import { storyblokEditable } from "@storyblok/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableSectionStoryblok } from "../../../@types/generated/storyblok";

interface TableSectionBlokProps {
  blok: TableSectionStoryblok;
}

type ColumnObject = {
  [key: string]: string;
};

const spacing = {
  default: "mt-32 lg:mt-48",
  narrow: "mt-24 lg:mt-32",
  none: "",
};

const columnHelper = createColumnHelper<ColumnObject>();

export default function TableSectionBlok({ blok }: TableSectionBlokProps) {
  const columnNames = useMemo(() => {
    return blok.table?.thead.map(({ value = "" }) => value) || [];
  }, [blok.table]);

  const columns = useMemo(() => {
    return (
      columnNames.map(value => {
        if (value === "") {
          return columnHelper.display({
            id: "row",
            cell: info => info.row.original[""],
          });
        }
        return columnHelper.accessor(value, {
          header: value,
          cell: info => info.getValue(),
        });
      }) || []
    );
  }, [columnNames]);

  const data = useMemo(() => {
    return (
      blok.table?.tbody.map(({ body }) => {
        const builder: ColumnObject = {};
        body.forEach((field, index) => {
          const key = columnNames[index];
          builder[key] = field.value || "";
        });
        return builder;
      }) || []
    );
  }, [blok.table, columnNames]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={`flex${blok.center ? " justify-center" : ""}${blok.content_margin ? " prose container-wrapper" : "p-5"}`} {...storyblokEditable({ ...blok })}>
      <div className={`overflow-x-auto ${spacing[blok.spacing]}`}>
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-3 py-5 border-r-2 border-b-2 border-lightBlue bg-darkBlue text-white text-left"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="p-3 w-60 bg-white border-r-2 border-b-2 border-lightBlue"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
