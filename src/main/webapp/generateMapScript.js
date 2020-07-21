function getActive(){
    var header = document.getElementById("palette");
    var paletteHolder = header.getElementsByClassName("palette-button");
    for(var i=0; i < paletteHolder.length; i++){
      paletteHolder[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active-button");
        current[0].className = current[0].className.replace(" active-button", "");
        this.className += " active-button";
        console.log("Old color", current.style.backgroundColor);
        console.log("New color", this.style.backgroundColor);
      });
    }
  }


function setColor(gameButton) {
    var property = document.getElementById(gameButton);
    var x = document.getElementById("palette");
    var activeColor = x.getElementsByClassName("active-button");
    console.log("current color",activeColor[0].style.backgroundColor);
    property.style.backgroundColor = activeColor[0].style.backgroundColor;
}

async function getColors() {
  const response = await fetch('/color-grid');
  const colors = await response.json();

  let colorMap = createPalette(colors);
  createGrid(colors, colorMap);
  getActive();
}

function createPalette(colors){
  let count = 1;
  let colorMap = new Map();

  for (i = 0; i < colors.length; i++) {
      if (i===1){
        let btnElement = document.createElement('button');
        btnElement.innerText = count;
        btnElement.classList.add('palette-button');
        btnElement.classList.add('active-button');
        btnElement.setAttribute("id", count+'p');
        btnElement.setAttribute("style", "background-color: "+colors[i]+";");
        let palletteDiv = document.getElementById("palette");
        palletteDiv.appendChild(btnElement);

        colorMap.set(colors[i], count);
        count++;
      }else if (!colorMap.has(colors[i])){
        let btnElement = document.createElement('button');
        btnElement.innerText = count;
        btnElement.classList.add('palette-button');
        btnElement.setAttribute("id", count+'p');
        btnElement.setAttribute("style", "background-color: "+colors[i]+";");
        let palletteDiv = document.getElementById("palette");
        palletteDiv.appendChild(btnElement);

        colorMap.set(colors[i], count);
        count++;
      }
    }
    return colorMap;
  }

/** Creates <tr> and <td> elements containing the game buttons. */
 function createGrid(colors, colorMap) {
  let trElement = document.createElement('tr');
  let gridDiv = document.getElementById("grid");

  for (i = 0; i < colors.length; i++) {
    if (i%16===0){
      trElement = document.createElement('tr');
    }
    gridDiv.appendChild(trElement);
    let tdElement = document.createElement('td');
    trElement.appendChild(tdElement);
    let btnElement = document.createElement('button');
    btnElement.classList.add('gameButton');
    btnElement.onclick = function() { setColor(this.id); };
    btnElement.setAttribute("id", i+'c');
    btnElement.innerText = colorMap.get(colors[i]);
    tdElement.appendChild(btnElement);
  }
 }