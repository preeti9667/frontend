import { fetchDiet } from '@/customStore/userSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useParams } from 'next/navigation';
import React, { use, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Mod = () => {
  const params = useParams<{ userId: string }>();
  const userId = params.userId;
  const dispatch: any = useDispatch();

 const notes = useSelector((state: any) => state);
 console.log(notes);

useEffect(() => {
    dispatch(fetchDiet(userId));
  }, [dispatch, userId]);


  return (
    <>
{notes?.notes?.map((note: any) => (
        <div key={note.date}>
          <h3>{note.date}</h3>
          {note.entries.map((entry: any) => (
            <div key={entry.id}>
              <p>{entry.time} - {entry.text}</p>
              {/* <button onClick={() => handleUpdateNote(note.date, entry.id, entry.time, entry.text)}>Edit</button> */}
              {/* <button onClick={() => handleDeleteNote(note.date, entry.id)}>Delete</button> */}
            </div>
          ))}
    </div>
  ))}
    </>
  )
}
  
export default Mod

