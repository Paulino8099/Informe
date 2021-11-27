
// $ git commit -m "Correción de errores y algoritmo ya finalizado. Algunas mejoras que hacerles per ya está listo.1.6"

let btnGuardar = document.querySelector(".btn-guardar");
let btnVerMas = document.querySelector(".btn-misHoras");
let btnHistorial = document.querySelector(".btn-historial");

// VARIABLES PARA TODOS LOS INPUT
var inputHoras = document.getElementById("input-horas");
let inputRevisitas = document.querySelector(".input-revisitas");
let inputComentarios = document.querySelector(".input-comentarios");
let inputPublicaciones = document.querySelector(".input-publicaciones");
let inputCursosBiblicos = document.querySelector(".input-cursosBiblicos");
let inputPresentacionVideos = document.querySelector(".input-presentacionVideo");
let inputAño = document.querySelector(".input-año");
let inputMes = document.querySelector(".input-mes");
let inputMesMisHoras = document.querySelector(".input-mes-misHoras");
let inputYearsMisHoras = document.querySelector(".input-years-files")

// TODOS LOS VALORES DE LOS INPUT
let inputAñoValue = inputAño.value;

// VARIABLES PARA LA VENTANA EMERGENTE POPUP
let ventanaPopup = document.querySelector(".contenedor-popup");
let textAlertPopup = document.querySelector(".text-alert-popup");

//VENTANA EMERGENTE POPUP 

let btnVentanaPopup = document.querySelector(".btn-alert-popup");
btnVentanaPopup.addEventListener('click', () => {
    ventanaPopup.classList.remove("active");
});

// Cambiar del modal principal al modal de archivos del usuario
cambiarModal();
function cambiarModal() {
    btnVerMas.addEventListener('click', function () {
        document.querySelector(".container-hojaInforme").classList.toggle('off');
        document.querySelector(".container-files").classList.toggle('on');
    });
}

cambiarModalRevertir();
function cambiarModalRevertir() {
    document.querySelector(".btn-salir-misHoras").addEventListener('click', function () {
        document.querySelector(".container-hojaInforme").classList.toggle('off');
        document.querySelector(".container-files").classList.toggle('on');
    });
}


// ============================================================================================================
// ============================================================================================================
// ==================================Carga de todas las funciones==============================================
// ============================================================================================================
// ============================================================================================================
addEventListener('DOMContentLoaded', function () {
    // Functión para agregar escucha btn de la lista para seleccionar los años de las carpetas
    listDeploy();
    // Función para guardar datos en el localStorage al hacer click cualquiera de los input para las horas de servicio. Hay que tener en cuenta que solo se van a guardar datos al presionar la tecla de enter 
    saveDataKeypress();
    // Función para seleccionar el mes mediante algoritmo
    seleccionMes();
    // Guardar el año seleccionado en el localStorage para que siempre se quede guardado y cuando el usuario entre siempre va a aparecer puesto en el input de archivos de los años
    saveFullYearsLocalStorage()
    // Función para seleccionar un año para sacar los datos del localStorage correspodiente al año selecionado
    selectionFileYears();
    // Función para guardar todos los datos en el localStorage
    btnSaveData();
    // Guardar el mes que seleccione el usuario en el localStorage
    saveDataMesLocalStorage();
    // Obtener los datos guardados previamente en el localStorage y pegarlo en el "inputMesMisHoras"
    getDataMesLocalStorage();

    filesFullYears();
});



// Esta función es para guardar el valor del mes en INPUT MES al hacer click en cualquiera de los meses que se encuentran en la lista 



let listaMes = document.querySelector(".lista-mes");
function seleccionMes() {
    // Con esta algoritmo podemos extraer los elementos hijos de la lista de los meses ya que al ser una lista esta genera un arreglo que podemos extraer facilmente.
    let hijos = listaMes.children;
    for (let i = 0; i < hijos.length; i++) {
        // Agregar eventos escucha a todos los hijos de la listas de meses
        hijos[i].addEventListener('click', () => {
            // Con este algoritmo podemos extraer el VALOR del elemento donde se escuche el click
            let extraerValorList = hijos[i].childNodes[0].nodeValue;
            inputMes.value = extraerValorList;
        })
    }
}


