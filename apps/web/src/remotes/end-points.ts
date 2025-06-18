export const getRestServerUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8080/rest-server"
    : "https://puzzlepop.site/rest-server";
};

export const getGameServerUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8081/game-server"
    : "https://puzzlepop.site/game-server";
};

export const getOriginServerUrl = () => {
  // TODO: 배포 서버 Nginx 설정 후 URL 설정 필요
  return process.env.NODE_ENV === "development" ? "http://localhost:9090" : "";
};

export const getOriginSocketServerUrl = () => {
  // TODO: 배포 서버 Nginx 설정 후 URL 설정 필요
  return process.env.NODE_ENV === "development" ? "ws://localhost:9090" : "";
};
