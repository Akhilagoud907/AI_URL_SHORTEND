const StatCard = ({ title, value, color, icon }) => {
  return (
    <div
      className={`${color} rounded-2xl text-white p-6 shadow-lg hover:shadow-xl transition`}
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-white/80 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>

        </div>

        <div className="text-4xl opacity-80">
          {icon}
        </div>

      </div>
    </div>
  );
};

export default StatCard;