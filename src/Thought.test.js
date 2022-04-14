import React from "react";
import App from "./App.js";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// import userEvent here
import userEvent from "@testing-library/user-event";

test("Clicking the x button should remove a thought", async () => {
  render(<App />);

  // Since there are multiple '×' buttons, we are using the .getAllByText() method which returns an array. We are then extracting the first button from the array which belongs to the Thought with text 'This is a place for your passing thoughts.'
  const button = screen.getAllByText("×")[0];

  // TODO: Mimic clicking on the button
  userEvent.click(button);

  // We grab the thought again. It should be null after we clicked the '×' button using userEvent.
  const removedThought = screen.queryByText(
    "This is a place for your passing thoughts."
  );
  expect(removedThought).toBeNull();
});

test("Should add a new thought", () => {
  render(<App />);
  // Grab the text box and the submit button.
  const input = screen.getByRole("textbox");
  const submit = screen.getByText("Add");

  // TODO: Add testing logic to simulate user interactions here
  userEvent.type(input, "Did I forget my keys?");
  userEvent.click(submit);

  // Assert that the thought appears
  const thought = screen.getByText("Did I forget my keys?");
  expect(thought).toBeInTheDocument();
});
