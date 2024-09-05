import React, { Component } from "react";

class Clock extends Component {
    constructor(props) {
        super(props);
        // Initialize laps from localStorage
        this.initLaps = JSON.parse(localStorage.getItem("laps")) || [];
        this.state = {
            date: new Date(),
            laps: this.initLaps,
            inputValue: "",
        };
    }
    componentDidMount() {
        this.timer = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    tick = () => {
        this.setState({ date: new Date() });
    };
    saveLap = () => {
        const { laps, inputValue, date } = this.state;
        let lapId =
            laps.length > 0 ? Math.max(...laps.map((lap) => lap.id)) : 0;
        // Add new lap
        const newLap = {
            time: date.toLocaleTimeString(),
            id: lapId + 1,
            title: inputValue,
        };
        const updatedLaps = [...laps, newLap];
        // Update state and localStorage
        localStorage.setItem("laps", JSON.stringify(updatedLaps));
        this.setState({ laps: updatedLaps, inputValue: "" });
    };
    deleteLap = (id) => {
        // Filter out the lap to delete
        const updatedLaps = this.state.laps.filter((lap) => lap.id !== id);
        // Update state and localStorage
        localStorage.setItem("laps", JSON.stringify(updatedLaps));
        this.setState({ laps: updatedLaps });
    };
    // assiging input value to state
    handleInput = (e) => {
        this.setState({ inputValue: e.target.value });
    };
    render() {
        const { date, laps, inputValue } = this.state;
        return (
            <>
                <h2>It is {date.toLocaleTimeString()}</h2>
                <button onClick={this.saveLap}>Save Lap</button>
                <div>
                    <input
                        type="text"
                        placeholder="Enter your lap title..."
                        onChange={this.handleInput}
                        value={inputValue}
                    />
                </div>
                <ul>
                    {laps.length > 0 ? (
                        [...laps].reverse().map((lap) => (
                            <li key={lap.id}>
                                <div>
                                    <p>{lap.title}</p>
                                    <p>{lap.time}</p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.target.parentElement.classList.add(
                                            "removed"
                                        );
                                        setTimeout(() => {
                                            this.deleteLap(lap.id);
                                        }, 300);
                                    }}
                                >
                                    X
                                </button>
                            </li>
                        ))
                    ) : (
                        <li>No laps saved yet</li>
                    )}
                </ul>
            </>
        );
    }
}

export default Clock;
