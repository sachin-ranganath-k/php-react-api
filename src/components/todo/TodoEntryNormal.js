import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import {
  ADD_NOTE_API,
  DELETE_NOTE_API,
  NOTES_API,
  UPDATE_NOTE_API,
} from "../../constants/endPoints";
import NavBarUser from "../../navbar/NavbarUser";

const TodoEntryNormal = () => {
  const [updatingNote, setUpdatingNote] = useState("");
  const [noteId, setNoteId] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
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
        setAllNotes(res.data);
        resetData();
        setLoading(false);
      })
      .catch((err) => {
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
      .get(`${DELETE_NOTE_API}?todo_Id=${todo_Id}`)
      .then((res) => {
        setLoading(false);
        getData();
      })
      .catch((err) => {
        setLoading(false);
        getData();
      });
  };

  const handleUpdatingNote = (e) => {
    setUpdatingNote(e.target.value);
  };

  const setData = (noteId, noteDescription) => {
    setNoteId(noteId);
    setUpdatingNote(noteDescription);
    setUpdateTextbox(true);
  };

  let submitUpdateData = {
    todoNote: updatingNote,
  };

  console.log("upddd", updatingNote);

  let parseSubmitUpdateData = JSON.stringify(submitUpdateData);

  const updateNote = () => {
    axios
      .post(`${UPDATE_NOTE_API}?todo_Id=${noteId}`, parseSubmitUpdateData)
      .then((res) => {
        console.log(res);
        getData();
        resetData();
        setUpdateTextbox(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            {updateTextbox && (
              <div className="col-md-6">
                <div className="panel panel-success">
                  <div class="panel-heading" style={{ fontSize: "20px" }}>
                    Update Todo with ID : {noteId}
                  </div>
                  <div class="panel-body">
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        name="selectedData"
                        value={updatingNote}
                        onChange={handleUpdatingNote}
                      />
                      <br />
                      <input
                        type="button"
                        className="btn btn-primary"
                        value="Update Todo"
                        onClick={updateNote}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
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
                  {allNotes.length === 0 &&
                    "You have not added any Todos yet..!"}
                  {loading ? <Loader /> : <></>}
                  {allNotes.length > 0 &&
                    allNotes.map((note, index) => (
                      <div className="col-md-3">
                        <div className="card" style={{ width: "200px" }}>
                          <div className="card-body">
                            <h4 className="card-title">
                              <strong>#{index + 1} </strong>
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
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() =>
                                setData(note.todo_Id, note.todoNote)
                              }
                            >
                              <span class="glyphicon glyphicon-pencil"></span>
                            </button>
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
