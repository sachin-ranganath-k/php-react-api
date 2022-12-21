import React from "react";

const TodoEntryDisplay = () => {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    let res = await axios
      .get(`http://localhost:3001/notes`)
      .then((res) => {
        dispatch(getNotes(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const deleteNote = (noteId) => {
    axios
      .delete(`http://localhost:3001/notes/${noteId}`)
      .then((res) => {
        // dispatch(deleteNote(res));
        resetData();
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setData = (noteId, noteDescription) => {
    setNoteId(noteId);
    // setNoteDescription(noteDescription);
    setUpdatingNote(noteDescription);
    // setFlag(true);
    setUpdateTextbox(true);
  };

  const updateNote = () => {
    axios
      .put(`http://localhost:3001/notes/${noteId}`, {
        todoNote: updatingNote,
      })
      .then((res) => {
        getData();
        resetData();
        setUpdateTextbox(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdatingNote = (e) => {
    setUpdatingNote(e.target.value);
  };

  return (
    <div>
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
                        onClick={() => deleteNote(note.id)}
                      >
                        <span class="glyphicon glyphicon-trash"></span>
                      </button>
                      &nbsp;&nbsp;&nbsp;
                      <button
                        type="button"
                        className="btn btn-primary"
                        //   onClick={() => updateNote(note.id)}
                        //   onClick={() => navigate(`updateNote/${note.id}`)}
                        onClick={() => setData(note.id, note.todoNote)}
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
  );
};

export default TodoEntryDisplay;
