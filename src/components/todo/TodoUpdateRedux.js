import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addNote, getNotes, updateNote } from "../../actions/actions";

const TodoUpdateRedux = (props) => {
  console.log("rrr", props);
  const [selectedData, setSelectedData] = useState(props.todoDescription);

  const updateNote = () => {
    axios
      .put(`http://localhost:3001/notes/${props.todoNoteId}`, {
        todoNote: selectedData,
      })
      .then((res) => {
        console.log(res);
        // navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInfo = (e) => {
    setSelectedData(e.target.value);
    console.log(selectedData);
  };

  return (
    <div>
      <div className="container">
        <input
          type="text"
          name="selectedData"
          value={selectedData}
          onChange={handleInfo}
        />
        <input type="button" value="Update" onClick={updateNote} />
      </div>
      <br />
    </div>
  );
};

export default TodoUpdateRedux;