// Desplegar lista de los meses al hacer click en el indicador tipo flecha abajo
document.querySelector(".content-btn-listaMes").addEventListener('click', () => {
    document.querySelector(".lista-mes").classList.toggle('active');
    document.querySelector(".svg-listaMes").classList.toggle('rotate');
})

// Función para alertar al usuario que debe de llenar algunos input correctamente
function evaluarCamposVacios() {
    if (inputAño.value === '') {
        textAlertPopup.innerHTML = `¡El campo "año" está vacío! ${'<br>'} Debe de introducir un año.`;
        // Ventana Popup
        ventanaPopup.classList.add("active");
    } else if (inputAño.value != '' && !(inputAño.value >= 2021 && inputAño.value <= 2025)) {
        textAlertPopup.innerHTML = `¡Debe de proporcionar un año correspodiente a: 2021-2025!`;
        // Ventana Popup
        ventanaPopup.classList.add("active");
    } else if (inputMes.value === '') {
        textAlertPopup.innerHTML = `¡Por favor, seleccione un mes!`;
        // Ventana Popup
        ventanaPopup.classList.add("active");
    }
    // Función para detectar si todos los campos de entradas para las horas de servicio están vacíos y presentar una alerta diciendo que los campos están vacíos y que el usuario debe de proporcionar algunos datos.
    else if (inputHoras.value === '' && inputRevisitas.value === '' && inputComentarios.value === '' && inputPublicaciones.value === '' && inputCursosBiblicos.value === '' && inputPresentacionVideos.value === '') {
        textAlertPopup.innerHTML = `¡Nada que guardar! <br> Debe de introducir datos.`;
        // Ventana Popup
        ventanaPopup.classList.add("active");
    }
}

// Función para guardar datos en el localStorage al presionar ek botón "guardar"
function btnSaveData() {
    btnGuardar.addEventListener("click", function () {
        guardarDatosLocalStorage();
        inputHoras.value = '';
        inputRevisitas.value = '';
        inputComentarios.value = '';
        inputPublicaciones.value = '';
        inputCursosBiblicos.value = '';
        inputPresentacionVideos.value = '';
        evaluarCamposVacios();
    });
}

