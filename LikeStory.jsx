import React from "react";
export default class LikeStory extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            //the likes that ths story has received. Either set this 
            //property of the story in databse, or make a dummy likes count for stories?
            count: 999,
            isLiked: false
        };
    }

//     handleButtonClick = () =>{
//         this.setState({
//             isLiked : !this.state.isLiked
//     });

// };

   //count +1 if liked, -1 if like cancelled
   handleCounter = event =>{
    if(!this.state.isLiked) {
        this.setState((prevState, props) => {
          return {
            count: prevState.count + 1,
            isLiked: true
          };
        });
  
      } else {
  
        this.setState((prevState, props) => {
          return {
            count: prevState.count - 1,
            isLiked: false
          };
        });
  
      }
   };
    
    render(){
        const buttonText = this.state.isLiked? "cancel like":"like";

        return(
            <div>
                <div>count: {this.state.count}</div>
                <button onClick={event =>this.handleCounter(event)}
            >
                    {buttonText}
                </button>
            </div>
        )
    }
}
