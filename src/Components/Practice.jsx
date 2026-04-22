import React, { useState } from "react";

const Practice = () => {
  const [value, setValue] = useState();

  const [data, setData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setData((prev) => [...prev, value]);
    setValue("");
  };

  return (
    <div className="h-screen bg-gray-600">
      <h1 className="text-center text-5xl py-10 font-bold text-white">
        TODO APP
      </h1>

      <div className="flex item-center justify-center">
        <form
          action=""
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="flex items-center gap-2"
        >
          <input
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
            name={value}
            type="text"
            className="bg-white border-none py-2 px-3 rounded outline-none"
          />
          <button className="bg-red-800 py-3 px-6 rounded text-white">
            Add
          </button>
        </form>
      </div>
      <div>
        <table>
          <th>
            <td>Task</td>
            <td>Action</td>
          </th>
          <tr>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item}</td>
                  <td>Delete</td>
                  <td>Done</td>
                </tr>
              );
            })}
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Practice;
