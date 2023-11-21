import React, { ReactElement, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import cookie from 'cookie';
import { Eye, EyeOff, Coins, Lock, History, AlertTriangle } from 'lucide-react';
import WalletHistoryTab from '@/components/HostoryTab/HistoryTab';
import Layout from '@/components/Layout/Layout';
import CONSTANTS from '@/constants/constants';
import { Utils } from '@/utils';
import ActivatePinWarning from '@/components/ActivatePinWarning/ActivatePinWarning';
import { IWalletInfo } from '@/interface/walletPage';
import axiosInstance from '@/lib/axiosInstance';
import { useRouter } from 'next/router';
import TopUpModal from '@/components/TopUpModal/TopUpModal';
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

const WalletPage = () => {
  const router = useRouter();
  const [wallet, setWallet] = useState<IWalletInfo>();
  const [updateToggle, setUpdateToggle] = useState<boolean>(false);
  const [isHide, setIsHide] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTopUpOpen, setIsTopUpOpen] = useState<boolean>(false);

  async function getWallet() {
    try {
      const response = await axiosInstance(
        `${CONSTANTS.BASEURL}/wallets/personal/info`,
      );
      console.log(response);
      setWallet(response.data.data);
    } catch (error: any) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message === CONSTANTS.WALLET_NOT_ACTIVATED
      ) {
        setWallet({ is_active: false, balance: 0 });
      } else {
        Utils.handleGeneralError(error);
      }
    }
  }

  useEffect(() => {
    getWallet();
  }, [updateToggle]);

  return (
    <section className="w-full ">
      <div className="w-full md:w-[75vw] mx-auto px-1 py-5 flex flex-col gap-5">
        <div className="w-full rounded-md bg-gradient-to-t from-yellow-500 to-primary p-2 text-primary-foreground shadow-lg">
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold">Balance</p>
            <button onClick={() => setIsHide((prev) => !prev)}>
              {isHide ? (
                <EyeOff className="w-6 h-6" />
              ) : (
                <Eye className="w-6 h-6" />
              )}
            </button>
            {wallet && wallet.is_active === false && (
              <ActivatePinWarning
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setUpdateToggle={setUpdateToggle}
              />
            )}
          </div>
          {wallet && (
            <p className="text-2xl mt-3 truncate">
              {isHide ? '***********' : Utils.convertPrice(wallet.balance)}
            </p>
          )}
          <div className="w-full flex flex-col items-end mt-5">
            <button className="text-lg">Seller withdraw</button>
          </div>
          <div className="w-full border-t-[1px] flex justify-between border-primary-foreground pt-3 mt-5">
            <button
              className="w-full flex flex-col items-center justify-center gap-1"
              onClick={() => setIsTopUpOpen(true)}
            >
              <Coins className="w-8 h-8" />
              <p>Top Up</p>
            </button>
            <TopUpModal
              isOpen={isTopUpOpen}
              setIsOpen={setIsTopUpOpen}
              setUpdateToggle={setUpdateToggle}
            />
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
    </section>
  );
};

WalletPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default WalletPage;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   let cookieList = null;
//   let user = null;
//   if (context.req.headers.cookie) {
//     cookieList = cookie.parse(context.req.headers.cookie);
//   }
//   if (cookieList) {
//     try {
//       let response = await fetch(`${CONSTANTS.BASEURL}/auth/user`, {
//         headers: { Cookie: cookieList.toString() },
//       });
//       if (response.status === 401) {
//         try {
//           const refreshResponse = await fetch(
//             `${CONSTANTS.BASEURL}/auth/refresh-token`,
//             { method: 'POST', body: null, credentials: 'include' },
//           );
//           const refreshData = await refreshResponse.json();
//           if (refreshData.message === CONSTANTS.ALREADY_LOGGED_OUT) {
//             return {
//               redirect: {
//                 permanent: false,
//                 destination: '/signin',
//               },
//             };
//           }
//           response = await fetch(`${CONSTANTS.BASEURL}/auth/user`, {
//             headers: { Cookie: cookieList.toString() },
//           });
//           user = await response.json();
//         } catch (error) {
//           throw error;
//         }
//       } else {
//         user = await response.json();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return {
//     props: {
//       user: user || null,
//     },
//   };
// };
