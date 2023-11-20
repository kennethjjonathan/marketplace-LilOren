import React from 'react';
import { IColumn } from './Table';
import styles from './Table.module.scss';

interface TableHeadProps {
  columns: IColumn[];
}

const TableHead = ({ columns }: TableHeadProps) => {
  return (
    <thead className="border-y-[1px] h-[50px]">
      <tr>
        {columns.map(({ label, accessor }) => {
          return (
            <th
              key={accessor}
              className={`${styles.label} ${
                accessor === 'product_name' && styles.product_name
              }`}
            >
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
