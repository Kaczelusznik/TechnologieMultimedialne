import "../styles/Components/vine.css";

export default function Vine() {
  return (
    <div className="home-vine" aria-hidden="true">
      <svg viewBox="0 0 1600 240" preserveAspectRatio="none">
        <defs>
          <path id="home-vine-path" d="M 0 220 C 350 220, 700 70, 1600 70" />
        </defs>

        <text className="home-vine-text" dy="-8">
          <textPath href="#home-vine-path">
            REACT // TYPESCRIPT // BOOTSTRAP // PYTHON // POSTGRESQL //
            <animate
              attributeName="startOffset"
              from="-60%"
              to="105%"
              dur="18s"
              repeatCount="indefinite"
            />
          </textPath>
        </text>
      </svg>
    </div>
  );
}
