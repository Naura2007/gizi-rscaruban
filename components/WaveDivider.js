export default function WaveDivider({ flip = false, color = "#ffffff" }) {
  return (
    <div className={flip ? "rotate-180" : ""}>
      <svg
        viewBox="0 0 1440 100"
        className="w-full h-16 md:h-24"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C240,100 480,0 720,40 C960,80 1200,20 1440,60 L1440,100 L0,100 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}