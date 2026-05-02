export async function notifyBookingCreated(bookingId: string, phone: string) {
  console.info("Notify booking created", { bookingId, phone });
}

export async function notifyCallbackRequested(phone: string) {
  console.info("Notify callback requested", { phone });
}
