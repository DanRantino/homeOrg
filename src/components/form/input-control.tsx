interface InputControlProps extends React.PropsWithChildren {
  label?: string;
  error: string | null;
}
const InputControl = ({ label, error, children }: InputControlProps) => {
  return (
    <div className="py-4">
      {label && <label>{label}</label>}
      {children}
      <div className="h-4">
        {error && <span className="text-destructive">{error}</span>}
      </div>
    </div>
  );
};

export default InputControl;
