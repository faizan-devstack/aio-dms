'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';

interface Column {
  id: string;
  title: string;
  width: number;
}

interface Row {
  id: string;
  [key: string]: any;
}

interface TableProps {
  columns: Column[];
  rows: Row[];
  onColumnTitleChange: (id: string, newTitle: string) => void;
  onCellChange: (rowId: string, columnId: string, newValue: string) => void;
  onAddColumn: () => void;
  onAddRow: () => void;
  searchColumn: string;
  searchValue: string;
  filterColumn: string;
  filterValue: string;
  sortColumn: string;
  isAscending: boolean;
}

export default function Table({
  columns,
  rows,
  onColumnTitleChange,
  onCellChange,
  onAddColumn,
  onAddRow,
  searchColumn,
  searchValue,
  filterColumn,
  filterValue,
  sortColumn,
  isAscending,
}: TableProps) {
  const [activeCell, setActiveCell] = useState<{ rowId: string; colId: string } | null>(null);
  const [resizingColumnId, setResizingColumnId] = useState<string | null>(null);
  const [startX, setStartX] = useState<number>(0);
  const [startWidth, setStartWidth] = useState<number>(0);
  const tableRef = useRef<HTMLTableElement>(null);

  // Compute filtered rows based on search, filter, and sort
  const filteredRows = useMemo(() => {
    let result = [...rows];

    // Apply search
    if (searchColumn && searchValue) {
      result = result.filter((row) =>
        row[searchColumn]?.toString().toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Apply filter
    if (filterColumn && filterValue) {
      result = result.filter((row) => row[filterColumn] === filterValue);
    }

    // Apply sort
    if (sortColumn) {
      result.sort((a, b) => {
        const aValue = a[sortColumn] ?? '';
        const bValue = b[sortColumn] ?? '';
        if (aValue < bValue) return isAscending ? -1 : 1;
        if (aValue > bValue) return isAscending ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [rows, searchColumn, searchValue, filterColumn, filterValue, sortColumn, isAscending]);

  const handleDoubleClick = (rowId: string, colId: string) => {
    setActiveCell({ rowId, colId });
  };

  const handleResizeStart = (e: React.MouseEvent, columnId: string) => {
    setResizingColumnId(columnId);
    setStartX(e.clientX);
    const column = columns.find((col) => col.id === columnId);
    if (column) setStartWidth(column.width);
  };

  const handleResize = (e: MouseEvent) => {
    if (resizingColumnId) {
      const newWidth = startWidth + (e.clientX - startX);
      const updatedColumns = columns.map((col) =>
        col.id === resizingColumnId ? { ...col, width: newWidth } : col
      );
      onColumnTitleChange(resizingColumnId, updatedColumns.find((col) => col.id === resizingColumnId)!.title); // Update column width indirectly
    }
  };

  const handleResizeEnd = () => {
    setResizingColumnId(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tableRef.current && !tableRef.current.contains(e.target as Node)) {
        setActiveCell(null);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (resizingColumnId) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleResizeEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [resizingColumnId, columns]);

  return (
    <div className="flex-1 mt-4 overflow-auto mx-2" ref={tableRef}>
      <table className="w-full">
        <thead className="sticky top-0 bg-white z-30">
          <tr>
            {columns.map((col, colIndex) => (
              <th
                key={col.id}
                className={`px-4 relative text-[14px] bg-gray-100 font-medium ${
                  colIndex === 0 ? 'sticky left-0 z-20 shadow-md rounded-tl-lg' : ''
                } ${colIndex === columns.length - 1 ? 'rounded-tr-lg' : ''}`}
                style={{
                  minWidth: `${col.width}px`,
                  width: `${col.width}px`,
                  height: '35px',
                  position: colIndex === 0 ? 'sticky' : 'static',
                  left: colIndex === 0 ? 0 : 'auto',
                }}
              >
                <input
                  type="text"
                  value={col.title}
                  onChange={(e) => onColumnTitleChange(col.id, e.target.value)}
                  className="w-full bg-transparent focus:outline-none"
                />
                {colIndex === columns.length - 1 && (
                  <button
                    onClick={onAddColumn}
                    className="absolute right-5 text-green-500 bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6"
                  >
                    +
                  </button>
                )}
                <div
                  className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize"
                  onMouseDown={(e) => handleResizeStart(e, col.id)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row) => (
            <tr key={row.id}>
              {columns.map((col, colIndex) => (
                <td
                  key={col.id}
                  className={`px-2 py-1 border ${
                    colIndex === 0 ? 'sticky left-0 bg-white z-10' : ''
                  }`}
                  style={{
                    minWidth: `${col.width}px`,
                    width: `${col.width}px`,
                    height: '35px',
                    position: colIndex === 0 ? 'sticky' : 'static',
                    left: colIndex === 0 ? 0 : 'auto',
                    borderLeft: colIndex === 0 ? 'none' : 'border',
                    borderRight: colIndex === columns.length - 1 ? 'none' : 'border',
                  }}
                  onDoubleClick={() => handleDoubleClick(row.id, col.id)}
                >
                  <input
                    type="text"
                    value={row[col.id] ?? ''}
                    onChange={(e) => onCellChange(row.id, col.id, e.target.value)}
                    className={`w-full focus:outline-none text-[13px] ${
                      activeCell?.rowId === row.id && activeCell?.colId === col.id
                        ? 'border border-[#c6e9d5] rounded-md px-2'
                        : ''
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}