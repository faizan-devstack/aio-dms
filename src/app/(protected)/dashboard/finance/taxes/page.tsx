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

export default function Taxes() {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'col1', title: 'Tax Name', width: 200 },
    { id: 'col2', title: 'Tax Rate', width: 150 },
    { id: 'col3', title: 'Description', width: 300 },
    { id: 'col4', title: 'Applicable To', width: 200 },
  ]);

  const [rows, setRows] = useState<Row[]>([
    { id: 'row1', col1: 'GST', col2: '5%', col3: 'Goods and Services Tax', col4: 'All Products' },
    { id: 'row2', col1: 'VAT', col2: '10%', col3: 'Value Added Tax', col4: 'Non-Essential Goods' },
    { id: 'row3', col1: 'Sales Tax', col2: '7%', col3: 'State Sales Tax', col4: 'Local Sales' },
    { id: 'row4', col1: 'Import Duty', col2: '15%', col3: 'Tax on imported goods', col4: 'Imported Items' },
    { id: 'row5', col1: 'Service Tax', col2: '12%', col3: 'Tax on services', col4: 'Service Providers' },
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
        <h1 className="text-2xl font-medium">Taxes</h1>
      </div>

      <div className="flex items-center justify-start space-x-5 mt-3 pl-8">
        <Button className="bg-green-700 text-white" onClick={handleAddRow}>
          New Tax
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