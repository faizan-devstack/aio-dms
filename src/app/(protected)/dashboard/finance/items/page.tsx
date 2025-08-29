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

export default function Items() {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'col1', title: 'Item Name', width: 200 },
    { id: 'col2', title: 'Description', width: 300 },
    { id: 'col3', title: 'Price', width: 150 },
    { id: 'col4', title: 'Quantity', width: 150 },
    { id: 'col5', title: 'Category', width: 150 },
    { id: 'col6', title: 'SKU', width: 150 },
    { id: 'col7', title: 'Taxable', width: 150 },
  ]);

  const [rows, setRows] = useState<Row[]>([
    { id: 'row1', col1: 'Laptop', col2: 'High-performance laptop', col3: '$1200', col4: '10', col5: 'Electronics', col6: 'LP123', col7: 'Yes' },
    { id: 'row2', col1: 'Desk Chair', col2: 'Ergonomic office chair', col3: '$250', col4: '15', col5: 'Furniture', col6: 'DC456', col7: 'Yes' },
    { id: 'row3', col1: 'Notebook', col2: 'A4 size notebook', col3: '$5', col4: '100', col5: 'Stationery', col6: 'NB789', col7: 'No' },
    { id: 'row4', col1: 'Smartphone', col2: 'Latest model smartphone', col3: '$800', col4: '20', col5: 'Electronics', col6: 'SP012', col7: 'Yes' },
    { id: 'row5', col1: 'Coffee Mug', col2: 'Ceramic coffee mug', col3: '$10', col4: '50', col5: 'Kitchenware', col6: 'CM345', col7: 'No' },
    { id: 'row6', col1: 'Backpack', col2: 'Waterproof backpack', col3: '$70', col4: '30', col5: 'Accessories', col6: 'BP678', col7: 'Yes' },
    { id: 'row7', col1: 'Monitor', col2: '27-inch 4K monitor', col3: '$400', col4: '12', col5: 'Electronics', col6: 'MT901', col7: 'Yes' },
    { id: 'row8', col1: 'Desk Lamp', col2: 'LED desk lamp', col3: '$35', col4: '25', col5: 'Furniture', col6: 'DL234', col7: 'No' },
    { id: 'row9', col1: 'Printer', col2: 'Wireless color printer', col3: '$150', col4: '8', col5: 'Electronics', col6: 'PR567', col7: 'Yes' },
    { id: 'row10', col1: 'Stapler', col2: 'Heavy-duty stapler', col3: '$8', col4: '40', col5: 'Stationery', col6: 'ST890', col7: 'No' },
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
        <h1 className="text-2xl font-medium">Items</h1>
      </div>

      <div className="flex items-center justify-start space-x-5 mt-3 pl-8">
        <Button className="bg-green-700 text-white" onClick={handleAddRow}>
          New Item
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