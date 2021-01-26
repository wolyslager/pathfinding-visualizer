
 export function dijkstra(grid, startNode, finishNode) {
	const visitedNodesInOrder = [];
	startNode.distance = 0;
	const unvisitedNodes = getAllNodes(grid);
	while(!!unvisitedNodes.length){
		sortNodesByDistance(unvisitedNodes);
		const closestNode = unvisitedNodes.shift();
		closestNode.isVisited = true;
		visitedNodesInOrder.push(closestNode)
		//add wall and infinity cases
		if(closestNode === finishNode) {
			return visitedNodesInOrder;
		}
		updateUnvisitedNeighbors(closestNode, grid);
	}
}

//this functions sorts the nodes in ascending order based on distance
  export function sortNodesByDistance(unvisitedNodes) {
	unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

   function updateUnvisitedNeighbors (node, grid){
	const unVisitedNeighbors = getUnvisitedNeighbors(node, grid);
	for(const neighbor of unVisitedNeighbors){
		neighbor.distance = node.distance + 1;
	}
}

export function getAllNodes(grid){
	const nodes = [];
	for (const row of grid){
		for (const node of row){
			nodes.push(node)
		}
	}
	return nodes;
}

//this function returns an array of the neighbors of the current node
 export function getUnvisitedNeighbors(node, grid){
	const neighbors = [];
	const {col, row} = node;
	 if (row > 0) neighbors.push(grid[row - 1][col]);
	 if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
	 if (col > 0) neighbors.push(grid[row][col - 1]);
	 if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
	return neighbors.filter(neighbor => !neighbor.isVisited);
}