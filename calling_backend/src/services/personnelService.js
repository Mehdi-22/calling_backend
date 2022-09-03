import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/Personals";

function personnelUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function getPersonnel() {
    return http.get(apiEndpoint);
}

export function deletePersonnel(id) {
    return http.delete(personnelUrl(id));
}

export function getPersonnelById(id) {
    return http.get(personnelUrl(id));
}

export function savePersonnel(militaire) {
    if (militaire._id) {
        const body = {...militaire };
        delete body._id;
        return http.put(personnelUrl(militaire._id), body);
    }
    return http.post(apiEndpoint, militaire);
}