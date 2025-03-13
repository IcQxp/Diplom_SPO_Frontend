import { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.scss";
import { UserResponse } from "../../auth/auth";
import { MyDocuments } from "../../components/MyDocuments/MyDocuments";

export const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [currentUser, setCurrentUser] = useState<UserResponse>();

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <main className={styles.page}>
      {currentUser ? 
      <div>ооо
      <MyDocuments id={currentUser.id} />
      
      
      
      </div> : <>нет</>}
    </main>
  );
};