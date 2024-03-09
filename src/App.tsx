import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './scss/App.scss';
import Group from './components/Group';

interface GetGroupsResponse {
  result: 1 | 0;
  data?: Group[];
}

function App() {
  const [groups, setGroups] = useState([]);
  const [colors, setColors] = useState([]);
  const initialData = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, result } = await axios.get<GetGroupsResponse>(
          'http://localhost:3000/groups.json',
        );
        console.log(data);

        setGroups(data);
        initialData.current = data;
        receptionColors(data);
      } catch (error) {
        alert('Ошибка при запросе данных');
        console.log(error);
      }
    }
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  const receptionColors = (data) => {
    const cs = new Set([]);
    data.forEach((el: { avatar_color: string }) => {
      if (el.avatar_color) {
        cs.add(el.avatar_color);
      }
    });
    setColors([...cs]);
  };

  const privacyFilter = (el: { target: { value: string } }) => {
    if (el.target.value === 'открытые') {
      setTimeout(() => {
        setGroups(
          initialData.current.filter((item) => {
            return item.closed === false;
          }),
        );
      }, 1000);
    } else if (el.target.value === 'закрытые') {
      setTimeout(() => {
        setGroups(
          initialData.current.filter((item) => {
            return item.closed === true;
          }),
        );
      }, 1000);
    } else {
      return setTimeout(() => {
        setGroups(initialData.current);
      }, 1000);
    }
  };

  const colorFilter = (el: { target: { value: string } }) => {
    if (el.target.value !== 'все') {
      setTimeout(() => {
        setGroups(
          initialData.current.filter((item) => {
            return item.avatar_color === el.target.value;
          }),
        );
      }, 1000);
    } else {
      return setTimeout(() => {
        setGroups(initialData.current);
      }, 1000);
    }
  };

  const friendsFilter = (el: { target: { value: string } }) => {
    if (el.target.value === 'есть') {
      setTimeout(() => {
        setGroups(
          initialData.current.filter((item) => {
            return item.friends;
          }),
        );
      }, 1000);
    } else if (el.target.value === 'нет') {
      setTimeout(() => {
        setGroups(
          initialData.current.filter((item) => {
            return item.friends === undefined;
          }),
        );
      }, 1000);
    } else {
      setTimeout(() => {
        setGroups(initialData.current);
      }, 1000);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Группы</h1>
      <div className="navigation">
        <div className="privacy">
          <p className="privacy-text">Тип приватности: </p>
          <select className="privacy-input" name="privacy-input" onChange={privacyFilter}>
            <option value="все">все</option>
            <option value="открытые">открытые</option>
            <option value="закрытые">закрытые</option>
          </select>
        </div>
        <div className="color">
          <p className="color-text">Цвет аватарки: </p>
          <select className="color-input" name="color-input" onChange={colorFilter}>
            <option value="все">все</option>
            {colors.map((el, index) => (
              <option value={el} key={index}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="having-friends">
          <p className="having-friends-text">Наличие друзей: </p>
          <select
            className="having-friends-input"
            name="having-friends-input"
            onChange={friendsFilter}>
            <option value="все">все</option>
            <option value="есть">есть</option>
            <option value="нет">нет</option>
          </select>
        </div>
      </div>
      {groups.map((item, index) => (
        <Group index={index} item={item} />
      ))}
    </div>
  );
}

export default App;
