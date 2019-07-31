import React from "react";
export default class WriteStory extends React.Component{
    constructor(props){
        super(props);
//create the object, initalize its state
        this.state={
            title:"",
            content:""
        };
    }

    //lambda function does the "binding"

//handleChange Listeners: listen for the user's input
handleChange= e =>{
    this.setState({
        [e.target.name]:e.target.value
        });
    };


onSubmit=(event) =>{
    //this.setState "merges" the object together -- shallow merge
    event.preventDefault();
    console.log("The story title is:",this.state.title,"The story content is", this.state.content);
    this.setState({
        title:"",
        content:""
    });

};

    render(){
        return(
        <form>
            <label>Title of the Story:
        <input
        name="title"
        placeholder ="title" value={this.state.title}
        onChange={this.handleChange}/>
        </label>
        <br />
          <label>Story Content:
        <textarea
        name="content"
        placeholder ="content" value={this.state.content}
        onChange={this.handleChange}/>
        </label>
        <br />
        <button id="submit" onClick={event =>this.onSubmit(event)}>Submit Story</button>
        {/* <button id="edit" onClick={event =>this.handleChange(event)}>Edit Story</button> */}
        </form>
        );
    }
}