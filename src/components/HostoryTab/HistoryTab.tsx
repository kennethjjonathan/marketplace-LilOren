import { IWalletHistory } from '@/pages/wallet';
import { Utils } from '@/utils';
import React from 'react';

interface WalletHistoryTabProps {
  history: IWalletHistory;
}

const WalletHistoryTab = ({ history }: WalletHistoryTabProps) => {
  return (
    <div className="w-full py-1 flex justify-between items-center">
      <div className="w-7/12 flex flex-col items-start gap-1">
        <p className="font-semibold line-clamp-2 text-ellipsis">
          {history.title}
        </p>
        <p className="text-xs text-gray-500">{history.date}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <p
          className={`${
            history.isGain ? 'text-green-500' : 'text-destructive'
          }`}
        >{`${history.isGain ? '+' : '-'}${Utils.convertPrice(
          history.amount,
        )}`}</p>
        <p className="text-xs text-gray-500">{`${
          history.isGain ? 'from' : 'to'
        }: ${history.isGain ? history.from : history.to}`}</p>
      </div>
    </div>
  );
};

export default WalletHistoryTab;
