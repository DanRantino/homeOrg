interface InputControlProps extends React.PropsWithChildren {
  label?: string;
  error: string | null;
  rightTopLabel?: string | React.ReactNode;
}
const InputControl = ({
  label,
  error,
  children,
  rightTopLabel,
}: InputControlProps) => {
  return (
    <div className="py-2">
      <div className="flex justify-between">
        {label && <label>{label}</label>}
        {rightTopLabel && <label>{rightTopLabel}</label>}
      </div>
      {children}
      <div className="h-4">
        {error && <span className="text-destructive">{error}</span>}
      </div>
    </div>
  );
};

export default InputControl;
