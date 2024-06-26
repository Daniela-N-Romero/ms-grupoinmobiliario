const constructorabtns = document.getElementById("constructorabtns");
const inmobiliariabtns = document.getElementById("inmobiliariabtns");
const grupobtns = document.getElementById("grupobtns");

function loadButtons(buttons,container){
    container.innerHTML = buttons
}

if (constructorabtns){
    loadButtons(buttonsConstructora,constructorabtns)
};

if (inmobiliariabtns){
    loadButtons(buttonsInmobiliaria,inmobiliariabtns)
};

if (grupobtns){
    loadButtons(buttonsGrupo,grupobtns)
};