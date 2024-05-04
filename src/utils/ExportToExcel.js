import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Iconify from "../components/iconify";

ExportCSV.propTypes = {
  csvData: PropTypes.array,
  fileName: PropTypes.string,
  title: PropTypes.string,
};

export function ExportCSV({ csvData, fileName, title }) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(csvData);

    // Auto-adjust column widths based on content
    const wscols = Object.keys(csvData[0]).map((key) => ({
      wch: key.length + 5,
    }));
    ws["!cols"] = wscols;

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      sx={{ position: "relative", top: 0, right: 0, ml: "auto" }}
      variant="soft"
      onClick={exportToCSV}
    >
      <Iconify icon="uil:file-download-alt" />
      {title || "Export To Excel"}
    </Button>
  );
}
