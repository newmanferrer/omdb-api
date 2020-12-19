//* 1.- UBICACIÓN DE ELEMENTOS EN HTML, CONSTANTES Y VARIABLES.
//* =============================================================================================
//* 1.1.- Globales.
//* ---------------------------------------------------------------------------------------------
const d = document;
const w = window;
const ids = [];
let arrayUsers = [];
let page = 1;
let totalPages = 0;
const moviesForPage = 10;
//* ---------------------------------------------------------------------------------------------

//* 1.2.- API OMDB DATOS Y END POINTS.
//* ---------------------------------------------------------------------------------------------
const KEY = '7bdaf2a9';
const DOMAIN = 'http://www.omdbapi.com';
const API_KEY = `/?apikey=${KEY}`;
const URL_BASE = `${DOMAIN}${API_KEY}&`;
const END_POINT_MOVIE = `${URL_BASE}i=`;
const END_POINT_MOVIES = `${URL_BASE}s=`;
const options = {
  method: 'GET',
  'Content-type': 'application/json',
};
//* ---------------------------------------------------------------------------------------------

//* 1.3.- (index.html).
//* ---------------------------------------------------------------------------------------------
//* 1.3.1.- Formuilario Login.
//* ---------------------------------------------------------------------------------------------
const $formLogin = d.getElementById('formLogin');
const $formLoginInputs = d.querySelectorAll('.login-input');
const $formLoginLoader = d.getElementById('login-loader');
const patternUserName = '^([A-Za-z]{6,12})$';
const patternPassword = '^([A-Za-z0-9]{6,8})$';
//* ---------------------------------------------------------------------------------------------
//* ---------------------------------------------------------------------------------------------

//* 1.4.- (search.html).
//* ---------------------------------------------------------------------------------------------
//* 1.4.1.- Search "User" (Bienvenido, Tema, Salir, Icons).
//* ---------------------------------------------------------------------------------------------
const sunIcon = '☀️';
const moonIcon = '🌙';
const $searchUser = d.querySelector('.main-search__user');
const $searchSpan = d.querySelector('.main-search__user__span');
const $searchDivIcon = d.querySelector('.main-search__user__theme__icon');
const $selectors = d.querySelectorAll('[data-light]');
//* ---------------------------------------------------------------------------------------------

//* 1.4.2.- Search "Favorites" (Container, button).
//* ---------------------------------------------------------------------------------------------
const $favoritesDiv = d.querySelector('.main-search__favorites');
const $favoritesButton = d.getElementById('favoritesButton');
//* ---------------------------------------------------------------------------------------------

//* 1.4.3.- Search "Search" (Formulario, input, button, Icon).
//* ---------------------------------------------------------------------------------------------
const $formSearch = d.getElementById('formSearch');
//* ---------------------------------------------------------------------------------------------

//* 1.4.4.- Search "lastSearch" (Container, span Ultima búsqueda).
//* ---------------------------------------------------------------------------------------------
const $lastSearchDiv = d.querySelector('.main-search__lastSearch.none');
const $lastSearchSpan = d.querySelector('.main-search__lastSearch__span');
//* ---------------------------------------------------------------------------------------------

//* 1.4.5.- Search "lastResult" (Container, span resultados de búsqueda).
//* ---------------------------------------------------------------------------------------------
const $lastResultDiv = d.querySelector('.main-search__lastResult');
const $lastResultSpan = d.querySelector('.main-search__lastResult__span');
//* ---------------------------------------------------------------------------------------------

//* 1.4.6.- Search "pagination" (Variables, Constantes, Container, label, span).
//* ---------------------------------------------------------------------------------------------
const $paginationDiv = d.querySelector('.main-search__pagination');
const $paginationLabelLast = d.querySelector('.main-search__pagination__last');
const $paginationLabelNext = d.querySelector('.main-search__pagination__next');
const $paginationSpan = d.querySelector('.main-search__pagination__span');
//* ---------------------------------------------------------------------------------------------

//* 1.4.7.- Search "Loader" (Container Loader).
//* ---------------------------------------------------------------------------------------------
const $divSearchLoader = d.getElementById('search-loader');
//* ---------------------------------------------------------------------------------------------

//* 1.4.8.- Search "Movies" (Contenedor Películas, star icon).
//* ---------------------------------------------------------------------------------------------
const star = '⭐';
const $moviesDiv = d.getElementById('moviesDiv');
//* ---------------------------------------------------------------------------------------------

//* 1.4.9.- Ventana Modal "Movies" (Container).
//* ---------------------------------------------------------------------------------------------
const $modalMovies = d.getElementById('modalMovies');
//* ---------------------------------------------------------------------------------------------

//* 1.4.10.- Scroll Top Button
//* ---------------------------------------------------------------------------------------------
const $scrollTopButton = d.querySelector('.scroll-top-btn');
//* ---------------------------------------------------------------------------------------------

//* 1.5.- (favorites.html).
//* ---------------------------------------------------------------------------------------------
//* 1.5.1.- Elementos de "Favorites" (button, span, loader, Container Movies).
//* ---------------------------------------------------------------------------------------------
const $favoritesButtonHome = d.getElementById('favoritesButtonHome');
const $favoritesSpan = d.getElementById('favoritesSpan');
const $favoritesLoader = d.getElementById('favorites-loader');
const $favoritesMoviesContainer = d.getElementById('favoritesMoviesContainer');
//* ---------------------------------------------------------------------------------------------
//* ---------------------------------------------------------------------------------------------

//* 1.6.- Mensajes de Error.
//* ---------------------------------------------------------------------------------------------
//* 1.6.1.- Search.
//* ---------------------------------------------------------------------------------------------
const $errorMessageContainerSearch = d.querySelector('.main-search__errorMessages');
//* ---------------------------------------------------------------------------------------------

//* 1.6.2.- Favorites.
//* ---------------------------------------------------------------------------------------------
const $errorMessageContainerFavorites = d.querySelector('.main-favorites__errorMessages');
//* ---------------------------------------------------------------------------------------------
//* ---------------------------------------------------------------------------------------------
//* =============================================================================================

//* /////////////////////////////////////////////////////////////////////////////////////////////

//* 2.- FUNCIONES
//* =============================================================================================
//* 2.1.- FUNCIONES UTILITARIAS,
//* *********************************************************************************************
//* 2.1.1.- FUNCIÓN QUE VALIDA EL STATUS DE LA CONEXIÓN DE RED,
//* ---------------------------------------------------------------------------------------------
const networkStatus = (() => {
  const $containerNetworkStatus = d.createElement('div');
  const $footer = d.querySelector('.footer');
  const isOnLine = window.navigator.onLine;

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
});
//* ---------------------------------------------------------------------------------------------

