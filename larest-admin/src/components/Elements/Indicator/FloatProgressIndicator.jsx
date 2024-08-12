export default function FloatProgressIndicator({ loading }) {
    if (!loading) return null;
    return (
      <div className="w-screen h-full z-[99999] fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-15">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <div className="flex items-center justify-center">
            <div>
              <style jsx>
                {`.loader {
                      width: 60px;
                      aspect-ratio: 1;
                      color: #ffa516;
                      background:
                          linear-gradient(currentColor 0 0) 100%  0,
                          linear-gradient(currentColor 0 0) 0  100%;
                      background-size: 50.1% 50.1%;
                      background-repeat: no-repeat;
                      animation:  l7-0 1s infinite steps(1);
                      }
                      .loader::before,
                      .loader::after {
                      content:"";
                      position: absolute;
                      inset: 0 50% 50% 0;
                      background: currentColor;
                      transform: scale(var(--s,1)) perspective(150px) rotateY(0deg);
                      transform-origin: bottom right; 
                      animation: l7-1 .5s infinite linear alternate;
                      }
                      .loader::after {
                      --s:-1,-1;
                      }
                      @keyframes l7-0 {
                      0%  {transform: scaleX(1)  rotate(0deg)}
                      50% {transform: scaleX(-1) rotate(-90deg)}
                      }
                      @keyframes l7-1 {
                      49.99% {transform:scale(var(--s,1)) perspective(150px) rotateX(-90deg) ;background:#f03355}
                      50%    {transform:scale(var(--s,1)) perspective(150px) rotateX(-90deg) ;background:#f03355}
                      100%   {transform:scale(var(--s,1)) perspective(150px) rotateX(-180deg);background:#f03355}
                      }
                  `}
              </style>
              <div className="loader"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }