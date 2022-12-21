import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoView from "./TodoView";

const TodoEntry = () => {
  const [todoEntry, setTodoEntry] = useState({
    todoNote: "",
  });
  const [todoEntries, setTodoEntries] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const handleInfo = (e) => {
    const { name, value } = e.target;
    setTodoEntry({
      ...todoEntry,
      [name]: value,
    });
  };

  const { todoNote } = todoEntry;

  const getData = () => {
    axios
      .get(`http://localhost:3001/notes`)
      .then((res) => {
        setTodoEntries(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitData = () => {
    axios
      .post(`http://localhost:3001/notes`, todoEntry)
      .then((res) => {
        console.log(res);
        getData();
        resetData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validateField = () => {
    todoNote === "" ? setError(true) : submitData();
  };

  const resetData = () => {
    todoEntry.todoNote = "";
    setError(false)
  };

  return (
    <div>
      <div className="container" style={{ margin: "5%" }}>
        <h2>Todo List</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Note"
            name="todoNote"
            value={todoNote}
            onChange={handleInfo}
          />
        </div>
        {error && <p style={{ color: "red" }}>Enter the note</p>}
        <button
          type="button"
          className="btn btn-primary"
          onClick={validateField}
        >
          Add Note
        </button>
        <br />
      </div>
      <TodoView todoData={todoEntries} getTodos={getData} />
    </div>
  );
};

export default TodoEntry;
