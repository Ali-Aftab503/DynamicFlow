"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FolderOpen } from "lucide-react";

interface GoogleDrivePickerProps {
  cardId: string;
  onFileSelected: (file: any) => void;
}

export function GoogleDrivePicker({
  cardId,
  onFileSelected,
}: GoogleDrivePickerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = () => {
    alert("Google Drive integration requires additional setup. For now, use the file upload feature.");
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleConnect}
      disabled={isLoading}
      className="w-full"
    >
      <FolderOpen className="h-4 w-4 mr-2" />
      Connect Google Drive
    </Button>
  );
}