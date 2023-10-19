export const useGetUserId = () => {
  const userId = window.localStorage.getItem("userId");
  return userId;
};
