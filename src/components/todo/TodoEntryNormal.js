import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import {
  ADD_NOTE_API,
  DELETE_NOTE_API,
  NOTES_API,
} from "../../constants/endPoints";
import NavBarUser from "../../navbar/NavbarUser";

const TodoEntryNormal = () => {
  const [updatingNote, setUpdatingNote] = useState("");
  const [noteId, setNoteId] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateTextbox, setUpdateTextbox] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const handleInfo = (e) => {
    setNoteDescription(e.target.value);
  };
  const getData = async () => {
    setLoading(true);
    let res = await axios
      .get(`${NOTES_API}`)
      .then((res) => {
        console.log("ff", res);
        setAllNotes(res.data);
        resetData();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const validateField = () => {
    if (noteDescription === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      submitData();
    }
  };

  const resetData = () => {
    setNoteDescription("");
  };

  let data = {
    todo_Id: "",
    todoNote: noteDescription,
  };

  let submitDataForm = JSON.stringify(data);

  const submitData = () => {
    setLoading(true);
    axios
      .post(`${ADD_NOTE_API}`, submitDataForm)
      .then((res) => {
        setLoading(false);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteNote = (todo_Id) => {
    setLoading(true);
    axios
      .delete(`${DELETE_NOTE_API}?todoId=${todo_Id}`)
      .then((res) => {
        setLoading(false);
        getData();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        getData();
      });
  };

  //   const handleUpdatingNote = (e) => {
  //     setUpdatingNote(e.target.value);
  //   };

  return (
    <div>
      <NavBarUser />
      <div className="container" style={{ margin: "5%" }}>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6">
              <div className="panel panel-success">
                <div class="panel-heading" style={{ fontSize: "20px" }}>
                  Add Todo
                </div>
                <div class="panel-body">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Note"
                      name="todoNote"
                      value={noteDescription}
                      onChange={handleInfo}
                    />
                  </div>
                  {error && <p style={{ color: "red" }}>Enter the note</p>}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={validateField}
                  >
                    Add Todo
                  </button>
                  <br />
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <div className="col-md-12">
            <div className="panel panel-danger">
              <div class="panel-heading" style={{ fontSize: "20px" }}>
                Your Todos
              </div>
              <div class="panel-body">
                <div className="row">
                  {allNotes.length === 0 && "You have not added any Todos yet..!"}
                  {loading ? <Loader /> : <></>}
                  {allNotes.length > 0 &&
                    allNotes.map((note, index) => (
                      <div className="col-md-3">
                        <div className="card" style={{ width: "200px" }}>
                          <div className="card-body">
                            <h4 className="card-title">
                              <strong>#{index + 1}</strong>
                            </h4>
                            <br />
                            <p>{note.todoNote}</p>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => deleteNote(note.todo_Id)}
                            >
                              <span class="glyphicon glyphicon-trash"></span>
                            </button>
                            &nbsp;&nbsp;&nbsp;
                            {/* <button
                            type="button"
                            className="btn btn-primary"
                            //   onClick={() => updateNote(note.id)}
                            //   onClick={() => navigate(`updateNote/${note.id}`)}
                            onClick={() => setData(note.id, note.todoNote)}
                          >
                            <span class="glyphicon glyphicon-pencil"></span>
                          </button> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TodoEntryNormal;
