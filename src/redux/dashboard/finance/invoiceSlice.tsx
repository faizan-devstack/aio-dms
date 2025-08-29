// InvoiceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Column {
  id: string;
  title: string;
  width: number;
}

interface Row {
  id: string;
  [key: string]: any;
}

interface InvoiceState {
  columns: Column[];
  rows: Row[];
  searchColumn: string;
  searchValue: string;
  filterColumn: string;
  filterValue: string;
  sortColumn: string;
  isAscending: boolean;
}

const initialState: InvoiceState = {
  columns: [
    { id: 'col1', title: 'Invoice', width: 150 },
    { id: 'col2', title: 'Customer', width: 150 },
    { id: 'col3', title: 'Status', width: 150 },
    { id: 'col4', title: 'Type', width: 150 },
    { id: 'col5', title: 'Date', width: 150 },
    { id: 'col6', title: 'Due Date', width: 150 },
  ],
  rows: [
    { id: 'row1', col1: 'INV001', col2: 'A', col3: 'Paid', col4: 'Service', col5: '21-03-2025', col6: '21-04-2025' },
    { id: 'row2', col1: 'INV002', col2: 'B', col3: 'Unpaid', col4: 'Supply', col5: '28-03-2025', col6: '28-04-2025' },
    { id: 'row3', col1: 'INV003', col2: 'C', col3: 'Pending', col4: 'Consulting', col5: '05-04-2025', col6: '05-05-2025' },
    { id: 'row4', col1: 'INV004', col2: 'D', col3: 'Paid', col4: 'Product', col5: '12-04-2025', col6: '12-05-2025' },
    { id: 'row5', col1: 'INV005', col2: 'E', col3: 'Overdue', col4: 'Subscription', col5: '18-04-2025', col6: '18-05-2025' },
    { id: 'row6', col1: 'INV006', col2: 'F', col3: 'Paid', col4: 'Maintenance', col5: '22-04-2025', col6: '22-05-2025' },
    { id: 'row7', col1: 'INV007', col2: 'G', col3: 'Unpaid', col4: 'Software', col5: '29-04-2025', col6: '29-05-2025' },
    { id: 'row8', col1: 'INV008', col2: 'H', col3: 'Pending', col4: 'License', col5: '03-05-2025', col6: '03-06-2025' },
    { id: 'row9', col1: 'INV009', col2: 'I', col3: 'Paid', col4: 'Hardware', col5: '10-05-2025', col6: '10-06-2025' },
    { id: 'row10', col1: 'INV010', col2: 'J', col3: 'Overdue', col4: 'Service', col5: '15-05-2025', col6: '15-06-2025' },
  ],
  searchColumn: '',
  searchValue: '',
  filterColumn: '',
  filterValue: '',
  sortColumn: '',
  isAscending: true,
};

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload;
    },
    setRows: (state, action: PayloadAction<Row[]>) => {
      state.rows = action.payload;
    },
    updateColumnTitle: (state, action: PayloadAction<{ id: string; newTitle: string }>) => {
      const { id, newTitle } = action.payload;
      state.columns = state.columns.map((col) =>
        col.id === id ? { ...col, title: newTitle } : col
      );
    },
    updateCell: (
      state,
      action: PayloadAction<{ rowId: string; columnId: string; newValue: string }>
    ) => {
      const { rowId, columnId, newValue } = action.payload;
      state.rows = state.rows.map((row) =>
        row.id === rowId ? { ...row, [columnId]: newValue } : row
      );
    },
    addColumn: (state) => {
      const newColumn: Column = {
        id: `col${state.columns.length + 1}`,
        title: 'New Column',
        width: 150,
      };
      state.columns.push(newColumn);
    },
    addRow: (state) => {
      const newRow: Row = {
        id: `row${state.rows.length + 1}`,
        ...state.columns.reduce((acc, col) => ({ ...acc, [col.id]: '' }), {}),
      };
      state.rows.push(newRow);
    },
    setSearch: (state, action: PayloadAction<{ columnId: string; value: string }>) => {
      state.searchColumn = action.payload.columnId;
      state.searchValue = action.payload.value;
    },
    setFilter: (state, action: PayloadAction<{ columnId: string; value: string }>) => {
      state.filterColumn = action.payload.columnId;
      state.filterValue = action.payload.value;
    },
    setSort: (state, action: PayloadAction<{ columnId: string; isAscending: boolean }>) => {
      state.sortColumn = action.payload.columnId;
      state.isAscending = action.payload.isAscending;
    },
    clearAll: (state) => {
      state.searchColumn = '';
      state.searchValue = '';
      state.filterColumn = '';
      state.filterValue = '';
      state.sortColumn = '';
      state.isAscending = true;
    },
  },
});

export const {
  setColumns,
  setRows,
  updateColumnTitle,
  updateCell,
  addColumn,
  addRow,
  setSearch,
  setFilter,
  setSort,
  clearAll,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;