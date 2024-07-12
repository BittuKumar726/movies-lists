export const handleLoginNavigation = (redirectURL = "/home", navigate) => {
  if (redirectURL) navigate(redirectURL, { replace: false });
};
