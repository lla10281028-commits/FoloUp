import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useEffect, useState } from "react";

const useTabSwitchPrevention = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsDialogOpen(true);
        setTabSwitchCount((prev) => prev + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleUnderstand = () => {
    setIsDialogOpen(false);
  };

  return { isDialogOpen, tabSwitchCount, handleUnderstand };
};

function TabSwitchWarning() {
  const { isDialogOpen, handleUnderstand } = useTabSwitchPrevention();

  return (
    <AlertDialog open={isDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Warning: Tab Switching</AlertDialogTitle>
          <AlertDialogDescription>
            切换标签页可能影响您的面试表现，切换行为将被记录。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="bg-indigo-400 hover:bg-indigo-600 text-white"
            onClick={handleUnderstand}
          >
            I understand
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { TabSwitchWarning, useTabSwitchPrevention };
