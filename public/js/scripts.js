"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//* 1.- UBICACIÓN DE ELEMENTOS EN HTML, CONSTANTES Y VARIABLES
//* =============================================================================================
//* 1.1.- Globales
//* ---------------------------------------------------------------------------------------------
var d = document;
var w = window;
var ids = [];
var arrayUsers = [];
var page = 1;
var totalPages = 0;
var moviesForPage = 10; //* ---------------------------------------------------------------------------------------------
//* 1.2.- API OMDB
//* ---------------------------------------------------------------------------------------------

var KEY = '7bdaf2a9';
var DOMAIN = 'http://www.omdbapi.com';
var API_KEY = "/?apikey=".concat(KEY);
var URL_BASE = "".concat(DOMAIN).concat(API_KEY, "&");
var END_POINT_MOVIE = "".concat(URL_BASE, "i=");
var END_POINT_MOVIES = "".concat(URL_BASE, "s=");
var options = {
  method: 'GET',
  'Content-type': 'application/json'
}; //* ---------------------------------------------------------------------------------------------
//* 1.3.- (index.html).
//* ---------------------------------------------------------------------------------------------
//* 1.3.1.- Formuilario Login.
//* ---------------------------------------------------------------------------------------------

var $formLogin = d.getElementById('formLogin');
var $formLoginInputs = d.querySelectorAll('.login-input');
var $formLoginLoader = d.getElementById('login-loader');
var patternUserName = '^([A-Za-z]{6,12})$';
var patternPassword = '^([A-Za-z0-9]{6,8})$'; //* ---------------------------------------------------------------------------------------------
//* ---------------------------------------------------------------------------------------------
//* 1.4.- (search.html).
//* ---------------------------------------------------------------------------------------------
//* 1.4.1.- Search "User" (Bienvenido, Tema, Salir, Icons).
//* ---------------------------------------------------------------------------------------------

var sunIcon = '☀️';
var moonIcon = '🌙';
var $searchUser = d.querySelector('.main-search__user');
var $searchSpan = d.querySelector('.main-search__user__span');
var $searchDivIcon = d.querySelector('.main-search__user__theme__icon');
var $selectors = d.querySelectorAll('[data-light]'); //* ---------------------------------------------------------------------------------------------
//* 1.4.2.- Search "Favorites" (Container, button).
//* ---------------------------------------------------------------------------------------------

var $favoritesDiv = d.querySelector('.main-search__favorites');
var $favoritesButton = d.getElementById('favoritesButton'); //* ---------------------------------------------------------------------------------------------
//* 1.4.3.- Search "Search" (Formulario, input, button, Icon).
//* ---------------------------------------------------------------------------------------------

var $formSearch = d.getElementById('formSearch'); //* ---------------------------------------------------------------------------------------------
//* 1.4.4.- Search "lastSearch" (Container, span Última busqueda).
//* ---------------------------------------------------------------------------------------------

var $lastSearchDiv = d.querySelector('.main-search__lastSearch.none');
var $lastSearchSpan = d.querySelector('.main-search__lastSearch__span'); //* ---------------------------------------------------------------------------------------------
//* 1.4.5.- Search "lastResult" (Container, span resultados de busqueda).
//* ---------------------------------------------------------------------------------------------

var $lastResultDiv = d.querySelector('.main-search__lastResult');
var $lastResultSpan = d.querySelector('.main-search__lastResult__span'); //* ---------------------------------------------------------------------------------------------
//* 1.4.6.- Search "pagination" (Variables, Constantes, Container, label, span).
//* ---------------------------------------------------------------------------------------------

var $paginationDiv = d.querySelector('.main-search__pagination');
var $paginationLabelLast = d.querySelector('.main-search__pagination__last');
var $paginationLabelNext = d.querySelector('.main-search__pagination__next');
var $paginationSpan = d.querySelector('.main-search__pagination__span'); //* ---------------------------------------------------------------------------------------------
//* 1.4.7.- Search "Loader" (Container Loader).
//* ---------------------------------------------------------------------------------------------

var $divSearchLoader = d.getElementById('search-loader'); //* ---------------------------------------------------------------------------------------------
//* 1.4.8.- Search "Movies" (Contenedor Peliculas, star icon).
//* ---------------------------------------------------------------------------------------------

var star = '⭐';
var $moviesDiv = d.getElementById('moviesDiv'); //* ---------------------------------------------------------------------------------------------
//* 1.4.9.- Ventana Modal "Movies" (Container).
//* ---------------------------------------------------------------------------------------------

var $modalMovies = d.getElementById('modalMovies'); //* ---------------------------------------------------------------------------------------------
//* 1.4.10.- Scroll Top Button
//* ---------------------------------------------------------------------------------------------

var $scrollTopButton = d.querySelector('.scroll-top-btn'); //* ---------------------------------------------------------------------------------------------
//* 1.5.- (favorites.html).
//* ---------------------------------------------------------------------------------------------
//* 1.5.1.- Elementos de "Favorites" (button, span, loader, Container Movies).
//* ---------------------------------------------------------------------------------------------

var $favoritesButtonHome = d.getElementById('favoritesButtonHome');
var $favoritesSpan = d.getElementById('favoritesSpan');
var $favoritesLoader = d.getElementById('favorites-loader');
var $favoritesMoviesContainer = d.getElementById('favoritesMoviesContainer'); //* ---------------------------------------------------------------------------------------------
//* ---------------------------------------------------------------------------------------------
//* 1.6.- Mensajes de Error
//* ---------------------------------------------------------------------------------------------
//* 1.6.1.- Search
//* ---------------------------------------------------------------------------------------------

var $errorMessageContainerSearch = d.querySelector('.main-search__errorMessages'); //* ---------------------------------------------------------------------------------------------
//* 1.6.2.- Favorites
//* ---------------------------------------------------------------------------------------------

var $errorMessageContainerFavorites = d.querySelector('.main-favorites__errorMessages'); //* ---------------------------------------------------------------------------------------------
//* ---------------------------------------------------------------------------------------------
//* =============================================================================================
//* /////////////////////////////////////////////////////////////////////////////////////////////
//* 2.- FUNCIONES
//* =============================================================================================
//* 2.1.- FUNCIONES UTILITARIAS
//* *********************************************************************************************
//* 2.1.1.- FUNCIÓN QUE VALIDA EL STATUS DE LA CONEXIÓN DE RED
//* ---------------------------------------------------------------------------------------------

