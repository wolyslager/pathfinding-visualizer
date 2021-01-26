import React from 'react'
import Node from './Node.js'
import './PathfindingVisualizer.css'
import {dijkstra, sortNodesByDistance, getNeighbors, updateNeighbors} from '../Algorithms/dijkstra.js'

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 25;


class PathfindingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
        }
        this.visualizeDijkstra = this.visualizeDijkstra.bind(this);
        this.getInitialGrid = this.getInitialGrid.bind(this);
        this.createNode = this.createNode.bind(this);
    }

    componentDidMount() {
        let grid = this.getInitialGrid();
        this.setState({ grid: grid })
    }

    visualizeDijkstra = () => {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)
        console.log(visitedNodesInOrder)
    }


    getInitialGrid() {
        const grid = [];
        //change this, very hacky
        const width = window.innerWidth > 1500 ? 74 : 55;
        const height = window.innerHeight > 830 ? 28 : 20;
        for (let row = 0; row < width; row++) {
            const currentRow = [];
            for (let col = 0; col < height; col++) {
                currentRow.push(this.createNode(col, row))
            }
            grid .push(currentRow);
        }
        return grid;
    }

    createNode(col, row) {
        return {
            col,
            row,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null
        };
    }
    render() {
        const { grid } = this.state;
        return (
            <div className="container">
				<button onClick = {() => this.visualizeDijkstra()}>
					Visualize Dijkstra's Algorithm
				</button>
				<div className="grid">
				  {grid.map((row, rowIdx) => {
				  	return(
				     <div key={rowIdx}> 
				       {row.map((node, nodeIdx) => {
				       	  const { isStart,
				       	  		 isFinish, 
				       	  		 distance, 
				       	  		 isVisited, 
				       	  		 isWall, 
				       	  		 previousNode } = node;
				       	  return(
				       	    <Node 
				       	      key={nodeIdx}
				       	      isStart={isStart}
				       	      isFinish={isFinish}
				       	      distance={distance}
				       	      isVisited={isVisited}
				       	      isWall={isWall}
				       	      previousNode={previousNode}
				       	    />
				       	  );
				       })}
				     </div>
				  	);
				  })}
				</div>
			</div>
        );
    }
}

export default PathfindingVisualizer;