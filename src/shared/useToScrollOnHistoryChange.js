import { useEffect } from "react";
import { useHistory } from "react-router-dom";

/** It resets the scroll position when the history changes */
function useToScrollOnHistoryChange() {
  const history = useHistory();

  useEffect(() => {
    if (!history) {
      // eslint-disable-next-line no-console
      console.error(
        "History is null, this means that you are using this hook outside of the router context."
      );
      return null;
    }

    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);
}

export default useToScrollOnHistoryChange;
