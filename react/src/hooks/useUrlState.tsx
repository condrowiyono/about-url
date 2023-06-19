import { useMemo, useRef } from "react";
import * as rc from "react-router"; // Use react-router 6, derived from react-router-dom
import queryString, { ParseOptions, StringifyOptions } from "query-string";

export interface Options {
  navigateMode?: "push" | "replace";
  parseOptions?: ParseOptions;
  stringifyOptions?: StringifyOptions;
}

const baseParseConfig: ParseOptions = {
  parseNumbers: true,
  parseBooleans: true,
};

const baseStringifyConfig: StringifyOptions = {
  skipNull: true,
  skipEmptyString: true,
};

const useUrlState = <T,>(initialState?: T | (() => T), options?: Options) => {
  type State = Partial<{ [K in keyof T]: any }>;
  const {
    navigateMode = "push",
    parseOptions,
    stringifyOptions,
  } = options || {};

  const mergedParseOptions = { ...baseParseConfig, ...parseOptions };
  const mergedStringifyOptions = {
    ...baseStringifyConfig,
    ...stringifyOptions,
  };

  const location = rc.useLocation();
  const navigate = rc.useNavigate();

  const initialStateRef = useRef(
    typeof initialState === "function"
      ? (initialState as () => T)()
      : initialState || {}
  );

  const queryFromUrl = useMemo(() => {
    return queryString.parse(location.search, mergedParseOptions);
  }, [location.search]);

  const targetQuery: State = useMemo(
    () => ({
      ...initialStateRef.current,
      ...queryFromUrl,
    }),
    [queryFromUrl]
  );

  const setState = (s: React.SetStateAction<State> | undefined) => {
    const newQuery = typeof s === "function" ? s(targetQuery) : s;

    navigate(
      {
        hash: location.hash,
        search:
          typeof s === "undefined"
            ? "?"
            : queryString.stringify(
                { ...queryFromUrl, ...newQuery },
                mergedStringifyOptions
              ),
      },
      {
        replace: navigateMode === "replace",
        state: location.state,
      }
    );
  };

  return [targetQuery as T, setState] as const;
};

export default useUrlState;
