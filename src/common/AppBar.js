import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


export default function SearchAppBar(props) {
 
    const {users,setSelectedoption,setOtherUserProfile} = props;
  return (
    <Autocomplete
    id="free-solo-demo"
    style={{width:300}}
    freeSolo
    options={users}
    getOptionLabel={option => option.name}
    onChange={(event, value) => {setSelectedoption(value).bind(this);setOtherUserProfile(true).bind(this);}} 
    renderInput={(params) => (
    <TextField {...params} 
    />
    )}
    />
  );
}
