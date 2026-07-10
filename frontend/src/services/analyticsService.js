import api from "./api";

export const getAnalytics = async (id) => {
  const res = await api.get(`/analytics/${id}`);
  return res.data;
};

export const getDashboardStats = async () => {
  const res = await api.get("/dashboard/stats");
  return res.data;
};