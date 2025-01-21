import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserName } from "../../redux/slices/userSlice";
import { useEffect, useState } from "react";
import "./Profile.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // Инициализируем состояние name значением из Redux, если оно доступно
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUserName(name));
    setName(""); // Очистка поля ввода после отправки
  };
  return (
    <div className="app-block user-form">
      <h3>{`Имя пользователя: ${user}`}</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={handleChange} />
        <button type="submit">Изменить имя</button>
      </form>
    </div>
  );
};

export default Profile;
