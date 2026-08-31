# Aurora Ride Platform

This document is the backend contract for the Aurora admin, driver apps, rider apps and vehicle trackers. The public Astro site remains a separate static client.

## Architecture

- Vercel Functions expose versioned JSON APIs.
- PostgreSQL is the source of truth for riders, rides, assignments and audit events.
- Driver apps and physical trackers authenticate with independently revocable bearer tokens.
- Passenger tracking uses a random, expiring token. The raw token is never stored.
- `ride_events` is append-only and records every operational state change.
- `notification_outbox` decouples ride changes from future push, SMS and email providers.
- Schema changes run explicitly with `pnpm db:migrate`; request handlers never run DDL during a cold start.

## Ride lifecycle

`requested -> confirmed -> assigned -> en_route -> arrived -> in_progress -> completed`

Terminal exceptions are `cancelled` and `no_show`. `emergency` can be entered during an active ride and resolved back to `in_progress`, `completed` or `cancelled`.

Driver actions must follow the lifecycle. Arrival, start and completion require a GPS fix no older than two minutes. When pickup/destination coordinates exist, the vehicle must also be within 250 metres. Admin overrides are audit logged and must remain an exception workflow.

## Dispatch

Admin confirms a ride and starts dispatch. Up to five eligible drivers receive 30-second offers. Acceptance locks the ride row in a database transaction, assigns the first successful driver and withdraws all competing offers. Manual assignment remains available for scheduled airport operations.

## API surface

### Public

- `POST /api/book`: creates one ride or two linked legs for a return booking.
- `POST /api/platform?action=quote`: returns a clearly labelled, short-lived test estimate until the commercial pricing engine is configured.
- `GET /api/platform?action=flight-status&flight=...&date=YYYY-MM-DD`: returns flight status from Aviationstack when `AVIATIONSTACK_API_KEY` is configured; otherwise returns visibly labelled demo data without blocking a booking.
- `GET /api/platform?action=availability`: returns public-safe nearby vehicle availability only when fresh, real tracker or driver-app telemetry exists. The public Fast Ride preview remains labelled as a pilot when no live vehicle data is available.
- `POST /api/platform?action=business-inquiry`: stores and optionally emails a corporate-account inquiry.
- `GET /api/v1/tracking?token=...`: returns passenger-safe ride, driver, vehicle and location data.
- `POST /api/v1/tracking`: rider issue report, completion confirmation, rating, cancellation request or booking-change request.

### Driver app

- `GET /api/v1/driver`: active rides and dispatch offers.
- `POST /api/v1/driver`: select a vehicle, go online/offline, accept/reject offers and perform ride lifecycle actions.
- `POST /api/v1/telemetry`: signed driver-app GPS heartbeat.

### Physical vehicle tracker

- `POST /api/v1/telemetry`: the same normalized position contract using a `vehicle_tracker` token.
- Required fields: `latitude`, `longitude`, `recordedAt` and monotonic `sequenceNumber`.
- Optional fields: `rideId`, `accuracyM`, `heading`, `speedKph`, `batteryPercent`.

### Admin

- `POST /api/admin-login`, `GET /api/admin-session`, `POST /api/admin-logout`.
- `GET /api/admin-data?resource=overview|fleet|rides|drivers|vehicles|incidents|ride`.
- `POST /api/admin-data`: create entities, confirm/assign/dispatch rides, set price, resolve incidents and issue device tokens.
- Flight monitoring and business enquiries are available as dedicated admin views. An admin can refresh a watched flight on demand; an automated provider poll must be added with a protected Vercel Cron schedule after a commercial flight-data plan is selected.

## Booking expansion and commercial rollout

- The shared booking form supports private transfer, airport arrival, hourly chauffeur, group transfer, airport concierge and Aurora Now pilot selection.
- Vehicle classes and booking extras are persisted with the ride: Comfort, Business, Van, Executive, flight monitoring, meet and greet, child seat, luggage, accessibility and pet travel.
- Quote totals, concierge availability and online payment are intentionally marked as test or on-request states until pricing rules, supplier capacity and payment webhooks are approved.
- Route pages are public SEO pages only. They should be expanded from verified pricing and cross-border operating rules, not generated from speculative routes.
- Run `pnpm db:migrate` before enabling these booking fields in production. The migration adds only the new quote, flight-watch, booking-change and B2B tables/columns.

## Live operations console

- The fleet map polls the normalized admin fleet feed every eight seconds while the tab is visible.
- Every vehicle remains present in the fleet list, including vehicles with no tracker or stale telemetry. Only vehicles with a real reported GPS position appear as map markers.
- The fleet feed combines the latest vehicle position, tracker heartbeat, speed, heading, battery, accuracy, driver, rider and active ride in one query.
- Selecting a vehicle loads the current ride trail from `ride_positions`; the live marker continues to use the latest normalized position.
- Leaflet and OpenStreetMap tiles are suitable for the initial low-volume operations console. A contracted tile provider should replace the public tile endpoint before sustained commercial map traffic.
- Polling is intentionally replaceable. Driver apps and hardware trackers continue writing through `/api/v1/telemetry`, so a future realtime transport can be introduced without changing the telemetry contract.

## Anti-fraud controls

- A cancelled assigned vehicle that later reports telemetry close to the booked pickup or destination creates `possible_off_platform_ride`.
- Device tokens are hashed, scoped by kind and independently revocable.
- Duplicate telemetry is rejected by device and sequence number.
- Rider tracking links expire seven days after the scheduled ride.
- The admin session is HttpOnly, Secure, SameSite Strict and signed with a dedicated secret.
- Five failed admin logins from one address produce a 15-minute lockout.

## Before mobile release

- Add geocoding during booking so geofences and distance-based dispatch are always available.
- Add APNs/FCM workers for `notification_outbox`.
- Add online payment and deposit webhooks.
- Add masked calling/messaging and explicit consent screens.
- Add device attestation, mock-location detection and certificate pinning.
- Define GDPR retention periods and automated deletion/anonymisation jobs.
- Connect Traccar or a compatible hardware tracker gateway to the telemetry endpoint.
