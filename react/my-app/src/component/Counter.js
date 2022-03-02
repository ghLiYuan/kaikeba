import React, {Component} from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>{ this.state.counter }</button>
            </div>
        );
    }
    handleClick = () => {
        this.changeVal(1)
        this.changeVal(1)
    }
    changeVal = (v) => {
        // 会合并state的更新
        // this.setState({
        //     counter: this.state.counter + v
        // }, () => {
        //     console.log('counter ', this.state.counter);
        // });
        // 链式更新
        this.setState((state) => ({
            counter: state.counter + v
        }))
    }
}

export default Counter;