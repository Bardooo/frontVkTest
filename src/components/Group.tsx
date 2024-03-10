import {useState, FC} from 'react';
import { Block } from 'jsxstyle';
import Modal from '../components/Modal';
import { Group } from '../types'

type GroupProps = {
  key: number;
  item: Group;
};

const Group: FC<GroupProps> = ({ key, item }) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="group" key={key}>
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
