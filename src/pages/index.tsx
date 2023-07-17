import {
  useReactTable,
  type ColumnDef,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  CalendarRange,
  ChevronRight,
  Radiation,
  TrendingDown,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AnimatePresence, motion } from "framer-motion";

type People = {
  id: string;
  name: string;
  date: string;
  description: string;
  status: boolean;
};

export default function Home() {
  const data = [
    {
      id: "1",
      name: "John Doe",
      date: "2023-07-17",
      description: "Lorem ipsum dolor sit amet.",
      status: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      date: "2023-07-18",
      description: "Consectetur adipiscing elit.",
      status: true,
    },
    {
      id: "3",
      name: "Robert Johnson",
      date: "2023-07-19",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      status: false,
    },
  ];

  const [displayData, setDisplayData] = useState(data);

  const handleActivityToggle = (id: string) => {
    setDisplayData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  return (
    <div className="h-full min-h-screen bg-slate-100">
      <div className="bg-slate-950 p-4 text-slate-50">
        <div className="space-y-2">
          <div className="flex w-full justify-between">
            <div className="mt-1 text-xs font-semibold text-slate-200">
              TOTAL CLIENTS
            </div>
            <div className="flex gap-2">
              <div className="dark rounded border border-slate-600 p-1">
                <UserCheck size={16} className="text-slate-400" />
              </div>
              <div className="dark rounded border border-slate-600 p-1">
                <CalendarRange size={16} className="text-slate-400" />
              </div>
            </div>
          </div>
          <div className="text-4xl font-extrabold text-slate-100">
            {displayData.length}
          </div>
          <div className="flex gap-4 pt-1">
            <Badge className="bg-indigo-600">
              <TrendingUp size={16} className="mr-2" />
              18%
            </Badge>
            <div className="text-sm text-slate-400">
              Apr 01, 2022 - Apr 30, 2022
            </div>
          </div>
        </div>
      </div>
      <div className="h-fit min-h-fit">
        <div className="h-4 bg-slate-950"></div>
        <div className="mx-auto flex gap-2 bg-gradient-to-r from-red-500 via-red-400 to-blue-500 p-2 shadow-inner">
          <Card className="w-full">
            <CardHeader className="p-4 pb-0">
              <CardTitle>
                <Radiation size={24} strokeWidth={2.5} />
              </CardTitle>
              <CardDescription>Inactive Clients</CardDescription>
            </CardHeader>
            <CardContent className="p-4 py-2 pb-4">
              <div className="flex justify-between">
                <div className="font-bold text-slate-600">
                  {displayData.filter((item) => !item.status).length}
                </div>
                <Badge className="bg-red-500/60 text-red-950">
                  <TrendingDown size={16} className="mr-2" />
                  20%
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader className="p-4 pb-0">
              <CardTitle>
                <Activity size={24} strokeWidth={2.5} />
              </CardTitle>
              <CardDescription>Active Clients</CardDescription>
            </CardHeader>
            <CardContent className="p-4 py-2 pb-4">
              <div className="flex justify-between">
                <div className="font-bold text-slate-600">
                  {displayData.filter((item) => item.status).length}
                </div>
                <Badge className="bg-green-500/60 text-green-950">
                  <TrendingUp size={16} className="mr-2" />
                  30%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="hidden rounded-md p-4 md:block">
        <DataTable
          data={displayData}
          handleActivityToggle={handleActivityToggle}
        />
      </div>

      <div className="block pt-2 md:hidden">
        <DataCardList
          data={displayData}
          handleActivityToggle={handleActivityToggle}
        />
      </div>
    </div>
  );
}

type DataTableProps = {
  data: People[];
  handleActivityToggle: (id: string) => void;
};

const DataTable = (props: DataTableProps) => {
  const { data, handleActivityToggle } = props;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<People>[] = [
    {
      accessorKey: "name",
      header: () => <div className="font-bold text-sky-50">Name</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left text-sky-950">{row.getValue("name")}</div>
        );
      },
    },
    {
      accessorKey: "date",
      header: () => <div className="font-bold text-sky-50">Date</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left text-sky-950">{row.getValue("date")}</div>
        );
      },
    },
    {
      accessorKey: "description",
      header: () => <div className="font-bold text-sky-50">Description</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left text-sky-950">
            {row.getValue("description")}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="font-bold text-sky-50">Status</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left text-sky-950">
            {row.getValue("status") ? (
              <Badge className="bg-green-600 text-slate-50">Active</Badge>
            ) : (
              <Badge className="bg-red-500 text-slate-50">Inactive</Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "activation",
      header: () => <div className="font-bold text-sky-50">Activation</div>,
      cell: ({ row }) => (
        <div className="text-left">
          <Button
            size={"sm"}
            onClick={() => handleActivityToggle(row.original.id)}
            className="w-20"
          >
            {row.getValue("status") ? "Deactivate" : "Activate"}
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    columns,
    data,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="mx-auto rounded-xl border border-slate-100 bg-white text-center shadow ">
      <Table className="rounded-xl shadow-lg">
        <TableHeader className="sticky top-0 text-sky-950">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-slate-900 hover:bg-slate-700"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="overflow-y-auto">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, idx) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={clsx(
                  idx % 2 !== 0 ? "bg-slate-100" : "bg-white",
                  row.getIsSelected() && "bg-sky-100"
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

type DataCardListProps = {
  data: People[];
  handleActivityToggle: (id: string) => void;
};

const DataCardList = (props: DataCardListProps) => {
  const { data, handleActivityToggle } = props;

  useEffect(() => {
    console.log(data);
  }, [data]);

  const [openItems, setOpenItems] = useState<string[]>();

  const chevronVariants = {
    open: {
      rotate: 90,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      rotate: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleOpenToggle = (id: string) => {
    // check if id is already in the list

    if (openItems?.includes(id)) {
      // remove id from the list
      setOpenItems((prev) => prev?.filter((item) => item !== id));
    } else {
      // add id to the list
      setOpenItems((prev) => [...(prev ?? []), id]);
    }
  };

  const isOpen = (id: string) => {
    return openItems?.includes(id);
  };

  return (
    <div className="px-2">
      <div className="py-2 text-lg font-semibold text-slate-600">Clients</div>
      <div className="space-y-2">
        {data.map((item) => (
          <Card
            className="w-full shadow-sm"
            key={item.id}
            onClick={() => handleOpenToggle(item.id)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Avatar className="my-auto">
                    <AvatarFallback className="dark bg-slate-400 font-bold">
                      {item.name.split(" ").map((name) => name[0])}
                    </AvatarFallback>
                  </Avatar>
                  <div className="my-auto max-w-sm">
                    <div className="font-bold text-slate-600">{item.name}</div>
                    <div className="w-32 max-w-xs truncate text-sm text-slate-600 sm:w-40">
                      {item.description}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <div className="pr-1 text-right font-bold text-slate-600">
                      740
                    </div>
                    <Badge
                      className={clsx("bg-red-500/50 text-red-900", {
                        "bg-green-500/50 text-green-900": item.status,
                      })}
                    >
                      {item.status ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="my-auto">
                    <Button variant="ghost" className="p-0">
                      <motion.div
                        layoutId={`chevron-${item.id}`}
                        className="h-6 w-6 text-slate-600"
                        animate={isOpen(item.id) ? "open" : "closed"}
                        variants={chevronVariants}
                      >
                        <ChevronRight size={24} />
                      </motion.div>
                    </Button>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {isOpen(item.id) && (
                  <motion.div
                    layoutId={`btn-${item.id}`}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className={clsx("w-full pt-4")}
                  >
                    <Button
                      size={"sm"}
                      className="w-full"
                      onClick={() => handleActivityToggle(item.id)}
                    >
                      {item.status ? "Deactivate" : "Activate"}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