// Función con algoritmo para conectarse al localStorage y guardar datos
function guardarDatosLocalStorage() {

    if (inputMes.value != '' && (inputAño.value >= 2021 && inputAño.value <= 2023)) {
        /* Aqui lo que trato de hacer es que solo se van a guardar las horas en caso de que el 
          input de horas se encuntra con datos de lo contrario, no se va a enviar nada al localStorage*/
        if (inputHoras.value != '') { guardarHoras() }
        function guardarHoras() {

            let inputHorasValue = inputHoras.value;
            let mesAñoHoras = `Horas (${inputMes.value}/${inputAño.value})`;
            // SI LOCAL STORAGE NO CONTIENE NINGUN DATO SE LE ENVIA UNO NUEVO
            if (localStorage.getItem(mesAñoHoras) === null) {
                localStorage.setItem(mesAñoHoras, inputHorasValue);
            } else {
                let datosLocalStorage = localStorage.getItem(mesAñoHoras);
                datosLocalStorage = parseInt(inputHorasValue) + parseInt(datosLocalStorage);
                localStorage.setItem(mesAñoHoras, inputHorasValue);
            }
        }

        /* Aqui lo que trato de hacer es que solo se van a guardar las horas en caso de que el
          input de horas se encuntra con datos de lo contrario, no se va a enviar nada al localStorage*/
        if (inputRevisitas.value != '') { guardarRevisitas() };
        function guardarRevisitas() {

            // Valor del input 'revisitas'
            let inputRevisitasValue = inputRevisitas.value;
            let mesAñoRevisitas = `Revisitas (${inputMes.value}/${inputAño.value})`;
            if (localStorage.getItem(mesAñoRevisitas) === null) {
                localStorage.setItem(mesAñoRevisitas, inputRevisitasValue)
            } else {
                let datosLocalStorage = localStorage.getItem(mesAñoRevisitas);
                datosLocalStorage = parseInt(inputRevisitasValue) + parseInt(datosLocalStorage);
                localStorage.setItem(mesAñoRevisitas, inputRevisitasValue);
            }
        };

        if (inputComentarios.value != '') { guardarComentarios() };
        function guardarComentarios() {

            let inputComentariosValue = inputComentarios.value;
            let comentariosMesAño = `Comentarios (${inputMes.value}/${inputAño.value})`;
            if (localStorage.getItem(comentariosMesAño) === null) {
                localStorage.setItem(comentariosMesAño, inputComentariosValue);
            } else {
                let datosLocalStorage = localStorage.getItem(comentariosMesAño);
                datosLocalStorage = parseInt(datosLocalStorage) + parseInt(inputComentariosValue);
                localStorage.setItem(comentariosMesAño, inputComentariosValue);
            }
        };

        if (inputPublicaciones.value != '') { guardarPublicaciones() };
        function guardarPublicaciones() {

            let inputPublicacionesValue = inputPublicaciones.value;
            let publicacionesMesAño = `Publicaciones (${inputMes.value}/${inputAño.value})`;
            if (localStorage.getItem(publicacionesMesAño) === null) {
                localStorage.setItem(publicacionesMesAño, inputPublicacionesValue);
            } else {
                let datosLocalStorage = localStorage.getItem(publicacionesMesAño);
                datosLocalStorage = parseInt(datosLocalStorage) + parseInt(inputPublicacionesValue);
                localStorage.setItem(publicacionesMesAño, inputPublicacionesValue);
            }
        };

        if (inputCursosBiblicos.value != '') { guardarCursosBiblicos() };
        function guardarCursosBiblicos() {

            let inputCursosBiblicosValue = inputCursosBiblicos.value;
            let cursosBiblicosMesAño = `CursosBiblicos (${inputMes.value}/${inputAño.value})`;
            if (localStorage.getItem(cursosBiblicosMesAño) === null) {
                localStorage.setItem(cursosBiblicosMesAño, inputCursosBiblicosValue);
            } else {
                let datosLocalStorage = localStorage.getItem(cursosBiblicosMesAño);
                datosLocalStorage = parseInt(datosLocalStorage) + parseInt(inputCursosBiblicosValue);
                localStorage.setItem(cursosBiblicosMesAño, inputCursosBiblicosValue);
            }
        }

        if (inputPresentacionVideos.value != '') { guardarPresentacionVideos() };
        function guardarPresentacionVideos() {
            let inputPresentacionVideosValue = inputPresentacionVideos.value;
            let presentacionVideoMesAño = `PresentacionVideos (${inputMes.value}/${inputAño.value})`;
            if (localStorage.getItem(presentacionVideoMesAño) === null) {
                localStorage.setItem(presentacionVideoMesAño, inputPresentacionVideosValue);
            } else {
                let datosLocalStorage = localStorage.getItem(presentacionVideoMesAño);
                datosLocalStorage = parseInt(datosLocalStorage) + parseInt(inputPresentacionVideosValue);
                localStorage.setItem(presentacionVideoMesAño, inputPresentacionVideosValue);
            }
        }
    }
}


// Función para desplegar lista al dar click en el boton de la flechita del modal principal
function listDeploy() {
    let btnListDeploy = document.querySelector(".btn-list-deploy");
    btnListDeploy.addEventListener('click', function () {
        document.querySelector(".list-fileYears").classList.toggle('active');
        document.querySelector(".content-seleccionAño").classList.toggle('active');

    });
};

// Desplegar lista para los años de FILES
listDeployFiles();
function listDeployFiles() {
    let btnListMonthFiles = document.querySelector(".btn-list-deployMonth");
    btnListMonthFiles.addEventListener('click', function () {
        document.querySelector(".list-month-files").classList.toggle('active');
        document.querySelector(".content-selectionMes").classList.toggle('active');
    })
}

