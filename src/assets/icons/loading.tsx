const Loading = ({ ...res }: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...res}
    width="23"
    height="22"
    viewBox="0 0 23 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.5 1V5M11.5 17V21M4.43 3.93L7.26 6.76M15.74 15.24L18.57 18.07M1.5 11H5.5M17.5 11H21.5M4.43 18.07L7.26 15.24M15.74 6.76L18.57 3.93"
      stroke="#101828"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Loading