var networkStatus = () => {
  var $containerNetworkStatus = d.createElement('div');
  var $footer = d.querySelector('.footer');
  var isOnLine = window.navigator.onLine;

  if (isOnLine) {
    $containerNetworkStatus.textContent = 'nuevamente conectado';
    $containerNetworkStatus.classList.add('onLine');
    $containerNetworkStatus.classList.remove('offLine');
    setTimeout(() => {
      w.location.reload();
    }, 5000);
  } else {
    $containerNetworkStatus.textContent = 'sin conexión';
    $containerNetworkStatus.classList.add('offLine');
    $containerNetworkStatus.classList.remove('onLine');
  }

  $footer.insertAdjacentElement('beforeend', $containerNetworkStatus);
  setTimeout(() => {
    $containerNetworkStatus.textContent = '';
    $containerNetworkStatus.classList.remove('onLine');
    $containerNetworkStatus.classList.remove('offLine');
  }, 5000);
}; //* ---------------------------------------------------------------------------------------------
//* 2.1.2.- FUNCIÓN QUE MANEJA EL BOTÓN DE SCROLL TOP
//* ---------------------------------------------------------------------------------------------


var scrollTopButton = () => {
  window.addEventListener('scroll', event => {
    event.preventDefault();
    var scrollTop = window.pageYOffset || d.documentElement.scrollTop;

    if (scrollTop > 1500) {
      $scrollTopButton.classList.remove('hidden');
    } else {
      $scrollTopButton.classList.add('hidden');
    }
  });
  $scrollTopButton.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    });
  });
}; //* ---------------------------------------------------------------------------------------------
//* 2.1.2.- FUNCIÓN QUE MANEJA LA PAGINACIÓN
//*         * Muestra el número de la página.
//*         * Muestra y oculta botones Last y Next.
//* ---------------------------------------------------------------------------------------------


var pagination = () => {
  $paginationSpan.textContent = page;

  if (page === 1 && totalPages === 1) {
    $paginationDiv.classList.add('none');
  } else if (page === 1 && totalPages > 1) {
    $paginationDiv.classList.remove('none');
    $paginationLabelNext.classList.remove('none');
    $paginationLabelLast.classList.add('none');
  } else if (page > 1 && page < totalPages) {
    $paginationDiv.classList.remove('none');
    $paginationLabelLast.classList.remove('none');
    $paginationLabelNext.classList.remove('none');
  } else if (page > 1 && page >= totalPages) {
    $paginationDiv.classList.remove('none');
    $paginationLabelLast.classList.remove('none');
    $paginationLabelNext.classList.add('none');
  }
}; //* ---------------------------------------------------------------------------------------------
//* *********************************************************************************************
//* 2.2.- FUNCIÓN QUE GENERA UN ID PARA EL USUARIO.
//*       * Genera un id númerico de 13 digitos y comprueba que no se generen ids repetidos.
//* ---------------------------------------------------------------------------------------------


var generateId = () => {
  var id = Math.random().toString(16).substr(2);
  var exists = ids.find(i => i === id);

  if (exists === undefined) {
    ids.push(id);
  } else {
    generateId();
  }

  return id;
}; //* ---------------------------------------------------------------------------------------------
//* 2.3.- FUNCIONES RELACIONADAS AL ENRUTAMIENTO HACIA LAS PAGINAS DE LA APLICACIÓN
//* *********************************************************************************************
//* 2.3.1.- FUNCIÓN QUE DIRIGE USUARIOS AL LOGIN (index.html)
//* ---------------------------------------------------------------------------------------------


var redirectToLogin = () => {
  d.location.href = 'index.html';
}; //* ---------------------------------------------------------------------------------------------
//* 2.3.2.- FUNCIÓN QUE DIRIGE USUARIOS AL SEARCH HOME (search.html)
//* ---------------------------------------------------------------------------------------------


var redirectToSearch = () => {
  d.location.href = 'search.html';
}; //* ---------------------------------------------------------------------------------------------
//* 2.3.3.- FUNCIÓN QUE DIRIGE USUARIOS A FAVORITOS (favorites.html)
//* ---------------------------------------------------------------------------------------------


var redirectToFavorites = () => {
  d.location.href = 'favorites.html';
}; //* ---------------------------------------------------------------------------------------------
//* *********************************************************************************************
//* 2.4.- FUNCIONES RELACIONADAS AL FORMULARIO LOGIN (index.html)
//* *********************************************************************************************
//* 2.4.1.- FUNCIÓN QUE RECIBE LOS DATOS INTRODUCIDOS POR EL USUARIO DE FORMA REACTIVA
//*         * Recive los datos del usuario y realiza una primera validación.
//*         * Informa al usuario sobre el formato requerido de los datos.
//* ---------------------------------------------------------------------------------------------


var formLoginDataUser = () => {
  $formLoginInputs.forEach(input => {
    var $span = d.createElement('span');
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add('form-input-error', 'none');
    input.insertAdjacentElement('afterend', $span);
  });
  d.addEventListener('keyup', e => {
    if (e.target.matches('.login-input')) {
      var {
        name,
        title,
        value
      } = e.target;
      var {
        pattern
      } = e.target;

      if (value === '') {
        d.getElementById(name).classList.add('is-active');

        if (name === 'username') {
          d.getElementById(name).textContent = 'Nombre de usuario requerido';
        } else {
          d.getElementById(name).textContent = 'Contraseña requerida';
        }
      } else {
        d.getElementById(name).textContent = title;
      }

      if (name === 'username' && (!pattern || pattern === '' || pattern !== patternUserName)) {
        pattern = patternUserName; // eslint-disable-next-line no-alert

        alert('Alerta: Posible manipulación inadecuada del html en línea. (username patern)');
        window.location.reload();
      }

      if (name === 'password' && (!pattern || pattern === '' || pattern !== patternPassword)) {
        pattern = patternPassword; // eslint-disable-next-line no-alert

        alert('Alerta: Posible manipulación inadecuada del html en línea. (password patern)');
        window.location.reload();
      }

      if (value.length >= 0) {
        var regexp = new RegExp(pattern);

        if (regexp.exec(value)) {
          d.getElementById(name).classList.remove('is-active');
        } else {
          d.getElementById(name).classList.add('is-active');
        }
      }
    }
  });
}; //* ---------------------------------------------------------------------------------------------
//* 2.4.2.- FUNCIÓN QUE VALIDA LOS DATOS INTRODUCIDOS POR EL USUARIO EN EL FORMULARIO LOGIN
//* ---------------------------------------------------------------------------------------------


var formLoginValidations = () => {
  var $inputUsernameValue = $formLogin.username.value;
  var $inputPasswordValue = $formLogin.password.value;
  var regexpUserName = new RegExp(patternUserName);
  var regexpPassword = new RegExp(patternPassword);
  var response = false;

  if ($inputUsernameValue === '' || $inputPasswordValue === '') {
    response = false; // eslint-disable-next-line max-len
  } else if (!regexpUserName.exec($inputUsernameValue) || !regexpPassword.exec($inputPasswordValue)) {
    response = false;
  } else {
    response = true;
  }

  return response;
}; //* ---------------------------------------------------------------------------------------------
//* *********************************************************************************************
//* 2.5.- FUNCIONES RELACIONADAS AL LOCAL Y SESSION STORAGE
//* *********************************************************************************************
//* 2.5.1.- FUNCIÓN QUE INCLUYE USUARIOS AL LOCALSTORAGE
//* ---------------------------------------------------------------------------------------------


