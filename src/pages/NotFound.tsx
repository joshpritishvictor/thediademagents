import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" />
      <section className="relative flex min-h-svh items-center overflow-hidden bg-brand-950 pt-24 text-on-dark">
        <div className="glow-soft" aria-hidden="true" />
        <div className="relative container-page py-20 text-center">
          <p className="font-display text-sm text-gold-500 italic">404</p>
          <h1 className="mt-6 display-lg text-on-dark">
            This page isn’t <em className="accent">at the table.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-on-dark/70">
            The link may be out of date. Head back to the advisor home page to
            find what you were looking for.
          </p>
          <Link to="/" className="btn-gold mt-10">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to home</span>
          </Link>
        </div>
      </section>
    </>
  )
}
