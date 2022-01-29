//import firebase from "firebase/app";
//import {List} from "@material-ui/core"
import React, {useState,useEffect} from 'react';
import './App.css';
import {db} from "./firebase"
import { FormControl, List, TableSortLabel, TextField } from '@material-ui/core';
import AddToPhotoIcon from "@material-ui/icons/AddToPhotos"
import TaskItem from './TaskItem';
import styles from "./App.module.css"
import { makeStyles } from '@material-ui/styles';
import { classicNameResolver } from 'typescript';

const useStyles = makeStyles({
  fieled:{
    marginTop:30 ,
    marginBottom:20 ,
  },
  list:{
    margin:"auto",
    width:"40%",
  },
});

const App: React.FC= () =>{
  const [tasks, setTasks] = useState([{id:"", title:""}]);
  const [input, setInput] = useState("");
  const classes=useStyles();

  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot)=>{
      setTasks(
        snapshot.docs.map((doc)=>({id: doc.id, title:doc.data().title}))
      );
    });
    return () => unSub();
  },[]);

  const newTask = (e:React.MouseEvent<HTMLButtonElement>)=>{
    db.collection("tasks").add({title: input});
    setInput("");
  };

  return (
    <div className={styles.app_root}>
      <h1>Todo App by React/Firebase</h1>
      <br />
      <FormControl>
        <TextField
        className={classes.fieled}
          InputLabelProps={{
            shrink: true,
          }}
          label="New task ?"
          value={input}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
          setInput(e.target.value)
        }
        />
        </FormControl>
        <button className={styles.app_icon} disabled={!input} onClick={newTask}>
          <AddToPhotoIcon />
        </button>


      <List className={classes.list}>
      {tasks.map((task)=>(
      <TaskItem key={task.id} id={task.id} title={task.title} />
      ))}
      </List>
    </div>
  );
};

export default App;
