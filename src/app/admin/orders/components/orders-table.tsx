"use client";

import { useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { OrderModal } from "./order-modal";
import { Pagination } from "@/app/shop/components/ui/pagination";

interface Order {
  id: string;
  customerName: string;
  products: string;
  category: string;
  date: string;
  price: number;
  status: "completed" | "pending" | "cancelled";
}

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: ({ row }) => (
      <div className="hidden md:table-cell">{row.getValue("customerName")}</div>
    ),
  },
  {
    accessorKey: "products",
    header: "Product(s)",
    cell: ({ row }) => (
      <div className="table-cell">{row.getValue("products")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("price"));
      return <div>₦{price.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`inline-flex rounded-full px-2 text-xs font-normal leading-5 ${
            status === "completed"
              ? "bg-secondary-2/20 text-secondary-2"
              : status === "pending"
              ? "bg-neon/20 text-neon"
              : "bg-red/20 text-red"
          }`}
        >
          {status}
        </span>
      );
    },
  },
];

export function OrdersTable({ data }: { data: Order[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  return (
    <div>
      <div className="rounded border-2 space-y-5 border-gray-light overflow-x-auto ">
        <h4 className="pt-5 pl-5 w-full text-xl font-bold text-gray-8">Recent Orders</h4>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.column.id === "customerName"
                        ? "hidden md:table-cell"
                        : header.column.id === "products"
                        ? "p-0 sm:p-3 "
                        : header.column.id === "status"
                        ? " hidden md:table-cell"
                        : "text-nowrap"
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer hover:bg-gray-2/50"
                  onClick={() => setSelectedOrder(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.id === "customerName"
                          ? "hidden md:table-cell"
                          : cell.column.id === "products"
                          ? "max-w-[120px] p-0 sm:p-3 truncate text-ellipsis md:max-w-none md:whitespace-nowrap"
                          : cell.column.id === "status"
                          ? "hidden md:table-cell"
                          : "text-gray-8/90"
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Pagination
          totalPages={table.getPageCount()}
          currentPage={table.getState().pagination.pageIndex + 1}
          onPageChange={(page) => table.setPageIndex(page - 1)}
        />
      </div>
      <OrderModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </div>
  );
}
