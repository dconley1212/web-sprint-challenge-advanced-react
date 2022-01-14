import React from "react";
import "@testing-library/jest-dom/extend-expect";
import MutationObserver from "mutationobserver-shim";
import { render, screen, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
  render(<CheckoutForm />);
});

test("shows success message on submit with form details", async () => {
  render(<CheckoutForm />);

  const firstName = screen.getByLabelText(/first name/i);
  userEvent.type(firstName, "Devin");
  const lastName = screen.getByLabelText(/last name/i);
  userEvent.type(lastName, "McCourty");
  const address = screen.getByLabelText(/address/i);
  userEvent.type(address, "101 Patriots Way");
  const city = screen.getByLabelText(/city/i);
  userEvent.type(city, "Foxborough");
  const state = screen.getByLabelText(/state/i);
  userEvent.type(state, "MA");
  const zip = screen.getByLabelText(/zip/i);
  userEvent.type(zip, "02477");
  const checkout = screen.getByRole("button");
  userEvent.click(checkout);

  waitFor(async () => {
    const orderSuccessMessage = screen.findByText(
      "You have ordered some plants! Woo-hoo! 🎉"
    );
    expect(orderSuccessMessage).toBeTruthy();
  });

  waitFor(async () => {
    const orderShippingMessage = screen.findByText(
      "Your new green friends will be shipped to:"
    );
    expect(orderShippingMessage).toBeTruthy();
  });

  waitFor(async () => {
    const firstAndLast = screen.findByText("Devin McCourty");
    expect(firstAndLast).toBeTruthy();
  });

  waitFor(async () => {
    const address = screen.findByText("101 Patriots Way");
    expect(address).toBeTruthy();
  });

  waitFor(async () => {
    const cityStateZip = screen.findByText("Foxborough, MA 02477");
    expect(cityStateZip).toBeTruthy();
  });
});
