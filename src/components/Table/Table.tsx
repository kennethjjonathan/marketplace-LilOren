import React, { useState } from 'react';
import tableData1 from './TableData1.json';
import TableHead from './TableHead';
import TableBody from './TableBody';

export interface IColumn {
  label: string;
  accessor: string;
}

const Table = () => {
  const [tableData, setTableData] = useState(tableData1);
  const columns: IColumn[] = [
    { label: 'PRODUCT NAME', accessor: 'product_name' },
    { label: 'PRICE', accessor: 'price' },
    { label: 'STOCK', accessor: 'stock' },
  ];

  return (
    <table className="table-auto w-full bg-white">
      <TableHead columns={columns} />
      <TableBody columns={columns} tableData={tableData} />
    </table>
  );
};

export default Table;
