/**
 * 
 */
function grid(position, type, w, h, totalW, totalH){
	
	var $this = this;
	this.type = type || 'hex';
	this.blockW = w || 25;
	this.blockH = h || 25;
	this.container;
	this.position = position;
	if(this.position == 'left'){
  $('#left-grid').empty();
		this.container = document.createElement('div');
		this.container.style.position = 'absolute';
		this.container.style.width = '100%';
		this.container.style.height = '100%';
		this.container.id = 'leftGridContainer';
		
  
		var c = document.createElement("canvas");
	    c.width  = totalW;
	    c.height = totalH;
	    
		var totalW = totalW || $(document).width();
		var totalH = totalH || $(document).height();

		var c = drawHexGrid({}, c);
		this.container.appendChild(c);
		document.getElementById('left-grid').appendChild(this.container);
	}else{

	 $('#right-grid').empty();
	  
		this.container = document.createElement('div');
		this.container.style.position = 'absolute';
		this.container.style.width = '100%';
		this.container.style.height = '100%';
		this.container.id = 'rightGridContainer';
		
  
		var c = document.createElement("canvas");
	    c.width  = totalW;
	    c.height = totalH;
	    
		var totalW = totalW || $(document).width();
		var totalH = totalH || $(document).height();
	
		var c = drawHexGrid({}, c);
		this.container.appendChild(c);
		document.getElementById('right-grid').appendChild(this.container);
		
		
	}
	
	function drawHexGrid(opts,c) {
		
		var alpha 		= opts.alpha || 1;
		var color 		= opts.color || '#000';
		var lineWidth  	= opts.lineWidth || 1;
		var radius 		= opts.radius || 20;
		
	    
	    var mapGridCanvas = c.getContext("2d");
	    mapGridCanvas.clearRect(0, 0, c.width, c.height);
	    mapGridCanvas.globalAlpha = alpha;
	    mapGridCanvas.strokeStyle = color;
	    mapGridCanvas.lineWidth = lineWidth;
	
	    r = radius;
	    part = 60;
	    hexSize = r*Math.sqrt(3);
	    yHexSize = r*Math.sqrt(2.25);
	    xHexes = 2000 / hexSize;
	    yHexes = 2000 / yHexSize;
	
	    mapGridCanvas.beginPath();
	
	    for (xGrid=0;xGrid<=xHexes;xGrid++){
	        for (yGrid=0;yGrid<=yHexes;yGrid++){
	            if (yGrid % 2 == 0) {
	                //even row
	                shiftX = hexSize/2;
	            }
	            else {
	                shiftX=0;
	            }
	            for (i=0;i<=6;i++) {
	                var a = i * part - 90;
	                x = r * Math.cos(a * Math.PI / 180)+xGrid*hexSize+shiftX;
	                y = r * Math.sin(a * Math.PI / 180)+yGrid*yHexSize;
	                if (i == 0) {
	                    mapGridCanvas.moveTo(x,y);
	                }
	                else {
	                    mapGridCanvas.lineTo(x,y);
	                }
	            }
	        }
	    }
	    mapGridCanvas.stroke();
	    
	    return c;
	}
	
	function removeGrid(){
		
		document.removeChild(this.container);
	}
};