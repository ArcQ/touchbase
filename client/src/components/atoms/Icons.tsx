type SvgProps = {
  className?: string;
};
export const CheckCircle = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${props.className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

export const ErrorCircle = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${props.className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

export const Photograph = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${props.className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

export const Logo = (props: SvgProps) => (
  <svg
    className={`${props.className}`}
    width="90"
    height="12.375"
    viewBox="0 0 125.95 18.375"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      id="svgGroup"
      strokeLinecap="round"
      fillRule="evenodd"
      fontSize="9pt"
      stroke="#FFF"
      strokeWidth="0.25mm"
      fill="white"
      style={{ stroke: '#FFF', strokeWidth: '0.25mm', fill: 'white' }}
    >
      <path
        d="M 125.95 14.2 L 125.95 18.125 L 115.35 18.125 L 115.35 0.275 L 125.95 0.275 L 125.95 4.15 L 120.175 4.15 L 120.175 6.95 L 125.525 6.95 L 125.525 10.825 L 120.175 10.825 L 120.175 14.2 L 125.95 14.2 Z M 4.75 11.425 L 4.75 18.125 L 0 18.125 L 0 0.275 L 10.55 0.275 L 10.55 4.15 L 4.75 4.15 L 4.75 7.55 L 10.1 7.55 L 10.1 11.425 L 4.75 11.425 Z M 82.025 18.125 L 76.75 18.125 L 75.875 14.775 L 70.075 14.775 L 69.175 18.125 L 63.875 18.125 L 69.7 0.2 L 76.125 0.2 L 82.025 18.125 Z M 83.95 0.275 L 90.175 0.275 Q 94.05 0.275 95.7 1.425 Q 97.35 2.575 97.35 4.725 Q 97.35 5.769 97.014 6.527 A 3.164 3.164 0 0 1 96.925 6.713 A 4.164 4.164 0 0 1 96.422 7.471 A 3.349 3.349 0 0 1 95.863 8 A 4.153 4.153 0 0 1 95.133 8.44 A 3.415 3.415 0 0 1 94.55 8.65 L 94.55 8.775 A 5.06 5.06 0 0 1 95.547 9.134 A 6.116 6.116 0 0 1 96 9.375 A 3.178 3.178 0 0 1 96.885 10.155 A 4.081 4.081 0 0 1 97.212 10.638 Q 97.582 11.273 97.672 12.247 A 7.168 7.168 0 0 1 97.7 12.9 A 5.166 5.166 0 0 1 97.399 14.701 A 4.478 4.478 0 0 1 95.875 16.725 A 6.289 6.289 0 0 1 93.758 17.764 Q 92.5 18.125 90.9 18.125 L 83.95 18.125 L 83.95 0.275 Z M 45.1 18.125 L 33.4 18.125 L 33.4 0.275 L 38.225 0.275 L 38.225 14.225 L 45.1 14.225 L 45.1 18.125 Z M 112.5 18.125 L 100.8 18.125 L 100.8 0.275 L 105.625 0.275 L 105.625 14.225 L 112.5 14.225 L 112.5 18.125 Z M 53.725 18.125 L 47.95 18.125 L 47.95 0.275 L 54.125 0.275 Q 57.306 0.275 59.405 1.465 A 7.025 7.025 0 0 1 60.775 2.475 Q 63.1 4.675 63.1 8.825 Q 63.1 11.925 61.938 14 Q 60.775 16.075 58.675 17.1 A 9.812 9.812 0 0 1 56.075 17.929 A 13.421 13.421 0 0 1 53.725 18.125 Z M 29.993 11.544 A 14.64 14.64 0 0 0 30.175 9.175 A 14.64 14.64 0 0 0 29.993 6.807 A 10.539 10.539 0 0 0 29.288 4.338 Q 28.4 2.275 26.488 1.138 A 6.823 6.823 0 0 0 25.547 0.674 Q 24.654 0.315 23.57 0.147 A 13.391 13.391 0 0 0 21.525 0 A 14.768 14.768 0 0 0 20.653 0.025 Q 18.237 0.168 16.6 1.125 Q 14.675 2.25 13.75 4.313 A 10.214 10.214 0 0 0 13.015 6.782 A 14.059 14.059 0 0 0 12.825 9.15 A 14.37 14.37 0 0 0 13 11.447 A 10.478 10.478 0 0 0 13.737 14 Q 14.65 16.075 16.575 17.225 Q 18.5 18.375 21.5 18.375 A 14.947 14.947 0 0 0 22.503 18.343 Q 24.897 18.181 26.488 17.225 Q 28.4 16.075 29.288 14.013 A 10.539 10.539 0 0 0 29.993 11.544 Z M 17.9 9.175 A 11.436 11.436 0 0 0 17.982 10.588 Q 18.072 11.309 18.261 11.906 A 4.877 4.877 0 0 0 18.737 12.975 A 2.758 2.758 0 0 0 20.697 14.282 A 4.489 4.489 0 0 0 21.5 14.35 A 4.519 4.519 0 0 0 22.556 14.235 A 2.634 2.634 0 0 0 24.3 12.975 A 5.135 5.135 0 0 0 24.803 11.741 Q 25.1 10.653 25.1 9.175 Q 25.1 7.52 24.727 6.343 A 5.088 5.088 0 0 0 24.3 5.35 A 2.658 2.658 0 0 0 22.439 4.038 A 4.486 4.486 0 0 0 21.525 3.95 A 4.343 4.343 0 0 0 20.454 4.074 A 2.693 2.693 0 0 0 18.725 5.35 A 5.259 5.259 0 0 0 18.191 6.657 Q 18.027 7.263 17.956 7.984 A 12.072 12.072 0 0 0 17.9 9.175 Z M 54.175 4.175 L 52.775 4.175 L 52.775 14.175 L 53.85 14.175 Q 56.05 14.175 57.075 12.9 Q 58.1 11.625 58.1 9 Q 58.1 4.671 54.94 4.226 A 5.491 5.491 0 0 0 54.175 4.175 Z M 74.875 10.825 L 74.1 7.9 Q 73.975 7.425 73.75 6.538 A 118.901 118.901 0 0 1 73.356 4.937 A 130.822 130.822 0 0 1 73.3 4.7 A 99.217 99.217 0 0 1 73.194 4.247 Q 73.065 3.691 72.977 3.281 A 31.06 31.06 0 0 1 72.95 3.15 Q 72.882 3.558 72.762 4.104 A 35.562 35.562 0 0 1 72.637 4.65 Q 72.425 5.55 72.213 6.425 A 324.257 324.257 0 0 1 72.062 7.043 Q 72.003 7.284 71.95 7.498 A 154.939 154.939 0 0 1 71.85 7.9 L 71.075 10.825 L 74.875 10.825 Z M 90.375 10.65 L 88.775 10.65 L 88.775 14.4 L 90.475 14.4 Q 91.725 14.4 92.225 13.863 A 1.849 1.849 0 0 0 92.71 12.781 A 2.493 2.493 0 0 0 92.725 12.5 Q 92.725 11.775 92.225 11.213 A 1.374 1.374 0 0 0 91.731 10.87 Q 91.289 10.68 90.6 10.654 A 5.973 5.973 0 0 0 90.375 10.65 Z M 88.775 7.125 L 90.225 7.125 A 4.524 4.524 0 0 0 90.812 7.09 Q 91.554 6.992 91.913 6.625 Q 92.4 6.125 92.4 5.425 A 1.261 1.261 0 0 0 91.701 4.223 Q 91.139 3.925 90.125 3.925 L 88.775 3.925 L 88.775 7.125 Z"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
);

export const Spinner = (props: SvgProps) => (
  <svg
    className={`text-white animate-spin ${props.className || 'w-5 h-5'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export default Spinner;