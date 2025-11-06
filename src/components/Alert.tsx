interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
}

const alertStyles = {
  success: "bg-green-50 text-green-800 border-green-300",
  error: "bg-red-50 text-red-800 border-red-300",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-300",
  info: "bg-blue-50 text-blue-800 border-blue-300",
};

export const Alert = ({ type, message, onClose }: AlertProps) => {
  return (
    <div
      className={`rounded-lg border-2 px-4 py-3 ${alertStyles[type]} animate-in fade-in slide-in-from-top-2`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-current opacity-70 hover:opacity-100"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
