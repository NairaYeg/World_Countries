import { useState } from "react";
import { Country } from "../interfaces/Country";

export const useSort = (data: Country[]) => {
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection((prevSortDirection) =>
        prevSortDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField as keyof Country];
    const bValue = b[sortField as keyof Country];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue) * (sortDirection === "asc" ? 1 : -1);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return (aValue - bValue) * (sortDirection === "asc" ? 1 : -1);
    } else {
      return 0;
    }
  });

  return { handleSort, sortedData };
};
