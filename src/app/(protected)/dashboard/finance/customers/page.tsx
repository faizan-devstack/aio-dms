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

export default function Customers() {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'col1', title: 'Customer Name', width: 200 },
    { id: 'col2', title: 'Email', width: 200 },
    { id: 'col3', title: 'Phone', width: 150 },
    { id: 'col4', title: 'Status', width: 150 },
    { id: 'col5', title: 'Address', width: 250 },
    { id: 'col6', title: 'City', width: 150 },
    { id: 'col7', title: 'Country', width: 150 },
  ]);

  const [rows, setRows] = useState<Row[]>([
    { id: 'row1', col1: 'John Doe', col2: 'john.doe@example.com', col3: '+123456789', col4: 'Active', col5: '123 Main St', col6: 'New York', col7: 'USA' },
    { id: 'row2', col1: 'Jane Smith', col2: 'jane.smith@example.com', col3: '+987654321', col4: 'Inactive', col5: '456 Elm St', col6: 'Los Angeles', col7: 'USA' },
    { id: 'row3', col1: 'Alice Johnson', col2: 'alice.johnson@example.com', col3: '+1122334455', col4: 'Active', col5: '789 Oak St', col6: 'Chicago', col7: 'USA' },
    { id: 'row4', col1: 'Bob Brown', col2: 'bob.brown@example.com', col3: '+9988776655', col4: 'Pending', col5: '321 Pine St', col6: 'Houston', col7: 'USA' },
    { id: 'row5', col1: 'Charlie Davis', col2: 'charlie.davis@example.com', col3: '+5544332211', col4: 'Active', col5: '654 Birch St', col6: 'Phoenix', col7: 'USA' },
    { id: 'row6', col1: 'Eve Wilson', col2: 'eve.wilson@example.com', col3: '+6677889900', col4: 'Inactive', col5: '987 Cedar St', col6: 'Philadelphia', col7: 'USA' },
    { id: 'row7', col1: 'Frank Moore', col2: 'frank.moore@example.com', col3: '+3344556677', col4: 'Active', col5: '159 Maple St', col6: 'San Antonio', col7: 'USA' },
    { id: 'row8', col1: 'Grace Taylor', col2: 'grace.taylor@example.com', col3: '+7788990011', col4: 'Pending', col5: '753 Walnut St', col6: 'San Diego', col7: 'USA' },
    { id: 'row9', col1: 'Henry Clark', col2: 'henry.clark@example.com', col3: '+1122334455', col4: 'Active', col5: '852 Cherry St', col6: 'Dallas', col7: 'USA' },
    { id: 'row10', col1: 'Ivy Lewis', col2: 'ivy.lewis@example.com', col3: '+9988776655', col4: 'Inactive', col5: '456 Peach St', col6: 'San Jose', col7: 'USA' },
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
        <h1 className="text-2xl font-medium">Customers</h1>
      </div>

      <div className="flex items-center justify-start space-x-5 mt-3 pl-8">
        <Button className="bg-green-700 text-white" onClick={handleAddRow}>
          New Customer
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