export const getAPIurl = (): string => {
  return process.env.REACT_APP_API_URL || "";
};