var localStorageAddUsers = () => {
  localStorage.setItem('users', JSON.stringify(arrayUsers));
}; //* ---------------------------------------------------------------------------------------------
//* 2.5.2.- FUNCIÓN QUE INCLUYE USUARIOS AL SESSIONSTORAGE
//* ---------------------------------------------------------------------------------------------


var sessionStorageAddUser = user => {
  sessionStorage.setItem('session', JSON.stringify(user));
}; //* ---------------------------------------------------------------------------------------------
//* 2.5.3.- FUNCIÓN QUE CREA NUEVOS USUARIOS
//*         * Agrega usuarios en el arreglo (arrayUsers).
//*         * Agrega usuarios en el local store (localStorageAddUsers()).
//*         * Agrega usuario en el session storage (sessionStorageAddUser()).
//* ---------------------------------------------------------------------------------------------


var createUser = (name, password) => {
  var user = {
    id: generateId(),
    name,
    password,
    lastSearch: '',
    theme: 'darkmode',
    favorites: []
  };
  arrayUsers.push(user);
  localStorageAddUsers();
  sessionStorageAddUser(user);
}; //* ---------------------------------------------------------------------------------------------
//* 2.5.4.- FUNCION QUE ENTREGA LOS USUARIOS SI EXISTE EN EL LOCAL STORAGE
//* ---------------------------------------------------------------------------------------------


var getLocalStorage = () => JSON.parse(localStorage.getItem('users')); //* ---------------------------------------------------------------------------------------------
//* 2.5.5.- FUNCION QUE ENTREGA LA SESIÓN SI EXISTE EN EL SESSION STORAGE
//* ---------------------------------------------------------------------------------------------


var getSessionStorage = () => JSON.parse(sessionStorage.getItem('session')); //* ---------------------------------------------------------------------------------------------
//* 2.5.6.- FUNCIÓN QUE VALIDA CONSTANTEMENTE SI EXISTE UNA SESIÓN ACTIVA
//* ---------------------------------------------------------------------------------------------
// eslint-disable-next-line no-unused-vars


var sessionValidate = (() => {
  var sessionActive = getSessionStorage();
  var pageLocation = window.location.pathname;

  if ((pageLocation === '/search.html' || pageLocation === '/favorites.html') && !sessionActive) {
    redirectToLogin();
  }
})(); //* ---------------------------------------------------------------------------------------------
//* 2.5.7.- FUNCIÓN QUE SE ENCARGA DE CERRAR SESION DE USUARIO
//*         * Solo elimina del sessionStorage "session", la cual es creada por nosotros
//* ---------------------------------------------------------------------------------------------


var closeSession = () => {
  sessionStorage.removeItem('session');
  redirectToLogin();
}; //* ---------------------------------------------------------------------------------------------
//* 2.5.8.- FUNCIÓN QUE VALIDA USUARIOS EXISTENTES EN EL LOCALSTORAGE
//*         * Si el usuario existe crea la sesión. sessionStorageAddUsers().
//*         * Si el usuario existe valida si tiene un tema seleccionado. validateTheme().
//*         * si el usuario NO existe crea el usuario e inicia la sesión. createUsers().
//* ---------------------------------------------------------------------------------------------


var localStorageValidateUsers = (username, password) => {
  arrayUsers = getLocalStorage();
  var userExist = false;

  if (arrayUsers === null) {
    arrayUsers = [];
  } else {
    arrayUsers.find(user => {
      if (user.name === username && user.password === password) {
        userExist = true;
        sessionStorageAddUser(user);
      } else {
        userExist = false;
      }

      return userExist;
    });
  }

  if (userExist === false) {
    createUser(username, password);
    redirectToSearch();
  } else {
    redirectToSearch();
  }
}; //* ---------------------------------------------------------------------------------------------
//* 2.5.9.- FUNCIÓN QUE INCLUYE LA ÚLTIMA BUSQUEDA EN EL LOCAL Y SESSION STORAGE
//* ---------------------------------------------------------------------------------------------


var setLocalStorageLastSearch = lastSearch => {
  var userID = getSessionStorage().id;
  arrayUsers = getLocalStorage();
  arrayUsers.find(user => {
    var userLS = user;

    if (userLS.id === userID) {
      userLS.lastSearch = lastSearch;
      sessionStorageAddUser(user);
      localStorageAddUsers();
      return true;
    }

    return false;
  });
}; //* ---------------------------------------------------------------------------------------------
//* 2.5.10.- FUNCIÓN QUE REGRESA LA ÚLTIMA BUSQUEDA EN EL LOCAL STORAGE
//* ---------------------------------------------------------------------------------------------


var getLocalStorageLastSearch = () => {
  var userID = getSessionStorage().id;
  arrayUsers = getLocalStorage();
  var lastSearch;
  arrayUsers.find(user => {
    if (user.id === userID) {
      lastSearch = user.lastSearch;
      return true;
    }

    return false;
  });
  return lastSearch;
}; //* ---------------------------------------------------------------------------------------------
//* 2.5.11.- FUNCIÓN VALIDA SI EL USUARIO TIENE FAVORITOS EN EL LOCAL STORAGE
//* ---------------------------------------------------------------------------------------------


var favoritesValidation = () => {
  if (window.location.pathname.includes('/search.html')) {
    var userID = getSessionStorage().id;
    arrayUsers = getLocalStorage();
    arrayUsers.find(user => {
      if (user.id === userID) {
        if (user.favorites.length > 0) {
          $favoritesDiv.classList.remove('none');
          return true;
        }

        $favoritesDiv.classList.add('none');
      }

      return false;
    });
  }
}; //* ---------------------------------------------------------------------------------------------
//* 2.5.12.- FUNCIÓN QUE INCLUYE Y ELIMINA FAVORITOS EN EL LOCAL Y SESSION STORAGE
//*          * Valida si el favorito ya fue agregado o no (Agrega - Elimina).
//*          * Activa o Desactiva el botón de favoritos en el menú principal.
//* ---------------------------------------------------------------------------------------------


var localStorageSetDelFavorites = imdbId => {
  //* Agrega o Elimina favoritos
  //* -----------------------------------------------------------------------------------
  var userID = getSessionStorage().id;
  arrayUsers = getLocalStorage();
  var favorites = {
    imdbId
  };
  arrayUsers.find(user => {
    if (user.id === userID) {
      var indexId = user.favorites.findIndex(favorite => favorite.imdbId === imdbId);

      if (indexId === -1) {
        user.favorites.push(favorites);
      } else {
        user.favorites.splice(indexId, 1);
      }

      sessionStorageAddUser(user);
      localStorageAddUsers();
    }

    return false;
  }); //* -----------------------------------------------------------------------------------
  //* Activa o Desactiva botón de favoritos
  //* -----------------------------------------------------------------------------------

  favoritesValidation(); //* -----------------------------------------------------------------------------------
}; //* ---------------------------------------------------------------------------------------------
//* *********************************************************************************************
//* 2.6.- FUNCIONES RELACIONADAS AL TEMA DE LA APLICACIÓN (LIGHT - DARK).
//* *********************************************************************************************
//* 2.6.1.- FUNCIÓN QUE APLICA EL TEMA (LIGHT)
//* ---------------------------------------------------------------------------------------------


