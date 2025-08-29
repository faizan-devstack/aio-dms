'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import Table from '@/components/Table';
import Sort from '@/components/ui/sort';
import Filter from '@/components/ui/filter';
import Search from '@/components/ui/search';

interface Column {
  id: string;
  title: string;
  width: number;
}

interface Row {
  id: string;
  [key: string]: any;
}

export default function Estimates() {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'col1', title: 'Estimate', width: 150 },
    { id: 'col2', title: 'Customer', width: 150 },
    { id: 'col3', title: 'Status', width: 150 },
    { id: 'col4', title: 'Type', width: 150 },
    { id: 'col5', title: 'Date', width: 150 },
    { id: 'col6', title: 'Expiry Date', width: 150 },
    { id: 'col7', title: 'Amount', width: 150 },
  ]);
  
  const [rows, setRows] = useState<Row[]>([
    { id: 'row1', col1: 'EST001', col2: 'A', col3: 'Draft', col4: 'Service', col5: '21-03-2025', col6: '21-04-2025', col7: '$1,000' },
    { id: 'row2', col1: 'EST002', col2: 'B', col3: 'Sent', col4: 'Supply', col5: '28-03-2025', col6: '28-04-2025', col7: '$2,500' },
    { id: 'row3', col1: 'EST003', col2: 'C', col3: 'Accepted', col4: 'Consulting', col5: '05-04-2025', col6: '05-05-2025', col7: '$3,200' },
    { id: 'row4', col1: 'EST004', col2: 'D', col3: 'Rejected', col4: 'Product', col5: '12-04-2025', col6: '12-05-2025', col7: '$4,800' },
    { id: 'row5', col1: 'EST005', col2: 'E', col3: 'Expired', col4: 'Subscription', col5: '18-04-2025', col6: '18-05-2025', col7: '$1,500' },
    { id: 'row6', col1: 'EST006', col2: 'F', col3: 'Draft', col4: 'Maintenance', col5: '22-04-2025', col6: '22-05-2025', col7: '$2,000' },
    { id: 'row7', col1: 'EST007', col2: 'G', col3: 'Sent', col4: 'Software', col5: '29-04-2025', col6: '29-05-2025', col7: '$5,000' },
    { id: 'row8', col1: 'EST008', col2: 'H', col3: 'Accepted', col4: 'License', col5: '03-05-2025', col6: '03-06-2025', col7: '$1,200' },
    { id: 'row9', col1: 'EST009', col2: 'I', col3: 'Rejected', col4: 'Hardware', col5: '10-05-2025', col6: '10-06-2025', col7: '$3,500' },
    { id: 'row10', col1: 'EST010', col2: 'J', col3: 'Expired', col4: 'Service', col5: '15-05-2025', col6: '15-06-2025', col7: '$2,800' },
  ]);

  const [searchColumn, setSearchColumn] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<string>('');
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const handleColumnTitleChange = (id: string, newTitle: string) => {
    setColumns(columns.map((col) => (col.id === id ? { ...col, title: newTitle } : col)));
  };

  const handleCellChange = (rowId: string, columnId: string, newValue: string) => {
    setRows(rows.map((row) => (row.id === rowId ? { ...row, [columnId]: newValue } : row)));
  };

  const handleAddColumn = () => {
    const newColumn: Column = { id: `col${columns.length + 1}`, title: 'New Column', width: 150 };
    setColumns([...columns, newColumn]);
  };

  const handleAddRow = () => {
    const newRow: Row = {
      id: `row${rows.length + 1}`,
      ...columns.reduce((acc, col) => ({ ...acc, [col.id]: '' }), {}),
    };
    setRows([...rows, newRow]);
  };

  const handleSearch = (columnId: string, searchValue: string) => {
    setSearchColumn(columnId);
    setSearchValue(searchValue);
  };

  const handleFilter = (columnId: string, filterValue: string) => {
    setFilterColumn(columnId);
    setFilterValue(filterValue);
  };

  const handleSort = (columnId: string, isAscending: boolean) => {
    setSortColumn(columnId);
    setIsAscending(isAscending);
  };

  return (
    <div className="bg-white h-[calc(100vh-48px)] flex flex-col">
      <div className="w-full border-b pb-4 pl-8 pt-4">
        <h1 className="text-2xl font-medium">Estimates</h1>
      </div>

      <div className="flex items-center justify-start space-x-5 mt-3 pl-8">
        <Button className="bg-green-700 text-white" onClick={handleAddRow}>
          New Estimate
        </Button>
        <Search columns={columns} onSearch={handleSearch} />
        <Filter columns={columns} rows={rows} onFilter={handleFilter} />
        <Sort columns={columns} onSort={handleSort} />
        <button className="flex gap-1 text-xs justify-center items-center bg-[#c6e9d5] p-[7px] rounded">
          <MoreHorizontal className="text-gray-500" size={20} />
          More
        </button>
      </div>

      <Table
        columns={columns}
        rows={rows}
        onColumnTitleChange={handleColumnTitleChange}
        onCellChange={handleCellChange}
        onAddColumn={handleAddColumn}
        onAddRow={handleAddRow}
        searchColumn={searchColumn}
        searchValue={searchValue}
        filterColumn={filterColumn}
        filterValue={filterValue}
        sortColumn={sortColumn}
        isAscending={isAscending}
      />
    </div>
  );
}