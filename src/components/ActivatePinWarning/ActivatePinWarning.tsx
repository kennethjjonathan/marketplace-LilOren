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

import PinInput from '@/components/PinInput/PinInput';

import styles from './ActivatePinWarning.module.css';
import AsyncButton from '../AsyncButton/AsyncButton';
import { Button } from '../ui/button';
import axiosInstance from '@/lib/axiosInstance';
import CONSTANTS from '@/constants/constants';

interface ActivatePinWarningProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ActivatePinWarning = ({ isOpen, setIsOpen }: ActivatePinWarningProps) => {
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

  function handleGoBack() {
    setIsConfirmOpen(false);
    setIsOpen(true);
  }

  async function handleConfirmPIN() {
    if (pins !== confirmPins) {
      setIsConfirmValid(false);
      return;
    }

    setIsConfirmValid(true);
    try {
      const response = await axiosInstance.post(
        `${CONSTANTS.BASEURL}`,
        { wallet_pin: pins.join() },
        { withCredentials: true },
      );
      
    } catch (error) {
      console.error(error);
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
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <div className="w-full">
              <Button
                variant={'outline'}
                size={'customBlank'}
                className="text-sm p-1"
                onClick={handleGoBack}
              >
                <ChevronLeft className="w-5 h-5" /> Back
              </Button>
            </div>
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
            />
          </div>
          <DialogFooter>
            <AsyncButton
              onClick={handleActivatePIN}
              variant={'outline'}
              isLoading={isConfirmLoading}
            >
              Confirm Pin
            </AsyncButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActivatePinWarning;
