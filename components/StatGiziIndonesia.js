export default function StatGiziIndonesia() {
  const stats = [
    { label: "Stunting", value: "19,8", icon: "" },
    { label: "Gizi Buruk", value: "16,8", icon: "" },
    { label: "Gizi Lebih", value: "7,7", icon: "" },
    { label: "Obesitas", value: "37,8", icon: "" },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <p className="text-accent font-bold tracking-widest text-lg uppercase text-center mb-3">
          Data Nasional
        </p>
        <h2 className="text-4xl md:text-6xl font-extrabold text-primary text-center mb-14">
          Kondisi Gizi Indonesia
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-10 text-center hover:-translate-y-1 hover:shadow-xl transition"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <p className="text-5xl md:text-6xl font-extrabold text-primary leading-none tracking-tight">
                {item.value}
                <span className="text-2xl md:text-3xl align-top ml-1 text-accent">%</span>
              </p>
              <div className="w-10 h-1 bg-accent rounded-full mx-auto my-4" />
              <p className="text-gray-600 font-semibold uppercase text-xs tracking-wider">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}