var lightMode = userID => {
  arrayUsers = getLocalStorage();
  $selectors.forEach(ele => ele.classList.add('lightTheme'));

  if (w.location.pathname.includes('/search.html')) {
    $searchDivIcon.textContent = moonIcon;
  }

  arrayUsers.find(user => {
    var userLS = user;

    if (userLS.id === userID) {
      userLS.theme = 'lightmode';
      sessionStorageAddUser(user);
      localStorageAddUsers();
    }

    return false;
  });
}; //* ---------------------------------------------------------------------------------------------
//* 2.6.2.- FUNCIÓN QUE APLICA EL TEMA (DARK)
//* ---------------------------------------------------------------------------------------------


var darkMode = userID => {
  arrayUsers = getLocalStorage();
  $selectors.forEach(ele => ele.classList.remove('lightTheme'));

  if (w.location.pathname.includes('/search.html')) {
    $searchDivIcon.textContent = sunIcon;
  }

  arrayUsers.find(user => {
    var userLS = user;

    if (userLS.id === userID) {
      userLS.theme = 'darkmode';
      sessionStorageAddUser(user);
      localStorageAddUsers();
    }

    return false;
  });
}; //* ---------------------------------------------------------------------------------------------
//* 2.6.3.- FUNCIÓN QUE VALIDA SI EL USUARIO TIENE UN TEMA SELECCIONADO (LIGHT - DARK)
//* ---------------------------------------------------------------------------------------------


var validateTheme = () => {
  var userID = getSessionStorage().id;
  arrayUsers = getLocalStorage();
  arrayUsers.find(user => {
    if (user.id === userID) {
      if (user.theme === 'darkmode') {
        darkMode(userID);
      } else {
        lightMode(userID);
      }
    }

    return false;
  });
}; //* ---------------------------------------------------------------------------------------------
//* *********************************************************************************************
//* 2.7.- FUNCIONES RELACIONADAS AL USO DE LA API DE OMDB
//* *********************************************************************************************
//* 2.7.1.- FUNCIÓN QUE LLAMA A LA API DE OMDB
//* ---------------------------------------------------------------------------------------------


var callApiOmdb = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (apiUrlQuery) {
    var url = apiUrlQuery;
    var response;
    var dataJson;

    try {
      response = yield fetch(url, options);
      dataJson = yield response.json();
    } catch (Error) {
      var ErrorMessage = Error.toString();
      var ErrorCode;
      var messageUser;

      if (ErrorMessage === 'TypeError: Failed to fetch') {
        ErrorCode = '001';
        messageUser = "\n        <p>ERROR CODE: ".concat(ErrorCode, "</p>\n        <p>SIN RESPUESTA DE LA APLICACI\xD3N</p>\n        <p>VALIDE LA CONEXI\xD3N A INTERNET</p>\n      ");
      } else {
        messageUser = "<p>".concat(ErrorMessage, "</p>");
      }

      if ($errorMessageContainerSearch) {
        $errorMessageContainerSearch.innerHTML = messageUser;
      } else if ($errorMessageContainerFavorites) {
        $errorMessageContainerFavorites.innerHTML = messageUser;
      }
    }

    return {
      response,
      dataJson
    };
  });

  return function callApiOmdb(_x) {
    return _ref.apply(this, arguments);
  };
}(); //* ---------------------------------------------------------------------------------------------
//* *********************************************************************************************
//* 2.8.- FUNCIONES RELACIONADAS A MOSTRAR LAS PELICULAS
//* *********************************************************************************************
//* 2.8.1.- MUESTRA LAS PELICULAS BUSCADAS EN "search.html"
//* ---------------------------------------------------------------------------------------------


var showMovies = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (apiUrlQuery) {
    var lastSearch = getLocalStorageLastSearch();
    var $fragment = d.createDocumentFragment();
    var movies;
    var totalMovies = 0;
    $divSearchLoader.classList.remove('none');
    $moviesDiv.classList.add('none');
    $lastSearchDiv.classList.remove('none');
    $lastSearchSpan.textContent = lastSearch;
    $errorMessageContainerSearch.classList.add('none');

    try {
      var {
        dataJson
      } = yield callApiOmdb(apiUrlQuery);
      $divSearchLoader.classList.add('none');
      $moviesDiv.classList.remove('none');

      if (dataJson.Response === 'False') {
        $lastResultDiv.classList.add('none');
        $paginationDiv.classList.add('none');
        throw new Error("".concat(dataJson.Error));
      }

      if (dataJson.Response === 'True' && dataJson.Search) {
        movies = dataJson.Search;
        totalMovies = dataJson.totalResults;
        totalPages = Math.ceil(totalMovies / moviesForPage);
        $lastResultDiv.classList.remove('none');
        $lastResultSpan.textContent = totalMovies;
        $moviesDiv.textContent = ''; //* Pagination
        //* ---------------------------------------------------------------------------------

        pagination(); //* ---------------------------------------------------------------------------------

        movies.forEach(movie => {
          var $movieDiv = d.createElement('div');
          $movieDiv.classList.add('main-search__movies__movie'); //* Botón favoritos
          //* -------------------------------------------------------------------

          var $movieButton = d.createElement('button');
          $movieButton.classList.add('main-search__movies__movie__button'); //* De ser un favorito en LS, coloca el botón amarillo
          //* ---------------------------------------------------------

          var userID = getSessionStorage().id;
          arrayUsers = getLocalStorage();
          arrayUsers.find(user => {
            if (user.id === userID) {
              user.favorites.find(favorite => {
                if (favorite.imdbId === movie.imdbID) {
                  $movieButton.classList.add('movieIsFavorite');
                  $favoritesDiv.classList.remove('none');
                }

                return false;
              });
            }

            return false;
          }); //* ---------------------------------------------------------

          $movieButton.textContent = star;
          $movieButton.setAttribute('data-imdbId', movie.imdbID); //* -------------------------------------------------------------------

          var $movieImage = d.createElement('img');
          $movieImage.classList.add('main-search__movies__movie__image');
          $movieImage.src = movie.Poster !== 'N/A' ? movie.Poster : 'assets/img/no-image.jpg';
          $movieImage.alt = movie.Title ? movie.Title : 'No title';
          $movieImage.setAttribute('data-imdbId', movie.imdbID);
          var $movieSpanTitle = d.createElement('span');
          $movieSpanTitle.classList.add('main-search__movies__movie__spanTitle');
          $movieSpanTitle.textContent = movie.Title ? movie.Title : 'No title';
          var $movieSpanYear = d.createElement('span');
          $movieSpanYear.classList.add('main-search__movies__movie__spanYear');
          $movieSpanYear.textContent = movie.Year ? movie.Year : 'No Year';
          var $movieSpanType = d.createElement('span');
          $movieSpanType.classList.add('main-search__movies__movie__spanType');
          $movieSpanType.textContent = movie.Type ? movie.Type : 'No Type';
          var $movieSpanImdbId = d.createElement('span');
          $movieSpanImdbId.classList.add('main-search__movies__movie__spanImdbId');
          $movieSpanImdbId.setAttribute('data-imdbId', movie.imdbID);
          $movieDiv.appendChild($movieButton);
          $movieDiv.appendChild($movieImage);
          $movieDiv.appendChild($movieSpanTitle);
          $movieDiv.appendChild($movieSpanYear);
          $movieDiv.appendChild($movieSpanType);
          $movieDiv.appendChild($movieSpanImdbId);
          $fragment.appendChild($movieDiv);
        });
        $moviesDiv.appendChild($fragment);
      }
    } catch (Error) {
      var ErrorMessage = Error.toString();
      var ErrorCode;
      var messageUser;

      if (ErrorMessage === 'Error: Movie not found!') {
        messageUser = "\n        <p>Lo sentimos, sin resultados</p>\n        <p>Movie not found!</p>\n      ";
      } else if (ErrorMessage === "TypeError: Cannot read property 'Response' of undefined") {
        ErrorCode = '002';
        messageUser = "\n        <p>ERROR CODE: ".concat(ErrorCode, "</p>\n        <p>SIN DATA NI RESPUESTA DE LA APLICACI\xD3N</p>\n        <p>VALIDE LA CONEXI\xD3N A INTERNET</p>\n      ");
      } else {
        messageUser = "<p>".concat(ErrorMessage, "</p>");
      }

      if (w.location.pathname === '/search.html') {
        $moviesDiv.innerHTML = '';
        $errorMessageContainerSearch.classList.remove('none');
        $errorMessageContainerSearch.innerHTML = '';
        $errorMessageContainerSearch.innerHTML = messageUser;
      }
    }
  });

  return function showMovies(_x2) {
    return _ref2.apply(this, arguments);
  };
}(); //* ---------------------------------------------------------------------------------------------
//* 2.8.2.- MUESTRA DETALLE DE PELICULA EN VENTANA MODAL "search.html"
//* ---------------------------------------------------------------------------------------------


