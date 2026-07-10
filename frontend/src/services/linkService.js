import api from "./api";

export const getLinks = async (page = 1, search = "") => {
  const res = await api.get(`/links?page=${page}&search=${search}`);
  return res.data;
};

export const createLink = async (data) => {
  const res = await api.post("/links", data);
  return res.data;
};

export const updateLink = async (id, data) => {
  const res = await api.put(`/links/${id}`, data);
  return res.data;
};

export const deleteLink = async (id) => {
  const res = await api.delete(`/links/${id}`);
  return res.data;
};

export const toggleStatus = async (id) => {
  const res = await api.patch(`/links/${id}/status`);
  return res.data;
};