const canvas = document.getElementById('graph');

const graphWidth = 700;
const graphHeight = 500;

const wait = document.getElementById('wait');
const funcs = document.getElementById('functions');

var CurrFuncs =[];
var Colors =[];
var scale = 40;
function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    
    return ctx;
  }

const graph = setupCanvas(canvas);

const originX = graphWidth / 2;
const originY = graphHeight / 2;

drawXaxis(graph);
drawYaxis(graph);
drawGraph(graph);


function drawXaxis(graph){
     currFuncs = [];
    graph.beginPath();
    graph.strokeStyle = "#000000";
    graph.moveTo(0,graphHeight/2);
    graph.lineTo(graphWidth,graphHeight/2 );
    graph.lineWidth= 2;
    graph.stroke();
}

function drawYaxis(graph){
    graph.beginPath();
    graph.strokeStyle = "#000000";
    graph.moveTo(graphWidth/2 ,0);
    graph.lineTo(graphWidth/2,graphHeight);
    graph.lineWidth= 2;
    graph.stroke();

}

var unit = 10;


function drawGraph(graph) {
    graph.translate(originX +0.5,originY +0.5);
    for(var i=0 ;i < 50 ; i++)
   {
       graph.lineWidth = 0.5;
        graph.strokeStyle="darkgrey";
       graph.beginPath();
       graph.moveTo(i*scale,-250);
       graph.lineTo(i*scale,250);
       graph.stroke();

       graph.beginPath();
       graph.moveTo((-i)*scale,-250);
       graph.lineTo((-i)*scale,250);
       graph.stroke();

       graph.beginPath();
       graph.moveTo(-350,i*scale);
       graph.lineTo(350,i*scale);
       graph.stroke();

       graph.beginPath();
       graph.moveTo(-350,(-i)*scale);
       graph.lineTo(350,(-i)*scale);
       graph.stroke();
   }
   
}



function plotter(graph,func,colour,isDrawingagain)
{
    var x,y;
    var temp = true;
    graph.beginPath();
    x = -350;
    if(eval(func))
    {
    y = eval(func);
    graph.moveTo(-350,y);
    graph.strokeStyle = colour;
    for( x = -350 ;x*scale<= 350; x+= scale/200)
    {
       
        
        if(x >= 0 && temp)
        {
            temp = false;
            x=0.0000000000000000000001;
        }
        y = eval(func);
        
        if(y > 50)
        y = 50;

        if( y < -50)
        y = -50;

         
       // if(isFinite(y))
       // {
                graph.lineTo(x*scale,-y*scale);
                 graph.stroke();
    
      //  }

       /* else{
            while(x < 350)
            {
                x += 0.0001;
                y = eval(func);
                if(isFinite(y))
                {
                    graph.beginPath();
                    if(y > 0)
                    graph.moveTo(x - 0.0001,-100000);

                    else
                    graph.moveTo(x - 0.0001,+100000);
                    break;
                }
            }
        }
*/

    }

   /* for( x =0 ;x >  -350;x-= 0.15)
    {
        y = eval(func);

        if(isFinite(y))
        {
        graph.lineTo(x*30,-y*30);
        graph.stroke();
        }

        else{
            while(x > -350)
            {
                x -= 0.0001;
                y = eval(func);
                if(isFinite(y))
                { 
                    graph.beginPath();
                    if(y > 0)
                    graph.moveTo(x - 0.0001,-100000);

                    else
                    graph.moveTo(x - 0.0001,+100000);
                    break;
                }
            }
        }
    }
*/
    
      wait.innerHTML = "";
    let p = document.createElement("p");
    p.style.borderColor = graph.strokeStyle;
    p.style.color = "black";
    p.innerHTML ="y = "+ func;
    if(!(isDrawingagain))
    {
        Colors.push(graph.strokeStyle);
        funcs.appendChild(p);
    } 
  }
 
 
}


function changeFunc(){
    var func = document.getElementById('func').value;
    func = func.toLowerCase();
    func = func.replace("cos", "Math.cos");
    func = func.replace("sin", "Math.sin");
    func = func.replace("tan", "Math.tan");
    func = func.replace("log", "Math.log");
    func = func.replace("pow", "Math.pow");
    func = func.replace("floor","Math.floor");
    func = func.replace("e","Math.exp(1)");
    func = func.replace("sqrt","Math.sqrt");

    if(func != null)
    {
     wait.innerHTML = "Not a Valid Function";
     if(!CurrFuncs.includes(func))
     {
         console.log("inside");
         var x =-350;
         if(eval(func))
         CurrFuncs.push(func);
         plotter(graph,func,getRandomColor(),false);
    
        } 
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function reload(){
    window.location.reload(false); 
}

function scaleDec(){
    if(scale<80)
    {
    scale+= 10;
    graph.translate(-(originX +0.5),-(originY +0.5));

    graph.clearRect(0, 0, graphWidth, graphHeight);

    drawXaxis(graph);
    drawYaxis(graph);
    drawGraph(graph);
    drawAgain();
    }
}

function scaleInc(){
    if(scale > 20)
    {
    scale -= 10;
    graph.translate(-(originX +0.5),-(originY +0.5));

    graph.clearRect(0, 0, graphWidth, graphHeight);

    drawXaxis(graph);
    drawYaxis(graph);
    drawGraph(graph);
    drawAgain();
    }
}


function drawAgain(){
    for(var i =0 ;i < CurrFuncs.length ;i++)
    {
        plotter(graph,CurrFuncs[i],Colors[i],true);
    }
}