var showMovieModal = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (apiUrlQuery) {
    $divSearchLoader.classList.remove('none');
    var $fragment = d.createDocumentFragment();

    try {
      var {
        dataJson
      } = yield callApiOmdb(apiUrlQuery);
      $divSearchLoader.classList.add('none');
      if (dataJson.Response === 'False') throw new Error("".concat(dataJson.Error));

      if (dataJson.Response === 'True') {
        var $movieDiv = d.createElement('div');
        $movieDiv.classList.add('main-search__modal-movies__movieContent'); //* ---------------------------------------------------------------------------------------

        var $movieDivImgageButton = d.createElement('div');
        $movieDivImgageButton.classList.add('main-search__modal-movies__movieContent__imageButton');
        var $movieImage = d.createElement('img');
        $movieImage.classList.add('main-search__modal-movies__movieContent__imageButton__image');
        $movieImage.src = dataJson.Poster !== 'N/A' ? dataJson.Poster : 'assets/img/no-image.jpg';
        $movieImage.alt = dataJson.Title ? dataJson.Title : 'No title';
        $movieImage.setAttribute('data-imdbId', dataJson.imdbID);
        var $movieButton = d.createElement('button');
        $movieButton.classList.add('main-search__modal-movies__movieContent__imageButton__button'); //* De ser un favorito en LS, coloca el botón amarillo
        //* ---------------------------------------------------------

        var userID = getSessionStorage().id;
        arrayUsers = getLocalStorage();
        arrayUsers.find(user => {
          if (user.id === userID) {
            user.favorites.find(favorite => {
              if (favorite.imdbId === dataJson.imdbID) {
                $movieButton.classList.add('movieIsFavorite');
              }

              return false;
            });
          }

          return false;
        }); //* ---------------------------------------------------------

        $movieButton.textContent = star;
        $movieButton.setAttribute('data-imdbId', dataJson.imdbID);
        $movieDivImgageButton.appendChild($movieImage);
        $movieDivImgageButton.appendChild($movieButton);
        $movieDiv.appendChild($movieDivImgageButton); //* ---------------------------------------------------------------------------------------
        //* ---------------------------------------------------------------------------------------

        var $movieDivInfo = d.createElement('div');
        $movieDivInfo.classList.add('main-search__modal-movies__movieContent__info');
        var $movieSpanTitle = d.createElement('span');
        $movieSpanTitle.classList.add('main-search__modal-movies__movieContent__info__spanTitle');
        $movieSpanTitle.textContent = dataJson.Title ? dataJson.Title : 'No title';
        var $movieSpanYear = d.createElement('span');
        $movieSpanYear.classList.add('main-search__modal-movies__movieContent__info__spanYear');
        $movieSpanYear.textContent = dataJson.Year ? dataJson.Year : 'No Year';
        var $movieSpanType = d.createElement('span');
        $movieSpanType.classList.add('main-search__movies__movie__info__spanType');
        $movieSpanType.textContent = dataJson.Type ? dataJson.Type : 'No Type';
        var $movieSpanRuntime = d.createElement('span');
        $movieSpanRuntime.classList.add('main-search__modal-movies__movieContent__info__spanRuntime');
        $movieSpanRuntime.textContent = dataJson.Runtime ? dataJson.Runtime : 'No Runtime';
        var $movieSpanLanguage = d.createElement('span');
        $movieSpanLanguage.classList.add('main-search__modal-movies__movieContent__info__spanLanguage');
        $movieSpanLanguage.textContent = dataJson.Language ? dataJson.Language : 'No Language';
        var $movieSpanGender = d.createElement('span');
        $movieSpanGender.classList.add('main-search__modal-movies__movieContent__info__spanGender');
        $movieSpanGender.textContent = dataJson.Genre ? dataJson.Genre : 'No Gender';
        var $movieSpanCountry = d.createElement('span');
        $movieSpanCountry.classList.add('main-search__modal-movies__movieContent__info__spanCountry');
        $movieSpanCountry.textContent = dataJson.Country ? dataJson.Country : 'No Country';
        var $movieSpanActors = d.createElement('span');
        $movieSpanActors.classList.add('main-search__modal-movies__movieContent__info__spanActors');
        $movieSpanActors.textContent = dataJson.Actors ? dataJson.Actors : 'No Actors';
        var $movieSpanDirector = d.createElement('span');
        $movieSpanDirector.classList.add('main-search__modal-movies__movieContent__info__spanDirector');
        $movieSpanDirector.textContent = dataJson.Director ? dataJson.Director : 'No Director';
        var $movieSpanPlot = d.createElement('span');
        $movieSpanPlot.classList.add('main-search__modal-movies__movieContent__info__spanPlot');
        $movieSpanPlot.textContent = dataJson.Plot ? dataJson.Plot : 'No Plot';
        $movieDivInfo.appendChild($movieSpanTitle);
        $movieDivInfo.appendChild($movieSpanYear);
        $movieDivInfo.appendChild($movieSpanType);
        $movieDivInfo.appendChild($movieSpanRuntime);
        $movieDivInfo.appendChild($movieSpanLanguage);
        $movieDivInfo.appendChild($movieSpanGender);
        $movieDivInfo.appendChild($movieSpanCountry);
        $movieDivInfo.appendChild($movieSpanActors);
        $movieDivInfo.appendChild($movieSpanDirector);
        $movieDivInfo.appendChild($movieSpanPlot);
        $movieDiv.appendChild($movieDivInfo); //* ---------------------------------------------------------------------------------------

        $fragment.appendChild($movieDiv);
        $modalMovies.innerHTML = '';
        $modalMovies.appendChild($fragment);
      }
    } catch (Error) {
      var ErrorMessage = Error.toString();
      var ErrorCode;
      var messageUser;

      if (ErrorMessage === "TypeError: Cannot read property 'Response' of undefined") {
        ErrorCode = '002';
        messageUser = "\n        <p>ERROR CODE: ".concat(ErrorCode, "</p>\n        <p>SIN DATA NI RESPUESTA DE LA APLICACI\xD3N</p>\n        <p>VALIDE LA CONEXI\xD3N A INTERNET</p>\n      ");
      } else {
        messageUser = "<p>".concat(ErrorMessage, "</p>");
      }

      if ($modalMovies) {
        $modalMovies.innerHTML = '';
        $modalMovies.classList.add('modalErrorMessage');
        $modalMovies.innerHTML = messageUser;
      }
    }
  });

  return function showMovieModal(_x3) {
    return _ref3.apply(this, arguments);
  };
}(); //* ---------------------------------------------------------------------------------------------
//* 2.8.3.- FUNCIÓN QUE MUESTRA LAS PELICULAS EXISTENTES EN FAVORITOS
//*         * Busca en el local storage los favoritos que tenga el usuario
//* ---------------------------------------------------------------------------------------------


