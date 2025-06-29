'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type {
  GridReadyEvent,
  GridApi,
  ColumnApi,
  ColDef,
  ValueFormatterParams,
} from 'ag-grid-community';
import type { CustomCellRendererProps } from 'ag-grid-react';

ModuleRegistry.registerModules([AllCommunityModule]);

// Custom Company Logo Renderer
const CompanyLogoRenderer = (params: CustomCellRendererProps) => (
  <span className="flex items-center">
    {params.value && (
      <img
        alt={params.value}
        src={`https://www.ag-grid.com/example-assets/space-company-logos/${params.value.toLowerCase()}.png`}
        className="w-6 h-auto mr-2"
      />
    )}
    <span className="truncate">{params.value}</span>
  </span>
);

// Tick/Cross Icon Renderer
const MissionResultRenderer = (params: CustomCellRendererProps) => (
  <div className="flex justify-center">
    <img
      alt={params.value ? 'Success' : 'Failure'}
      src={`https://www.ag-grid.com/example-assets/icons/${params.value ? 'tick-in-circle' : 'cross-in-circle'}.png`}
      className="w-5"
    />
  </div>
);

// Format Dates
const dateFormatter = (params: ValueFormatterParams): string => {
  return new Date(params.value).toLocaleDateString('en-us', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Row Interface
interface IRow {
  mission: string;
  company: string;
  location: string;
  date: string;
  time: string;
  rocket: string;
  price: number;
  successful: boolean;
}

const InquiryTable = () => {
  const [rowData, setRowData] = useState<IRow[] | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [columnApi, setColumnApi] = useState<ColumnApi | null>(null);
  const [quickFilterText, setQuickFilterText] = useState('');

  const columnDefs = useMemo<ColDef[]>(() => [
    { field: 'mission', headerName: 'Mission', width: 150 },
    { field: 'company', headerName: 'Company', width: 160, cellRenderer: CompanyLogoRenderer },
    { field: 'location', headerName: 'Location', width: 220 },
    { field: 'date', headerName: 'Date', valueFormatter: dateFormatter },
    {
      field: 'price',
      headerName: 'Price (£)',
      width: 140,
      valueFormatter: (p) => `£${p.value.toLocaleString()}`,
    },
    { field: 'successful', headerName: 'Success', width: 100, cellRenderer: MissionResultRenderer },
    { field: 'rocket', headerName: 'Rocket' },
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    filter: true,
    editable: true,
    resizable: true,
  }), []);

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/space-mission-data.json')
      .then((res) => res.json())
      .then((data) => setRowData(data))
      .catch((err) => console.error('Data fetch error:', err));
  }, []);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'all' && rowData) {
      setPageSize(rowData.length);
    } else {
      setPageSize(Number(value));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuickFilterText(value);
    if (gridApi) {
      gridApi.setQuickFilter(value);
    }
  };

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
  };

  return (
    <div className="w-full p-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-black">🚀 CRM Inquiries</h2>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="🔍 Search..."
            value={quickFilterText}
            onChange={handleSearchChange}
            className="rounded-md border border-gray-300 bg-white text-sm text-gray-700 px-3 py-1 w-48"
          />
          <select
            id="pageSize"
            className="rounded-md border border-gray-300 bg-white text-sm text-gray-700 px-2 py-1"
            value={pageSize >= 9999 ? 'all' : pageSize}
            onChange={handlePageSizeChange}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <div className="ag-theme-alpine-dark rounded-lg shadow" style={{ width: '100%' }}>
        <AgGridReact
          domLayout="autoHeight"
          rowData={rowData || []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={pageSize}
          rowSelection="multiple"
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

export default InquiryTable;
