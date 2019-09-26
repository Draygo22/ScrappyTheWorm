import React from 'react';
import { Redirect } from 'react-router-dom'; 

class Start extends React.Component { 

    state= {  //set a state to indicate whether the page redirects or not
        redirect: false //the state is set to false meaning that it did not redirect
    }

    setRedirect = () => {  //
        this.setState ({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/start' />
        }
    }

    render () {
        return (
            <div>
                {this.renderRedirect ()}
                <button onClick={this.setRedirect}>Start</button>
            </div>
        )
    }
}8