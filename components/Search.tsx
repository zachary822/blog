import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAutocomplete } from "../utils/api";

const Search = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const { data: options = [], refetch } = useQuery(
    ["getAutocomplete", inputValue],
    () => {
      console.log("hmm");
      return getAutocomplete(inputValue);
    },
    { enabled: false, retry: false }
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedRefetch = useCallback(_.debounce(refetch, 200), [refetch]);

  useEffect(() => {
    if (inputValue) {
      debouncedRefetch();
    }
  }, [inputValue, debouncedRefetch]);

  const onSubmit = useCallback<FormEventHandler>(
    (e) => {
      e.preventDefault();
      router.push(`/posts?q=${encodeURIComponent(inputValue)}`);
    },
    [router, inputValue]
  );

  return (
    <Box sx={{ mb: 1 }}>
      <form action="" onSubmit={onSubmit}>
        <Autocomplete
          freeSolo
          disableClearable
          options={options}
          inputValue={inputValue}
          onInputChange={(e, newInputValue) => {
            setInputValue(newInputValue);
          }}
          size="small"
          renderInput={(params) => (
            <TextField
              variant="outlined"
              {...params}
              InputProps={{
                ...params.InputProps,
                placeholder: "Search…",
                type: "search",
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton type="submit">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </form>
    </Box>
  );
};

export default Search;