//* 2.1.2.- FUNCIÓN QUE MANEJA EL BOTÓN DE SCROLL TOP.
//* ---------------------------------------------------------------------------------------------
const scrollTopButton = (() => {
  window.addEventListener('scroll', (event) => {
    event.preventDefault();
    const scrollTop = ((window.pageYOffset) || (d.documentElement.scrollTop));

    if (scrollTop > 1500) {
      $scrollTopButton.classList.remove('hidden');
    } else {
      $scrollTopButton.classList.add('hidden');
    }
  });

  $scrollTopButton.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  });
});
//* ---------------------------------------------------------------------------------------------

//* 2.1.2.- FUNCIÓN QUE MANEJA LA PAGINACIÓN.
//*         * Muestra el número de la página.
//*         * Muestra y oculta botones Last y Next.
//* ---------------------------------------------------------------------------------------------
const pagination = (() => {
  $paginationSpan.textContent = page;

  if ((page === 1) && (totalPages === 1)) {
    $paginationDiv.classList.add('none');
  } else if ((page === 1) && (totalPages > 1)) {
    $paginationDiv.classList.remove('none');
    $paginationLabelNext.classList.remove('none');
    $paginationLabelLast.classList.add('none');
  } else if ((page > 1) && (page < totalPages)) {
    $paginationDiv.classList.remove('none');
    $paginationLabelLast.classList.remove('none');
    $paginationLabelNext.classList.remove('none');
  } else if ((page > 1) && (page >= totalPages)) {
    $paginationDiv.classList.remove('none');
    $paginationLabelLast.classList.remove('none');
    $paginationLabelNext.classList.add('none');
  }
});
//* ---------------------------------------------------------------------------------------------
//* *********************************************************************************************

//* 2.2.- FUNCIÓN QUE GENERA UN ID PARA EL USUARIO.
//*       * Genera un id numérico de 13 dígitos y comprueba que no se generen ids repetidos.
//* ---------------------------------------------------------------------------------------------
const generateId = (() => {
  const id = Math.random().toString(16).substr(2);
  const exists = ids.find((i) => i === id);
  if (exists === undefined) { ids.push(id); } else { generateId(); }
  return id;
});
//* ---------------------------------------------------------------------------------------------

//* 2.3.- FUNCIONES RELACIONADAS AL ENRUTAMIENTO HACIA LAS PAGINAS DE LA APLICACIÓN.
//* *********************************************************************************************
//* 2.3.1.- FUNCIÓN QUE DIRIGE USUARIOS AL LOGIN (index.html).
//* ---------------------------------------------------------------------------------------------
const redirectToLogin = (() => {
  d.location.href = 'index.html';
});
//* ---------------------------------------------------------------------------------------------

//* 2.3.2.- FUNCIÓN QUE DIRIGE USUARIOS AL SEARCH HOME (search.html).
//* ---------------------------------------------------------------------------------------------
const redirectToSearch = (() => {
  d.location.href = 'search.html';
});
//* ---------------------------------------------------------------------------------------------

//* 2.3.3.- FUNCIÓN QUE DIRIGE USUARIOS A FAVORITOS (favorites.html).
//* ---------------------------------------------------------------------------------------------
const redirectToFavorites = (() => {
  d.location.href = 'favorites.html';
});
//* ---------------------------------------------------------------------------------------------
//* *********************************************************************************************

//* 2.4.- FUNCIONES RELACIONADAS AL FORMULARIO LOGIN (index.html).
//* *********************************************************************************************
//* 2.4.1.- FUNCIÓN QUE RECIBE LOS DATOS INTRODUCIDOS POR EL USUARIO DE FORMA REACTIVA.
//*         * Recive los datos del usuario y realiza una primera validación.
//*         * Informa al usuario sobre el formato requerido de los datos.
//* ---------------------------------------------------------------------------------------------
const formLoginDataUser = (() => {
  $formLoginInputs.forEach((input) => {
    const $span = d.createElement('span');
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add('form-input-error', 'none');

    input.insertAdjacentElement('afterend', $span);
  });

  d.addEventListener('keyup', (e) => {
    if (e.target.matches('.login-input')) {
      const { name, title, value } = e.target;
      let { pattern } = e.target;

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

      if ((name === 'username') && ((!pattern) || (pattern === '') || (pattern !== patternUserName))) {
        pattern = patternUserName;
        // eslint-disable-next-line no-alert
        alert('Alerta: Posible manipulación inadecuada del html en línea. (username patern)');
        window.location.reload();
      }

      if ((name === 'password') && ((!pattern) || (pattern === '') || (pattern !== patternPassword))) {
        pattern = patternPassword;
        // eslint-disable-next-line no-alert
        alert('Alerta: Posible manipulación inadecuada del html en línea. (password patern)');
        window.location.reload();
      }

      if (value.length >= 0) {
        const regexp = new RegExp(pattern);

        if (regexp.exec(value)) {
          d.getElementById(name).classList.remove('is-active');
        } else {
          d.getElementById(name).classList.add('is-active');
        }
      }
    }
  });
});
//* ---------------------------------------------------------------------------------------------

//* 2.4.2.- FUNCIÓN QUE VALIDA LOS DATOS INTRODUCIDOS POR EL USUARIO EN EL FORMULARIO LOGIN.
//* ---------------------------------------------------------------------------------------------
const formLoginValidations = (() => {
  const $inputUsernameValue = $formLogin.username.value;
  const $inputPasswordValue = $formLogin.password.value;
  const regexpUserName = new RegExp(patternUserName);
  const regexpPassword = new RegExp(patternPassword);
  let response = false;

  if (($inputUsernameValue === '') || ($inputPasswordValue === '')) {
    response = false;
  // eslint-disable-next-line max-len
  } else if (!regexpUserName.exec($inputUsernameValue) || !regexpPassword.exec($inputPasswordValue)) {
    response = false;
  } else {
    response = true;
  }

  return response;
});
//* ---------------------------------------------------------------------------------------------
//* *********************************************************************************************

//* 2.5.- FUNCIONES RELACIONADAS AL LOCAL Y SESSION STORAGE.
//* *********************************************************************************************
//* 2.5.1.- FUNCIÓN QUE INCLUYE USUARIOS AL LOCALSTORAGE.
//* ---------------------------------------------------------------------------------------------
const localStorageAddUsers = (() => {
  localStorage.setItem('users', JSON.stringify(arrayUsers));
});
//* ---------------------------------------------------------------------------------------------

