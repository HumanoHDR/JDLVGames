
var myMusic= document.getElementById("music");
var sources = document.getElementById("source").src;
var icono = document.getElementById("iconovolumen");
spanerror = document.getElementById("error");

function musicadefondo(){
    classname = document.getElementById("iconovolumen").className;

    if (classname == "fa-solid fa-volume-high")
    {
        icono.classList.remove("fa-volume-high")
        icono.classList.add("fa-volume-off")
        myMusic.pause()
    } else
    {
        icono.classList.remove("fa-volume-off")
        icono.classList.add("fa-volume-high")
        myMusic.volume = 0.1;
        myMusic.play()
        myMusic.volume = 0.1 ;
    }
}

function estadomusica(){
    
    if (classname == "fa-solid fa-volume-high")
    {
        return 0
    } else
    {
        return 1
    }
}

function cambiartemazo() {
    document.getElementById("source").setAttribute('src', 'mp3/win.m4a');
  }
  spanerror.addEventListener("DOMSubtreeModified", function() {
    classname = document.getElementById("iconovolumen").className;
    if (classname == "fa-solid fa-volume-high")
    {
        myMusic.pause();
        document.getElementById("source").src = 'mp3/win.m4a';
        myMusic.load();
        myMusic.play();
        console.log("estoy aqui");
    } else 
    {
        document.getElementById("source").src = 'mp3/win.m4a';
        myMusic.load();
        console.log("estoy aqui en el 2");
    }
    console.log("", e);
    
  });

      