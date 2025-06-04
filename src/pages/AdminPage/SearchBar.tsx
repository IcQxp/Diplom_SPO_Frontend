import React, { useState } from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <TextField
      label="Поиск"
      variant="outlined"
      fullWidth
      value={searchQuery}
      onChange={handleSearch}
      sx={{ mb: 2 }}
    />
  );
};

export default SearchBar;