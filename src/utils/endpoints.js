// Movies
export const moviesApi = `/api/movie`;
export const allMovies = moviesApi + `/all`;
export const moviesPath = `/api/movie/allWithAWS`;
export const moviesPathID = (id) => `${moviesApi}/${id}`;
export const moviesWithoutProjections = moviesApi + `/save-projections`;

// Genres
export const genresPath = `/api/genre`;

export const registerPath = `/api/members/register`;
export const loginPath = `/api/members/login`;

// Members
export const membersPath = `/api/members`;

// Roles
export const movieRolesPath = (movieID) => `/api/role/${movieID}`;

// Actors
export const actorsPath = `/api/actor`;
export const getActorsPath = actorsPath + `/all`;
export const actorWithId = (actorID) => actorsPath + `/${actorID}`;

// Halls
export const hallsPath = `/api/hall`;

// Projections
export const projectionsPath = `/api/projection`;

// Tickets
export const ticketsPath = `/api/ticket`;
