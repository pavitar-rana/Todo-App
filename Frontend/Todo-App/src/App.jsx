import { useEffect, useState } from "react";
import "./App.css";
import {
  AppBar,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

function App() {
  const [Todo, SetTodo] = useState([]);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/todos", {
      method: "GET",
    }).then((res) => {
      res.json().then((data) => {
        SetTodo(data.Todos);
      });
    });
  }, []);

  return (
    <>
      <AppBar position="sticky">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant={"h6"}
            style={{
              marginLeft: "10px",
            }}
          >
            TODO APP
          </Typography>
          <FormControlLabel
            value="end"
            control={<Switch color="default" />}
            label="THEME"
            labelPlacement="end"
          />
        </div>
      </AppBar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "350px",
        }}
      >
        <div
          style={{
            marginBottom: "35px",
          }}
        >
          <TextField
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            style={{
              marginRight: "50px",
            }}
            id="title"
            label="Title"
            variant="standard"
          />
          <TextField
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            style={{
              marginRight: "35px",
            }}
            id="description"
            label="Description"
            variant="standard"
          />
          <Button
            onClick={() => {
              function callback2(data) {
                console.log(data);
              }

              function callback1(res) {
                res.json().then(callback2);
              }

              fetch("http://localhost:3000/todos", {
                method: "POST",
                body: JSON.stringify({
                  title: Title,
                  description: Description,
                }),
                headers: {
                  "Content-type": "application/json",
                },
              }).then(callback1);
            }}
          >
            Add Todo
          </Button>
        </div>
        {Todo.map((data) => {
          return (
            <div
              key={data.id}
              style={{
                display: "flex",
              }}
            >
              <div
                style={{
                  paddingRight: "110px",
                  marginRight: "0px",
                }}
              >
                <Typography variant={"h6"}>Title - {data.title}</Typography>
              </div>
              <div
                style={{
                  paddingLeft: "0px",
                  marginRight: "50px",
                }}
              >
                <Typography variant={"h6"}>
                  Description - {data.description}
                </Typography>
              </div>
              <Button
                onClick={() => {
                  function callback2(data) {
                    console.log(data);
                  }
                  function callback1(res) {
                    res.json().then(callback2);
                  }
                  fetch(`http://localhost:3000/todos/${data.id}`, {
                    method: "DELETE",
                    headers: {
                      "Content-type": "application/json",
                    },
                  }).then(callback1);
                }}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
