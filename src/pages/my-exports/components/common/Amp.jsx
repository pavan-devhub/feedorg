import { Fragment } from 'react'

/** Sets "&" in the body face: the display serif's ampersand is too ornate at heading weights. */
export default function Amp({ children }) {
  const [first, ...rest] = children.split('&')
  return (
    <>
      {first}
      {rest.map((part, i) => (
        <Fragment key={i}>
          <span className="amp">&amp;</span>
          {part}
        </Fragment>
      ))}
    </>
  )
}
