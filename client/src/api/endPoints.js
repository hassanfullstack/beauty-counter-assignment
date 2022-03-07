export const HOST_URL = "http://localhost:3000/";

const VERSION = "v1";
export const config = {
  AUTH_ROOT: `${HOST_URL}auth/${VERSION}`,
  ROOT_URL: `${HOST_URL}api/${VERSION}/`,
  REST_API: {
    Fruit: {
      GetFruitByName: 'fruits?name=',
    }
  },
};
