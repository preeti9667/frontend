'use client'
import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, Divider, InputBase } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
// import InfiniteScroll from 'react-infinite-scroller';

interface User {
  _id: string;
  fullName: string;
  email: string;
  userId: string;
  isActive: boolean;
  // createdAt: string;
}


interface AddUserDialogProps {
    initialValues?: {
        users: string[];
      };
  open: boolean;
  onClose: () => void;
  participant : User[]; // List of all available users
  onSubmit: (values: string[]) => void; // Submit handler
 search: any
 onChange: any
 getUsers: any
 hasMore: any
}

const validationSchema = Yup.object({});



const participatesAdd:React.FC<AddUserDialogProps> = ({initialValues,open, onClose, participant, onSubmit , search , onChange,getUsers,hasMore})=>{
  
    return(
        <>
  <Dialog open={open} onClose={onClose}>
  <DialogTitle
    color="success"
    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap:"20px" }}
  >
    <InputBase
      placeholder="Search"
      defaultValue={search}
      onChange={onChange}
      sx={{
        padding: "3px 10px",
        borderRadius: "10px",
        border: "1px solid black",
        width: { lg: "350px", sx: "300px" },
      }}
    />
      <HighlightOffOutlinedIcon color="error"
      onClick={onClose}
       sx={{ cursor: "pointer" }} />
  </DialogTitle>
  <Divider />

 
  <DialogContent sx={{padding:"1px 2px"}}>
 
      <Formik
       validationSchema={validationSchema}
       initialValues={{ users: initialValues?.users || [] }} // Preselect users
       onSubmit={(values) => onSubmit(values.users)} // Extract user IDs
       enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form>

         
            {/* <InfiniteScroll  
        pageStart={0}
        loadMore={getUsers}
        hasMore={!!hasMore}
       loader={<div key={0}>Loading...</div>}
         useWindow={false}>  */}

     <Box 
    sx={{padding: "20px", height:'320px', overflowY: "scroll",display:'grid', gridTemplateColumns:"1fr 1fr", gap:"20px"}}>
            {participant.map((user,index) => (
              <Box key={index} >
               <Field
  type="checkbox"
  name="users"
  value={user._id}
  as={Checkbox}
  checked={values.users.includes(user._id)} // Show checked for already added users
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const updatedUsers = checked
      ? [...values.users, user._id] // Add if checked
      : values.users.filter((id) => id !== user._id); // Remove if unchecked
    setFieldValue("users", updatedUsers);
  }}
/>
                <label>{user.fullName}</label>
              </Box>
            ))}
            </Box>
            {/* </InfiniteScroll> */}
            <Divider/>
            <Button variant="contained" sx={{ margin:"10px"}}
             color="success"
             type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    
    </DialogContent>
</Dialog>

        </>
    )
}
export default participatesAdd;