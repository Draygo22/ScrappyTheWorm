import React from 'react';
import Snake from './Snake';
import Food from './Food';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const initialState = {
    food: getRandomCoordinates(),
    movement: 100,
    direction: 'RIGHT',
    snakeDots: [
      [0,0],
      [2,0]
    ]
}


localStorage.setItem("Easy", 200);


export default class App extends React.Component {
  state = initialState; 

  componentDidMount() {
    setInterval(this.moveSnake, localStorage.getItem("Easy"));
    document.onkeydown = this.onKeyDown;
  }

  gameDifficulty(diff1) {
    localStorage.setItem("Easy",parseInt(diff1));
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEaten()
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length -1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
        
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;

      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;

      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    })
  }

  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length -1];
    if (head[0] >=100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach (dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    })
  }

  checkIfEaten() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }



  onGameOver() {
    alert(`Game Over Fuck Face. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState)
  }


  render() {
  return (
    <div>
      <div className="game-area">
      <Snake snakeDots={this.state.snakeDots} />
      <Food dot={this.state.food} />
    </div>

    <button onClick= {()=> window.location.reload()}>Restart</button>
    <button onClick= {(diff1) => this.gameDifficulty(diff1.target.value)} value="100" >Easy</button>
     
    </div>

  );
  }
}
