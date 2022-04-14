# Mimicking User Interactions

So far we’ve learned how to query and extract the different DOM nodes from our React components. Now, it’s time for us to learn how to mimic user interactions e.g. clicking a checkbox, typing text, etc. Once again, this entire process has been made easier for us with the help of another library in the @testing-library suite: @testing-library/user-event.

The library can be installed with the command below:

```
npm install --save-dev @testing-library/user-event@13.2.1
```

This library exports a single object, `userEvent`, that can imported in a test file like so:

```jsx
import userEvent from "@testing-library/user-event";
```

The `userEvent` object contains many built-in methods that allow us to mimic user interactions. Typically, they follow the same syntax pattern:

Here is an example where we mimic a user filling in a text box. Note that in this case, a second argument is provided as the text to be typed into the box.

```jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const GreetingForm = () => {
  return (
    <form>
      <label htmlFor="greeting">Greeting:</label>
      <input type="text" id="greeting" />
      <input type="submit" value="Submit" />
    </form>
  );
};

test("should show text content as Hey Mack!", () => {
  // Render the component to test
  render(<GreetingForm />);
  // Extract the textbox component
  const textbox = screen.getByRole("textbox");
  // Simulate typing 'Hey Mack!'
  userEvent.type(textbox, "Hey Mack!");
  // Assert textbox has text content 'Hey Mack!'
  expect(textbox).toHaveValue("Hey Mack!");
});
```

In the example above, the `userEvent.type()` method is used which accepts a DOM node to interact with (`textbox`) and a string to type into that node (`’Hey Mack!’).

The userEvent object has methods for [simulating clicks](https://testing-library.com/docs/ecosystem-user-event/#clickelement-eventinit-options) (userEvent.click()), [hovering](https://testing-library.com/docs/ecosystem-user-event/#hoverelement) (userEvent.hover()), and much more. Once again, instead of memorizing all of these, it is recommended that you read the [docs](https://github.com/testing-library/user-event) to find the method best suited for your needs.

## Exercise

1. Let’s now use `userEvent` to mimic user interactions in our tests for Passing Thoughts.

   First, install `@testing-library/user-event@13.2.1` as a developer dependency.

   To verify that you have successfully added the package to your project, navigate to **package.json** and check that `@testing-library/user-event` appears in the dependencies array.

2. In **Thought.test.js** import userEvent from `@testing-library/user-event`.

3. In the first test of** Thought.test.js**, we would like to remove the thought with the text `'This is a place for your passing thoughts'` that is added as the first thought when the application first renders (refresh the browser to see it).
   We’ve started this test for you:

   1. We render the App component
   2. We then grab the first '×' button.
   3. Finally, later in the test, we check to see if that element is null.

   This test will fail unless we mimic clicking on the button in between steps 2 and 3 (verify this by running `npm test`).

   Use a method from the `userEvent` object to mimic a user pressing the retrieved `button` so that the final `expect()` assertion passes. Then, run `npm test` to see that the first test now passes!

4. In the second test of **Thought.test.js** file we’d like to mimic adding a new thought. We’ve started this test for you:

   1. At the top of the test, we render App
   2. Then we grab the `input` element where a user can type the thought and the `submit` button to add the thought.
   3. At the end of the test we assert that a thought with the text `'Did I forget my keys?'` was added to the DOM.
   4. This test will fail unless we mimic typing into the input and clicking the `submit` button in between steps 2 and 3.

   First, use a method from the `userEvent` object to mimic a user typing into this `input` element with the text `'Did I forget my keys?'`.

5. Now that we’ve mimicked a user typing `'Did I forget my keys'`, it’s time for us to post this thought by clicking the `submit` button. In the second test of `Thought.test.js`, simulate a user clicking the `submit` button by using a method from the `userEvent` object.

6. Run npm test in your terminal
