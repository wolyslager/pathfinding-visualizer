import React from 'react'
import './Node.css'
class Node extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		const {isFinish, isStart} = this.props;
		const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : '';
		return (
        	<div className={`node ${extraClassName}`}></div>
    	);
	}  
}

export default Node