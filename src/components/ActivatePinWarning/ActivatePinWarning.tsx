import React, { Dispatch, SetStateAction, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogClose,
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

interface ActivatePinWarningProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ActivatePinWarning = ({ isOpen, setIsOpen }: ActivatePinWarningProps) => {
  const [pins, setPins] = useState<string[]>(new Array(6).fill(''));

  return (
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
        <div className="w-full flex flex-col items-center justify-center">
          <PinInput pins={pins} setPins={setPins} />
        </div>
        <DialogFooter>
          <AsyncButton onClick={() => setIsOpen(false)}>
            Activate Pin
          </AsyncButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActivatePinWarning;
