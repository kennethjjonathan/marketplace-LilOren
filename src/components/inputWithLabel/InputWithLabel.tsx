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
}

export function InputWithLabel({
  id,
  label,
  placeHolder = '',
  type = 'text',
  required = false,
  inputStyling = '',
  labelStyling = '',
  pattern,
  ...props
}: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id} className={labelStyling}>
        {label}
        {required ? <span className="text-primary">{' *'}</span> : null}
      </Label>
      <Input
        type={type}
        id={id}
        placeholder={placeHolder}
        className={inputStyling}
        required={required}
        {...props}
      />
    </div>
  );
}
