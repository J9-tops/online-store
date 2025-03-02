import { logoutUser, setUser } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";
import { currentUser } from "@clerk/nextjs/server";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    async function fetchUser() {
      if (!user) {
        try {
          const fetchedUser = await currentUser();
          dispatch(setUser(fetchedUser));
        } catch (error) {
          console.error("Error fetching user:", error);
          dispatch(logoutUser());
        }
      }
    }
    fetchUser();
  }, [user]);

  return user;
};

export default useAuth;
