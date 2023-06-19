import { useLocation, useNavigate } from "react-router-dom";
import useUrlState from "../hooks/useUrlState";
import Editor from "@monaco-editor/react";

enum PokemonType {
  Fire = "🔥",
  Water = "💧",
  Grass = "🌿",
}

type Params = {
  count: number;
  type?: PokemonType;
  list?: string[];
};
const initialParams: Params = {
  count: 0,
  type: undefined,
};

const Pokemon = () => {
  const [params, setParams] = useUrlState(initialParams);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Pokemon</h1>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={() => setParams((old) => ({ ...old, count: old.count + 1 }))}
        >
          Plus+
        </button>
        <select
          value={params.type}
          onChange={(event) =>
            setParams((old) => ({ ...old, type: event.currentTarget.value }))
          }
        >
          <option value={PokemonType.Fire}>Fire</option>
          <option value={PokemonType.Water}>Water</option>
          <option value={PokemonType.Grass}>Grass</option>
        </select>
        <button onClick={() => setParams(undefined)}>Reset</button>
        <button onClick={() => navigate(location.pathname, { replace: true })}>
          Reset URL
        </button>
      </div>
      <div>
        <Editor
          defaultLanguage="json"
          value={JSON.stringify(params, null, 2)}
          height={400}
          onChange={(value) => setParams(JSON.parse(value))}
        />
      </div>
      <div>
        <div>Different between window location and useLocation</div>
        <div>Window location: {window.location.pathname}</div>
        <div>useLocation: {location.pathname}</div>
      </div>
    </div>
  );
};

export default Pokemon;
