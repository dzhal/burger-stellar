export default function checkResponse(response: Response) {
  if (response.ok) {
    return response;
  } else {
    return Promise.reject(response.status);
  }
}
