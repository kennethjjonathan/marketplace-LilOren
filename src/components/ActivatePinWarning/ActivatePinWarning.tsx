import React, { Dispatch, SetStateAction, useState } from 'react';
import { AlertTriangle, ChevronLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import PinInput from '@/components/PinInput/PinInput';

import AsyncButton from '../AsyncButton/AsyncButton';
import { Button } from '../ui/button';
import axiosInstance from '@/lib/axiosInstance';
import CONSTANTS from '@/constants/constants';
import { Utils } from '@/utils';
import styles from './ActivatePinWarning.module.css';
import { useRouter } from 'next/router';

interface ActivatePinWarningProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ActivatePinWarning = ({ isOpen, setIsOpen }: ActivatePinWarningProps) => {
  const router = useRouter();
  const [pins, setPins] = useState<string[]>(new Array(6).fill(''));
  const [isPINValid, setIsPINValid] = useState<boolean>(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [confirmPins, setConfirmPins] = useState<string[]>(
    new Array(6).fill(''),
  );
  const [isConfirmValid, setIsConfirmValid] = useState<boolean>(true);
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);

  function handleActivatePIN() {
    if (pins.includes('')) {
      setIsPINValid(false);
    } else {
      setIsPINValid(true);
      setIsOpen(false);
      setIsConfirmOpen(true);
    }
  }

  function handleCancel() {
    setPins(new Array(6).fill(''));
    setConfirmPins(new Array(6).fill(''));
    setIsPINValid(true);
    setIsConfirmValid(true);
    setIsOpen(false);
    setIsConfirmOpen(false);
  }

  function handleGoBack() {
    setIsConfirmOpen(false);
    setIsOpen(true);
  }

  function checkIfConfirmTheSame(): boolean {
    let counter: number = 0;
    for (let i = 0; i < pins.length; i++) {
      if (pins[i] === confirmPins[i]) counter++;
    }
    return counter === pins.length;
  }

  async function handleConfirmPIN() {
    if (!checkIfConfirmTheSame()) {
      setIsConfirmValid(false);
      return;
    }
    setIsConfirmValid(true);
    setIsConfirmLoading(true);
    try {
      const response = await axiosInstance.post(
        `${CONSTANTS.BASEURL}/wallets/activate-personal`,
        { wallet_pin: pins.join('') },
        { withCredentials: true },
      );
      Utils.notify('Successfully activate PIN', 'success', 'colored');
      setIsConfirmOpen(false);
    } catch (error: any) {
      console.log(error);
      if (error.data && error.data.message === CONSTANTS.ALREADY_LOGGED_OUT) {
        Utils.notify(
          'Your token has expired, please sign in again',
          'default',
          'colored',
        );
        router.push('/signin');
        return;
      }
      if (error.response && error.response.status === 401) {
        Utils.notify(
          'Your token has expired, please sign in again',
          'default',
          'colored',
        );
        router.push('/signin');
        return;
      }
      Utils.notify(error.message, 'error', 'colored');
    } finally {
      setIsConfirmLoading(false);
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <div
            className={`bg-destructive text-destructive-foreground px-2 py-1 rounded-lg flex items-center gap-1 ${styles.wiggleDiv}`}
          >
            <AlertTriangle className="h-5 w-5" />
            Activate Pin
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-sm text-center">
              You haven&apos;t activate your PIN
            </DialogTitle>
            <DialogDescription className="text-sm text-center">
              Activate your PIN to start using MyWallet
            </DialogDescription>
          </DialogHeader>
          <div className="w-full flex flex-col items-center justify-center gap-3">
            {!isPINValid && (
              <p
                className={`w-full text-center font-semibold text-destructive text-sm ${styles.wiggleOnce}`}
              >
                PIN must be 6 digits!
              </p>
            )}
            <PinInput
              pins={pins}
              setPins={setPins}
              onEnter={handleActivatePIN}
            />
          </div>
          <DialogFooter>
            <AsyncButton onClick={handleActivatePIN} variant={'outline'}>
              Activate Pin
            </AsyncButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="w-full flex items-center justify-between">
              <Button
                variant={'outline'}
                size={'customBlank'}
                className="text-sm p-1"
                onClick={handleGoBack}
                disabled={isConfirmLoading}
              >
                <ChevronLeft className="w-5 h-5" /> Back
              </Button>
              <Button
                variant={'outline'}
                size={'customBlank'}
                className="text-sm p-1"
                onClick={handleCancel}
                disabled={isConfirmLoading}
              >
                Cancel
              </Button>
            </div>
          </AlertDialogHeader>
          <div className="w-full flex flex-col items-center justify-center gap-2">
            {!isConfirmValid ? (
              <p
                className={`w-full text-center font-semibold text-destructive text-sm ${styles.wiggleOnce}`}
              >
                Must be the same with the initial PIN!
              </p>
            ) : (
              <p className={`w-full text-center font-semibold text-sm`}>
                Confirm your PIN:
              </p>
            )}
            <PinInput
              pins={confirmPins}
              setPins={setConfirmPins}
              onEnter={handleConfirmPIN}
              isLoading={isConfirmLoading}
            />
          </div>
          <AlertDialogFooter>
            <AsyncButton
              onClick={handleConfirmPIN}
              variant={'outline'}
              isLoading={isConfirmLoading}
            >
              Confirm Pin
            </AsyncButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default ActivatePinWarning;
