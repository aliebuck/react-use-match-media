# Cookbook

Recipes for using react-use-match-media.

## Global Media Queries with React Context

Set your media queries once with `useMatchMedia` and pass down your application
with React Context.

```jsx
import { createContext, useContext } from "react";
import useMatchMedia from "react-use-match-media";

const MediaQueriesContext = createContext({ isLarge: false, isSmall: false });

const MediaQueriesProvider = ({ children }) => {
  const isLarge = useMatchMedia("(min-width: 960px)");
  const isSmall = useMatchMedia("(min-width: 320px)");

  return (
    <MediaQueriesContext.Provider value={{ isLarge, isSmall }}>
      {children}
    </MediaQueriesContext.Provider>
  );
};

const useMediaQueries = () => useContext(MediaQueriesContext);

const Example = (props) => {
  const { isLarge, isSmall } = useMediaQueries();
  // ...
};

const App = (props) => {
  return (
    <MediaQueryProvider>
      <Example />
    </MediaQueryProvider>
  );
};
```

## Media Query from Object

Define your media query as an object and stringify with [json2mq](https://www.npmjs.com/package/json2mq).

```jsx
import json2mq from "json2mq";
import useMatchMedia from "react-use-match-media";

const wideViewport = json2mq({ minWidth: 600 });

const Example = (props) => {
  const isWideViewport = useMatchMedia(wideViewport);
  // ...
};
```
