// Movies
// const moviesApi = `/api/movie`;
export const moviesPath = `/api/movie/allWithAWS`;

export const registerPath = `/api/members/register`;
export const loginPath = `/api/members/login`;

// Roles
export const movieRolesPath = (movieID) => `/api/role/${movieID}`;

// Actors
export const actorsPath = `/api/actor`;
export const getActorsPath = actorsPath + `/all`;
export const actorWithId = (actorID) => actorsPath + `/${actorID}`;
