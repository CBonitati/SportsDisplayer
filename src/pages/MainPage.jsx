import React from "react";
import '../css/makePage.css'

function MainPage() {

    return(

        <div>

            <div className="info-container">
                <label>Enter Sports Team</label>
                <input type="text" />
                <button>Add</button>
            </div>
           

            <div className="box-container">
                <div className="box box1"></div>
                <div className="box box2"></div>
                <div className="box box3"></div>
                <div className="box box4"></div>
            </div>
            



        </div>


    )
}

export default MainPage


