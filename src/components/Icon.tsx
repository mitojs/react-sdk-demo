import type { SVGProps } from 'react'

const paths: Record<string, string> = {
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  activity: 'M3 12h4l3-8 4 16 3-8h4',
  code: 'm8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16',
  arrow: 'm9 5 7 7-7 7',
  send: 'm21 3-7 18-4-7-7-4 18-7ZM21 3 10 14',
  check: 'm5 12 4 4L19 6',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  trash: 'M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7',
  link: 'M14 3h7v7m0-7L10 14M10 3H3v18h18v-7',
  request: 'M3 7h17l-4-4m5 14H4l4 4M3 7v4m18 6v-4',
  promise: 'M13 2 4 14h7l-1 8 10-13h-7l1-7',
  bug: 'M8 10h8v9H8zM9 10V7a3 3 0 0 1 6 0v3M4 12h4m8 0h4M4 17h4m8 0h4M6 5l3 3m9-3-3 3',
  info: 'M12 11v6m0-10v.1M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
  stack: 'm12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5',
  search: 'M21 21l-6-6M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z',
  github:
    'M9 19c-4 1-4-2-6-2m12 5v-4c0-1 .1-2-1-3 3 0 6-2 6-6 0-1-1-3-2-4 0-1 0-2-1-3-2 0-3 1-4 1s-2-1-4-1c-1 1-1 2-1 3-1 1-2 3-2 4 0 4 3 6 6 6-1 1-1 2-1 3v4',
}

export default function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: string }) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      {...props}
    >
      <path d={paths[name] || paths.code} />
    </svg>
  )
}
