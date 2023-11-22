import React, { ReactElement, useEffect, useState } from 'react';
import { Eye, EyeOff, Coins, Lock, History } from 'lucide-react';
import WalletHistoryTab from '@/components/HostoryTab/HistoryTab';
import Layout from '@/components/Layout/Layout';
import CONSTANTS from '@/constants/constants';
import { Utils } from '@/utils';
import ActivatePinWarning from '@/components/ActivatePinWarning/ActivatePinWarning';
import { IWalletInfo, IWalletHistory } from '@/interface/walletPage';
import axiosInstance from '@/lib/axiosInstance';
import TopUpModal from '@/components/TopUpModal/TopUpModal';
import PaginationNav from '@/components/PaginationNav/PaginationNav';
import Head from 'next/head';

const WalletPage = () => {
  const [wallet, setWallet] = useState<IWalletInfo>();
  const [updateToggle, setUpdateToggle] = useState<boolean>(false);
  const [isHide, setIsHide] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTopUpOpen, setIsTopUpOpen] = useState<boolean>(false);
  const [historyArray, setHistoryArray] = useState<IWalletHistory[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  async function getWallet() {
    try {
      const response = await axiosInstance(`/wallets/personal/info`);
      setWallet(response.data.data);
      setCurrentPage(1);
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

  async function getHistory() {
    try {
      const response = await axiosInstance(
        `/wallets/personal/history?page=${currentPage}`,
      );
      setHistoryArray(response.data.data.history);
      setTotalPage(response.data.data.total_page);
    } catch (error: any) {
      Utils.handleGeneralError(error);
    }
  }

  useEffect(() => {
    getWallet();
  }, [updateToggle]);

  useEffect(() => {
    getHistory();
  }, [currentPage, updateToggle]);

  return (
    <>
      <Head>
        <title>MyWallet - LilOren</title>
      </Head>
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
              {(wallet === undefined || wallet.is_active === false) && (
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
            <div className="w-full border-t-[1px] flex justify-between border-primary-foreground pt-3 mt-5">
              <button
                className="w-full flex flex-col items-center justify-center gap-1"
                disabled={wallet === undefined || !wallet.is_active}
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
              <button
                className="w-full flex flex-col items-center justify-center gap-1"
                disabled={wallet === undefined || !wallet.is_active}
              >
                <Lock className="w-8 h-8" />
                <p>Change PIN</p>
              </button>
            </div>
          </div>
          {wallet !== undefined &&
          wallet.is_active &&
          historyArray.length !== 0 ? (
            <div className="flex flex-col space-y-5 w-full">
              <div className="w-full rounded-md py-2 border-[1px] shadow-lg">
                <div className="flex items-center gap-2 w-full border-b-[1px] pb-2 px-2">
                  <History className="text-primary w-7 h-7" />
                  <p className="text-lg font-semibold">Transaction History</p>
                </div>
                <div className="px-2 pt-2 w-full flex flex-col gap-3 divide-y-[1px] divide-gray-200">
                  {historyArray.map((history, index) => (
                    <WalletHistoryTab key={index} history={history} />
                  ))}
                </div>
              </div>
              <div className="w-full flex justify-center items-center">
                <PaginationNav
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPage={totalPage}
                />
              </div>
            </div>
          ) : (
            <p className="w-full text-center py-2 text-lg font-semibold">
              No history for now
            </p>
          )}
        </div>
      </section>
    </>
  );
};

WalletPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default WalletPage;
