import React,{useState,useEffect} from 'react';
import styles from "./Login.module.css"
import { Button,FormControl,TextField,Typography } from '@material-ui/core';
import {auth} from "./firebase"
import { Email } from '@material-ui/icons';

//routeパスで履歴が保存される、propsで履歴を引き出す
const Login: React.FC = (props:any) => {
  const [isLogin,setIsLogin] = useState(true);
  const [email,setEmail]=useState("");
  const [password,setPassword] = useState("");

  //userが存在する場合はルートに遷移する/ユーザーが存在しない場合はログインコンポーネントに存在し続ける
  useEffect(()=>{
      auth.onAuthStateChanged((user)=>{
          user && props.history.push("/");
      });
  },[props.history]);

  return 
    <div className={styles.login_root}>
        <h1>{isLogin ? "Login":"Register"}</h1>
        <br />
        <FormControl>
            <TextField
            InputLabelProps={{
                shrink:true,
            }}
            name="email"
            label="E-mail"
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                setEmail(e.target.value);
            }}
            />
        </FormControl>
        <br />
        <FormControl>
            <TextField
            InputLabelProps={{
                shrink:true,               
            }}
            name="password"
            label="password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                setPassword(e.target.value);
            }}
            />
        </FormControl>
        <br />
        <Button
         variant="contained"
         color="primary"
         size = "small"
         onClick={
             isLogin
             ? async () => {
                 try{
                     await auth.signInWithEmailAndPassword(email,password);
                     props.history.push("/")
                     
                 }catch(error){
                     alert("error.message");
                 }
             }
             : async() => {
                 try{
                    await auth.signInWithEmailAndPassword(email,password);
                    props.history.push("/")
                 }catch(error){
                    alert("error.message");
                 }
             }
         }
        >
        {isLogin ? "login" : "register"}
        </Button>
        <br />
        <Typography align='center'>
            <span onClick={()=>setIsLogin(!isLogin)}>
                {isLogin ? "Create new account ?" : "Back to login"}
            </span>
        </Typography>

    </div>;
}

export default Login;
