import ListHeader from './components/ListHeader'
import Auth from './components/Auth'
import {useEffect, useState} from 'react'
import ListItem from './components/ListItem'
import { useCookies } from 'react-cookie'




const App=() =>{


  const [cookies,setCookie,removeCookie]=useCookies(null)
  const authToken = cookies.AuthToken
const userEmail= cookies.user_email
const [tasks,setTasks] = useState(null)

  const getData =async()=>{

    try{

const response= await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
const json= await response.json()

setTasks(json)
    }catch(err){
      console.error(err)

    }
  }
useEffect(()=> {
  if(authToken){
    getData()
  }} 
, [])
console.log(tasks)

//sort tasks by date
const sortedTasks= tasks?.sort((a,b)=>new Date (a.date)- new Date (b.date)) 


  
  return (
   
    
    <div className='app'>
      {!authToken && <Auth/>}
      {authToken && 
      <>
      <ListHeader listName={' 😎 Daily Routine Tick List'} getData={getData}/>
      <p className='user-email'>Welcome back! 😇 {userEmail} </p>
      {sortedTasks?.map((task)=> <ListItem key={task.id } task={task} getData={getData} />)}
      </> }
      <p className='copyright'> © Managing Daily Routine with Zoya</p>
      </div>
   
  );
}



 
export default App;
 