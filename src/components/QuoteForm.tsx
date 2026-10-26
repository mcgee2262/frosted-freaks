import { useMemo, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AREAS, CONTACT, FORM, SERVICES, isPlaceholder } from '../config/site'

type Values = {
  name: string
  email: string
  phone: string
  address: string
  city: string
  services: string[]
  property: string
  timing: string
  consent: boolean
}

type Errors = Partial<Record<keyof Values, string>>
type Status = 'idle' | 'sending' | 'sent' | 'stub' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(v: Values): Errors {
  const e: Errors = {}
  if (!v.name.trim()) e.name = 'Enter your full name.'
  if (!v.email.trim()) e.email = 'Enter your email address.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter an email address like name@example.com.'
  if (FORM.phoneRequired && !v.phone.trim()) e.phone = 'Enter a phone number.'
  else if (v.phone.trim() && v.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a 10-digit phone number, or leave it blank.'
  if (!v.address.trim()) e.address = 'Enter your service address or neighborhood.'
  if (!v.city) e.city = 'Choose a city or service area.'
  if (FORM.consent.enabled && !v.consent) e.consent = 'Please tick the box to continue.'
  return e
}

const ORDER: (keyof Values)[] = ['name', 'email', 'phone', 'city', 'address', 'services', 'property', 'timing', 'consent']

export function QuoteForm() {
  const [params] = useSearchParams()
  const initialServices = useMemo(() => {
    const ids = SERVICES.map((s) => s.id)
    return (params.get('services') ?? '').split(',').filter((s) => ids.includes(s))
  }, [params])

  const [values, setValues] = useState<Values>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    services: initialServices,
    property: '',
    timing: '',
    consent: false,
  })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const summaryRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    const next = { ...values, [key]: value }
    setValues(next)
    if (touched[key]) setErrors(validate(next))
  }
  const blur = (key: keyof Values) => {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors(validate(values))
  }
  const toggleService = (id: string) =>
    set('services', values.services.includes(id) ? values.services.filter((s) => s !== id) : [...values.services, id])

  const shown = (key: keyof Values) => (touched[key] ? errors[key] : undefined)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    setTouched(Object.fromEntries(ORDER.map((k) => [k, true])))
    if (Object.keys(found).length) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }

    const payload = {
      ...values,
      services: values.services.map((id) => SERVICES.find((s) => s.id === id)?.name ?? id),
    }

    if (!FORM.endpoint) {
      // Stub mode: no backend configured, so nothing is sent.
      console.info('[Frosted Freaks] Quote form in stub mode. Payload not sent:', payload)
      setStatus('stub')
      requestAnimationFrame(() => statusRef.current?.focus())
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORM.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  const errorList = ORDER.filter((k) => touched[k] && errors[k])
  const describe = (key: keyof Values, hint?: string) =>
    [hint, shown(key) ? `${key}-error` : undefined].filter(Boolean).join(' ') || undefined

  if (status === 'sent') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[2rem] bg-white p-8 md:p-12">
        <h2 className="text-head">Thanks, request sent</h2>
        <p className="mt-4 text-lead">We have your quote request and will get back to you.</p>
      </div>
    )
  }

  const label = 'block font-semibold'
  const err = 'mt-2 flex items-center gap-2 text-small font-medium text-error'

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-[2rem] bg-white p-6 sm:p-8 md:p-12">
      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-8 rounded-2xl bg-[#fde8e6] p-5 text-ink">
          <h2 className="text-lead">Please fix {errorList.length === 1 ? 'this' : 'these'} first</h2>
          <ul className="mt-3 flex flex-col gap-1">
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#${k === 'services' ? 'service-driveway' : k}`} className="underline">
                  {errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {status === 'stub' && (
        <div ref={statusRef} tabIndex={-1} role="status" className="mb-8 rounded-2xl bg-glacier p-5">
          <h2 className="text-lead">This form isn’t connected yet</h2>
          <p className="mt-2">
            Your details look good, but this site has no form backend set up, so your request was <strong>not sent</strong>.
            {!isPlaceholder(CONTACT.email) && (
              <>
                {' '}Please email us at <a className="underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> instead.
              </>
            )}
          </p>
        </div>
      )}

      {status === 'error' && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="mb-8 rounded-2xl bg-[#fde8e6] p-5">
          <h2 className="text-lead">Something went wrong</h2>
          <p className="mt-2">Your request didn’t go through. Please try again in a moment.</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Full name <span className="font-normal text-muted">(required)</span></label>
          <input id="name" name="name" autoComplete="name" className="field mt-2 bg-glacier-2" value={values.name}
            onChange={(e) => set('name', e.target.value)} onBlur={() => blur('name')}
            aria-required="true" aria-invalid={!!shown('name')} aria-describedby={describe('name')} />
          {shown('name') && <p id="name-error" className={err}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className={label}>Email <span className="font-normal text-muted">(required)</span></label>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" className="field mt-2 bg-glacier-2" value={values.email}
            onChange={(e) => set('email', e.target.value)} onBlur={() => blur('email')}
            aria-required="true" aria-invalid={!!shown('email')} aria-describedby={describe('email')} />
          {shown('email') && <p id="email-error" className={err}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className={label}>
            Phone <span className="font-normal text-muted">({FORM.phoneRequired ? 'required' : 'optional'})</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" className="field mt-2 bg-glacier-2" value={values.phone}
            onChange={(e) => set('phone', e.target.value)} onBlur={() => blur('phone')}
            aria-required={FORM.phoneRequired} aria-invalid={!!shown('phone')} aria-describedby={describe('phone')} />
          {shown('phone') && <p id="phone-error" className={err}>{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="city" className={label}>City or service area <span className="font-normal text-muted">(required)</span></label>
          <select id="city" name="city" className="field mt-2 bg-glacier-2" value={values.city}
            onChange={(e) => set('city', e.target.value)} onBlur={() => blur('city')}
            aria-required="true" aria-invalid={!!shown('city')} aria-describedby={describe('city')}>
            <option value="">Choose one</option>
            {AREAS.map((a) => (
              <option key={a.id} value={a.name}>{a.name}</option>
            ))}
            <option value="Other">Other</option>
          </select>
          {shown('city') && <p id="city-error" className={err}>{errors.city}</p>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="address" className={label}>Service address or neighborhood <span className="font-normal text-muted">(required)</span></label>
          <input id="address" name="address" autoComplete="street-address" className="field mt-2 bg-glacier-2" value={values.address}
            onChange={(e) => set('address', e.target.value)} onBlur={() => blur('address')}
            aria-required="true" aria-invalid={!!shown('address')} aria-describedby={describe('address')} />
          {shown('address') && <p id="address-error" className={err}>{errors.address}</p>}
        </div>

        <fieldset className="md:col-span-2">
          <legend className={label}>Requested services <span className="font-normal text-muted">(choose any)</span></legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {SERVICES.map((s) => {
              const on = values.services.includes(s.id)
              return (
                <label key={s.id} htmlFor={`service-${s.id}`}
                  className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-full px-5 py-3 transition-colors ${on ? 'bg-navy text-white' : 'bg-glacier-2 hover:bg-glacier'}`}>
                  <input id={`service-${s.id}`} type="checkbox" className="h-5 w-5 flex-none accent-[#f08a3c]"
                    checked={on} onChange={() => toggleService(s.id)} />
                  <span>{s.name}</span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <div className="md:col-span-2">
          <label htmlFor="property" className={label}>Property details <span className="font-normal text-muted">(optional)</span></label>
          <p id="property-hint" className="mt-1 text-small text-muted">For example: driveway length, a slope, how many steps.</p>
          <textarea id="property" name="property" rows={4} className="field mt-2 bg-glacier-2" value={values.property}
            onChange={(e) => set('property', e.target.value)} aria-describedby="property-hint" />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="timing" className={label}>Preferred timing or notes <span className="font-normal text-muted">(optional)</span></label>
          <textarea id="timing" name="timing" rows={3} className="field mt-2 bg-glacier-2" value={values.timing}
            onChange={(e) => set('timing', e.target.value)} />
        </div>

        {FORM.consent.enabled && (
          <div className="md:col-span-2">
            <label htmlFor="consent" className="flex items-start gap-3">
              <input id="consent" type="checkbox" className="mt-1 h-5 w-5 flex-none accent-[#f08a3c]" checked={values.consent}
                onChange={(e) => set('consent', e.target.checked)} onBlur={() => blur('consent')}
                aria-invalid={!!shown('consent')} aria-describedby={describe('consent')} />
              <span>{FORM.consent.label}</span>
            </label>
            {shown('consent') && <p id="consent-error" className={err}>{errors.consent}</p>}
          </div>
        )}
      </div>

      <p className="mt-8 text-small text-muted">
        We use what you send only to reply to your request.
      </p>

      <button type="submit" className="btn btn-warm mt-6 w-full sm:w-auto" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send Quote Request'}
      </button>
    </form>
  )
}
