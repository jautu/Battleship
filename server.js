HOST = 'localhost';
PORT = 8002;

var http = require("http");
var sys  = require("sys");
var url  = require("url");

var server = http.createServer(function(req, res){

	var action = url.parse(req.url).pathname;
  switch(action){
		case "/board":
     var board = new Board(4,4);
     board.init();
     res.end();
  }

	res.end(action);    

});

server.listen(PORT, HOST);

console.log("Server launched");

function Board(width, height)
{
  this.tiles = [];
  this.width  = width;
  this.height = height;

  this.init = function()
  {
		for (i=1;i<=this.width;i++)
		{
			for (j=1;j<=this.height;j++)
			{
				this.tiles.push(new Tile(i,j,'water'));
	 		}
 		}
  }

}

function Tile(x,y, type){

  this.x = x;
  this.y = y;
  this.visible = false;
  this.type    = type;

  this.touch = function(){
  	this.visible = true;
  	return this.type;
	};

  this.render = function(){
		return { x: this.x, y: this.y, type: this.type, visible: this.visible }
  };

};

