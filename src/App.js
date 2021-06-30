import {Component} from 'react'
import './App.css'

let total = 0

class App extends Component {
  state = {
    note: 0,
    count: '',
    done: false,
    addButtonIsClicked: false,
    totalNoteObject: {},
  }

  componentWillUnmount() {
    clearTimeout(this.timerId)
  }

  updateNote = event => {
    this.setState({
      note: parseInt(event.target.value, 10),
    })
  }

  changeAddButtonStatus = () => {
    this.timerId = setTimeout(() => {
      this.setState({
        addButtonIsClicked: false,
      })
    }, 600)
  }

  updateCount = event => {
    this.setState(preState => ({
      count: preState.count + event.target.value,
    }))
  }

  renderKeyPad = () => {
    const {addButtonIsClicked} = this.state
    const buttonStyle = addButtonIsClicked ? 'added' : 'add'
    const addButtonText = addButtonIsClicked ? 'added' : 'add'
    return (
      <div className="keypad-container">
        <div className="amount-container">
          <button
            type="button"
            className="amount-button"
            value="2000"
            onClick={this.updateNote}
          >
            2000
          </button>
          <button
            type="button"
            className="amount-button"
            value="500"
            onClick={this.updateNote}
          >
            500
          </button>
          <button
            type="button"
            className="amount-button"
            value="200"
            onClick={this.updateNote}
          >
            200
          </button>
          <button
            type="button"
            className="amount-button"
            value="100"
            onClick={this.updateNote}
          >
            100
          </button>
          <button
            type="button"
            className="amount-button"
            value="50"
            onClick={this.updateNote}
          >
            50
          </button>
          <button
            type="button"
            className="amount-button"
            value="20"
            onClick={this.updateNote}
          >
            20
          </button>
          <button
            type="button"
            className="amount-button"
            value="10"
            onClick={this.updateNote}
          >
            10
          </button>
          <button
            type="button"
            className="amount-button"
            value="5"
            onClick={this.updateNote}
          >
            5
          </button>
          <button
            type="button"
            className="amount-button"
            value="2"
            onClick={this.updateNote}
          >
            2
          </button>
          <button
            type="button"
            className="amount-button"
            value="1"
            onClick={this.updateNote}
          >
            1
          </button>
          <button
            type="button"
            className="amount-button clear-button"
            onClick={this.clearAmount}
          >
            Clear all
          </button>
        </div>
        <p className="cross-symbols">X</p>
        <div className="note-count-container">
          <button
            type="button"
            className="amount-button"
            value="7"
            onClick={this.updateCount}
          >
            7
          </button>
          <button
            type="button"
            className="amount-button"
            value="8"
            onClick={this.updateCount}
          >
            8
          </button>
          <button
            type="button"
            className="amount-button"
            value="9"
            onClick={this.updateCount}
          >
            9
          </button>
          <button
            type="button"
            className="amount-button"
            value="4"
            onClick={this.updateCount}
          >
            4
          </button>
          <button
            type="button"
            className="amount-button"
            value="5"
            onClick={this.updateCount}
          >
            5
          </button>
          <button
            type="button"
            className="amount-button"
            value="6"
            onClick={this.updateCount}
          >
            6
          </button>
          <button
            type="button"
            className="amount-button"
            value="1"
            onClick={this.updateCount}
          >
            1
          </button>
          <button
            type="button"
            className="amount-button"
            value="2"
            onClick={this.updateCount}
          >
            2
          </button>
          <button
            type="button"
            className="amount-button"
            value="3"
            onClick={this.updateCount}
          >
            3
          </button>
          <button
            type="button"
            className="amount-button zero"
            value="0"
            onClick={this.updateCount}
          >
            0
          </button>
          <button
            type="button"
            className={`amount-button ${buttonStyle}`}
            onClick={this.addAmount}
          >
            {addButtonText}
          </button>
        </div>
        <p className="error-msg" id="errorEl">
          {' '}
        </p>
      </div>
    )
  }

  clearAmount = () => {
    this.setState({
      note: 0,
      count: '',
    })
  }

  addAmount = () => {
    const {note, count, totalNoteObject} = this.state
    const errorEl = document.getElementById('errorEl')
    if (note !== 0 && count !== '') {
      errorEl.textContent = ''
      this.changeAddButtonStatus()
      totalNoteObject[note] = count
      this.setState({
        note: 0,
        count: '',
        addButtonIsClicked: true,
      })
    } else {
      errorEl.textContent = 'Note or count is missing'
    }
  }

  renderInputElements = () => {
    const {note, count} = this.state
    return (
      <>
        <h1 className="main-heading">
          Deno<span className="highlight-word">Cal</span>
        </h1>
        <div className="display-container">
          <p className="amount-text">{note}</p>
          <p className="cross-text">X</p>
          <p className="count-text">{count === '' ? '0' : count}</p>
        </div>
        {this.renderKeyPad()}
        <button type="button" className="done-button" onClick={this.showOutput}>
          Done
        </button>
      </>
    )
  }

  showOutput = () => {
    this.setState({
      done: true,
    })
  }

  renderOutputElement = () => {
    const {totalNoteObject} = this.state
    const notes = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1]
    return (
      <div className="output-container">
        <h1 className="main-heading">
          Deno<span className="highlight-word">Cal</span>
        </h1>
        <ul className="list-container">
          {notes.map(eachNote => {
            if (totalNoteObject[eachNote] !== undefined) {
              total += eachNote * parseInt(totalNoteObject[eachNote], 10)
              return (
                <li className="list-item" key={eachNote}>
                  <p className="note">{eachNote}</p>
                  <p className="cross-symbol">X</p>
                  <p className="count">{totalNoteObject[eachNote]}</p>
                  <p className="cross-symbol">=</p>
                  <p className="total">
                    {eachNote * parseInt(totalNoteObject[eachNote], 10)}
                  </p>
                </li>
              )
            }
            return ''
          })}
        </ul>
        <div className="final-total-container">
          <p className="count final-total">Total</p>
          <p className="cross-symbol final-total">=</p>
          <p className="total final-total">{total}</p>
        </div>
        <button type="button" className="reset-button" onClick={this.resetData}>
          Reset
        </button>
      </div>
    )
  }

  resetData = () => {
    this.setState({
      note: 0,
      count: '',
      done: false,
      addButtonIsClicked: false,
      totalNoteObject: {},
    })
    total = 0
  }

  render() {
    const {done} = this.state

    return (
      <div className="app-container">
        {done ? this.renderOutputElement() : this.renderInputElements()}
      </div>
    )
  }
}

export default App
