import React, { ReactElement, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Eye, EyeOff, Coins, Lock, History } from 'lucide-react';
import WalletHistoryTab from '@/components/HostoryTab/HistoryTab';
import PinInput from '@/components/PinInput/PinInput';
import Layout from '@/components/Layout/Layout';
import CONSTANTS from '@/constants/constants';
import { Utils } from '@/utils';
import cookie from 'cookie';
export interface IWalletHistory {
  title: string;
  from: string | null;
  to: string | null;
  date: string;
  amount: number;
  isGain: boolean;
}

const dummyArray: IWalletHistory[] = [
  {
    title: 'Money Transfer',
    from: 'kenneth23',
    to: null,
    date: Utils.getDDMonthYYYYTime(new Date().toLocaleString()),
    amount: 50000,
    isGain: true,
  },
  {
    title: 'Money Transfer',
    from: 'kenneth23',
    to: null,
    date: Utils.getDDMonthYYYYTime(new Date().toLocaleString()),
    amount: 50000,
    isGain: true,
  },
];

const WalletPage = (props: any) => {
  const balance: number = 1000000000000000000000000000000000000000;
  const WalletID: number = 123456789;
  const [isHide, setIsHide] = useState<boolean>(false);
  const [pins, setPins] = useState<string[]>(new Array(8).fill(''));
  return (
    <section className="w-full ">
      <div className="w-full md:w-[75vw] mx-auto px-1 py-5 flex flex-col gap-5">
        <div className="w-full rounded-md bg-gradient-to-t from-primary to-yellow-500 p-2 text-primary-foreground shadow-lg">
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold">Balance</p>
            <button onClick={() => setIsHide((prev) => !prev)}>
              {isHide ? (
                <EyeOff className="w-6 h-6" />
              ) : (
                <Eye className="w-6 h-6" />
              )}
            </button>
          </div>
          <p className="text-2xl mt-3 truncate">
            {isHide ? '***********' : Utils.convertPrice(balance)}
          </p>
          <div className="w-full flex flex-col items-end mt-5">
            <p className="text-sm">Wallet ID:</p>
            <p className="text-lg">{WalletID}</p>
          </div>
          <div className="w-full border-t-[1px] flex justify-between border-primary-foreground pt-3 mt-5">
            <button className="w-full flex flex-col items-center justify-center gap-1">
              <Coins className="w-8 h-8" />
              <p>Top Up</p>
            </button>
            <div className="bg-primary-foreground min-h-full w-[1px] rounded-md" />
            <button className="w-full flex flex-col items-center justify-center gap-1">
              <Lock className="w-8 h-8" />
              <p>Change PIN</p>
            </button>
          </div>
        </div>
        <div className="w-full rounded-md py-2 border-[1px] shadow-lg">
          <div className="flex items-center gap-2 w-full border-b-[1px] pb-2 px-2">
            <History className="text-primary w-7 h-7" />
            <p className="text-lg font-semibold">Transaction History</p>
          </div>
          <div className="px-2 pt-2 w-full flex flex-col gap-3 divide-y-[1px] divide-gray-200">
            {dummyArray.map((history, index) => (
              <WalletHistoryTab key={index} history={history} />
            ))}
          </div>
        </div>
      </div>
      <PinInput pins={pins} setPins={setPins} />
    </section>
  );
};

WalletPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default WalletPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookieList = cookie.parse(context.req.headers.cookie!);
  console.log(cookieList);
  if (cookieList) {
    try {
      const response = await fetch(`${CONSTANTS.BASEURL}/auth/user`, {
        headers: { Cookie: cookieList.toString() },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    notFound: true,
  };
};
