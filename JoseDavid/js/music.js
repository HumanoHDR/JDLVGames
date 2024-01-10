
var myMusic= document.getElementById("music");
var sources = document.getElementById("source").src;
var icono = document.getElementById("iconovolumen");
spanerror = document.getElementById("error");


function volumencambio() {
classname = document.getElementById("iconovolumen").className;

if (classname == "fa-solid fa-volume-high")
{
    icono.classList.remove("fa-volume-high")
    icono.classList.add("fa-volume-off")
    myMusic.volume = 0
} else
{
    icono.classList.remove("fa-volume-off")
    icono.classList.add("fa-volume-high")
    myMusic.volume = 0.5
}
}
myMusic.load(); //call this to just preload the audio without playing
myMusic.play();



      