//* 2.5.2.- FUNCIÓN QUE INCLUYE USUARIOS AL SESSIONSTORAGE.
//* ---------------------------------------------------------------------------------------------
const sessionStorageAddUser = ((user) => {
  sessionStorage.setItem('session', JSON.stringify(user));
});
//* ---------------------------------------------------------------------------------------------

//* 2.5.3.- FUNCIÓN QUE CREA NUEVOS USUARIOS.
//*         * Agrega usuarios en el arreglo (arrayUsers).
//*         * Agrega usuarios en el local store (localStorageAddUsers()).
//*         * Agrega usuario en el session storage (sessionStorageAddUser()).
//* ---------------------------------------------------------------------------------------------
const createUser = ((name, password) => {
  const user = {
    id: generateId(),
    name,
    password,
    lastSearch: '',
    theme: 'darkmode',
    favorites: [],
  };

  arrayUsers.push(user);
  localStorageAddUsers();
  sessionStorageAddUser(user);
});
//* ---------------------------------------------------------------------------------------------

//* 2.5.4.- FUNCION QUE ENTREGA LOS USUARIOS SI EXISTE EN EL LOCAL STORAGE.
//* ---------------------------------------------------------------------------------------------
const getLocalStorage = (() => JSON.parse(localStorage.getItem('users')));
//* ---------------------------------------------------------------------------------------------

//* 2.5.5.- FUNCION QUE ENTREGA LA SESIÓN SI EXISTE EN EL SESSION STORAGE.
//* ---------------------------------------------------------------------------------------------
const getSessionStorage = (() => JSON.parse(sessionStorage.getItem('session')));
//* ---------------------------------------------------------------------------------------------

//* 2.5.6.- FUNCIÓN QUE VALIDA CONSTANTEMENTE SI EXISTE UNA SESIÓN ACTIVA.
//* ---------------------------------------------------------------------------------------------
// eslint-disable-next-line no-unused-vars
const sessionValidate = (() => {
  const sessionActive = getSessionStorage();
  const pageLocation = window.location.pathname;

  if (((pageLocation === '/search.html') || (pageLocation === '/favorites.html')) && (!sessionActive)) {
    redirectToLogin();
  }
})();
//* ---------------------------------------------------------------------------------------------

//* 2.5.7.- FUNCIÓN QUE SE ENCARGA DE CERRAR SESIÓN DE USUARIO.
//*         * Solo elimina del sessionStorage "session", la cual es creada por nosotros.
//* ---------------------------------------------------------------------------------------------
const closeSession = (() => {
  sessionStorage.removeItem('session');
  redirectToLogin();
});
//* ---------------------------------------------------------------------------------------------

