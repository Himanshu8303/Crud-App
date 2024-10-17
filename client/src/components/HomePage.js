import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser, deleteUser } from '../features/userSlice';

function HomePage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (user) => {
    setEditingUser({ ...user });
  };

  const handleUpdate = () => {
    dispatch(updateUser({ id: editingUser._id, userData: editingUser }))
      .unwrap()
      .then(() => setEditingUser(null))
      .catch((error) => console.error('Failed to update user:', error));
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
      .unwrap()
      .catch((error) => console.error('Failed to delete user:', error));
  };

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {editingUser && editingUser._id === user._id ? (
              <>
                <input
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                />
                <input
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditingUser(null)}>Cancel</button>
              </>
            ) : (
              <>
                {user.name} ({user.email})
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;