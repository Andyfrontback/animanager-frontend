import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ButtonDownloadProps {
  handleExport: () => void;
  isExporting: boolean;
}

export const ButtonDownload = ({
  handleExport,
  isExporting,
}: ButtonDownloadProps) => {
  return (
    <Button onClick={handleExport} variant="outline" disabled={isExporting}>
      <Download className="mr-2 h-4 w-4" />
      {isExporting ? "Generating..." : "Export Tierlist as Image"}
    </Button>
  );
};