// Función para seleccionar un año y ponerlo en localStorage
function selectionFileYears() {
    // Dejar puesto el año al cargar el documento de cero
    let datosLocalStorageFullYears = localStorage.getItem('selectionFullYears');
    document.querySelector('.input-years-files').value = datosLocalStorageFullYears;

    let fileYears = document.querySelector(".list-fileYears").children;
    for (let i = 0; i < fileYears.length; i++) {
        fileYears[i].addEventListener('click', function () {
            let datosLocalStorage = localStorage.getItem('selectionFullYears');
            document.querySelector('.input-years-files').value = datosLocalStorage;
        });
    }
}

// Función para guardar el año selecionado en el localStorage
function saveFullYearsLocalStorage() {
    let fileYears = document.querySelector(".list-fileYears").children;
    for (let i = 0; i < fileYears.length; i++) {
        fileYears[i].addEventListener('click', function () {
            let fileYearsChildrens = fileYears[i].childNodes[0].nodeValue;
            if (localStorage.getItem('selectionFullYears') === null) {
                localStorage.setItem('selectionFullYears', fileYearsChildrens)
            } else {
                let datosLocalStorage = localStorage.getItem('selectionFullYears');
                datosLocalStorage = fileYearsChildrens;
                localStorage.setItem('selectionFullYears', datosLocalStorage);
            }
        });
    }

}

// Función para escuchar un click en todos los input y al escuchar que se presiona la tecla enter se van a guardar los datos
function saveDataKeypress() {
    let btnListDeploy = document.querySelector(".btn-list-deploy")
    const allInput = document.querySelector(".container-servicioCampo").children;
    for (i = 0; i < allInput.length; i++) {
        inputAño, btnGuardar, allInput[i], inputMes.addEventListener("click", function () {
            addEventListener('keyup', function (e) {
                if (e.keyCode === 13) {
                    guardarDatosLocalStorage();
                    inputHoras.value = '';
                    inputRevisitas.value = '';
                    inputComentarios.value = '';
                    inputPublicaciones.value = '';
                    inputCursosBiblicos.value = '';
                    inputPresentacionVideos.value = '';
                    evaluarCamposVacios();
                }
            })
        })
    }
}

// Guardar el mes que seleccione el usuario en el localStorage
saveDataMesLocalStorage();
function saveDataMesLocalStorage() {
    let childrenFilesMes = document.querySelector(".list-month-files").children;
    for (let i = 0; i < childrenFilesMes.length; i++) {
        childrenFilesMes[i].addEventListener('click', function () {
            let nodeValue = childrenFilesMes[i].childNodes[0].nodeValue;
            if (localStorage.getItem('selectionMonth' === null)) {
                localStorage.setItem('selectionMonth', nodeValue)
            } else {
                let datosLocalStorage = localStorage.getItem;
                datosLocalStorage = nodeValue;
                localStorage.setItem('selectionMonth', datosLocalStorage)
            }
        });

    }
};

// Obtener los datos guardados previamente en el localStorage y pegarlo en el "inputMesMisHoras"
getDataMesLocalStorage();
function getDataMesLocalStorage() {
    let datosLocalStorageMonth = localStorage.getItem('selectionMonth');

    document.querySelector('.input-mes-misHoras').value = datosLocalStorageMonth;
    let listMonthMisHoras = document.querySelector('.list-month-files').children;
    for (let i = 0; i < listMonthMisHoras.length; i++) {
        listMonthMisHoras[i].addEventListener("click", function () {
            let datosLocalStorageMonth = localStorage.getItem('selectionMonth');
            document.querySelector('.input-mes-misHoras').value = datosLocalStorageMonth;
        })

    }
}

