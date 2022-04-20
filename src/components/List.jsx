import React from 'react'
import FromInput from './FormInput'
import { AiFillDelete } from 'react-icons/ai';
import {FaRegEdit} from 'react-icons/fa';
import {IoIosSave} from 'react-icons/io'

class List extends React.Component {

    state={
        listTodo:[
            {
                id:"1",
                name:'Truong',
                age: '22',
                gmail:"gmail1@.com"
            },
            {
                id:"2",
                name:'Hoang',
                age: '33',
                gmail:"gmail2@.com"
            }
        ],
        editTodo:{}
    }
    addNewTodo = (todo) =>{
        this.setState({
            listTodo: [...this.state.listTodo,todo]
        })
    }

    handleDeleteTodo = (todo) =>{
        let currentTodo = this.state.listTodo
        currentTodo = currentTodo.filter(item=> item.id !== todo.id)
        this.setState({
            listTodo: currentTodo
        })
    }

    handleEditTodo = (todo) =>{
        let {editTodo,listTodo} = this.state
        let isEmtyObj = Object.keys(editTodo).length === 0;

        //save
        if(isEmtyObj === false && editTodo.id === todo.id) {

            let listTodoCopy = [...listTodo];
            let objIndex = listTodoCopy.findIndex((item => item.id === todo.id));

            listTodoCopy[objIndex].name = editTodo.name;

            this.setState({
                listTodo: listTodoCopy,
                editTodo:{}
            })



            return;
        }
        //edit
        this.setState({
            editTodo: todo
        })
        


        this.setState({
            editTodo: todo
        })
    }
    handleOnchangeEditTodo = (e) => {
        let editTodoCopy = {...this.state.editTodo}
        editTodoCopy.name = e.target.value
        this.setState({
            editTodo : editTodoCopy
        })
    }
    render() {
        let {listTodo,editTodo} = this.state;
        let isEmtyObj = Object.keys(editTodo).length === 0
        // console.log("check inEmty",isEmtyObj);
        return(
            <>                
                <ul>
                    {listTodo && listTodo.length > 0  && 
                        listTodo.map((item,index)=>{
                            return(
                                <li key={index}>
                                    {
                                        isEmtyObj === true ? <span>{item.name}</span>
                                        :
                                        <>
                                        {editTodo.id === item.id ?
                                            <span>
                                                <input type="text" value={editTodo.name}
                                                    onChange={(e)=>this.handleOnchangeEditTodo(e)}
                                                />
                                            </span>
                                            :
                                            <span>
                                                {item.name}
                                            </span>
                                        }   
                                        </>                                   
                                    }
                                                                        
                                    <span>{item.age}</span>
                                    <span>{item.gmail}</span> 
                                    <p>
                                        <button
                                            onClick={()=>this.handleEditTodo(item)}
                                        >
                                            {isEmtyObj === false && editTodo.id === item.id ?
                                                <IoIosSave /> :  <FaRegEdit />
                                            }
                                            
                                        </button>

                                        <button
                                            id="delete"
                                            onClick={()=>this.handleDeleteTodo(item)}
                                        ><AiFillDelete /></button>
                                    </p>
                                </li>
                            )
                        })
                    }
                    

                </ul>
                <FromInput addNewTodo={this.addNewTodo} />
            </>
        )
    }
}
export default List