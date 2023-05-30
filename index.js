const grid=document.getElementById("grid");
let LockGame=false;
const TestMode=false; //"True" if you want to see the mines
Tablero();

//GRID 10X10
function Tablero(){
    LockGame=false;
    grid.innerHTML="";
    for(var i=0; i<10; i++){
        row=grid.insertRow(i);
        for(var j=0; j<10; j++){
            cell=row.insertCell(j);
            cell.onclick=function(){ init(this); };
            var mina=document.createAttribute("mina");
            mina.value="false";
            cell.setAttributeNode(mina);
        }
    }
    generateMinas();
}


//Agregar las minas (en este caso 20)
function generateMinas(){
    for(var i=0; i<20; i++){
        var row = Math.floor(Math.random() * 10);
        var colum = Math.floor(Math.random() * 10);
        var cell = grid.rows[row].cells[colum];
        cell.setAttribute("mina", "true");
        if(TestMode){
            cell.innerHTML = "M";
        }
    }
}

function revealMines(){
    for(var i=0; i<10; i++){
        for(var j=0; j<10; j++){
            var cell=grid.rows[i].cells[j];
            if(cell.getAttribute("mina")=="true"){
                cell.className="mina";
            }
        }
    }
}

function GameComplete(){
    var Complete=true;
    for(var i=0; i<10; i++){
        for(var j=0;j<10;j++){
            if((grid.rows[i].cells[j].getAttribute("mina")=="false") && (grid.rows[i].cells[j].innerHTML=="")){
                Complete=false;
            }
        }
    }
    if(Complete){
        alert("YOU FIND ALL THE MINES!");
        revealMines();
    }
}



function init(cell){
    if(LockGame){
        return;
    }else{
        if(cell.getAttribute("mina")=="true"){
            revealMines();
            LockGame=true;
        }else{
            cell.className="active";
            var Count=0;
            var cellRow=cell.parentNode.rowIndex;
            var cellCol=cell.cellIndex;
            for(var i=Math.max(cellRow-1, 0); i<=Math.min(cellRow+1, 9); i++){
                for(var j=Math.max(cellCol-1, 0); j<=Math.min(cellCol+1, 9); j++){
                    if(grid.rows[i].cells[j].getAttribute("mina")=="true"){
                        Count++;
                    }
                }
            }
            cell.innerHTML=Count;
            if(Count==0){
                for(var i=Math.max(cellRow-1, 0);i<=Math.min(cellRow+1, 9); i++){
                    for(var j=Math.max(cellCol-1, 0);j<=Math.min(cellCol+1, 9); j++){
                        if(grid.rows[i].cells[j].innerHTML==""){
                            init(grid.rows[i].cells[j]);

                        }
                    }
                }

            }
            GameComplete();
        }
    }
}