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
  const [error, setError] = useState(false);
  const [result, setResult] = useState(0);
  const initialData = useRef([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<GetGroupsResponse>('http://localhost:3000/groups.json');
        setResult(response.data.result);
        setGroups(response.data.data);
        initialData.current = response.data.data;
        receptionColors(response.data.data);
      } catch (err) {
        setError(true);
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
            return !item.closed;
          }),
        );
      }, 1000);
    } else if (el.target.value === 'закрытые') {
      setTimeout(() => {
        setGroups(
          initialData.current.filter((item) => {
            return item.closed;
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
            return !item.friends;
          }),
        );
      }, 1000);
    } else {
      setTimeout(() => {
        setGroups(initialData.current);
      }, 1000);
    }
  };

  const dropFilters = () => {
    setTimeout(() => {
      setGroups(initialData.current);
    }, 1000);
  };

  if (error || !groups) {
    return (
      <div className="error-app">
        <div className="error-main">
          <h4 className="error-title">Ошибка при запросе данных с сервера!!</h4>
          <p className="error-text">Повторите попытку чуть позже</p>
        </div>
      </div>
    );
  } else if (result === 0 || groups.length === 0) {
    return (
      <div className="null-app">
        <h1 className="null-title title">Группы</h1>
        <p className="null-text">Акутальных групп пока нет...(</p>
      </div>
    );
  } else {
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
          <div className="drop" onClick={dropFilters}>
            сбросить фильтры
          </div>
        </div>
        {groups.map((item, index) => (
          <Group index={index} item={item} />
        ))}
      </div>
    );
  }
}

export default App;