var showFavoritesMovies = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* () {
    $favoritesLoader.classList.remove('none');
    $favoritesMoviesContainer.classList.add('none');
    $errorMessageContainerFavorites.classList.add('none');
    var $fragment = d.createDocumentFragment();
    var userID = getSessionStorage().id;
    arrayUsers = getLocalStorage();
    var counter = 0;
    arrayUsers.find(user => {
      if (user.id === userID) {
        if (user.favorites.length > 0) {
          var totalMovies = user.favorites.length;
          $favoritesSpan.textContent = totalMovies;
          user.favorites.forEach( /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator(function* (favorite) {
              counter += 1;
              var {
                imdbId
              } = favorite;
              var apiUrlQuery = "".concat(END_POINT_MOVIE).concat(imdbId);

              try {
                var {
                  dataJson
                } = yield callApiOmdb(apiUrlQuery);
                $favoritesLoader.classList.add('none');
                $favoritesMoviesContainer.classList.remove('none');
                if (dataJson.Response === 'False') throw new Error("".concat(dataJson.Error));
                var $favoriteMovieContainer = d.createElement('div');
                $favoriteMovieContainer.classList.add('main-favorites__moviesContainer__movieContainer');
                var $favoriteMovieButton = d.createElement('button');
                $favoriteMovieButton.classList.add('main-favorites__moviesContainer__movieContainer__button');
                $favoriteMovieButton.classList.add('movieIsFavorite');
                $favoriteMovieButton.textContent = star;
                $favoriteMovieButton.setAttribute('data-imdbId', dataJson.imdbID);
                $favoriteMovieContainer.appendChild($favoriteMovieButton);
                var $favoriteMovieImage = d.createElement('img');
                $favoriteMovieImage.classList.add('main-favorites__moviesContainer__movieContainer__image');
                $favoriteMovieImage.src = dataJson.Poster !== 'N/A' ? dataJson.Poster : 'assets/img/no-image.jpg';
                $favoriteMovieImage.alt = dataJson.Title ? dataJson.Title : 'No title';
                $favoriteMovieImage.setAttribute('data-imdbId', dataJson.imdbID);
                $favoriteMovieContainer.appendChild($favoriteMovieImage);
                var $favoriteMovieSpanTitle = d.createElement('span');
                $favoriteMovieSpanTitle.classList.add('main-favorites__moviesContainer__movieContainer__spanTitle');
                $favoriteMovieSpanTitle.textContent = dataJson.Title ? dataJson.Title : 'No title';
                $favoriteMovieContainer.appendChild($favoriteMovieSpanTitle);
                var $favoriteMovieSpanYear = d.createElement('span');
                $favoriteMovieSpanYear.classList.add('main-favorites__moviesContainer__movieContainer__spanYear');
                $favoriteMovieSpanYear.textContent = dataJson.Year ? dataJson.Year : 'No Year';
                $favoriteMovieContainer.appendChild($favoriteMovieSpanYear);
                var $favoriteMovieSpanType = d.createElement('span');
                $favoriteMovieSpanType.classList.add('main-search__movies__movie__spanType');
                $favoriteMovieSpanType.textContent = dataJson.Type ? dataJson.Type : 'No Type';
                $favoriteMovieContainer.appendChild($favoriteMovieSpanType);
                var $favoriteMovieSpanImdbId = d.createElement('span');
                $favoriteMovieSpanImdbId.classList.add('main-search__movies__movie__spanImdbId');
                $favoriteMovieSpanImdbId.setAttribute('data-imdbId', dataJson.imdbID);
                $favoriteMovieContainer.appendChild($favoriteMovieSpanImdbId);
                $fragment.appendChild($favoriteMovieContainer);

                if (counter === totalMovies) {
                  $favoritesMoviesContainer.appendChild($fragment);
                }
              } catch (Error) {
                var ErrorMessage = Error.toString();
                var ErrorCode;
                var messageUser;

                if (ErrorMessage === "TypeError: Cannot read property 'Response' of undefined") {
                  ErrorCode = '002';
                  messageUser = "\n                <p>ERROR CODE: ".concat(ErrorCode, "</p>\n                <p>SIN DATA NI RESPUESTA DE LA APLICACI\xD3N</p>\n                <p>VALIDE LA CONEXI\xD3N A INTERNET</p>\n              ");
                } else {
                  messageUser = "<p>".concat(ErrorMessage, "</p>");
                }

                if ($errorMessageContainerFavorites) {
                  $favoritesMoviesContainer.innerHTML = '';
                  $errorMessageContainerFavorites.classList.remove('none');
                  $errorMessageContainerFavorites.innerHTML = '';
                  $errorMessageContainerFavorites.innerHTML = messageUser;
                }
              }
            });

            return function (_x4) {
              return _ref5.apply(this, arguments);
            };
          }());
        }
      }

      return false;
    });
  });

  return function showFavoritesMovies() {
    return _ref4.apply(this, arguments);
  };
}(); //* ---------------------------------------------------------------------------------------------
//* 2.8.4.- FUNCIÓN QUE MUESTRA LAS PELICULAS INMEDIATAMENTE AL ENTRAR A LA APLICACIÓN
//*         * Busca en el local storage la última busqueda del usuario
//* ---------------------------------------------------------------------------------------------


