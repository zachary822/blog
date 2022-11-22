import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { getAutocomplete } from "../utils/api";

const Search = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const { data: options = [], refetch } = useQuery(
    ["getAutocomplete", inputValue],
    () => {
      return getAutocomplete(inputValue);
    },
    { enabled: false, retry: false }
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedRefetch = useCallback(debounce(refetch, 200), [refetch]);

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
              }}
            />
          )}
        />
      </form>
    </Box>
  );
};

export default Search;
