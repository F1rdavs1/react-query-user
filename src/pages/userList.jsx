import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const fetchUsers = async () => {
  const { data } = await axios.get("http://localhost:3000/users");
  return data;
};

const deleteUser = async (userId) => {
  await axios.delete(`http://localhost:3000/users/${userId}`);
};

const updateUser = async (user) => {
  await axios.put(`http://localhost:3000/users/${user.id}`, user);
};

const UserListPage = () => {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    age: "",
  });

  const { data: users, isLoading, error } = useQuery("users", fetchUsers);

  const { mutate: deleteUserMutate } = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.success("User deleted!");
    },
  });

  const { mutate: updateUserMutate } = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      setSelectedUser(null);
    },
  });

  const handleUpdateClick = (user) => {
    const newName = window.prompt("Enter new name:", user.name);
    const newLastName = window.prompt("Enter new lastname:", user.lastname);
    const newAge = window.prompt("Enter new age:", user.age);
    const newNumber = window.prompt("Enter new number:", user.number);
    const newEmail = window.prompt("Enter new email:", user.email);

    if (newName && newLastName && newAge && newNumber && newEmail) {
      const updatedUser = {
        ...user,
        name: newName,
        lastname: newLastName,
        age: newAge,
        number: newNumber,
        email: newEmail,
      };
      updateUserMutate(updatedUser);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex space-x-3 justify-center mt-[20px]">
        {users.map((user) => (
          <div
            key={user.id}
            className="w-[300px] bg-[aqua] pl-[20px] py-[20px] text-start rounded-md cursor-pointer hover:scale-105 duration-300 "
          >
            <h2 className="font-medium text-[16px] ">
              Name: <b>{user.name}</b>
            </h2>
            <h2 className="font-medium text-[16px] ">
              LastName: <b>{user.lastname}</b>
            </h2>
            <p className="font-medium text-[16px] ">
              Age: <b>{user.age}</b>
            </p>
            <p className="font-medium text-[16px] ">
              Email: <b>{user.email}</b>
            </p>
            <p className="font-medium text-[16px] ">
              Number: <b>{user.number}</b>
            </p>
            <button
              onClick={() => deleteUserMutate(user.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-red-600 duration-300"
            >
              Delete
            </button>
            <button
              onClick={() => handleUpdateClick(user)}
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-2 ml-2 hover:bg-green-600 duration-300"
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserListPage;
