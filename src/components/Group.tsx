import React, {useState} from 'react';
import { Block } from 'jsxstyle';
import Modal from '../components/Modal';

type GroupProps = {
  index: number;
  item: Group;
};

interface Group {
  id: number;
  name: string;
  closed: boolean;
  avatar_color?: string;
  members_count: number;
  friends?: User[];
}

interface User {
  first_name: string;
  last_name: string;
}

const Group: React.FC<GroupProps> = ({ index, item }) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="group" key={index}>
      <Block className="ava" background-color={item.avatar_color}></Block>
      <div className="main">
        <h1 className="item-title">{item.name}</h1>
        {item.closed === true ? (
          <p className="type">Закрытая группа</p>
        ) : (
          <p className="type">Открытая группа</p>
        )}
        <p className="subscribers">Подписчики: {item.members_count}</p>
        {item.friends ? (
          <>
            <p className="friends" onClick={() => setModalOpen(true)}>
              Подписано друзей: {item.friends.length}
            </p>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} info={item.friends} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Group;