var showLastSearchMovies = () => {
  var userID = getSessionStorage().id;
  arrayUsers = getLocalStorage();
  arrayUsers.find(user => {
    if (user.id === userID) {
      var {
        lastSearch
      } = user;
      var apiUrlQuery;

      if (lastSearch !== '') {
        apiUrlQuery = "".concat(END_POINT_MOVIES).concat(lastSearch);
        showMovies(apiUrlQuery);
      } else {
        lastSearch = 'series';
        apiUrlQuery = "".concat(END_POINT_MOVIES).concat(lastSearch);
        setLocalStorageLastSearch(lastSearch);
        showMovies(apiUrlQuery);
      }
    }

    return false;
  });
}; //* ---------------------------------------------------------------------------------------------
//* 2.8.5.- FUNCION QUE REGRESA LA CANTIDAD DE PELICULAS DEL USUARIO CONTENIDAS EN FAVORITES
//* ---------------------------------------------------------------------------------------------


var getLocalStorageTotalFavoritesMovies = () => {
  var userID = getSessionStorage().id;
  arrayUsers = getLocalStorage();
  var total;
  arrayUsers.find(user => {
    if (user.id === userID) {
      if (user.favorites.length > 0) {
        total = user.favorites.length;
      } else {
        total = 0;
      }
    }

    return false;
  });
  return total;
}; //* ---------------------------------------------------------------------------------------------
//* *********************************************************************************************
//* =============================================================================================
//* /////////////////////////////////////////////////////////////////////////////////////////////
//* 3.- CÓDIGO PRINCIPAL Y EVENT LISTENER
//* =============================================================================================
//* 3.1.- EVENTO DE ESCUCHA AL CARGAR EL DOCUMENTO
//* ---------------------------------------------------------------------------------------------


d.addEventListener('DOMContentLoaded', () => {
  formLoginDataUser();
}); //* ---------------------------------------------------------------------------------------------
//* ---------------------------------------------------------------------------------------------
//* 3.2.- (index.html).
//* ---------------------------------------------------------------------------------------------
//* 3.2.1.- EVENTO DE ESCUCHA DEL SUBMIT EN FORMULARIO LOGIN (index.html)
//* ---------------------------------------------------------------------------------------------

if (w.location.pathname.includes('/')) {
  if ($formLogin) {
    $formLogin.addEventListener('submit', e => {
      e.preventDefault();
      $formLoginLoader.classList.remove('none');

      if (formLoginValidations()) {
        var userName = $formLogin.username.value.toLowerCase();
        var userPassword = $formLogin.password.value;
        localStorageValidateUsers(userName, userPassword);
        $formLogin.reset();
        $formLoginLoader.classList.add('none');
      } else {
        // eslint-disable-next-line no-alert
        alert('Alerta submit: Posible manipulación inadecuada del html en línea');
        window.location.reload();
      }
    });
  }
} //* ---------------------------------------------------------------------------------------------
//* ---------------------------------------------------------------------------------------------
//* 3.3.- (search.html).
//* ---------------------------------------------------------------------------------------------


