// Creates the GoHighLevel custom contact fields the application form fills in
// (one column per form answer). Run once per sub-account with `npm run ghl:fields`.
// Safe to re-run: fields that already exist are left alone.
//
// Reads GHL_API_TOKEN and GHL_LOCATION_ID from .env.local (or the environment).
// The token needs the "View Custom Fields" and "Edit Custom Fields" scopes for this
// script only; the form itself needs just the contact scopes.
import { loadEnv } from 'vite'
import { CUSTOM_FIELDS } from '../functions/api/apply.ts'

const env = { ...loadEnv('development', process.cwd(), ''), ...process.env }
const token = env.GHL_API_TOKEN
const locationId = env.GHL_LOCATION_ID
if (!token || !locationId) {
  console.error('Set GHL_API_TOKEN and GHL_LOCATION_ID in .env.local first.')
  process.exit(1)
}

const API = `https://services.leadconnectorhq.com/locations/${locationId}/customFields`
const headers = {
  Authorization: `Bearer ${token}`,
  Version: '2021-07-28',
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

type CustomField = {
  id: string
  name: string
  fieldKey: string
  dataType: string
}

async function request(method: string, body?: object) {
  const response = await fetch(
    method === 'GET' ? `${API}?model=contact` : API,
    {
      method,
      headers,
      body: body && JSON.stringify(body),
    },
  )
  const text = await response.text()
  if (!response.ok) {
    throw new Error(
      `${method} customFields ${response.status}: ${text.slice(0, 300)}`,
    )
  }
  return JSON.parse(text)
}

const existing = (await request('GET')).customFields as CustomField[]
const byKey = new Map(existing.map((field) => [field.fieldKey, field]))

for (const field of Object.values(CUSTOM_FIELDS)) {
  const { name, key } = field
  const long = 'long' in field && field.long
  const fieldKey = `contact.${key}`
  const found = byKey.get(fieldKey)
  if (found) {
    console.log(`exists   ${fieldKey}  (${found.dataType})`)
    continue
  }
  const { customField } = (await request('POST', {
    name,
    dataType: long ? 'LARGE_TEXT' : 'TEXT',
    model: 'contact',
  })) as { customField: CustomField }
  const ok = customField.fieldKey === fieldKey
  console.log(
    `${ok ? 'created ' : 'MISMATCH'} ${customField.fieldKey}  (${customField.dataType})`,
  )
  if (!ok) {
    console.error(
      `  GoHighLevel named the key "${customField.fieldKey}" but the form sends "${fieldKey}". ` +
        `Update CUSTOM_FIELDS in functions/api/apply.ts to match.`,
    )
    process.exitCode = 1
  }
}
