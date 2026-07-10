import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "../services/analyticsService";
import Loader from "../components/Loader";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const Analytics = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["analytics", id],
    queryFn: () => getAnalytics(id),
  });

  if (isLoading) return <Loader />;

  const analytics = data.analytics;

  // Daily Clicks
  const dailyData = Object.entries(analytics.dailyClicks).map(
    ([date, clicks]) => ({
      date,
      clicks,
    })
  );

  // Browser
  const browserData = Object.entries(
    analytics.browserDistribution
  ).map(([name, value]) => ({
    name,
    value,
  }));

  // Device
  const deviceData = Object.entries(
    analytics.deviceDistribution
  ).map(([name, value]) => ({
    name,
    value,
  }));

  // Country
  const countryData = Object.entries(
    analytics.countryDistribution
  ).map(([country, clicks]) => ({
    country,
    clicks,
  }));

  // Referrer
  const referrerData = Object.entries(
    analytics.topReferrers
  ).map(([referrer, clicks]) => ({
    referrer,
    clicks,
  }));

  const COLORS = [
    "#2563EB",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
  ];

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Link Analytics
      </h1>

      {/* Link Summary */}

      <div className="bg-white shadow rounded-xl p-6 mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Link Summary
        </h2>

        <p>
          <strong>Title:</strong> {data.link.title}
        </p>

        <p className="mt-2 break-all">
          <strong>Original URL:</strong>{" "}
          {data.link.originalUrl}
        </p>

        <p className="mt-2">
          <strong>Short Code:</strong>{" "}
          {data.link.shortCode}
        </p>

        <p className="mt-2">
          <strong>Total Clicks:</strong>{" "}
          {data.link.clickCount}
        </p>

      </div>

      {/* Total Clicks */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">

        <div className="bg-blue-600 text-white rounded-xl p-6 shadow">

          <p>Total Clicks</p>

          <h1 className="text-4xl font-bold mt-2">
            {analytics.totalClicks}
          </h1>

        </div>

      </div>

      {/* Daily Click Chart */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-semibold mb-6">
          Daily Clicks
        </h2>

        <ResponsiveContainer width="100%" height={350}>

          <LineChart data={dailyData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* Browser & Device */}

      <div className="grid md:grid-cols-2 gap-8 mt-10">

        {/* Browser */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Browser Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={browserData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {browserData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Device */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Device Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={deviceData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {deviceData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Country Distribution */}

      <div className="bg-white rounded-xl shadow p-6 mt-10">

        <h2 className="text-2xl font-semibold mb-6">
          Country Distribution
        </h2>

        <ResponsiveContainer width="100%" height={350}>

          <BarChart data={countryData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="country" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="clicks"
              fill="#2563eb"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Top Referrers */}

      <div className="bg-white rounded-xl shadow p-6 mt-10">

        <h2 className="text-2xl font-semibold mb-6">
          Top Referrers
        </h2>

        <table className="w-full border-collapse">

          <thead>

            <tr className="border-b">

              <th className="text-left p-3">
                Referrer
              </th>

              <th className="text-left p-3">
                Clicks
              </th>

            </tr>

          </thead>

          <tbody>

            {referrerData.map((item) => (

              <tr
                key={item.referrer}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3">
                  {item.referrer}
                </td>

                <td className="p-3">
                  {item.clicks}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Analytics;