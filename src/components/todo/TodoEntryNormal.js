import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addNote,
  getNotes,
  showError,
  updateNote,
} from "../../actions/actions";
import Loader from "./Loader";
import { ADD_NOTE_API, NOTES_API } from "../../constants/endPoints";
import NavBarUser from "../../navbar/NavbarUser";

const TodoEntryNormal = () => {
  // const userInfo = sessionStorage.getItem("userInfo");
  // const parsedUserInfo = JSON.parse(userInfo);

  // const { userId, userName } = parsedUserInfo;

  const [todoEntry, setTodoEntry] = useState({
    todoNote: "",
  });
  const [updatingNote, setUpdatingNote] = useState("");
  const [noteId, setNoteId] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateTextbox, setUpdateTextbox] = useState(false);
//   const dispatch = useDispatch();
//   const allNotes = useSelector((state) => state.loadAllNotes);
//   const error = useSelector((state) => state.error);
const [allNotes,setAllNotes]=useState([]);

  useEffect(() => {
    getData();
    console.log(allNotes)
  }, []);

  const handleInfo = (e) => {
    const { name, value } = e.target;
    setTodoEntry({
      ...todoEntry,
      [name]: value,
    });
  };
  const { todoNote } = todoEntry;
  console.log(todoEntry);
  const getData = async () => {
    setLoading(true);
    let res = await axios
      // .get(`http://localhost:3001/notes`)
      .get(`${NOTES_API}`)
      .then((res) => {
        console.log("ff", res);
        // dispatch(getNotes(res.data));
        setAllNotes(res.data)

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  //   const validateField = () => {
  //     todoNote === "" ? dispatch(showError(true)) : submitData();
  //   };
  const resetData = () => {
    todoEntry.todoNote = "";
    // dispatch(showError(false));
    setUpdatingNote("");
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
                      value={todoNote}
                      onChange={handleInfo}
                    />
                  </div>
                  {/* {error && <p style={{ color: "red" }}>Enter the note</p>} */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    // onClick={validateField}
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
                        // onChange={handleUpdatingNote}
                      />
                      <br />
                      <input
                        type="button"
                        className="btn btn-primary"
                        value="Update Todo"
                        // onClick={updateNote}
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
                  {allNotes.length === 0 && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "20px",
                        textAlign: "center",
                      }}
                    >
                      {loading ? <Loader /> : <></>}
                      You have not added any Todos yet..!
                    </p>
                  )}
                  {allNotes.map((note, index) => (
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
                            // onClick={() => deleteNote(note.id)}
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
      {/* {flag && (
        <TodoUpdateRedux
          todoNoteId={noteId}
          todoDescription={noteDescription}
        />
      )} */}
    </div>
  );
};
export default TodoEntryNormal;
