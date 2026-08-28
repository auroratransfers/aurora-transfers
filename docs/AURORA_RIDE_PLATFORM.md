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
- `GET /api/v1/tracking?token=...`: returns passenger-safe ride, driver, vehicle and location data.
- `POST /api/v1/tracking`: rider issue report, completion confirmation or rating.

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
- `GET /api/admin-data?resource=overview|rides|drivers|vehicles|ride`.
- `POST /api/admin-data`: create entities, confirm/assign/dispatch rides, set price, resolve incidents and issue device tokens.

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
