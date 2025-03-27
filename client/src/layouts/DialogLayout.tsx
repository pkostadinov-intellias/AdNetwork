import { X } from "lucide-react";
import { useDialog } from "@/contexts/DialogContext";
import { ReactNode } from "react";

export const DialogLayout = ({ children }: { children: ReactNode }) => {
  const { closeDialog } = useDialog();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen bg-black/70 items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div>
              <div className="flex items-center justify-end mb-4">
                <button
                  onClick={closeDialog}
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X size={24} className="cursor-pointer" />
                </button>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