if (w.location.pathname.includes('/search.html')) {
  //* 3.3.1.- VALIDA EL TEMA (darkMode - lightMode), DEL USUARIO EN lOCAL STORAGE
  //* -------------------------------------------------------------------------------------------
  favoritesValidation(); //* -------------------------------------------------------------------------------------------
  //* 3.3.2.- CARGA DE PELICULAS INICIALES (Última busqueda del usuario o aleatorio)
  //* -------------------------------------------------------------------------------------------

  showLastSearchMovies(); //* -------------------------------------------------------------------------------------------
  //* 3.3.3.- EVENTO DE ESCUCHA DEL CONTENEDOR ".main-search__user"
  //*         * Se encarga de colocar el nombre del usuario en la bienvenida.
  //*         * Escucha por delegación de eventos el icono de tema seleccionado. (div icon).
  //*         * Escucha por delegación de eventos el cierre de sesión. (boton salir).
  //* -------------------------------------------------------------------------------------------

  var sessionUser = getSessionStorage();
  $searchSpan.textContent = sessionUser.name.toLowerCase();
  $searchUser.addEventListener('click', event => {
    event.preventDefault();

    if (event.target.matches('.main-search__user__button')) {
      closeSession();
    }

    if (event.target.matches('.main-search__user__theme__icon')) {
      var icon = event.target.textContent;
      var userID = getSessionStorage().id;

      if (icon === sunIcon) {
        lightMode(userID);
      } else {
        darkMode(userID);
      }
    }
  }); //* -------------------------------------------------------------------------------------------
  //* 3.3.4.- EVENTO DE ESCUCHA DEL BOTÓN FAVORITOS
  //*         * Detecta el click y dirige hacia la pagina de favoritos (favorites.html).
  //* -------------------------------------------------------------------------------------------

  $favoritesButton.addEventListener('click', event => {
    event.preventDefault();
    redirectToFavorites();
  }); //* -------------------------------------------------------------------------------------------
  //* 3.3.5.- EVENTO DE ESCUCHA DEL SUBMIT EN FORMULARIO SEARCH
  //* -------------------------------------------------------------------------------------------

  $formSearch.addEventListener('submit', e => {
    e.preventDefault();
    page = 1;
    var userQuery = $formSearch.search.value.toLowerCase();
    var apiUrlQuery = "".concat(END_POINT_MOVIES).concat(userQuery);
    $formSearch.reset();
    setLocalStorageLastSearch(userQuery);
    showMovies(apiUrlQuery);
  }); //* -------------------------------------------------------------------------------------------
  //* 3.3.6.- EVENTO DE ESCUCHA DE LA ÚLTIMA BUSQUEDA DEL USUARIO
  //*         * Al hacer click en el span de la última busqueda la coloca en el input.
  //*         * Coloca el foco en el input.
  //* -------------------------------------------------------------------------------------------

  $lastSearchSpan.addEventListener('click', event => {
    event.preventDefault();
    var lastSearch = event.target.textContent;
    $formSearch.search.value = lastSearch;
    $formSearch.search.focus();
  }); //* -------------------------------------------------------------------------------------------
  //* 3.3.7.- EVENTO DE ESCUCHA BOTONES DE PAGINACIÓN
  //* -------------------------------------------------------------------------------------------

  $paginationDiv.addEventListener('click', event => {
    event.preventDefault();
    var lastSearch = getLocalStorageLastSearch();

    if (event.target.matches('.main-search__pagination__last')) {
      page -= 1;
    } else if (event.target.matches('.main-search__pagination__next')) {
      page += 1;
    }

    var apiUrlQuery = "".concat(END_POINT_MOVIES).concat(lastSearch, "&page=").concat(page);
    showMovies(apiUrlQuery);
  }); //* -------------------------------------------------------------------------------------------
  //* 3.3.8.- EVENTO DE ESCUCHA BOTÓN FAVORITOS DE LA PELICULA  EN "moviesDiv"
  //* -------------------------------------------------------------------------------------------

  $moviesDiv.addEventListener('click', event => {
    event.preventDefault();
    var $element = event.target;

    if ($element.matches('.main-search__movies__movie__button')) {
      $element.classList.toggle('movieIsFavorite');
      var imdbId = $element.getAttribute('data-imdbId');
      localStorageSetDelFavorites(imdbId);
    }
  }); //* -------------------------------------------------------------------------------------------
  //* 3.3.9.- EVENTO DE ESCUCHA IMAGEN DE PELICULA EN "moviesDiv" - (VENTANA MODAL).
  //*         * Escucha el click en contenedor de peliculas.
  //*         * Al hacer click en la imagen de pelicula, abre la ventana modal.
  //*         * Realiza una nueva llamada a la api y muestra en modal los resultados.
  //* -------------------------------------------------------------------------------------------

  $moviesDiv.addEventListener('click', event => {
    event.preventDefault();
    var $element = event.target;

    if ($element.classList.contains('main-search__movies__movie__image')) {
      d.body.classList.add('overflowModal');
      var imdbId = $element.getAttribute('data-imdbId');
      var apiUrlQuery = "".concat(END_POINT_MOVIE).concat(imdbId);
      $modalMovies.classList.add('showModal');
      showMovieModal(apiUrlQuery);
    }
  }); //* -------------------------------------------------------------------------------------------
  //* 3.3.10.- EVENTO DE ESCUCHA CONTENEDOR "modalMovies" - (VENTANA MODAL)
  //*         * Escuha el click en el contenedor modal.
  //*         * Al hacer click en el contenedor modal, cierra la ventana modal.
  //* -------------------------------------------------------------------------------------------

  $modalMovies.addEventListener('click', event => {
    event.preventDefault();
    var $element = event.target;

    if ($element.classList.contains('main-search__modal-movies')) {
      d.body.classList.remove('overflowModal');
      $modalMovies.classList.remove('showModal');
    }
  }); //* -------------------------------------------------------------------------------------------
  //* 3.3.11.- EVENTO DE ESCUCHA DEL BOTÓN FAVORITOS DE LA PELICULA - (VENTANA MODAL)
  //*          * Escucha el click en el contenedor de peliculas de ventana modal.
  //*          * Al hacer click en el botón de favoritos, coloca en amarillo el botón, agrega
  //*            o quita la pelicula de favoritos, tanto de la modal como del contenedor de
  //*            peliculas, asi como del local y session storage.
  //* -------------------------------------------------------------------------------------------

  $modalMovies.addEventListener('click', event => {
    event.preventDefault();
    var $element = event.target;

    if ($element.matches('.main-search__modal-movies__movieContent__imageButton__button')) {
      var imdbId = $element.getAttribute('data-imdbId');
      $element.classList.toggle('movieIsFavorite');
      var $moviesDivMovies = $moviesDiv.querySelectorAll('.main-search__movies__movie');
      $moviesDivMovies.forEach(element => {
        if (element.children[5].dataset.imdbid === imdbId) {
          element.children[0].classList.toggle('movieIsFavorite');
        }
      });
      localStorageSetDelFavorites(imdbId);
    }
  }); //* -------------------------------------------------------------------------------------------
} //* ---------------------------------------------------------------------------------------------
//* 3.4.- (favorites.html).
//* ---------------------------------------------------------------------------------------------


if (w.location.pathname.includes('/favorites.html')) {
  //* 3.4.1.- MUESTRA LAS PELICULAS INCLUIDAS A FAVORITOS
  //* -------------------------------------------------------------------------------------------
  showFavoritesMovies(); //* -------------------------------------------------------------------------------------------
  //* 3.4.2.- EVENTO DE ESCUCHA DEL BOTÓN HOME
  //* -------------------------------------------------------------------------------------------

  $favoritesButtonHome.addEventListener('click', event => {
    event.preventDefault();
    redirectToSearch();
  }); //* -------------------------------------------------------------------------------------------
  //* 3.4.3.- EVENTO DE ESCUCHA DEL BOTÓN FAVORITOS DE LA PELICULA
  //*         * Escucha el contenedor de peliculas en favoritos.
  //*         * Al hacer click en el botón de favoritos:
  //*           - Quita el color amarillo del botón.
  //*           - Elimina la pelicula del contenedor de favoritos.
  //*           - Elimina de favoritos en el local y session storage.
  //* -------------------------------------------------------------------------------------------

  $favoritesMoviesContainer.addEventListener('click', event => {
    event.preventDefault();
    var $element = event.target;

    if ($element.matches('.main-favorites__moviesContainer__movieContainer__button')) {
      var imdbId = $element.getAttribute('data-imdbId');
      var $favoriteMoviesNodeList = $favoritesMoviesContainer.querySelectorAll('.main-favorites__moviesContainer__movieContainer');
      $favoriteMoviesNodeList.forEach(element => {
        if (element.children[5].dataset.imdbid === imdbId) {
          element.children[0].classList.toggle('movieIsFavorite');
          element.children[0].parentElement.remove();
        }
      });
      localStorageSetDelFavorites(imdbId);
      $favoritesSpan.textContent = getLocalStorageTotalFavoritesMovies();
    }
  }); //* -------------------------------------------------------------------------------------------
} //* ---------------------------------------------------------------------------------------------
//* 3.5.- (search.html - favorites.html).
//* ---------------------------------------------------------------------------------------------


if (w.location.pathname.includes('/search.html') || w.location.pathname.includes('/favorites.html')) {
  //* 3.5.1.- VALIDA EL TEMA (darkMode - lightMode), SELECCIONADO POR EL USUARIO
  //* -------------------------------------------------------------------------------------------
  validateTheme(); //* -------------------------------------------------------------------------------------------
  //* 3.5.2.- EVENTO DE ESCUCHA AL CAMBIAR EL ESTATUS DE LA CONEXIÓN DE RED
  //* -------------------------------------------------------------------------------------------

  scrollTopButton(); //* -------------------------------------------------------------------------------------------
} //* ---------------------------------------------------------------------------------------------
//* 3.6.- (index.html - search.html - favorites.html).
//* ---------------------------------------------------------------------------------------------


if (w.location.pathname.includes('/')) {
  //* 3.6.1.- EVENTO DE ESCUCHA AL CAMBIAR EL ESTATUS DE LA CONEXIÓN DE RED
  //* -------------------------------------------------------------------------------------------
  window.addEventListener('online', () => networkStatus());
  window.addEventListener('offline', () => networkStatus()); //* -------------------------------------------------------------------------------------------
} //* ---------------------------------------------------------------------------------------------
//* =============================================================================================