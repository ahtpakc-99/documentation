import { type ReactNode } from 'react'
import Footer from '@theme-original/Footer'
import type FooterType from '@theme/Footer'
import type { WrapperProps } from '@docusaurus/types'

type Props = WrapperProps<typeof FooterType>

export default function FooterWrapper(props: Props): ReactNode {
  return (
    <>
      <Footer {...props} />
      <div className="footer__extra__text">
        The documentation is a work in progress. All Parrot users are welcome to contribute or help
        with translations.
      </div>
    </>
  )
}
