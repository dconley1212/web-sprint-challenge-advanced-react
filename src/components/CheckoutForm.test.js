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

  const firstName = screen.getByLabelText(/first name:/i);
  userEvent.type(firstName, "Devin");
  const lastName = screen.getByLabelText(/last name:/i);
  userEvent.type(lastName, "McCourty");
  const address = screen.getByLabelText(/address:/i);
  userEvent.type(address, "101 Patriots Way");
  const city = screen.getByLabelText(/city:/i);
  userEvent.type(city, "Foxborough");
  const state = screen.getByLabelText(/state:/i);
  userEvent.type(state, "MA");
  const zip = screen.getByLabelText(/zip:/i);
  userEvent.type(zip, "02477");
  const checkout = screen.getByRole("button");
  userEvent.click(checkout);

  waitFor(async () => {
    const orderSuccessMessage = screen.getByText(
      "You have ordered some plants! Woo-hoo!"
    );
    const orderShippingMessage = screen.getByText(
      "Your new green friends will be shipped to:"
    );
    const firstAndLast = screen.getByText("Devin McCourty");
    const address = screen.getByText("101 Patriots Way");
    const cityStateZip = screen.getByText("Foxborough, MA 02477");

    expect(orderSuccessMessage).toBeInTheDocument();
    expect(orderShippingMessage).toBeInTheDocument();
    expect(firstAndLast).toBeInTheDocument();
    expect(address).toBeInTheDocument();
    expect(cityStateZip).toBeInTheDocument();
  });
});