//  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
//  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦All Files¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
//  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦All Files¦¦¦¦¦¦¦¦¦All Files¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
//  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦All Files¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦All Files¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
//  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦All Files¦¦¦¦¦¦¦¦¦All Files¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
//  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦All Files¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
//  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
function filesFullYears() {
    let fileYears = document.querySelector(".list-fileYears").children;
    for (let i = 0; i < fileYears.length; i++) {
        fileYears[i].addEventListener('click', function () {
            let contenedorResultadoDelMes = document.querySelector(".container-foldersMonths");
            let inputYearsMisHoras = document.querySelector(".input-years-files");
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦2021¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦2021¦¦¦¦¦¦¦¦¦2021¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦2021¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦2021¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦2021¦¦¦¦¦¦¦¦¦2021¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦2021¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦

            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            if (inputMesMisHoras.value == 'Diciembre' && inputYearsMisHoras.value == '2021') {
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ HORAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem(`Horas (${inputMesMisHoras.value}/2021)`) != null) {
                    var datosHora = `<div><h2>Horas:</h2><h1>
                                                ${localStorage.getItem(`Horas (${inputMesMisHoras.value}/2021)`)}
                                            </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ REVISITAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem(`Revisitas (${inputMesMisHoras.value}/2021)`) != null) {
                    var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    ${localStorage.getItem(`Revisitas (${inputMesMisHoras.value}/2021)`)}
                                                </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ COMENTARIOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem(`Comentarios (${inputMesMisHoras.value}/2021)`) != null) {
                    var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                        ${localStorage.getItem(`Comentarios (${inputMesMisHoras.value}/2021)`)}
                                                        </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PUBLICACIONES ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem(`Publicaciones (${inputMesMisHoras.value}/2021)`) != null) {
                    var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                        ${localStorage.getItem(`Publicaciones (${inputMesMisHoras.value}/2021)`)}
                                                    </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ CURSOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem(`CursosBiblicos (${inputMesMisHoras.value}/2021)`) != null) {
                    var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                        ${localStorage.getItem(`CursosBiblicos (${inputMesMisHoras.value}/2021)`)}
                                                    </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PRESENTACION ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem(`PresentacionVideos (${inputMesMisHoras.value}/2021)`) != null) {
                    var datosPresentacionVideos = `<div><h2>Presentación Vídeos:</h2><h1>
                                                        ${localStorage.getItem(`PresentacionVideos (${inputMesMisHoras.value}/2021)`)}
                                                    </h1></div>`;
                }
                contenedorResultadoDelMes.innerHTML = `<div>
                                                    <h3>${inputMesMisHoras.value}</h3>
                                                    <div>
                                                        ${datosHora}
                                                        ${datosRevisitas}
                                                        ${datosComentarios}
                                                        ${datosPublicaciones}
                                                        ${datosCursosBiblicos}
                                                        ${datosPresentacionVideos}
                                                    </div>
                                                </div>`;
            }
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦2022¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦2022¦¦¦¦¦¦¦¦¦2022¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦2022¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦2022¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦2022¦¦¦¦¦¦¦¦¦2022¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦2022¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦

            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Enero¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Enero¦¦¦¦¦¦¦¦¦Enero¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Enero¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Enero¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Enero¦¦¦¦¦¦¦¦¦Enero¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Enero¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            // Comparar si hay carpetas con las mismas caracteristicas de mes y año en el contenedor y en la base de datos de localStorage
            else if (inputMesMisHoras.value == 'Enero' && inputYearsMisHoras.value == '2022') {
                // Si en el localStorage se encuentra esa clave entonces se va a crear una carpeta de enero del 2021 y se va a mostrar al usuario
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ HORAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('Horas (Enero/2022)') != null) {
                    var datosHora = `<div><h2>Horas:</h2><h1>
                                                    ${localStorage.getItem('Horas (Enero/2022)')}
                                                </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ REVISITAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('Revisitas (Enero/2022)') != null) {
                    var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                            ${localStorage.getItem('Revisitas (Enero/2022)')}
                                                        </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ COMENTARIOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('Comentarios (Enero/2022)') != null) {
                    var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                                ${localStorage.getItem('Comentarios (Enero/2022)')}
                                                            </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PUBLICACIONES ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('Publicaciones (Enero/2022)') != null) {
                    var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                                    ${localStorage.getItem('Publicaciones (Enero/2022)')}
                                                                </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ CURSOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('CursosBiblicos (Enero/2022)') != null) {
                    var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                                        ${localStorage.getItem('CursosBiblicos (Enero/2022)')}
                                                                    </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PRESENTACION ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('PresentacionVideos (Enero/2022)') != null) {
                    var datosPresentacionVideos = `<div><h2>Presentación Vídeos:</h2><h1>
                                                                        ${localStorage.getItem('PresentacionVideos (Enero/2022)')}
                                                                    </h1></div>`;
                }

                contenedorResultadoDelMes.innerHTML = `<div>
                                                                    <h3>Enero</h3>
                                                                    <div>
                                                                        ${datosHora}
                                                                        ${datosRevisitas}
                                                                        ${datosComentarios}
                                                                        ${datosPublicaciones}
                                                                        ${datosCursosBiblicos}
                                                                        ${datosPresentacionVideos}
                                                                    </div>
                                                                </div>`;
            }
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Febrero¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Febrero¦¦¦¦¦¦¦¦¦Febrero¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Febrero¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Febrero¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Febrero¦¦¦¦¦¦¦¦¦Febrero¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Febrero¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            else if (inputMesMisHoras == 'Febrero' && inputYearsMisHoras.value == '2022') {
                // Si en el localStorage se encuentra esa clave entonces se va a crear una carpeta de enero del 2021 y se va a mostrar al usuario
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ HORAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('Horas (Febrero/2022)') != null) {
                    var datosHora = `<div><h2>Horas:</h2><h1>
                                                    ${localStorage.getItem('Horas (Febrero/2022)')}
                                                </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ REVISITAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('Revisitas (Febrero/2022)') != null) {
                    var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                            ${localStorage.getItem('Revisitas (Febrero/2022)')}
                                                        </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ COMENTARIOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('Comentarios (Febrero/2022)') != null) {
                    var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                                ${localStorage.getItem('Comentarios (Febrero/2022)')}
                                                            </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PUBLICACIONES ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('Publicaciones (Febrero/2022)') != null) {
                    var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                                    ${localStorage.getItem('Publicaciones (Febrero/2022)')}
                                                                </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ CURSOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('CursosBiblicos (Febrero/2022)') != null) {
                    var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                                        ${localStorage.getItem('CursosBiblicos (Febrero/2022)')}
                                                                    </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PRESENTACION ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('PresentacionVideos (Febrero/2022)') != null) {
                    var datosPresentacionVideos = `<div><h2>Presentación Vídeos:</h2><h1>
                                                                        ${localStorage.getItem('PresentacionVideos (Febrero/2022)')}
                                                                    </h1></div>`;
                }

                contenedorResultadoDelMes.innerHTML = `<div>
                                                                    <h3>Febrero</h3>
                                                                    <div>
                                                                        ${datosHora}
                                                                        ${datosRevisitas}
                                                                        ${datosComentarios}
                                                                        ${datosPublicaciones}
                                                                        ${datosCursosBiblicos}
                                                                        ${datosPresentacionVideos}
                                                                    </div>
                                                                </div>`;
            }
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Marzo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Marzo¦¦¦¦¦¦¦¦¦Marzo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Marzo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Marzo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Marzo¦¦¦¦¦¦¦¦¦Marzo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Marzo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            else if (inputMesMisHoras == 'Marzo' && inputYearsMisHoras.value == '2022') {
                // Si en el localStorage se encuentra esa clave entonces se va a crear una carpeta de enero del 2021 y se va a mostrar al usuario
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ HORAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('Horas (Marzo/2022)') != null) {
                    var datosHora = `<div><h2>Horas:</h2><h1>
                                                    ${localStorage.getItem('Horas (Marzo/2022)')}
                                                </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ REVISITAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('Revisitas (Marzo/2022)') != null) {
                    var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                            ${localStorage.getItem('Revisitas (Marzo/2022)')}
                                                        </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ COMENTARIOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('Comentarios (Marzo/2022)') != null) {
                    var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                                ${localStorage.getItem('Comentarios (Marzo/2022)')}
                                                            </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PUBLICACIONES ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('Publicaciones (Marzo/2022)') != null) {
                    var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                                    ${localStorage.getItem('Publicaciones (Marzo/2022)')}
                                                                </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ CURSOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('CursosBiblicos (Marzo/2022)') != null) {
                    var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                                        ${localStorage.getItem('CursosBiblicos (Marzo/2022)')}
                                                                    </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PRESENTACION ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('PresentacionVideos (Marzo/2022)') != null) {
                    var datosPresentacionVideos = `<div><h2>Presentación Vídeos:</h2><h1>
                                                                        ${localStorage.getItem('PresentacionVideos (Marzo/2022)')}
                                                                    </h1></div>`;
                }

                contenedorResultadoDelMes.innerHTML = `<div>
                                                                    <h3>Marzo</h3>
                                                                    <div>
                                                                        ${datosHora}
                                                                        ${datosRevisitas}
                                                                        ${datosComentarios}
                                                                        ${datosPublicaciones}
                                                                        ${datosCursosBiblicos}
                                                                        ${datosPresentacionVideos}
                                                                    </div>
                                                                </div>`;
            }
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦None¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦None¦¦¦¦¦¦¦¦¦None¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦None¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦None¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦None¦¦¦¦¦¦¦¦¦None¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦None¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
            else {
                contenedorResultadoDelMes.innerHTML = '';
            };
        });
    };
};



































