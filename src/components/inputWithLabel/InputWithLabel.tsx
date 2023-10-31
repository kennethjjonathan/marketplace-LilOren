import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  placeHolder?: string;
  type?: string;
  required?: boolean;
  inputStyling?: string;
  labelStyling?: string;
  validation?: string;
  isValid?: boolean;
}

export function InputWithLabel({
  id,
  label,
  placeHolder = '',
  type = 'text',
  required = false,
  inputStyling = '',
  labelStyling = '',
  validation = '',
  pattern,
  isValid,
  ...props
}: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id} className="font-light">
        {label}
        {required ? <span className="text-primary">{' *'}</span> : null}
      </Label>
      <Input
        type={type}
        id={id}
        placeholder={placeHolder}
        className={inputStyling + 'peer'}
        required={required}
        pattern={pattern}
        isValid={isValid}
        {...props}
      />
      {isValid === false && validation !== '' && (
        <p className="mt-1 w-full text-justify text-xs text-destructive">
          {validation}
        </p>
      )}
    </div>
  );
}
