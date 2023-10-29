import ReactGA from "react-ga";

const useGaTracker = (category) => {
  const track = (args = { action: "", label: "" }) => {
    const evt = { category, ...args };
    console.log("GA track", evt);
    ReactGA.event(evt);
  };
  return track;
};
export default useGaTracker;