import React, { useState,useEffect } from 'react';
import { createStyles, makeStyles, theme } from '@material-ui/core/styles';
import {Link,Typography} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

import { register } from '../../actions/auth';
import { useHistory } from 'react-router-dom';
import { getPosts } from '../../actions/posts';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    },
    link: {
      marginLeft: theme.spacing(1)
    }
  })
);


const Register = (error) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChangeName = (e) => {
    if(e.target.value.length !== 0){
      setName(e.target.value);
      setErrors({...errors,name:""});
    }
    else{
      setErrors({...errors,name:"Name is required"});
    }

  };
  
  const handleChangeEmail = (e) => {
    if(e.target.value.length !== 0){
      setEmail(e.target.value);
      setErrors({...errors,email:""});
    }
    else{
      setErrors({...errors,email:"Email is required"});
    }

  };
  const handleChangePassword = (e) => {
    if(e.target.value.length !== 0){
      setPassword(e.target.value)
      setErrors({...errors,password:""})
    }
    else
    {
      setErrors({...errors,password:"Password is required"});
    }
  };
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const authUser = useSelector((state)=>state.auth.user);
  const history = useHistory();

  useEffect(()=>{
    if(isAuthenticated) {
      history.push(`/login`);
      const userid = authUser.user.id;
      dispatch(getPosts())
    }
  },[isAuthenticated])

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(errors).some(x => (x !== null && x !== ""));
    //console.log(isEmpty);
    if(!isEmpty){
    const user = { name,email,password };

    // Attempt to login
    dispatch(register(user));
    }
    
  };

 
  return (
    <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Register" />
        <CardContent>
          <div>
          <TextField
              fullWidth
              id="name"
              type="name"
              label="Name"
              margin="normal"
              onChange={handleChangeName}
              error ={Boolean(errors?.name)}
              helperText={errors?.name}
            />
            <TextField
              fullWidth
              id="email"
              type="email"
              label="Email"
              margin="normal"
              onChange={handleChangeEmail}
              error ={Boolean(errors?.email)}
              helperText={errors?.email}
            />
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Password"
              margin="normal"
              onChange={handleChangePassword}
              error ={Boolean(errors?.password)}
              helperText={errors?.password}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button type="submit"
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}>
            Register
          </Button>
        </CardActions>
        <Typography variant="subtitle2" className={classes.link}>Already have an account, <Link href="/login">login</Link></Typography>
      </Card>
    </form>
  );
}

export default Register;
