import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  Toaster as Sonner,
  type ToasterProps,
  toast as sonnerToast,
} from "sonner";
import React from "react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();
  return (
    <Sonner
      theme={theme as "light" | "dark" | "system" | undefined}
      richColors
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      // portalTarget={document.body}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };

// Custom Toast Types
export interface ToastProps {
  id: string | number;
  title: string;
  description?: string;
  button?: {
    label: string;
    onClick: () => void;
  };
  type?: "success" | "error" | "warning" | "info" | "confirmation" | "loading";
}

// Base Toast Component
export default function Toast(props: ToastProps) {
  const { title, description, button, id, type = "info" } = props;

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "confirmation":
        return "bg-gray-50 border-gray-200 text-gray-800";
      case "loading":
        return "bg-blue-50 border-blue-200 text-blue-800";
      default:
        return "bg-white border-gray-200 text-gray-900";
    }
  };

  const getButtonStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-700 hover:bg-green-200";
      case "error":
        return "bg-red-100 text-red-700 hover:bg-red-200";
      case "warning":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200";
      case "info":
        return "bg-blue-100 text-blue-700 hover:bg-blue-200";
      case "confirmation":
        return "bg-gray-100 text-gray-700 hover:bg-gray-200";
      case "loading":
        return "bg-blue-100 text-blue-700 hover:bg-blue-200";
      default:
        return "bg-indigo-50 text-indigo-600 hover:bg-indigo-100";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CircleCheckIcon className="size-4 text-green-600 mr-2" />;
      case "error":
        return <OctagonXIcon className="size-4 text-red-600 mr-2" />;
      case "warning":
        return <TriangleAlertIcon className="size-4 text-yellow-600 mr-2" />;
      case "info":
        return <InfoIcon className="size-4 text-blue-600 mr-2" />;
      case "loading":
        return (
          <Loader2Icon className="size-4 text-blue-600 mr-2 animate-spin" />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex rounded-lg shadow-lg ring-1 w-full md:max-w-91 items-center px-4 py-2 ${getTypeStyles()}`}
    >
      <div className="flex flex-1 items-center">
        {getIcon()}
        <div className="w-full">
          <p className="text-sm font-medium">{title}</p>
          {description && (
            <p className="mt-0.5 text-xs opacity-75">{description}</p>
          )}
        </div>
      </div>
      {button && (
        <div className="ml-5 shrink-0 rounded-md text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:outline-hidden">
          <button
            className={`rounded px-3 py-0.5 text-sm font-semibold ${getButtonStyles()}`}
            onClick={() => {
              button.onClick();
              sonnerToast.dismiss(id);
            }}
          >
            {button.label}
          </button>
        </div>
      )}
    </div>
  );
}
