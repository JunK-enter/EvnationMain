/**
 * Pipedrive integration preparation layer.
 *
 * NOTE: This does NOT call Pipedrive yet. It structures the intake data into a
 * clean, Pipedrive-friendly shape and exposes a single placeholder function
 * `sendToPipedrive(intakeData)` where the real API / Zapier / Make call will go.
 */

/**
 * Maps a raw customer intake record into a normalized lead payload that mirrors
 * how the data will eventually be pushed into Pipedrive (Lead + Person + Deal).
 */
export function mapIntakeToPipedrive(intake = {}) {
  const fullAddress = [intake.address, intake.city, intake.state, intake.zip]
    .filter(Boolean)
    .join(', ')

  return {
    // Pipedrive "Lead" / "Deal" title
    title: `EV Charger Install — ${intake.fullName || 'New Customer'}`,
    // Pipedrive "Person"
    person: {
      name: intake.fullName || '',
      email: intake.email || '',
      phone: intake.phone || '',
    },
    // Address / organization context
    address: fullAddress,
    // Custom fields (map these to Pipedrive custom field IDs later)
    customFields: {
      vehicle: intake.vehicle || '',
      chargerBrand: intake.chargerBrand || '',
      propertyType: intake.propertyType || '',
      panelSize: intake.panelSize || '',
      distanceFromPanel: intake.distance || '',
      installLocation: intake.installLocation || '',
      hasCharger: intake.hasCharger || '',
      permitNeeded: intake.permitNeeded || '',
      preferredDate: intake.preferredDate || '',
      notes: intake.notes || '',
    },
    source: 'EVnation Customer Intake Form',
    intakeId: intake.id || null,
  }
}

/**
 * Placeholder for the future Pipedrive integration.
 *
 * When clicked from the Admin Intake Detail page, this currently just logs the
 * normalized payload and resolves successfully. Wire up ONE of the options below
 * once API keys / webhook URLs are available.
 */
export async function sendToPipedrive(intakeData) {
  const payload = mapIntakeToPipedrive(intakeData)

  // ───────────────────────────────────────────────────────────────────────────
  // TODO: Connect to Pipedrive here. Pick whichever path you set up:
  //
  // Option A — Direct Pipedrive REST API:
  //   const token = import.meta.env.VITE_PIPEDRIVE_API_TOKEN
  //   // 1) Create / find the person
  //   const personRes = await fetch(`https://api.pipedrive.com/v1/persons?api_token=${token}`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       name: payload.person.name,
  //       email: payload.person.email,
  //       phone: payload.person.phone,
  //     }),
  //   })
  //   const person = await personRes.json()
  //   // 2) Create the lead/deal referencing that person + custom fields
  //   await fetch(`https://api.pipedrive.com/v1/leads?api_token=${token}`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ title: payload.title, person_id: person.data.id }),
  //   })
  //
  // Option B — Zapier / Make webhook (no Pipedrive keys needed in the client):
  //   await fetch(import.meta.env.VITE_PIPEDRIVE_WEBHOOK_URL, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(payload),
  //   })
  // ───────────────────────────────────────────────────────────────────────────

  console.info('[EVnation] sendToPipedrive() placeholder — payload ready for Pipedrive:', payload)

  // Simulate a short async round-trip so the UI can show a loading state.
  await new Promise((resolve) => setTimeout(resolve, 600))

  return { success: true, simulated: true, payload }
}
