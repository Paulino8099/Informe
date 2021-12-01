
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


// Desplegar la lista de los meses del input de "Hoja de Informe" al hacer clic en el boton
document.querySelector(".content-btn-listaMes").addEventListener('click', () => {
    document.querySelector(".lista-mes").classList.toggle('active');
})

// esconder la lista de los meses del input de "Hoja de Informe" al hacer click en cualquiera de los elementos de la lista
let listMesesInforme = document.querySelector(".lista-mes").children;
for (let i = 0; i < listMesesInforme.length; i++) {
    listMesesInforme[i].addEventListener('click', () => {
        document.querySelector(".lista-mes").classList.toggle('active');

    });
}

// Función para alertar al usuario que debe de llenar input correctamente
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
    else if (((inputHoras.value == '') && (inputRevisitas.value == '')) && ((inputComentarios.value == '') && (inputPublicaciones.value == '')) && ((inputCursosBiblicos.value == '') && (inputPresentacionVideos.value == ''))) {
        textAlertPopup.innerHTML = `¡Nada que guardar! <br> Debe de introducir datos.`;
        // Ventana Popup
        ventanaPopup.classList.add("active");
    }
    else {
        false
    }
}

// Función para guardar datos en el localStorage al presionar el botón "guardar"
function btnSaveData() {
    btnGuardar.addEventListener("click", function () {
        guardarDatosLocalStorage();
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


// Función para desplegar lista del input de "Mis Horas" al dar click en el boton
function listDeploy() {
    let btnListDeploy = document.querySelector(".btn-list-deploy");
    btnListDeploy.addEventListener('click', function () {
        // Despliegue de lista de los años de (Mis Horas)
        document.querySelector(".list-fileYears").classList.toggle('active');
        // Es para pegar el pequeño borde del input con la lista
        document.querySelector(".content-seleccionAño").classList.toggle('active');

    });
};

// Desplegar la lista del input de los meses de "Mis Horas"
listDeployFiles();
function listDeployFiles() {
    let btnListMonthFiles = document.querySelector(".btn-list-deployMonth");
    btnListMonthFiles.addEventListener('click', function () {
        // Despliegue de lista de los meses (Mis Horas)
        document.querySelector(".list-month-files").classList.toggle('active');
        // Es para pegar el pequeño borde del input con la lista
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

// Función para guardar el año de "Hoja de Informe" selecionado en el localStorage
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
    let btnListMesInforme = document.querySelector(".content-btn-listaMes")
    const allInput = document.querySelector(".container-servicioCampo").children;
    for (i = 0; i < allInput.length; i++) {
        // lista para activar la pulsacion de la tecla enter al dar click a cualquiera de sus elementos
        let btns = [allInput[i], btnListMesInforme, btnGuardar, inputAño];
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                addEventListener('keyup', function (e) {
                    if (e.keyCode === 13) {
                        guardarDatosLocalStorage();
                        evaluarCamposVacios();
                        // // recorrer todos los elementos de la lista de los meses de la ventana "Informe"
                        // let listaMesesInforme = document.querySelector(".lista-mes")
                        // for (let i = 0; i < listaMesesInforme.length; i++) {
                        //     if (inputAño == listaMesesInforme[i] && inputMes != '') {
                        //         inputHoras.value = '';
                        //         inputRevisitas.value = '';
                        //         inputComentarios.value = '';
                        //         inputPublicaciones.value = '';
                        //         inputCursosBiblicos.value = '';
                        //         inputPresentacionVideos.value = '';
                        //     }
                        // }
                    }
                })
            })
        }
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
// Mostrar archivos de acuerdo a la selección del usuario
function filesFullYears() {
    // Cuando se escuche un click en la lista del input mes de "Mis Horas" se van a actualizar los archivos 
    let listMonth = document.querySelector(".list-month-files").children;
    for (let i = 0; i < listMonth.length; i++) {
        listMonth[i].addEventListener("click", function () {
            SearchFiles();
            // Despliegue de lista de los meses (Mis Horas)
            document.querySelector(".list-month-files").classList.toggle('active');
            // Es para pegar el pequeño borde del input con la lista
            document.querySelector(".content-selectionMes").classList.toggle('active');
            // boton para borrar alrchivos seleccionados del localStorage
            btnDeleteFiles();
        });
    };

    // Cuando se escuche un click en la lita del input año de "Mis Horas" se van a actualizar los archivos
    let fileYears = document.querySelector(".list-fileYears").children;
    for (let i = 0; i < fileYears.length; i++) {
        fileYears[i].addEventListener('click', function () {
            SearchFiles();
            // Despliegue de lista de los años de (Mis Horas)
            document.querySelector(".list-fileYears").classList.toggle('active');
            // Es para pegar el pequeño borde del input con la lista
            document.querySelector(".content-seleccionAño").classList.toggle('active');
        });
    };
};


// boton para borrar alrchivos seleccionados del localStorage
function btnDeleteFiles() {
    // Buscar todos los hijos contenedor
    let filesChildren = document.querySelector('.container-foldersMonths').children;
    for (let i = 0; i < filesChildren.length; i++) {
        // accediendo a todos los div del contenedor
        let filesChildren1 = filesChildren[i].children[1].children;
        // accediendo al último div de todos los div encontrados en el contenedor
        let ultimoDiv = filesChildren1[filesChildren1.length - 1].children;
        // acceso al boton "eliminar" del último div del contenedor
        let btnDelete = ultimoDiv[0];

        btnDelete.addEventListener('click', function () {

            activarPopupMisHoras();
        });
    };
};

desactivarPopupMisHoras();
function desactivarPopupMisHoras() {
    let btnCancelarPopupMisHoras = document.querySelector('.btnCancelar-popup-misHoras');
    // desactivar la ventana popup para confirmar borrar la carpeta
    btnCancelarPopupMisHoras.addEventListener('click', function () {
        let popupMisHoras = document.querySelector('.container-popupFiles');
        popupMisHoras.classList.remove('active');
    });
};

function activarPopupMisHoras() {
    let popupMisHoras = document.querySelector('.container-popupFiles');
    let btnAceptarPopupMisHoras = document.querySelector('.btnAceptar-popup-misHoras');

    // activar la ventana popup para confirmar borrar la carpeta
    popupMisHoras.classList.add('active');
    // borrar carpeta seleccionada y desactivar popup
    btnAceptarPopupMisHoras.addEventListener('click', () => {
        popupMisHoras.classList.remove('active');
        deleteFiles();
        btnDeleteFiles();
    });
};


// buscando todos los archivos que hay en el localStorage
function SearchFiles() {
    let settingsMisHoras = `
                                <div class="ajustes-misHoras">
                                    <button class="btn-eliminar-misHoras">Eliminar</button>
                                    <button class="btn-editar-misHoras">Editar</button>
                                    <button class="btn-verMas-misHoras">Ver Mas</button>
                                </div>`;
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
        if (localStorage.getItem(`Horas (Diciembre/2021)`) != null) {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                ${localStorage.getItem(`Horas (Diciembre/2021)`)}
                                            </h1></div>`;
        } else {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ REVISITAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Revisitas (Diciembre/2021)`) != null) {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    ${localStorage.getItem(`Revisitas (Diciembre/2021)`)}
                                                </h1></div>`;
        } else {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ COMENTARIOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Comentarios (Diciembre/2021)`) != null) {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                        ${localStorage.getItem(`Comentarios (Diciembre/2021)`)}
                                                        </h1></div>`;
        } else {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PUBLICACIONES ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Publicaciones (Diciembre/2021)`) != null) {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                        ${localStorage.getItem(`Publicaciones (Diciembre/2021)`)}
                                                    </h1></div>`;
        } else {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ CURSOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`CursosBiblicos (Diciembre/2021)`) != null) {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                        ${localStorage.getItem(`CursosBiblicos (Diciembre/2021)`)}
                                                    </h1></div>`;
        } else {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PRESENTACION ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`PresentacionVideos (Diciembre/2021)`) != null) {
            var datosPresentacionVideos = `<div><h2>Presentación Vídeos:</h2><h1>
                                                        ${localStorage.getItem(`PresentacionVideos (Diciembre/2021)`)}
                                                    </h1></div>`;
        } else {
            var datosPresentacionVideos = `<div><h2>Presentación de videos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        contenedorResultadoDelMes.innerHTML = `<div>
                                                    <h3>Diciembre 2021</h3>
                                                    <div>
                                                        ${datosHora}
                                                        ${datosRevisitas}
                                                        ${datosComentarios}
                                                        ${datosPublicaciones}
                                                        ${datosCursosBiblicos}
                                                        ${datosPresentacionVideos}
                                                        ${settingsMisHoras}
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
        if (localStorage.getItem(`Horas (Enero/2022)`) != null) {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                ${localStorage.getItem(`Horas (Enero/2022)`)}
                                            </h1></div>`;
        } else {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ REVISITAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Revisitas (Enero/2022)`) != null) {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    ${localStorage.getItem(`Revisitas (Enero/2022)`)}
                                                </h1></div>`;
        } else {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ COMENTARIOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Comentarios (Enero/2022)`) != null) {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                        ${localStorage.getItem(`Comentarios (Enero/2022)`)}
                                                        </h1></div>`;
        } else {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PUBLICACIONES ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Publicaciones (Enero/2022)`) != null) {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                        ${localStorage.getItem(`Publicaciones (Enero/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ CURSOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`CursosBiblicos (Enero/2022)`) != null) {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                        ${localStorage.getItem(`CursosBiblicos (Enero/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PRESENTACION ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`PresentacionVideos (Enero/2022)`) != null) {
            var datosPresentacionVideos = `<div><h2>Presentación Vídeos:</h2><h1>
                                                        ${localStorage.getItem(`PresentacionVideos (Enero/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosPresentacionVideos = `<div><h2>Presentación de videos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        contenedorResultadoDelMes.innerHTML = `<div>
                                                    <h3>Enero 2022</h3>
                                                    <div>
                                                        ${datosHora}
                                                        ${datosRevisitas}
                                                        ${datosComentarios}
                                                        ${datosPublicaciones}
                                                        ${datosCursosBiblicos}
                                                        ${datosPresentacionVideos}
                                                        ${settingsMisHoras}
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
    else if (inputMesMisHoras.value == 'Febrero' && inputYearsMisHoras.value == '2022') {
        // Si en el localStorage se encuentra esa clave entonces se va a crear una carpeta de enero del 2021 y se va a mostrar al usuario
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ HORAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Horas (Febrero/2022)`) != null) {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                ${localStorage.getItem(`Horas (Febrero/2022)`)}
                                            </h1></div>`;
        } else {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ REVISITAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Revisitas (Febrero/2022)`) != null) {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    ${localStorage.getItem(`Revisitas (Febrero/2022)`)}
                                                </h1></div>`;
        } else {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ COMENTARIOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Comentarios (Febrero/2022)`) != null) {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                        ${localStorage.getItem(`Comentarios (Febrero/2022)`)}
                                                        </h1></div>`;
        } else {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PUBLICACIONES ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Publicaciones (Febrero/2022)`) != null) {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                        ${localStorage.getItem(`Publicaciones (Febrero/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ CURSOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`CursosBiblicos (Febrero/2022)`) != null) {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                        ${localStorage.getItem(`CursosBiblicos (Febrero/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PRESENTACION ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`PresentacionVideos (Febrero/2022)`) != null) {
            var datosPresentacionVideos = `<div><h2>Presentación Vídeos:</h2><h1>
                                                        ${localStorage.getItem(`PresentacionVideos (Febrero/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosPresentacionVideos = `<div><h2>Presentación de videos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        contenedorResultadoDelMes.innerHTML = `<div>
                                                    <h3>Febrero 2022</h3>
                                                    <div>
                                                        ${datosHora}
                                                        ${datosRevisitas}
                                                        ${datosComentarios}
                                                        ${datosPublicaciones}
                                                        ${datosCursosBiblicos}
                                                        ${datosPresentacionVideos}
                                                        ${settingsMisHoras}
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
    else if (inputMesMisHoras.value == 'Marzo' && inputYearsMisHoras.value == '2022') {
        // Si en el localStorage se encuentra esa clave entonces se va a crear una carpeta de enero del 2021 y se va a mostrar al usuario
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ HORAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Horas (Marzo/2022)`) != null) {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                ${localStorage.getItem(`Horas (Marzo/2022)`)}
                                            </h1></div>`;
        } else {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ REVISITAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Revisitas (Marzo/2022)`) != null) {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    ${localStorage.getItem(`Revisitas (Marzo/2022)`)}
                                                </h1></div>`;
        } else {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ COMENTARIOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Comentarios (Marzo/2022)`) != null) {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                        ${localStorage.getItem(`Comentarios (Marzo/2022)`)}
                                                        </h1></div>`;
        } else {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PUBLICACIONES ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Publicaciones (Marzo/2022)`) != null) {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                        ${localStorage.getItem(`Publicaciones (Marzo/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ CURSOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`CursosBiblicos (Marzo/2022)`) != null) {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                        ${localStorage.getItem(`CursosBiblicos (Marzo/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PRESENTACION ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`PresentacionVideos (Marzo/2022)`) != null) {
            var datosPresentacionVideos = `<div><h2>Presentación Vídeos:</h2><h1>
                                                        ${localStorage.getItem(`PresentacionVideos (Marzo/2021)`)}
                                                    </h1></div>`;
        } else {
            var datosPresentacionVideos = `<div><h2>Presentación de videos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        contenedorResultadoDelMes.innerHTML = `<div>
                                                    <h3>Marzo 2022</h3>
                                                    <div>
                                                        ${datosHora}
                                                        ${datosRevisitas}
                                                        ${datosComentarios}
                                                        ${datosPublicaciones}
                                                        ${datosCursosBiblicos}
                                                        ${datosPresentacionVideos}
                                                        ${settingsMisHoras}
                                                    </div>
                                                </div>`;
    }
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Abril¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Abril¦¦¦¦¦¦¦¦¦Abril¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Abril¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Abril¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Abril¦¦¦¦¦¦¦¦¦Abril¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Abril¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    else if (inputMesMisHoras.value == 'Abril' && inputYearsMisHoras.value == '2022') {
        // Si en el localStorage se encuentra esa clave entonces se va a crear una carpeta de enero del 2021 y se va a mostrar al usuario
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ HORAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Horas (Abril/2022)`) != null) {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                ${localStorage.getItem(`Horas (Abril/2022)`)}
                                            </h1></div>`;
        } else {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ REVISITAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Revisitas (Abril/2022)`) != null) {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    ${localStorage.getItem(`Revisitas (Abril/2022)`)}
                                                </h1></div>`;
        } else {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ COMENTARIOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Comentarios (Abril/2022)`) != null) {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                        ${localStorage.getItem(`Comentarios (Abril/2022)`)}
                                                        </h1></div>`;
        } else {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PUBLICACIONES ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Publicaciones (Abril/2022)`) != null) {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                        ${localStorage.getItem(`Publicaciones (Abril/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ CURSOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`CursosBiblicos (Abril/2022)`) != null) {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                        ${localStorage.getItem(`CursosBiblicos (Abril/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PRESENTACION ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`PresentacionVideos (Abril/2022)`) != null) {
            var datosPresentacionVideos = `<div><h2>Presentación Vídeos:</h2><h1>
                                                        ${localStorage.getItem(`PresentacionVideos (Abril/2021)`)}
                                                    </h1></div>`;
        } else {
            var datosPresentacionVideos = `<div><h2>Presentación de videos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        contenedorResultadoDelMes.innerHTML = `<div>
                                                    <h3>Abril 2022</h3>
                                                    <div>
                                                        ${datosHora}
                                                        ${datosRevisitas}
                                                        ${datosComentarios}
                                                        ${datosPublicaciones}
                                                        ${datosCursosBiblicos}
                                                        ${datosPresentacionVideos}
                                                        ${settingsMisHoras}
                                                    </div>
                                                </div>`;
    }
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Mayo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Mayo¦¦¦¦¦¦¦¦¦Mayo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Mayo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Mayo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Mayo¦¦¦¦¦¦¦¦¦Mayo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Mayo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    else if (inputMesMisHoras.value == 'Mayo' && inputYearsMisHoras.value == '2022') {
        // Si en el localStorage se encuentra esa clave entonces se va a crear una carpeta de enero del 2021 y se va a mostrar al usuario
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ HORAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Horas (Mayo/2022)`) != null) {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                ${localStorage.getItem(`Horas (Mayo/2022)`)}
                                            </h1></div>`;
        } else {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ REVISITAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Revisitas (Mayo/2022)`) != null) {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    ${localStorage.getItem(`Revisitas (Mayo/2022)`)}
                                                </h1></div>`;
        } else {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ COMENTARIOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Comentarios (Mayo/2022)`) != null) {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                        ${localStorage.getItem(`Comentarios (Mayo/2022)`)}
                                                        </h1></div>`;
        } else {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PUBLICACIONES ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Publicaciones (Mayo/2022)`) != null) {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                        ${localStorage.getItem(`Publicaciones (Mayo/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ CURSOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`CursosBiblicos (Mayo/2022)`) != null) {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                        ${localStorage.getItem(`CursosBiblicos (Mayo/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PRESENTACION ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`PresentacionVideos (Mayo/2022)`) != null) {
            var datosPresentacionVideos = `<div><h2>Presentación Vídeos:</h2><h1>
                                                        ${localStorage.getItem(`PresentacionVideos (Mayo/2021)`)}
                                                    </h1></div>`;
        } else {
            var datosPresentacionVideos = `<div><h2>Presentación de videos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        contenedorResultadoDelMes.innerHTML = `<div>
                                                    <h3>Mayo 2022</h3>
                                                    <div>
                                                        ${datosHora}
                                                        ${datosRevisitas}
                                                        ${datosComentarios}
                                                        ${datosPublicaciones}
                                                        ${datosCursosBiblicos}
                                                        ${datosPresentacionVideos}
                                                        ${settingsMisHoras}
                                                    </div>
                                                </div>`;
    }
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Junio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Junio¦¦¦¦¦¦¦¦¦Junio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Junio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Junio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Junio¦¦¦¦¦¦¦¦¦Junio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Junio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    else if (inputMesMisHoras.value == 'Junio' && inputYearsMisHoras.value == '2022') {
        // Si en el localStorage se encuentra esa clave entonces se va a crear una carpeta de enero del 2021 y se va a mostrar al usuario
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ HORAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Horas (Junio/2022)`) != null) {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                ${localStorage.getItem(`Horas (Junio/2022)`)}
                                            </h1></div>`;
        } else {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ REVISITAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Revisitas (Junio/2022)`) != null) {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    ${localStorage.getItem(`Revisitas (Junio/2022)`)}
                                                </h1></div>`;
        } else {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ COMENTARIOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Comentarios (Junio/2022)`) != null) {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                        ${localStorage.getItem(`Comentarios (Junio/2022)`)}
                                                        </h1></div>`;
        } else {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PUBLICACIONES ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Publicaciones (Junio/2022)`) != null) {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                        ${localStorage.getItem(`Publicaciones (Junio/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ CURSOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`CursosBiblicos (Junio/2022)`) != null) {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                        ${localStorage.getItem(`CursosBiblicos (Junio/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PRESENTACION ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`PresentacionVideos (Junio/2022)`) != null) {
            var datosPresentacionVideos = `<div><h2>Presentación Vídeos:</h2><h1>
                                                        ${localStorage.getItem(`PresentacionVideos (Junio/2021)`)}
                                                    </h1></div>`;
        } else {
            var datosPresentacionVideos = `<div><h2>Presentación de videos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        contenedorResultadoDelMes.innerHTML = `<div>
                                                    <h3>Junio 2022</h3>
                                                    <div>
                                                        ${datosHora}
                                                        ${datosRevisitas}
                                                        ${datosComentarios}
                                                        ${datosPublicaciones}
                                                        ${datosCursosBiblicos}
                                                        ${datosPresentacionVideos}
                                                        ${settingsMisHoras}
                                                    </div>
                                                </div>`;
    }
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Julio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Julio¦¦¦¦¦¦¦¦¦Julio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Julio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Julio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Julio¦¦¦¦¦¦¦¦¦Julio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Julio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    else if (inputMesMisHoras.value == 'Julio' && inputYearsMisHoras.value == '2022') {
        // Si en el localStorage se encuentra esa clave entonces se va a crear una carpeta de enero del 2021 y se va a mostrar al usuario
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ HORAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Horas (Julio/2022)`) != null) {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                ${localStorage.getItem(`Horas (Julio/2022)`)}
                                            </h1></div>`;
        } else {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ REVISITAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Revisitas (Julio/2022)`) != null) {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    ${localStorage.getItem(`Revisitas (Julio/2022)`)}
                                                </h1></div>`;
        } else {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ COMENTARIOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Comentarios (Julio/2022)`) != null) {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                        ${localStorage.getItem(`Comentarios (Julio/2022)`)}
                                                        </h1></div>`;
        } else {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PUBLICACIONES ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Publicaciones (Julio/2022)`) != null) {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                        ${localStorage.getItem(`Publicaciones (Julio/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ CURSOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`CursosBiblicos (Julio/2022)`) != null) {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                        ${localStorage.getItem(`CursosBiblicos (Julio/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PRESENTACION ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`PresentacionVideos (Julio/2022)`) != null) {
            var datosPresentacionVideos = `<div><h2>Presentación Vídeos:</h2><h1>
                                                        ${localStorage.getItem(`PresentacionVideos (Julio/2021)`)}
                                                    </h1></div>`;
        } else {
            var datosPresentacionVideos = `<div><h2>Presentación de videos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        contenedorResultadoDelMes.innerHTML = `<div>
                                                    <h3>Julio 2022</h3>
                                                    <div>
                                                        ${datosHora}
                                                        ${datosRevisitas}
                                                        ${datosComentarios}
                                                        ${datosPublicaciones}
                                                        ${datosCursosBiblicos}
                                                        ${datosPresentacionVideos}
                                                        ${settingsMisHoras}
                                                    </div>
                                                </div>`;
    }
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Agosto¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Agosto¦¦¦¦¦¦¦¦¦Agosto¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Agosto¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Agosto¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Agosto¦¦¦¦¦¦¦¦¦Agosto¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Agosto¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    else if (inputMesMisHoras.value == 'Agosto' && inputYearsMisHoras.value == '2022') {
        // Si en el localStorage se encuentra esa clave entonces se va a crear una carpeta de enero del 2021 y se va a mostrar al usuario
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ HORAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Horas (Agosto/2022)`) != null) {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                ${localStorage.getItem(`Horas (Agosto/2022)`)}
                                            </h1></div>`;
        } else {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ REVISITAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Revisitas (Agosto/2022)`) != null) {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    ${localStorage.getItem(`Revisitas (Agosto/2022)`)}
                                                </h1></div>`;
        } else {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ COMENTARIOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Comentarios (Agosto/2022)`) != null) {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                        ${localStorage.getItem(`Comentarios (Agosto/2022)`)}
                                                        </h1></div>`;
        } else {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PUBLICACIONES ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Publicaciones (Agosto/2022)`) != null) {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                        ${localStorage.getItem(`Publicaciones (Agosto/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ CURSOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`CursosBiblicos (Agosto/2022)`) != null) {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                        ${localStorage.getItem(`CursosBiblicos (Agosto/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PRESENTACION ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`PresentacionVideos (Agosto/2022)`) != null) {
            var datosPresentacionVideos = `<div><h2>Presentación Vídeos:</h2><h1>
                                                        ${localStorage.getItem(`PresentacionVideos (Agosto/2021)`)}
                                                    </h1></div>`;
        } else {
            var datosPresentacionVideos = `<div><h2>Presentación de videos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        contenedorResultadoDelMes.innerHTML = `<div>
                                                    <h3>Agosto 2022</h3>
                                                    <div>
                                                        ${datosHora}
                                                        ${datosRevisitas}
                                                        ${datosComentarios}
                                                        ${datosPublicaciones}
                                                        ${datosCursosBiblicos}
                                                        ${datosPresentacionVideos}
                                                        ${settingsMisHoras}
                                                    </div>
                                                </div>`;
    }
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Septiembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Septiembre¦¦¦¦¦¦¦¦¦Septiembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Septiembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Septiembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Septiembre¦¦¦¦¦¦¦¦¦Septiembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Septiembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    else if (inputMesMisHoras.value == 'Septiembre' && inputYearsMisHoras.value == '2022') {
        // Si en el localStorage se encuentra esa clave entonces se va a crear una carpeta de enero del 2021 y se va a mostrar al usuario
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ HORAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Horas (Septiembre/2022)`) != null) {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                ${localStorage.getItem(`Horas (Septiembre/2022)`)}
                                            </h1></div>`;
        } else {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ REVISITAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Revisitas (Septiembre/2022)`) != null) {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    ${localStorage.getItem(`Revisitas (Septiembre/2022)`)}
                                                </h1></div>`;
        } else {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ COMENTARIOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Comentarios (Septiembre/2022)`) != null) {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                        ${localStorage.getItem(`Comentarios (Septiembre/2022)`)}
                                                        </h1></div>`;
        } else {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PUBLICACIONES ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Publicaciones (Septiembre/2022)`) != null) {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                        ${localStorage.getItem(`Publicaciones (Septiembre/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ CURSOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`CursosBiblicos (Septiembre/2022)`) != null) {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                        ${localStorage.getItem(`CursosBiblicos (Septiembre/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PRESENTACION ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`PresentacionVideos (Septiembre/2022)`) != null) {
            var datosPresentacionVideos = `<div><h2>Presentación Vídeos:</h2><h1>
                                                        ${localStorage.getItem(`PresentacionVideos (Septiembre/2021)`)}
                                                    </h1></div>`;
        } else {
            var datosPresentacionVideos = `<div><h2>Presentación de videos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        contenedorResultadoDelMes.innerHTML = `<div>
                                                    <h3>Septiembre 2022</h3>
                                                    <div>
                                                        ${datosHora}
                                                        ${datosRevisitas}
                                                        ${datosComentarios}
                                                        ${datosPublicaciones}
                                                        ${datosCursosBiblicos}
                                                        ${datosPresentacionVideos}
                                                        ${settingsMisHoras}
                                                    </div>
                                                </div>`;
    }
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Octubre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Octubre¦¦¦¦¦¦¦¦¦Octubre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Octubre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Octubre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Octubre¦¦¦¦¦¦¦¦¦Octubre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Octubre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    else if (inputMesMisHoras.value == 'Octubre' && inputYearsMisHoras.value == '2022') {
        // Si en el localStorage se encuentra esa clave entonces se va a crear una carpeta de enero del 2021 y se va a mostrar al usuario
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ HORAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Horas (Octubre/2022)`) != null) {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                ${localStorage.getItem(`Horas (Octubre/2022)`)}
                                            </h1></div>`;
        } else {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ REVISITAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Revisitas (Octubre/2022)`) != null) {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    ${localStorage.getItem(`Revisitas (Octubre/2022)`)}
                                                </h1></div>`;
        } else {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ COMENTARIOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Comentarios (Octubre/2022)`) != null) {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                        ${localStorage.getItem(`Comentarios (Octubre/2022)`)}
                                                        </h1></div>`;
        } else {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PUBLICACIONES ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Publicaciones (Octubre/2022)`) != null) {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                        ${localStorage.getItem(`Publicaciones (Octubre/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ CURSOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`CursosBiblicos (Octubre/2022)`) != null) {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                        ${localStorage.getItem(`CursosBiblicos (Octubre/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PRESENTACION ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`PresentacionVideos (Octubre/2022)`) != null) {
            var datosPresentacionVideos = `<div><h2>Presentación Vídeos:</h2><h1>
                                                        ${localStorage.getItem(`PresentacionVideos (Octubre/2021)`)}
                                                    </h1></div>`;
        } else {
            var datosPresentacionVideos = `<div><h2>Presentación de videos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        contenedorResultadoDelMes.innerHTML = `<div>
                                                    <h3>Octubre 2022</h3>
                                                    <div>
                                                        ${datosHora}
                                                        ${datosRevisitas}
                                                        ${datosComentarios}
                                                        ${datosPublicaciones}
                                                        ${datosCursosBiblicos}
                                                        ${datosPresentacionVideos}
                                                        ${settingsMisHoras}
                                                    </div>
                                                </div>`;
    }
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Noviembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Noviembre¦¦¦¦¦¦¦¦¦Noviembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Noviembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Noviembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Noviembre¦¦¦¦¦¦¦¦¦Noviembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Noviembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    else if (inputMesMisHoras.value == 'Noviembre' && inputYearsMisHoras.value == '2022') {
        // Si en el localStorage se encuentra esa clave entonces se va a crear una carpeta de enero del 2021 y se va a mostrar al usuario
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ HORAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Horas (Noviembre/2022)`) != null) {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                ${localStorage.getItem(`Horas (Noviembre/2022)`)}
                                            </h1></div>`;
        } else {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ REVISITAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Revisitas (Noviembre/2022)`) != null) {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    ${localStorage.getItem(`Revisitas (Noviembre/2022)`)}
                                                </h1></div>`;
        } else {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ COMENTARIOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Comentarios (Noviembre/2022)`) != null) {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                        ${localStorage.getItem(`Comentarios (Noviembre/2022)`)}
                                                        </h1></div>`;
        } else {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PUBLICACIONES ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Publicaciones (Noviembre/2022)`) != null) {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                        ${localStorage.getItem(`Publicaciones (Noviembre/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ CURSOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`CursosBiblicos (Noviembre/2022)`) != null) {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                        ${localStorage.getItem(`CursosBiblicos (Noviembre/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PRESENTACION ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`PresentacionVideos (Noviembre/2022)`) != null) {
            var datosPresentacionVideos = `<div><h2>Presentación Vídeos:</h2><h1>
                                                        ${localStorage.getItem(`PresentacionVideos (Noviembre/2021)`)}
                                                    </h1></div>`;
        } else {
            var datosPresentacionVideos = `<div><h2>Presentación de videos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        contenedorResultadoDelMes.innerHTML = `<div>
                                                    <h3>Noviembre 2022</h3>
                                                    <div>
                                                        ${datosHora}
                                                        ${datosRevisitas}
                                                        ${datosComentarios}
                                                        ${datosPublicaciones}
                                                        ${datosCursosBiblicos}
                                                        ${datosPresentacionVideos}
                                                        ${settingsMisHoras}
                                                    </div>
                                                </div>`;
    }
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    else if (inputMesMisHoras.value == 'Diciembre' && inputYearsMisHoras.value == '2022') {
        // Si en el localStorage se encuentra esa clave entonces se va a crear una carpeta de enero del 2021 y se va a mostrar al usuario
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ HORAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Horas (Diciembre/2022)`) != null) {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                ${localStorage.getItem(`Horas (Diciembre/2022)`)}
                                            </h1></div>`;
        } else {
            var datosHora = `<div><h2>Horas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ REVISITAS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Revisitas (Diciembre/2022)`) != null) {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    ${localStorage.getItem(`Revisitas (Diciembre/2022)`)}
                                                </h1></div>`;
        } else {
            var datosRevisitas = `<div><h2>Revisitas:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ COMENTARIOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Comentarios (Diciembre/2022)`) != null) {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                        ${localStorage.getItem(`Comentarios (Diciembre/2022)`)}
                                                        </h1></div>`;
        } else {
            var datosComentarios = `<div><h2>Comentarios:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PUBLICACIONES ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`Publicaciones (Diciembre/2022)`) != null) {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                        ${localStorage.getItem(`Publicaciones (Diciembre/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosPublicaciones = `<div><h2>Publicaciones:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ CURSOS ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`CursosBiblicos (Diciembre/2022)`) != null) {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                        ${localStorage.getItem(`CursosBiblicos (Diciembre/2022)`)}
                                                    </h1></div>`;
        } else {
            var datosCursosBiblicos = `<div><h2>Cursos Bíblicos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        // ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ PRESENTACION ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
        if (localStorage.getItem(`PresentacionVideos (Diciembre/2022)`) != null) {
            var datosPresentacionVideos = `<div><h2>Presentación Vídeos:</h2><h1>
                                                        ${localStorage.getItem(`PresentacionVideos (Diciembre/2021)`)}
                                                    </h1></div>`;
        } else {
            var datosPresentacionVideos = `<div><h2>Presentación de videos:</h2><h1>
                                                    0
                                                </h1></div>`;
        }
        contenedorResultadoDelMes.innerHTML = `<div>
                                                    <h3>Diciembre 2022</h3>
                                                    <div>
                                                        ${datosHora}
                                                        ${datosRevisitas}
                                                        ${datosComentarios}
                                                        ${datosPublicaciones}
                                                        ${datosCursosBiblicos}
                                                        ${datosPresentacionVideos}
                                                        ${settingsMisHoras}
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
};

function deleteFiles() {
    // inputMesMisHoras
    // inputYearsMisHoras
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦2021¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦2021¦¦¦¦¦¦¦¦¦2021¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦2021¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦2021¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦2021¦¦¦¦¦¦¦¦¦2021¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦2021¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    if (inputMesMisHoras.value == 'Diciembre' && inputYearsMisHoras.value == '2021') {
        localStorage.removeItem(`Horas (${inputMesMisHoras.value}/2021)`);
        localStorage.removeItem(`Revisitas (${inputMesMisHoras.value}/2021)`);
        localStorage.removeItem(`Comentarios (${inputMesMisHoras.value}/2021)`);
        localStorage.removeItem(`Publicaciones (${inputMesMisHoras.value}/2021)`);
        localStorage.removeItem(`CursosBiblicos (${inputMesMisHoras.value}/2021)`);
        localStorage.removeItem(`PresentacionVideos (${inputMesMisHoras.value}/2021)`);
    };
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
    if (inputMesMisHoras.value == 'Enero' && inputYearsMisHoras.value == '2022') {
        localStorage.removeItem(`Horas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Revisitas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Comentarios (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Publicaciones (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`CursosBiblicos (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`PresentacionVideos (${inputMesMisHoras.value}/2022)`);
    };
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Febrero¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Febrero¦¦¦¦¦¦¦¦¦Febrero¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Febrero¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Febrero¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Febrero¦¦¦¦¦¦¦¦¦Febrero¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Febrero¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    if (inputMesMisHoras.value == 'Febrero' && inputYearsMisHoras.value == '2022') {
        localStorage.removeItem(`Horas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Revisitas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Comentarios (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Publicaciones (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`CursosBiblicos (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`PresentacionVideos (${inputMesMisHoras.value}/2022)`);
    };
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Marzo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Marzo¦¦¦¦¦¦¦¦¦Marzo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Marzo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Marzo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Marzo¦¦¦¦¦¦¦¦¦Marzo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Marzo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    if (inputMesMisHoras.value == 'Marzo' && inputYearsMisHoras.value == '2022') {
        localStorage.removeItem(`Horas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Revisitas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Comentarios (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Publicaciones (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`CursosBiblicos (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`PresentacionVideos (${inputMesMisHoras.value}/2022)`);
    };
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Abril¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Abril¦¦¦¦¦¦¦¦¦Abril¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Abril¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Abril¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Abril¦¦¦¦¦¦¦¦¦Abril¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Abril¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    if (inputMesMisHoras.value == 'Abril' && inputYearsMisHoras.value == '2022') {
        localStorage.removeItem(`Horas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Revisitas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Comentarios (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Publicaciones (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`CursosBiblicos (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`PresentacionVideos (${inputMesMisHoras.value}/2022)`);
    };
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Mayo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Mayo¦¦¦¦¦¦¦¦¦Mayo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Mayo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Mayo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Mayo¦¦¦¦¦¦¦¦¦Mayo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Mayo¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    if (inputMesMisHoras.value == 'Mayo' && inputYearsMisHoras.value == '2022') {
        localStorage.removeItem(`Horas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Revisitas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Comentarios (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Publicaciones (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`CursosBiblicos (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`PresentacionVideos (${inputMesMisHoras.value}/2022)`);
    };
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Junio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Junio¦¦¦¦¦¦¦¦¦Junio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Junio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Junio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Junio¦¦¦¦¦¦¦¦¦Junio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Junio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    if (inputMesMisHoras.value == 'Junio' && inputYearsMisHoras.value == '2022') {
        localStorage.removeItem(`Horas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Revisitas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Comentarios (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Publicaciones (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`CursosBiblicos (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`PresentacionVideos (${inputMesMisHoras.value}/2022)`);
    };
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Julio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Julio¦¦¦¦¦¦¦¦¦Julio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Julio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Julio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Julio¦¦¦¦¦¦¦¦¦Julio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Julio¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    if (inputMesMisHoras.value == 'Julio' && inputYearsMisHoras.value == '2022') {
        localStorage.removeItem(`Horas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Revisitas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Comentarios (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Publicaciones (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`CursosBiblicos (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`PresentacionVideos (${inputMesMisHoras.value}/2022)`);
    };
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Agosto¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Agosto¦¦¦¦¦¦¦¦¦Agosto¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Agosto¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Agosto¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Agosto¦¦¦¦¦¦¦¦¦Agosto¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Agosto¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    if (inputMesMisHoras.value == 'Agosto' && inputYearsMisHoras.value == '2022') {
        localStorage.removeItem(`Horas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Revisitas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Comentarios (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Publicaciones (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`CursosBiblicos (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`PresentacionVideos (${inputMesMisHoras.value}/2022)`);
    };
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Septiembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Septiembre¦¦¦¦¦¦¦¦¦Septiembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Septiembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Septiembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Septiembre¦¦¦¦¦¦¦¦¦Septiembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Septiembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    if (inputMesMisHoras.value == 'Septiembre' && inputYearsMisHoras.value == '2022') {
        localStorage.removeItem(`Horas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Revisitas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Comentarios (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Publicaciones (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`CursosBiblicos (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`PresentacionVideos (${inputMesMisHoras.value}/2022)`);
    };
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Octubre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Octubre¦¦¦¦¦¦¦¦¦Octubre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Octubre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Octubre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Octubre¦¦¦¦¦¦¦¦¦Octubre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Octubre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    if (inputMesMisHoras.value == 'Octubre' && inputYearsMisHoras.value == '2022') {
        localStorage.removeItem(`Horas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Revisitas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Comentarios (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Publicaciones (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`CursosBiblicos (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`PresentacionVideos (${inputMesMisHoras.value}/2022)`);
    };
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Noviembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Noviembre¦¦¦¦¦¦¦¦¦Noviembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Noviembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Noviembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Noviembre¦¦¦¦¦¦¦¦¦Noviembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Noviembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    if (inputMesMisHoras.value == 'Noviembre' && inputYearsMisHoras.value == '2022') {
        localStorage.removeItem(`Horas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Revisitas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Comentarios (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Publicaciones (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`CursosBiblicos (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`PresentacionVideos (${inputMesMisHoras.value}/2022)`);
    };
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦Diciembre¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    //  ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
    if (inputMesMisHoras.value == 'Diciembre' && inputYearsMisHoras.value == '2022') {
        localStorage.removeItem(`Horas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Revisitas (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Comentarios (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`Publicaciones (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`CursosBiblicos (${inputMesMisHoras.value}/2022)`);
        localStorage.removeItem(`PresentacionVideos (${inputMesMisHoras.value}/2022)`);
    };
    SearchFiles();
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