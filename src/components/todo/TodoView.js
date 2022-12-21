import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const TodoView = (props) => {

  const dispatch=useDispatch()

  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:3001/notes/${id}`)
      .then((res) => {
        console.log(res)
      //  dispatch(deleteNote(res.data.id))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="col-md-12">
        <div className="row">
          {props.allNotes.map((note, index) => (
            <div className="col-md-4">
              <div className="card" style={{ width: "200px" }} >
                <div className="card-body">
                  <h4 className="card-title">Note : {index + 1}</h4>
                  <p>{note.todoNote}</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          <br />
        </div>
      </div>
    </div>
  );
};

export default TodoView;
