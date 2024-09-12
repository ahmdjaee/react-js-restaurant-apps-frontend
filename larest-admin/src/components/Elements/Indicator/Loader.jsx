function Loader({ size = "sm" }) {
  if (size === "md") {
    return <MediumLoader />;
  } else if (size === "sm") {
    return <SmallLoader />;
  }
}
function SmallLoader() {
  return (
    <>
      <style>{`
        .loader {
          width: 45px;
          aspect-ratio: 1;
          display: grid;
        }

        .loader::before,
        .loader::after {
          content: "";
          grid-area: 1 / 1;
          --c: no-repeat radial-gradient(farthest-side, rgb(59 130 246) 92%, transparent);
          background: 
            var(--c) 50%  0,
            var(--c) 50%  100%,
            var(--c) 100% 50%,
            var(--c) 0    50%;
          background-size: 11px 11px;
          animation: l12 1s infinite;
        }

        .loader::before {
          margin: 4px;
          filter: hue-rotate(45deg);
          background-size: 7px 7px;
          animation-timing-function: linear;
        }

        @keyframes l12 {
          100% {
            transform: rotate(0.5turn);
          }
        }
      `}</style>

      <div className="loader" />
    </>
  );
}

function MediumLoader() {
  return (
    <>
      <style>{`
        .loader {
          width: 50px;
          aspect-ratio: 1;
          display: grid;
        }

        .loader::before,
        .loader::after {
          content: "";
          grid-area: 1 / 1;
          --c: no-repeat radial-gradient(farthest-side, rgb(59 130 246) 92%, transparent);
          background: 
            var(--c) 50%  0,
            var(--c) 50%  100%,
            var(--c) 100% 50%,
            var(--c) 0    50%;
          background-size: 12px 12px;
          animation: l12 1s infinite;
        }

        .loader::before {
          margin: 4px;
          filter: hue-rotate(45deg);
          background-size: 8px 8px;
          animation-timing-function: linear;
        }

        @keyframes l12 {
          100% {
            transform: rotate(0.5turn);
          }
        }
      `}</style>
      <div className="loader" />
    </>
  );
}

export default Loader;
