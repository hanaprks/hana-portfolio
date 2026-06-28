import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyState from "../common/EmptyState";

interface HeaderColumn {
  key: string;
  label: string;
  className?: string;
}

interface DataTableProps<T> {
  columns: HeaderColumn[];
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  onEmptyAction?: () => void;
  emptyActionLabel?: string;
}

export default function DataTable<T>({
  columns,
  data,
  renderRow,
  emptyTitle,
  emptyDescription,
  onEmptyAction,
  emptyActionLabel,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        action={
          onEmptyAction && emptyActionLabel
            ? { label: emptyActionLabel, onClick: onEmptyAction }
            : undefined
        }
      />
    );
  }

  return (
    <div className="rounded-2xl border bg-card overflow-hidden">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className={column.className}>
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => renderRow(item, index))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
