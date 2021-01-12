import React,{useEffect} from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { getPosts } from '../../actions/posts';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  //const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  
  // useEffect(()=>{
  //   if(!posts.length){
  //     dispatch(getPosts())
  //   }
  // },[])
  const classes = useStyles();
    return (
      !posts.length ? <CircularProgress /> :(
        <>
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={6}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>      
        </>
      )
    );
  };

export default Posts;