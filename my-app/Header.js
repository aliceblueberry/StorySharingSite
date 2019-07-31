mport React from "react"

  class Header extends React.Component {

    constructor() {
      super()
      this.state = {
        name: "Hanrui"
      }
    }

    hover() {
      console.log("hovered!")
    }

    render(){

      const date = new Date()
      const style = {
        fontSize: 30
      }
      let timeOfDay

      if (date.getHours() < 12){
        timeOfDay = "morning"
        style.color = "#04756F"
      }else if(date.getHours() >= 12 && date.getHours() < 17){
        timeOfDay = "afternoon"
        style.color = "#4863A0"
      }else{
        timeOfDay = "evening"
        style.color = "#D90000"
      }

      return (
        <div>
        <header className="header" onMouseOver={this.hover} style={style}>
        Good {timeOfDay}, {this.state.name} !
        </header>
        </div>
      )
    }

  }

  export default Header

