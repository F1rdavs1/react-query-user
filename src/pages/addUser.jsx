import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddUserPage = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const queryClient = useQueryClient();

  const addUser = useMutation(
    (newUser) => axios.post("http://localhost:3000/users", newUser),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        setName("");
        setLastname("");
        setAge("");
        setEmail("");
        setNumber("");
        toast.success("User added!");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && lastname && age && email && number) {
      addUser.mutate({ name, lastname, age, email, number });
    } else {
      toast.error("Fill in all the information!");
    }
  };

  return (
    <div className="text-center bg-[#D767C9] h-[100vh]">
      <Toaster position="top-right" />
      <div className="w-[700px] h-[500px] mx-auto bg-white absolute right-0 top-0 bottom-0 left-0 my-auto shadow-2xl rounded-lg">
        <h1 className="text-[20px] font-mono my-[20px]">Add user</h1>
        <form onSubmit={handleSubmit} className="w-[500px] mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <input
              className="block mx-auto w-[49%] py-[8px] border-[3px] outline-none rounded-md pl-[5px] focus:border-slate-500 duration-300"
              type="text"
              placeholder="First name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="block mx-auto w-[49%] py-[8px] border-[3px] outline-none rounded-md pl-[5px] focus:border-slate-500 duration-300"
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <input
            className="block mx-auto w-full py-[8px] border-[3px] outline-none rounded-md pl-[5px] focus:border-slate-500 duration-300"
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            className="block mx-auto w-full py-[8px] border-[3px] outline-none rounded-md pl-[5px] focus:border-slate-500 duration-300"
            type="number"
            placeholder="Enter your number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            className="block mx-auto w-full py-[8px] border-[3px] outline-none rounded-md pl-[5px] focus:border-slate-500 duration-300"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="mx-auto w-[200px] bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 duration-300 flex items-center justify-center rounded-tr-[40px] rounded-tl-[20px] rounded-bl-[40px] rounded-br-[20px]"
          >
            Submit
            <span className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6l6 6-6 6"
                />
              </svg>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserPage;
