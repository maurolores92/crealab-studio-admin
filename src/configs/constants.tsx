
let host = 'https://api.crealabstudio.com.ar'; //prod
if(process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  host = 'http://localhost:5002/'
}
let hostApi = 'https://api.crealabstudio.com.ar/api' //prod
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  hostApi = 'http://localhost:5002/api'
}

export const constants = {
  imageHost: host,
  urlPath: '',
  imageUrl: host + '',
  api: hostApi,
}

export const formatPrice = (value: number | string): string => {
  if (value === null || value === undefined || isNaN(Number(value))) return '';

  return Number(value).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
