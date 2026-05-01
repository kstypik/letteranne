export const getAppGateState = (isBootstrapping: boolean, isAuthenticated: boolean) => {
  if (isBootstrapping) {
    return "loading";
  }
  if (!isAuthenticated) {
    return "redirect";
  }
  return "ready";
};