//* 2.5.8.- FUNCIÓN QUE VALIDA USUARIOS EXISTENTES EN EL LOCALSTORAGE.
//*         * Si el usuario existe crea la sesión. sessionStorageAddUsers().
//*         * Si el usuario existe valida si tiene un tema seleccionado. validateTheme().
//*         * si el usuario NO existe crea el usuario e inicia la sesión. createUsers().
//* ---------------------------------------------------------------------------------------------
const localStorageValidateUsers = ((username, password) => {
  arrayUsers = getLocalStorage();
  let userExist = false;

  if (arrayUsers === null) {
    arrayUsers = [];
  } else {
    arrayUsers.find((user) => {
      if ((user.name === username) && (user.password === password)) {
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
});
//* ---------------------------------------------------------------------------------------------

//* 2.5.9.- FUNCIÓN QUE INCLUYE LA ULTIMA BÚSQUEDA EN EL LOCAL Y SESSION STORAGE.
//* ---------------------------------------------------------------------------------------------
const setLocalStorageLastSearch = ((lastSearch) => {
  const userID = getSessionStorage().id;
  arrayUsers = getLocalStorage();

  arrayUsers.find((user) => {
    const userLS = user;
    if (userLS.id === userID) {
      userLS.lastSearch = lastSearch;
      sessionStorageAddUser(user);
      localStorageAddUsers();
      return true;
    }
    return false;
  });
});
//* ---------------------------------------------------------------------------------------------

//* 2.5.10.- FUNCIÓN QUE REGRESA LA ULTIMA BÚSQUEDA EN EL LOCAL STORAGE.
//* ---------------------------------------------------------------------------------------------
const getLocalStorageLastSearch = (() => {
  const userID = getSessionStorage().id;
  arrayUsers = getLocalStorage();
  let lastSearch;

  arrayUsers.find((user) => {
    if (user.id === userID) {
      lastSearch = user.lastSearch;
      return true;
    }
    return false;
  });
  return lastSearch;
});
//* ---------------------------------------------------------------------------------------------

//* 2.5.11.- FUNCIÓN QUE VALIDA SI EL USUARIO TIENE FAVORITOS EN EL LOCAL STORAGE.
//* ---------------------------------------------------------------------------------------------
const favoritesValidation = (() => {
  if (window.location.pathname.includes('/search.html')) {
    const userID = getSessionStorage().id;
    arrayUsers = getLocalStorage();

    arrayUsers.find((user) => {
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
});
//* ---------------------------------------------------------------------------------------------

//* 2.5.12.- FUNCIÓN QUE INCLUYE Y ELIMINA FAVORITOS EN EL LOCAL Y SESSION STORAGE.
//*          * Valida si el favorito ya fue agregado o no (Agrega - Elimina).
//*          * Activa o Desactiva el botón de favoritos en el menú principal.
//* ---------------------------------------------------------------------------------------------
const localStorageSetDelFavorites = ((imdbId) => {
  //* Agrega o Elimina favoritos
  //* -----------------------------------------------------------------------------------
  const userID = getSessionStorage().id;
  arrayUsers = getLocalStorage();

  const favorites = {
    imdbId,
  };

  arrayUsers.find((user) => {
    if (user.id === userID) {
      const indexId = user.favorites.findIndex((favorite) => favorite.imdbId === imdbId);

      if (indexId === -1) {
        user.favorites.push(favorites);
      } else {
        user.favorites.splice(indexId, 1);
      }

      sessionStorageAddUser(user);
      localStorageAddUsers();
    }
    return false;
  });
  //* -----------------------------------------------------------------------------------

  //* Activa o Desactiva botón de favoritos
  //* -----------------------------------------------------------------------------------
  favoritesValidation();
  //* -----------------------------------------------------------------------------------
});
//* ---------------------------------------------------------------------------------------------
//* *********************************************************************************************

//* 2.6.- FUNCIONES RELACIONADAS AL TEMA DE LA APLICACIÓN (LIGHT - DARK).
//* *********************************************************************************************
//* 2.6.1.- FUNCIÓN QUE APLICA EL TEMA (LIGHT).
//* ---------------------------------------------------------------------------------------------
const lightMode = ((userID) => {
  arrayUsers = getLocalStorage();
  $selectors.forEach((ele) => ele.classList.add('lightTheme'));

  if (w.location.pathname.includes('/search.html')) {
    $searchDivIcon.textContent = moonIcon;
  }

  arrayUsers.find((user) => {
    const userLS = user;
    if (userLS.id === userID) {
      userLS.theme = 'lightmode';
      sessionStorageAddUser(user);
      localStorageAddUsers();
    }
    return false;
  });
});
//* ---------------------------------------------------------------------------------------------

//* 2.6.2.- FUNCIÓN QUE APLICA EL TEMA (DARK).
//* ---------------------------------------------------------------------------------------------
const darkMode = ((userID) => {
  arrayUsers = getLocalStorage();
  $selectors.forEach((ele) => ele.classList.remove('lightTheme'));

  if (w.location.pathname.includes('/search.html')) {
    $searchDivIcon.textContent = sunIcon;
  }

  arrayUsers.find((user) => {
    const userLS = user;
    if (userLS.id === userID) {
      userLS.theme = 'darkmode';
      sessionStorageAddUser(user);
      localStorageAddUsers();
    }
    return false;
  });
});
//* ---------------------------------------------------------------------------------------------

//* 2.6.3.- FUNCIÓN QUE VALIDA SI EL USUARIO TIENE UN TEMA SELECCIONADO (LIGHT - DARK).
//* ---------------------------------------------------------------------------------------------
const validateTheme = (() => {
  const userID = getSessionStorage().id;
  arrayUsers = getLocalStorage();

  arrayUsers.find((user) => {
    if (user.id === userID) {
      if (user.theme === 'darkmode') {
        darkMode(userID);
      } else {
        lightMode(userID);
      }
    }
    return false;
  });
});
//* ---------------------------------------------------------------------------------------------
//* *********************************************************************************************

//* 2.7.- FUNCIONES RELACIONADAS AL USO DE LA API DE OMDB.
//* *********************************************************************************************
//* 2.7.1.- FUNCIÓN QUE LLAMA A LA API DE OMDB.
//* ---------------------------------------------------------------------------------------------
const callApiOmdb = (async (apiUrlQuery) => {
  const url = apiUrlQuery;
  let response;
  let dataJson;

  try {
    response = await fetch(url, options);
    dataJson = await response.json();
  } catch (Error) {
    const ErrorMessage = Error.toString();
    let ErrorCode;
    let messageUser;

    if (ErrorMessage === 'TypeError: Failed to fetch') {
      ErrorCode = '001';
      messageUser = `
        <p>ERROR CODE: ${ErrorCode}</p>
        <p>SIN RESPUESTA DE LA APLICACIÓN</p>
        <p>VALIDE LA CONEXIÓN A INTERNET</p>
      `;
    } else {
      messageUser = `<p>${ErrorMessage}</p>`;
    }

    if ($errorMessageContainerSearch) {
      $errorMessageContainerSearch.innerHTML = messageUser;
    } else if ($errorMessageContainerFavorites) {
      $errorMessageContainerFavorites.innerHTML = messageUser;
    }
  }
  return { response, dataJson };
});
//* ---------------------------------------------------------------------------------------------
//* *********************************************************************************************

//* 2.8.- FUNCIONES RELACIONADAS A MOSTRAR LAS PELICULAS.
//* *********************************************************************************************
//* 2.8.1.- MUESTRA LAS PELICULAS BUSCADAS EN "search.html"
//* ---------------------------------------------------------------------------------------------
const showMovies = (async (apiUrlQuery) => {
  const lastSearch = getLocalStorageLastSearch();
  const $fragment = d.createDocumentFragment();
  let movies;
  let totalMovies = 0;

  $divSearchLoader.classList.remove('none');
  $moviesDiv.classList.add('none');

  $lastSearchDiv.classList.remove('none');
  $lastSearchSpan.textContent = lastSearch;

  $errorMessageContainerSearch.classList.add('none');

  try {
    const { dataJson } = await callApiOmdb(apiUrlQuery);

    $divSearchLoader.classList.add('none');
    $moviesDiv.classList.remove('none');

    if (dataJson.Response === 'False') {
      $lastResultDiv.classList.add('none');
      $paginationDiv.classList.add('none');
      throw new Error(`${dataJson.Error}`);
    }

    if ((dataJson.Response === 'True') && (dataJson.Search)) {
      movies = dataJson.Search;
      totalMovies = dataJson.totalResults;
      totalPages = Math.ceil(totalMovies / moviesForPage);

      $lastResultDiv.classList.remove('none');
      $lastResultSpan.textContent = totalMovies;
      $moviesDiv.textContent = '';

      //* Pagination
      //* ---------------------------------------------------------------------------------
      pagination();
      //* ---------------------------------------------------------------------------------

      movies.forEach((movie) => {
        const $movieDiv = d.createElement('div');
        $movieDiv.classList.add('main-search__movies__movie');

        //* Botón favoritos
        //* -------------------------------------------------------------------
        const $movieButton = d.createElement('button');
        $movieButton.classList.add('main-search__movies__movie__button');

        //* De ser un favorito en LS, coloca el botón amarillo
        //* ---------------------------------------------------------
        const userID = getSessionStorage().id;
        arrayUsers = getLocalStorage();

        arrayUsers.find((user) => {
          if (user.id === userID) {
            user.favorites.find((favorite) => {
              if (favorite.imdbId === movie.imdbID) {
                $movieButton.classList.add('movieIsFavorite');
                $favoritesDiv.classList.remove('none');
              }
              return false;
            });
          }
          return false;
        });
        //* ---------------------------------------------------------

        $movieButton.textContent = star;
        $movieButton.setAttribute('data-imdbId', movie.imdbID);
        //* -------------------------------------------------------------------

        const $movieImage = d.createElement('img');
        $movieImage.classList.add('main-search__movies__movie__image');
        $movieImage.src = movie.Poster !== 'N/A' ? movie.Poster : 'assets/img/no-image.jpg';
        $movieImage.alt = movie.Title ? movie.Title : 'No title';
        $movieImage.setAttribute('data-imdbId', movie.imdbID);

        const $movieSpanTitle = d.createElement('span');
        $movieSpanTitle.classList.add('main-search__movies__movie__spanTitle');
        $movieSpanTitle.textContent = movie.Title ? movie.Title : 'No title';

        const $movieSpanYear = d.createElement('span');
        $movieSpanYear.classList.add('main-search__movies__movie__spanYear');
        $movieSpanYear.textContent = movie.Year ? movie.Year : 'No Year';

        const $movieSpanType = d.createElement('span');
        $movieSpanType.classList.add('main-search__movies__movie__spanType');
        $movieSpanType.textContent = movie.Type ? movie.Type : 'No Type';

        const $movieSpanImdbId = d.createElement('span');
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
    const ErrorMessage = Error.toString();
    let ErrorCode;
    let messageUser;

    if (ErrorMessage === 'Error: Movie not found!') {
      messageUser = `
        <p>Lo sentimos, sin resultados...</p>
        <p>Movie not found!</p>
      `;
    } else if (ErrorMessage === "TypeError: Cannot read property 'Response' of undefined") {
      ErrorCode = '002';
      messageUser = `
        <p>ERROR CODE: ${ErrorCode}</p>
        <p>SIN DATA NI RESPUESTA DE LA APLICACIÓN</p>
        <p>VALIDE LA CONEXIÓN A INTERNET</p>
      `;
    } else {
      messageUser = `<p>${ErrorMessage}</p>`;
    }

    if (w.location.pathname === '/search.html') {
      $moviesDiv.innerHTML = '';
      $errorMessageContainerSearch.classList.remove('none');
      $errorMessageContainerSearch.innerHTML = '';
      $errorMessageContainerSearch.innerHTML = messageUser;
    }
  }
});
//* ---------------------------------------------------------------------------------------------

//* 2.8.2.- MUESTRA DETALLE DE PELÍCULA EN VENTANA MODAL "search.html".
//* ---------------------------------------------------------------------------------------------
const showMovieModal = (async (apiUrlQuery) => {
  $divSearchLoader.classList.remove('none');
  const $fragment = d.createDocumentFragment();

  try {
    const { dataJson } = await callApiOmdb(apiUrlQuery);

    $divSearchLoader.classList.add('none');

    if (dataJson.Response === 'False') throw new Error(`${dataJson.Error}`);

    if (dataJson.Response === 'True') {
      const $movieDiv = d.createElement('div');
      $movieDiv.classList.add('main-search__modal-movies__movieContent');

      //* ---------------------------------------------------------------------------------------
      const $movieDivImgageButton = d.createElement('div');
      $movieDivImgageButton.classList.add('main-search__modal-movies__movieContent__imageButton');

      const $movieImage = d.createElement('img');
      $movieImage.classList.add('main-search__modal-movies__movieContent__imageButton__image');
      $movieImage.src = dataJson.Poster !== 'N/A' ? dataJson.Poster : 'assets/img/no-image.jpg';
      $movieImage.alt = dataJson.Title ? dataJson.Title : 'No title';
      $movieImage.setAttribute('data-imdbId', dataJson.imdbID);

      const $movieButton = d.createElement('button');
      $movieButton.classList.add('main-search__modal-movies__movieContent__imageButton__button');

      //* De ser un favorito en LS, coloca el botón amarillo
      //* ---------------------------------------------------------
      const userID = getSessionStorage().id;
      arrayUsers = getLocalStorage();

      arrayUsers.find((user) => {
        if (user.id === userID) {
          user.favorites.find((favorite) => {
            if (favorite.imdbId === dataJson.imdbID) {
              $movieButton.classList.add('movieIsFavorite');
            }
            return false;
          });
        }
        return false;
      });
      //* ---------------------------------------------------------

      $movieButton.textContent = star;
      $movieButton.setAttribute('data-imdbId', dataJson.imdbID);

      $movieDivImgageButton.appendChild($movieImage);
      $movieDivImgageButton.appendChild($movieButton);
      $movieDiv.appendChild($movieDivImgageButton);
      //* ---------------------------------------------------------------------------------------

      //* ---------------------------------------------------------------------------------------
      const $movieDivInfo = d.createElement('div');
      $movieDivInfo.classList.add('main-search__modal-movies__movieContent__info');

      const $movieSpanTitle = d.createElement('span');
      $movieSpanTitle.classList.add('main-search__modal-movies__movieContent__info__spanTitle');
      $movieSpanTitle.textContent = dataJson.Title ? dataJson.Title : 'No title';

      const $movieSpanYear = d.createElement('span');
      $movieSpanYear.classList.add('main-search__modal-movies__movieContent__info__spanYear');
      $movieSpanYear.textContent = dataJson.Year ? dataJson.Year : 'No Year';

      const $movieSpanType = d.createElement('span');
      $movieSpanType.classList.add('main-search__movies__movie__info__spanType');
      $movieSpanType.textContent = dataJson.Type ? dataJson.Type : 'No Type';

      const $movieSpanRuntime = d.createElement('span');
      $movieSpanRuntime.classList.add('main-search__modal-movies__movieContent__info__spanRuntime');
      $movieSpanRuntime.textContent = dataJson.Runtime ? dataJson.Runtime : 'No Runtime';

      const $movieSpanLanguage = d.createElement('span');
      $movieSpanLanguage.classList.add('main-search__modal-movies__movieContent__info__spanLanguage');
      $movieSpanLanguage.textContent = dataJson.Language ? dataJson.Language : 'No Language';

      const $movieSpanGender = d.createElement('span');
      $movieSpanGender.classList.add('main-search__modal-movies__movieContent__info__spanGender');
      $movieSpanGender.textContent = dataJson.Genre ? dataJson.Genre : 'No Gender';

      const $movieSpanCountry = d.createElement('span');
      $movieSpanCountry.classList.add('main-search__modal-movies__movieContent__info__spanCountry');
      $movieSpanCountry.textContent = dataJson.Country ? dataJson.Country : 'No Country';

      const $movieSpanActors = d.createElement('span');
      $movieSpanActors.classList.add('main-search__modal-movies__movieContent__info__spanActors');
      $movieSpanActors.textContent = dataJson.Actors ? dataJson.Actors : 'No Actors';

      const $movieSpanDirector = d.createElement('span');
      $movieSpanDirector.classList.add('main-search__modal-movies__movieContent__info__spanDirector');
      $movieSpanDirector.textContent = dataJson.Director ? dataJson.Director : 'No Director';

      const $movieSpanPlot = d.createElement('span');
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

      $movieDiv.appendChild($movieDivInfo);
      //* ---------------------------------------------------------------------------------------

      $fragment.appendChild($movieDiv);
      $modalMovies.innerHTML = '';
      $modalMovies.appendChild($fragment);
    }
  } catch (Error) {
    const ErrorMessage = Error.toString();
    let ErrorCode;
    let messageUser;

    if (ErrorMessage === "TypeError: Cannot read property 'Response' of undefined") {
      ErrorCode = '002';
      messageUser = `
        <p>ERROR CODE: ${ErrorCode}</p>
        <p>SIN DATA NI RESPUESTA DE LA APLICACIÓN</p>
        <p>VALIDE LA CONEXIÓN A INTERNET</p>
      `;
    } else {
      messageUser = `<p>${ErrorMessage}</p>`;
    }

    if ($modalMovies) {
      $modalMovies.innerHTML = '';
      $modalMovies.classList.add('modalErrorMessage');
      $modalMovies.innerHTML = messageUser;
    }
  }
});
//* ---------------------------------------------------------------------------------------------

//* 2.8.3.- FUNCIÓN QUE MUESTRA LAS PELÍCULAS EXISTENTES EN FAVORITOS.
//*         * Busca en el local storage los favoritos que tenga el usuario.
//* ---------------------------------------------------------------------------------------------
const showFavoritesMovies = (async () => {
  $favoritesLoader.classList.remove('none');
  $favoritesMoviesContainer.classList.add('none');
  $errorMessageContainerFavorites.classList.add('none');

  const $fragment = d.createDocumentFragment();
  const userID = getSessionStorage().id;
  arrayUsers = getLocalStorage();
  let counter = 0;

  arrayUsers.find((user) => {
    if (user.id === userID) {
      if (user.favorites.length > 0) {
        const totalMovies = user.favorites.length;
        $favoritesSpan.textContent = totalMovies;

        user.favorites.forEach(async (favorite) => {
          counter += 1;
          const { imdbId } = favorite;
          const apiUrlQuery = `${END_POINT_MOVIE}${imdbId}`;

          try {
            const { dataJson } = await callApiOmdb(apiUrlQuery);

            $favoritesLoader.classList.add('none');
            $favoritesMoviesContainer.classList.remove('none');

            if (dataJson.Response === 'False') throw new Error(`${dataJson.Error}`);

            const $favoriteMovieContainer = d.createElement('div');
            $favoriteMovieContainer.classList.add('main-favorites__moviesContainer__movieContainer');

            const $favoriteMovieButton = d.createElement('button');
            $favoriteMovieButton.classList.add('main-favorites__moviesContainer__movieContainer__button');
            $favoriteMovieButton.classList.add('movieIsFavorite');
            $favoriteMovieButton.textContent = star;
            $favoriteMovieButton.setAttribute('data-imdbId', dataJson.imdbID);
            $favoriteMovieContainer.appendChild($favoriteMovieButton);

            const $favoriteMovieImage = d.createElement('img');
            $favoriteMovieImage.classList.add('main-favorites__moviesContainer__movieContainer__image');
            $favoriteMovieImage.src = dataJson.Poster !== 'N/A' ? dataJson.Poster : 'assets/img/no-image.jpg';
            $favoriteMovieImage.alt = dataJson.Title ? dataJson.Title : 'No title';
            $favoriteMovieImage.setAttribute('data-imdbId', dataJson.imdbID);
            $favoriteMovieContainer.appendChild($favoriteMovieImage);

            const $favoriteMovieSpanTitle = d.createElement('span');
            $favoriteMovieSpanTitle.classList.add('main-favorites__moviesContainer__movieContainer__spanTitle');
            $favoriteMovieSpanTitle.textContent = dataJson.Title ? dataJson.Title : 'No title';
            $favoriteMovieContainer.appendChild($favoriteMovieSpanTitle);

            const $favoriteMovieSpanYear = d.createElement('span');
            $favoriteMovieSpanYear.classList.add('main-favorites__moviesContainer__movieContainer__spanYear');
            $favoriteMovieSpanYear.textContent = dataJson.Year ? dataJson.Year : 'No Year';
            $favoriteMovieContainer.appendChild($favoriteMovieSpanYear);

            const $favoriteMovieSpanType = d.createElement('span');
            $favoriteMovieSpanType.classList.add('main-search__movies__movie__spanType');
            $favoriteMovieSpanType.textContent = dataJson.Type ? dataJson.Type : 'No Type';
            $favoriteMovieContainer.appendChild($favoriteMovieSpanType);

            const $favoriteMovieSpanImdbId = d.createElement('span');
            $favoriteMovieSpanImdbId.classList.add('main-search__movies__movie__spanImdbId');
            $favoriteMovieSpanImdbId.setAttribute('data-imdbId', dataJson.imdbID);
            $favoriteMovieContainer.appendChild($favoriteMovieSpanImdbId);

            $fragment.appendChild($favoriteMovieContainer);

            if (counter === totalMovies) {
              $favoritesMoviesContainer.appendChild($fragment);
            }
          } catch (Error) {
            const ErrorMessage = Error.toString();
            let ErrorCode;
            let messageUser;

            if (ErrorMessage === "TypeError: Cannot read property 'Response' of undefined") {
              ErrorCode = '002';
              messageUser = `
                <p>ERROR CODE: ${ErrorCode}</p>
                <p>SIN DATA NI RESPUESTA DE LA APLICACIÓN</p>
                <p>VALIDE LA CONEXIÓN A INTERNET</p>
              `;
            } else {
              messageUser = `<p>${ErrorMessage}</p>`;
            }

            if ($errorMessageContainerFavorites) {
              $favoritesMoviesContainer.innerHTML = '';
              $errorMessageContainerFavorites.classList.remove('none');
              $errorMessageContainerFavorites.innerHTML = '';
              $errorMessageContainerFavorites.innerHTML = messageUser;
            }
          }
        });
      }
    }
    return false;
  });
});
//* ---------------------------------------------------------------------------------------------

//* 2.8.4.- FUNCIÓN QUE MUESTRA LAS PELÍCULAS INMEDIATAMENTE AL ENTRAR A LA APLICACIÓN.
//*         * Busca en el local storage la ultima búsqueda del usuario.
//* ---------------------------------------------------------------------------------------------
const showLastSearchMovies = (() => {
  const userID = getSessionStorage().id;
  arrayUsers = getLocalStorage();

  arrayUsers.find((user) => {
    if (user.id === userID) {
      let { lastSearch } = user;
      let apiUrlQuery;

      if (lastSearch !== '') {
        apiUrlQuery = `${END_POINT_MOVIES}${lastSearch}`;
        showMovies(apiUrlQuery);
      } else {
        lastSearch = 'series';
        apiUrlQuery = `${END_POINT_MOVIES}${lastSearch}`;
        setLocalStorageLastSearch(lastSearch);
        showMovies(apiUrlQuery);
      }
    }
    return false;
  });
});
//* ---------------------------------------------------------------------------------------------

//* 2.8.5.- FUNCION QUE REGRESA LA CANTIDAD DE PELÍCULAS DEL USUARIO CONTENIDAS EN FAVORITES.
//* ---------------------------------------------------------------------------------------------
const getLocalStorageTotalFavoritesMovies = (() => {
  const userID = getSessionStorage().id;
  arrayUsers = getLocalStorage();
  let total;

  arrayUsers.find((user) => {
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
});
//* ---------------------------------------------------------------------------------------------
//* *********************************************************************************************
//* =============================================================================================

//* /////////////////////////////////////////////////////////////////////////////////////////////

//* 3.- CÓDIGO PRINCIPAL Y EVENT LISTENER.
//* =============================================================================================
//* 3.1.- EVENTO DE ESCUCHA AL CARGAR EL DOCUMENTO.
//* ---------------------------------------------------------------------------------------------
d.addEventListener('DOMContentLoaded', () => {
  formLoginDataUser();
});
//* ---------------------------------------------------------------------------------------------

//* 3.2.- (index.html).
//* ---------------------------------------------------------------------------------------------
//* 3.2.1.- EVENTO DE ESCUCHA DEL SUBMIT EN FORMULARIO LOGIN (index.html).
//* ---------------------------------------------------------------------------------------------
if (w.location.pathname.includes('/')) {
  if ($formLogin) {
    $formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      $formLoginLoader.classList.remove('none');

      if (formLoginValidations()) {
        const userName = $formLogin.username.value.toLowerCase();
        const userPassword = $formLogin.password.value;

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
}
//* ---------------------------------------------------------------------------------------------
//* ---------------------------------------------------------------------------------------------

//* 3.3.- (search.html).
//* ---------------------------------------------------------------------------------------------
if (w.location.pathname.includes('/search.html')) {
  //* 3.3.1.- VALIDA EL TEMA (darkMode - lightMode), DEL USUARIO EN lOCAL STORAGE.
  //* -------------------------------------------------------------------------------------------
  favoritesValidation();
  //* -------------------------------------------------------------------------------------------

  //* 3.3.2.- CARGA DE PELÍCULAS INICIALES (ultima busqueda del usuario o aleatorio).
  //* -------------------------------------------------------------------------------------------
  showLastSearchMovies();
  //* -------------------------------------------------------------------------------------------

  //* 3.3.3.- EVENTO DE ESCUCHA DEL CONTENEDOR ".main-search__user".
  //*         * Se encarga de colocar el nombre del usuario en la bienvenida.
  //*         * Escucha por delegación de eventos el icono de tema seleccionado. (div icon).
  //*         * Escucha por delegación de eventos el cierre de sesión. (boton salir).
  //* -------------------------------------------------------------------------------------------
  const sessionUser = getSessionStorage();
  $searchSpan.textContent = sessionUser.name.toLowerCase();

  $searchUser.addEventListener('click', (event) => {
    event.preventDefault();

    if (event.target.matches('.main-search__user__button')) {
      closeSession();
    }

    if (event.target.matches('.main-search__user__theme__icon')) {
      const icon = event.target.textContent;
      const userID = getSessionStorage().id;

      if (icon === sunIcon) {
        lightMode(userID);
      } else {
        darkMode(userID);
      }
    }
  });
  //* -------------------------------------------------------------------------------------------

  //* 3.3.4.- EVENTO DE ESCUCHA DEL BOTÓN FAVORITOS.
  //*         * Detecta el click y dirige hacia la página de favoritos (favorites.html).
  //* -------------------------------------------------------------------------------------------
  $favoritesButton.addEventListener('click', (event) => {
    event.preventDefault();
    redirectToFavorites();
  });
  //* -------------------------------------------------------------------------------------------

  //* 3.3.5.- EVENTO DE ESCUCHA DEL SUBMIT EN FORMULARIO SEARCH.
  //* -------------------------------------------------------------------------------------------
  $formSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    const userQuery = $formSearch.search.value.toLowerCase();
    const apiUrlQuery = `${END_POINT_MOVIES}${userQuery}`;
    $formSearch.reset();
    setLocalStorageLastSearch(userQuery);
    showMovies(apiUrlQuery);
  });
  //* -------------------------------------------------------------------------------------------

  //* 3.3.6.- EVENTO DE ESCUCHA DE LA ULTIMA BÚSQUEDA DEL USUARIO.
  //*         * Al hacer click en el span de la ultima búsqueda la coloca en el input.
  //*         * Coloca el foco en el input.
  //* -------------------------------------------------------------------------------------------
  $lastSearchSpan.addEventListener('click', (event) => {
    event.preventDefault();
    const lastSearch = event.target.textContent;
    $formSearch.search.value = lastSearch;
    $formSearch.search.focus();
  });
  //* -------------------------------------------------------------------------------------------

  //* 3.3.7.- EVENTO DE ESCUCHA BOTONES DE PAGINACIÓN.
  //* -------------------------------------------------------------------------------------------
  $paginationDiv.addEventListener('click', (event) => {
    event.preventDefault();
    const lastSearch = getLocalStorageLastSearch();

    if (event.target.matches('.main-search__pagination__last')) {
      page -= 1;
    } else if (event.target.matches('.main-search__pagination__next')) {
      page += 1;
    }

    const apiUrlQuery = `${END_POINT_MOVIES}${lastSearch}&page=${page}`;
    showMovies(apiUrlQuery);
  });
  //* -------------------------------------------------------------------------------------------

  //* 3.3.8.- EVENTO DE ESCUCHA BOTÓN FAVORITOS DE LA PELÍCULA  EN "moviesDiv".
  //* -------------------------------------------------------------------------------------------
  $moviesDiv.addEventListener('click', (event) => {
    event.preventDefault();
    const $element = event.target;

    if ($element.matches('.main-search__movies__movie__button')) {
      $element.classList.toggle('movieIsFavorite');

      const imdbId = $element.getAttribute('data-imdbId');
      localStorageSetDelFavorites(imdbId);
    }
  });
  //* -------------------------------------------------------------------------------------------

  //* 3.3.9.- EVENTO DE ESCUCHA IMAGEN DE PELÍCULA EN "moviesDiv" - (VENTANA MODAL).
  //*         * Escucha el click en contenedor de películas.
  //*         * Al hacer click en la imagen de película, abre la ventana modal.
  //*         * Realiza una nueva llamada a la api y muestra en modal los resultados.
  //* -------------------------------------------------------------------------------------------
  $moviesDiv.addEventListener('click', (event) => {
    event.preventDefault();
    const $element = event.target;

    if ($element.classList.contains('main-search__movies__movie__image')) {
      d.body.classList.add('overflowModal');
      const imdbId = $element.getAttribute('data-imdbId');
      const apiUrlQuery = `${END_POINT_MOVIE}${imdbId}`;

      $modalMovies.classList.add('showModal');
      showMovieModal(apiUrlQuery);
    }
  });
  //* -------------------------------------------------------------------------------------------

  //* 3.3.10.- EVENTO DE ESCUCHA CONTENEDOR "modalMovies" - (VENTANA MODAL).
  //*         * Escuha el click en el contenedor modal.
  //*         * Al hacer click en el contenedor modal, cierra la ventana modal.
  //* -------------------------------------------------------------------------------------------
  $modalMovies.addEventListener('click', (event) => {
    event.preventDefault();
    const $element = event.target;

    if ($element.classList.contains('main-search__modal-movies')) {
      d.body.classList.remove('overflowModal');
      $modalMovies.classList.remove('showModal');
    }
  });
  //* -------------------------------------------------------------------------------------------

  //* 3.3.11.- EVENTO DE ESCUCHA DEL BOTÓN FAVORITOS DE LA PELÍCULA - (VENTANA MODAL).
  //*          * Escucha el click en el contenedor de películas de ventana modal.
  //*          * Al hacer click en el botón de favoritos, coloca en amarillo el botón, agrega
  //*            o quita la película de favoritos, tanto de la modal como del contenedor de
  //*            películas, asi como del local y session storage.
  //* -------------------------------------------------------------------------------------------
  $modalMovies.addEventListener('click', (event) => {
    event.preventDefault();
    const $element = event.target;

    if ($element.matches('.main-search__modal-movies__movieContent__imageButton__button')) {
      const imdbId = $element.getAttribute('data-imdbId');
      $element.classList.toggle('movieIsFavorite');

      const $moviesDivMovies = $moviesDiv.querySelectorAll('.main-search__movies__movie');

      $moviesDivMovies.forEach((element) => {
        if (element.children[5].dataset.imdbid === imdbId) {
          element.children[0].classList.toggle('movieIsFavorite');
        }
      });

      localStorageSetDelFavorites(imdbId);
    }
  });
  //* -------------------------------------------------------------------------------------------
}
//* ---------------------------------------------------------------------------------------------

//* 3.4.- (favorites.html).
//* ---------------------------------------------------------------------------------------------
if (w.location.pathname.includes('/favorites.html')) {
  //* 3.4.1.- MUESTRA LAS PELÍCULAS INCLUIDAS A FAVORITOS.
  //* -------------------------------------------------------------------------------------------
  showFavoritesMovies();
  //* -------------------------------------------------------------------------------------------

  //* 3.4.2.- EVENTO DE ESCUCHA DEL BOTÓN HOME.
  //* -------------------------------------------------------------------------------------------
  $favoritesButtonHome.addEventListener('click', (event) => {
    event.preventDefault();
    redirectToSearch();
  });
  //* -------------------------------------------------------------------------------------------

  //* 3.4.3.- EVENTO DE ESCUCHA DEL BOTÓN FAVORITOS DE LA PELÍCULA.
  //*         * Escucha el contenedor de películas en favoritos.
  //*         * Al hacer click en el botón de favoritos:
  //*           - Quita el color amarillo del botón.
  //*           - Elimina la película del contenedor de favoritos.
  //*           - Elimina de favoritos en el local y session storage.
  //* -------------------------------------------------------------------------------------------
  $favoritesMoviesContainer.addEventListener('click', (event) => {
    event.preventDefault();
    const $element = event.target;

    if ($element.matches('.main-favorites__moviesContainer__movieContainer__button')) {
      const imdbId = $element.getAttribute('data-imdbId');
      const $favoriteMoviesNodeList = $favoritesMoviesContainer.querySelectorAll('.main-favorites__moviesContainer__movieContainer');

      $favoriteMoviesNodeList.forEach((element) => {
        if (element.children[5].dataset.imdbid === imdbId) {
          element.children[0].classList.toggle('movieIsFavorite');
          element.children[0].parentElement.remove();
        }
      });

      localStorageSetDelFavorites(imdbId);
      $favoritesSpan.textContent = getLocalStorageTotalFavoritesMovies();
    }
  });
  //* -------------------------------------------------------------------------------------------
}
//* ---------------------------------------------------------------------------------------------

//* 3.5.- (search.html - favorites.html).
//* ---------------------------------------------------------------------------------------------
if ((w.location.pathname.includes('/search.html')) || (w.location.pathname.includes('/favorites.html'))) {
  //* 3.5.1.- LLAMA A LA FUNCIÓN "validateTheme".
  // *        * Se encarga de validar el tema (darkMode - lightMode), seleccionado por el usuario.
  //* -------------------------------------------------------------------------------------------
  validateTheme();
  //* -------------------------------------------------------------------------------------------

  //* 3.5.2.- LLAMA A LA FUNCIÓN "scrollTopButton".
  //*         * Se encargada de mostar el botón para ir al inicio de la página.
  //* -------------------------------------------------------------------------------------------
  scrollTopButton();
  //* -------------------------------------------------------------------------------------------
}
//* ---------------------------------------------------------------------------------------------

//* 3.6.- (index.html - search.html - favorites.html).
//* ---------------------------------------------------------------------------------------------
if (w.location.pathname.includes('/')) {
  //* 3.6.1.- EVENTO DE ESCUCHA AL CAMBIAR EL ESTATUS DE LA CONEXIÓN DE RED.
  //* -------------------------------------------------------------------------------------------
  window.addEventListener('online', () => networkStatus());
  window.addEventListener('offline', () => networkStatus());
  //* -------------------------------------------------------------------------------------------
}
//* ---------------------------------------------------------------------------------------------
//* =============================================================================================
