import React from 'react'
import background from "../../images/Scroll.png";
const styles = {
    background: {
        backgroundImage: `url(${background})`,
        color: "white",
        height: "95vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "gray"
    },
    center: {
        opacity: "1",
        color: "white",
        backgroundColor: "rgba(0,0,0,.7)",
        height:"95vh",
    },
    font:{
        marginBottom: "5px",
        fontSize: "1.6em",
        fontFamily: "Almendra SC, serif"
    },
    labelFont: {
        fontSize: "1em",
        fontFamily: "Almendra SC, serif",
    },
    buttonFont: {
        fontSize: "1em",
        fontFamily: "Almendra SC, serif",
        marginLeft: "15px"
    }
}
export default function Register(props) {
    return (

        <div style={styles.background}>
            <div className="container" style={styles.center}>
                <br />
                <h1 className="fadeUp" style={styles.font}>Scribe your information</h1>
                <form>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="username" className="col-sm-2 col-form-label fadeUp">User Name</label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control fadeUp" 
                                id="username"
                                name="username" 
                                value={props.userName} 
                                onChange={props.handleInputChange}
                                />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="playerName" className="col-sm-2 col-form-label fadeUp">Player Name</label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control fadeUp" 
                                name="playerName"
                                value={props.playerName}
                                onChange={props.handleInputChange}
                                id="playerName" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="characterName" className="col-sm-2 col-form-label fadeUp">Character Name</label>
                        <div className="col-sm-10">
                            <input 
                                type="characterName" 
                                className="form-control fadeUp" 
                                name="characterName"
                                value={props.characterName}
                                onChange={props.handleInputChange}
                                id="characterName" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="email" className="col-sm-2 col-form-label fadeUp">Email Address</label>
                        <div className="col-sm-10">
                            <input 
                                type="email" 
                                className="form-control fadeUp" 
                                name="email"
                                value={props.email}
                                onChange={props.handleInputChange}
                                id="email" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="inputPassword" className="col-sm-2 col-form-label fadeUp">Password</label>
                        <div className="col-sm-10">
                            <input 
                                type="password" 
                                className="form-control fadeUp" 
                                name="password"
                                value={props.password}
                                onChange={props.handleInputChange}
                                id="inputPassword" />
                        </div>
                    </div>
                    <br />
                    <div className="form-group row">
                        <button 
                            style={styles.buttonFont} 
                            type="submit" 
                            onClick={props.handleFormSubmit} 
                            className="btn btn-outline-light fadeUp">
                            Register
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
                )
            }
