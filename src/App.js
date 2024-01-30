// useState hooks: it is used tp manage your state{data} in functional component.
// import useState from 'react': you have to import useState fom nothing from react itself
// Rules for hooks:
//1. declare hooks at the top level.
// useState = variable, updating function.
import { useState, useRef } from 'react';
import './App.css'
import './index.css'
//inc is nothing but a reference of function. inc() means invoke the function.
// function App() {
//   const [count, setCount] = useState(10);

//   function inc() {
//     console.log('clicked');
//     setCount(count + 1)
//   }

//   function decr() {
//     setCount(count - 1)
//   }

//   return (
//    <center>
//     <h1>Counter: {count}</h1>
//     <button onClick={inc}>Increment</button>
//     <button onClick={decr}>decrement</button>
//    </center>
//   )
// }

// export default App;
function App() {
  const data = localStorage.getItem('lists') ? JSON.parse(localStorage.getItem('lists')) : [];


  // JSON STRINGIFY object[array] into string (local storage {string})
  // JSON parse string ----> object.
  const [list, setList] = useState(data);
  const newtask = useRef("");
  const [search, setSearch] = useState('');
   console.log("re-render");

  // const newip = (e) => {
  //   setNewtask(e.target.value);
  // }
 
  const addtask =() => {
    localStorage.setItem('lists', JSON.stringify([...list, newtask.current.value]));
   // setList([...list, newtask])// newtask will include the new task from the value input and list with push the new task and include the list.
    //setNewtask("") //it will empty the data after writing.
  setList([...list, newtask.current.value]);
  newtask.current.value = '';
  
  }

  const deleteTask =(i)=> {
    const delList = [...list];
    delList.splice(i, 1);
    setList(delList);
    localStorage.setItem('lists', JSON.stringify(delList));
  }

  const updatetask = (e, i) => {
 const uptask = [...list];
 uptask.splice(i, 1, e.target.value);// the third parameter is to replace which is 'e.target.value'.
 setList(uptask);
 localStorage.setItem('lists', JSON.stringify(uptask));
  }

  const keyEnter = (e) => {
    console.log(e.nativeEvent.data);
    console.log(e.key);
    if (e.key === 'Enter') {
      addtask();
    }
  }
 
  return(
    <div className='App'>
      <div className="search">
        <input type="text" placeholder='Search Task' onChange={(e) => {setSearch(e.target.value)}}/>
      </div>
      <h1 className='heading'>To-do App</h1>
      <div className='inputs'>
      <input type="text" ref={newtask} onKeyDown={keyEnter}/>
      <button className='btn' onClick={addtask}>Add task</button>
      </div>

      <div className="container">

        {
          list.map((val, i) =>{ // i respresenting the index of array.
            if (val.toLowerCase().includes(search.toLowerCase())) {
              
            return (
            <div className="list" key={i}>
              <input type="text" value = {val} onChange={(e,i)=> {updatetask(e,i)}}/>
              <span className='icon' onClick={()=> deleteTask(i)}>x</span>
            </div>
            )
            
          }
          })
        }
       
      </div>
    </div>
  )
}

export default App;


//uncontrolled {useRef} vs controlled {useState}


