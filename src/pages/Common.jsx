export const handleLoginNavigation = (redirectURL = "/home", navigate) => {
  if (redirectURL) navigate(redirectURL, { replace: false });
  // else authStore.logout(); // user-type or redirect not defined. error
};
