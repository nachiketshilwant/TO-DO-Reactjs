import React, { useEffect, useState } from 'react'
import "./style.css"

// get localstorage data
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist")
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return []
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const[EditItem, setEditItem] = useState("")
    const [ToggleButton, setToggleButton] = useState(false)

    // add the items function
    const addItem =() => {
        if(!inputData){
            alert("plz fill the data")
        }
        else if(inputData && ToggleButton){
            setItems(
                items.map((curElem) => {
                    if(curElem.id===EditItem){
                        return {...curElem,name:inputData}
                    }
                    else{
                        return curElem
                    }
                })
            )
            
        setInputData("")
        setEditItem(null)
        setToggleButton(false)

        }
        else{
            const mynewInputData = {
                id : new Date().getTime().toString(),
                name : inputData 
            }
            setItems([...items,mynewInputData])
            setInputData("")
        }
    }

    // edit the items
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index
        })

        setInputData(item_todo_edited.name)
        setEditItem(index)
        setToggleButton(true)

    }
    // delete item function
    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
          return curElem.id !== index;
        });
        setItems(updatedItems);
      }

    //   Remove all function
    const RemoveAll = () => {
        setItems([])
    }

    // local Storage
    useEffect(()=>{
        localStorage.setItem("mytodolist", JSON.stringify(items))
    },[items])



    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todoLogo" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder='✍ Add Items' className='form-control'
                        value={inputData} onChange={(e => setInputData(e.target.value))}  />
                        {ToggleButton ? <i className="fa-regular fa-pen-to-square add-btn" onClick={addItem} ></i>
                        :<i className="fa fa-plus add-btn" onClick={addItem} ></i>}
                        
                    </div>
                    {/* show all items */}
                    <div className="showItems">
                        {items.map((CurElem, index) =>{
                            return (
                                <div className="eachItem" key={CurElem.id}>
                            <h3>{CurElem.name}</h3>
                            <div className="todo-btn">
                            <i className="fa-regular fa-pen-to-square add-btn"
                            onClick={() => editItem(CurElem.id)}></i>
                            <i className="fa-regular fa-trash-can add-btn" 
                            onClick={() => deleteItem(CurElem.id)} ></i>
                            </div>
                        </div>
                            )
                        } )}
                        
                    </div>

                    {/* Remove all buttons */}
                    <div className="showItems"> <button className="btn effect04"
                     data-sm-link-text='Remove All' onClick={RemoveAll}>
                        <span>CHECK LIST</span> </button> </div>
                </div>
            </div>
        </>
    )
}

export default Todo
