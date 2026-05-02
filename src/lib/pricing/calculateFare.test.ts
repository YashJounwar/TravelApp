import { describe, expect, it } from "vitest";
import { vehicleData } from "../data/mock";
import { calculateFare } from "./calculateFare";

describe("calculateFare", () => {
  it("returns transparent fare components and total", () => {
    const fare = calculateFare(
      {
        pickup: "Delhi",
        destination: "Agra",
        date: "2026-05-01",
        time: "10:00",
        tripType: "one-way-outstation",
        passengers: 2
      },
      vehicleData[0]
    );

    expect(fare.total).toBeGreaterThan(0);
    expect(fare.baseFare).toBeGreaterThan(0);
    expect(fare.gst).toBeGreaterThan(0);
  });
});