// // Aqui lo que se hace es que despues que se haga click en cualquiera de los meses que se encuentra en la lista, el valor del input va acambiar a un numero correspondiente a su numero de mes esto sin alterar el valor del input ya seleccionado y ya cargado al propio input que en este caso el valor del input serí el nombre del mes.
// function convertirMes() {
//     let inputMesValue = inputMes.value;
//     if (inputMesValue == 'Enero') inputMesValue = 1;
//     if (inputMesValue == 'Febrero') inputMesValue = 2;
//     if (inputMesValue == 'Marzo') inputMesValue = 3;
//     if (inputMesValue == 'Abril') inputMesValue = 4;
//     if (inputMesValue == 'Mayo') inputMesValue = 5;
//     if (inputMesValue == 'Junio') inputMesValue = 6;
//     if (inputMesValue == 'Julio') inputMesValue = 7;
//     if (inputMesValue == 'Agosto') inputMesValue = 8;
//     if (inputMesValue == 'Septiembre') inputMesValue = 9;
//     if (inputMesValue == 'Octubre') inputMesValue = 10;
//     if (inputMesValue == 'Noviembre') inputMesValue = 11;
//     if (inputMesValue == 'Diciembre') inputMesValue = 12;
// };



// // Selección del nombre del mes para los nombres de las carpetas
// seleccionMes()
// function seleccionMes() {
//     let mesesDelAño = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

//     if (mes == 1) mes = mesesDelAño[0];
//     if (mes == 2) mes = mesesDelAño[1];
//     if (mes == 3) mes = mesesDelAño[2];
//     if (mes == 4) mes = mesesDelAño[3];
//     if (mes == 5) mes = mesesDelAño[4];
//     if (mes == 6) mes = mesesDelAño[5];
//     if (mes == 7) mes = mesesDelAño[6];
//     if (mes == 8) mes = mesesDelAño[7];
//     if (mes == 9) mes = mesesDelAño[8];
//     if (mes == 10) mes = mesesDelAño[9];
//     if (mes == 11) mes = mesesDelAño[10];
//     if (mes == 12) mes = mesesDelAño[11];
// }



// // Funcion para extraer el mes que se haya elegido dentro del INPUT MES
// extraerDatosInputMes();
// function extraerDatosInputMes() {
//     let inputMes = document.querySelector(".input-mes");
// }