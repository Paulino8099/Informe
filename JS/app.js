
let btnGuardar = document.querySelector(".btn-guardar");
let btnVerMas = document.querySelector(".btn-verMas");
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
let inputYearsFile = document.querySelector(".input-years-files");

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

// ============================================================================================================
// ============================================================================================================
// ==================================Carga de todas las funciones==============================================
// ============================================================================================================
// ============================================================================================================
addEventListener('DOMContentLoaded', function () {
    // Functión para agregar escucha btn de la lista para seleccionar los años de las carpetas
    listDeploy();
    // Función para guardar todos los datos en el localStorage
    btnSaveData();
    // Función para seleccionar el mes mediante algoritmo
    seleccionMes();
    // Guardar el año seleccionado en el localStorage para que siempre se quede guardado y cuando el usuario entre siempre va a aparecer puesto en el input de archivos de los años
    saveFullYearsLocalStorage()
    // Función para seleccionar un año para sacar los datos del localStorage correspodiente al año selecionado
    selectionFileYears();
    // Funcion para extraer archivos del localStorage solo si hay un año seleccionado
    showFolders();
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
function evaluarCampoAño() {
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
        evaluarCampoAño();
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
            let mesAñoRevisitas = `Revisitas (${inputMes.value}/${2021})`;
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
            let comentariosMesAño = `Comentarios (${inputMes.value}/${2021})`;
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
            let publicacionesMesAño = `Publicaciones (${inputMes.value}/${2021})`;
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
            let cursosBiblicosMesAño = `CursosBiblicos (${inputMes.value}/${2021})`;
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
            let presentacionVideoMesAño = `PresentacionVideos (${inputMes.value}/${2021})`;
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

// Función para desplegar lista al dar click en el boton de la flechita
function listDeploy() {
    let fileYears = document.querySelector(".list-fileYears");
    let btnListDeploy = document.querySelector(".btn-list-deploy");
    btnListDeploy.addEventListener('click', function () {
        fileYears.classList.toggle('active');
    });
};

// Función para seleccionar un año y ponerlo en localStorage
function selectionFileYears() {
    // Dejar puesto el año al cargar el documento de cero
    let datosLocalStorage = localStorage.getItem('selectionFullYears');
    document.querySelector('.input-years-files').value = datosLocalStorage;

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


// Funcion para extraer archivos del localStorage solo si hay un año seleccionado y mostrarlo al usuario
function showFolders() {

    let datosLocalStorageHoras = localStorage.getItem(`Horas (Diciembre/2021)`);
    let datosLocalStorageRevisitas = localStorage.getItem(`Revisitas (Diciembre/2021)`);
    let datosLocalStorageComentarios = localStorage.getItem(`Comentarios (Diciembre/2021)`);
    let datosLocalStoragePublicaciones = localStorage.getItem(`Publicaciones (Diciembre/2021)`);
    let datosLocalStorageCursosBiblicos = localStorage.getItem(`CursosBiblicos (Diciembre/2021)`);
    let datosLocalStoragePresentacionVideos = localStorage.getItem(`PresentacionVideos (Diciembre/2021)`);

    let fileYears = document.querySelector(".list-fileYears").children;
    for (let i = 0; i < fileYears.length; i++) {
        fileYears[i].addEventListener('click', function () {
            filesYears2021();
        });
    }
    // Abrir carpetas de todos los meses del año 2021
    filesYears2021();

    function filesYears2021() {
        if (inputYearsFile.value == '2021') {

            // Si en el localStoragese encuentra esa clave entonces se va a crear una carpeta de enero del 2021 y se va a mostrar al usuario
            if (localStorage.getItem('Horas (Diciembre/2021)') != null) {
                // console.log(localStorage.getItem(`Horas (Enero/2021)`))

                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ HORAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('Horas (Diciembre/2021)') != null) {
                    var datosHora = `<div><h2>Horas:</h2><h1>
                                                            ${datosLocalStorageHoras}
                                                        </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ REVISITAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('Revisitas (Diciembre/2021)') != null) {
                    var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                                    ${datosLocalStorageRevisitas}
                                                                </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ COMENTARIOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('Comentarios (Diciembre/2021)') != null) {
                    var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                                        ${datosLocalStorageComentarios}
                                                                    </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PUBLICACIONES ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('Publicaciones (Diciembre/2021)') != null) {
                    var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                                            ${datosLocalStoragePublicaciones}
                                                                        </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ CURSOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('CursosBiblicos (Diciembre/2021)') != null) {
                    var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                                                ${datosLocalStorageCursosBiblicos}
                                                                            </h1></div>`;
                }
                // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PRESENTACION ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
                if (localStorage.getItem('PresentacionVideos (Diciembre/2021)') != null) {
                    var datosPresentacionVideos = `<div><h2>Presentación Vídeos:</h2><h1>
                                                                                ${datosLocalStoragePresentacionVideos}
                                                                            </h1></div>`;
                }

                let contenedorResultadoDelMes = document.querySelector(".container-foldersMonths");
                contenedorResultadoDelMes.innerHTML = `<div>
                                                            <h3>Diciembre</h3>
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
        }
    }
    // console.log(localStorage.getItem('Comentarios (Diciembre/2021)'));

}





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