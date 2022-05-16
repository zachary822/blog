import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAutocomplete } from "../utils/api";

function useDebounce(value: string, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

const Search = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const debounceInputValue = useDebounce(inputValue, 200);
  const { data: options = [], refetch } = useQuery(
    ["getAutocomplete", debounceInputValue],
    () => {
      return getAutocomplete(debounceInputValue);
    },
    { enabled: false, retry: false }
  );
  useEffect(() => {
    if (debounceInputValue) {
      refetch();
    }
  }, [debounceInputValue, refetch]);

  const onSubmit = useCallback<FormEventHandler>(
    (e) => {
      e.preventDefault();
      router.push(`/posts?q=${encodeURIComponent(inputValue)}`);
    },
    [router, inputValue]
  );

  return (
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
        sx={{ width: { md: "15em", xs: "100%" } }}
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
  );
};

export default Search;
