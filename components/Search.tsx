import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useEffect, useState } from "react";

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

const useWebSocket = ({
  url,
  protocols = undefined,
}: {
  url: string;
  protocols?: Array<string>;
}) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url, protocols);

    ws.onopen = function () {
      setReady(true);
      setWs(this);
    };

    return () => {
      ws.close();
    };
  }, [url, protocols]);

  return { ready, ws };
};

const Search = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  const { ready, ws } = useWebSocket({
    url: `${process.env.NEXT_PUBLIC_WS_BASE_URL}/posts/suggestions/`,
  });

  useEffect(() => {
    if (ready) {
      ws!.onmessage = (ev) => {
        try {
          setOptions(JSON.parse(ev.data));
        } finally {
        }
      };
    }
  }, [ready, ws]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendInput = useCallback(
    _.debounce((text) => {
      if (ready) {
        ws!.send(text);
      }
    }, 100),
    [ready, ws]
  );

  useEffect(() => {
    sendInput(inputValue);
  }, [sendInput, inputValue]);

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
