import React from 'react';
import Image from 'next/image';
import { Utils } from '@/utils';
import { IColumn } from './Table';

export interface ITableData {
  id: number;
  image: string;
  product_name: string;
  price: number;
  stock: number;
}

interface TableBodyProps {
  tableData: ITableData[];
  columns: IColumn[];
}

const TableBody = ({ tableData, columns }: TableBodyProps) => {
  return (
    <tbody className="p-5">
      {tableData.map((data) => {
        return (
          <tr key={data.id} className="bg-white border-2 my-5 p-4">
            {columns.map((col: IColumn) => {
              const accessor: keyof (typeof tableData)[0] =
                col.accessor as keyof (typeof tableData)[0];
              const tData = data[accessor] ? data[accessor] : '——';
              if (accessor === 'product_name') {
                return (
                  <td key={accessor} className="p-3 flex flex-row items-center">
                    <Image
                      src={data['image']}
                      width={200}
                      height={200}
                      alt={'pict'}
                      className="w-[100px] h-[100px]"
                    />
                    <p key={accessor}>{tData}</p>
                  </td>
                );
              } else if (accessor === 'price') {
                return (
                  <td
                    key={accessor}
                    className="text-overflow overflow-hidden whitespace-nowrap"
                  >
                    {Utils.convertPrice(tData as number)}
                  </td>
                );
              } else {
                return <td key={accessor}>{tData}</td>;
              }
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
