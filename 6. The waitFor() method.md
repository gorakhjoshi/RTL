# The waitFor() method

In the previous exercise we’ve learned about the `.findByX` query methods that allows us to test components that render asynchronously. But what about components that disappear asynchronously?

Look at the example below. We have a component that displays a header. This header is removed after 250 ms when the button “Remove Header” is clicked.

```jsx
// file: header.js
export const Header = () => {
  const handleClick = () => {
    setTimeout(() => {
      document.querySelector("h1").remove();
    }, 250);
  };
  return (
    <div>
      <h1>Hey Everybody</h1>
      <button onClick={handleClick}>Remove Header</button>
    </div>
  );
};
```

How would you test that the header is removed? Using `screen.findByX()` methods won’t work because there won’t be an element to query for once it’s removed! Using only `screen.queryByX()` methods won’t work either as the component is removed asynchronously.

Fortunately, RTL provides another function that can be used for asynchronous testing that will be perfect for this scenario - the `waitFor()` function. In order to use this function, we need to import it from `@testing-library/react`.

```jsx
import { waitFor } from "@testing-library/react";
```

As with the other async functions, the `waitFor()` function returns a Promise, so we have to preface its call with the `await` keyword. It takes a callback function as an argument where we can make asynchronous function calls, perform queries, and/or run assertions.

```jsx
await waitFor(() => {
  expect(someAsyncMethod).toHaveBeenCalled();
  const someAsyncNode = screen.getByText("hello world");
  expect(someAsyncNode).toBeInTheDocument();
});
```

Now, let’s get back to the example. To test that a component disappears asynchronously, we can combine the waitFor() function with .queryByX() methods:

```jsx
import { waitFor, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Header } from "./heaader.js";

test("should remove header display", async () => {
  // Render Header
  render(<Header />);
  // Extract button node
  const button = screen.getByRole("button");
  // click button
  userEvent.click(button);

  // Wait for the element to be removed asynchronously
  await waitFor(() => {
    const header = screen.queryByText("Hey Everybody");
    expect(header).toBeNull();
  });
});
```

In our unit test, the header will be removed 250ms after the button has been clicked. The callback function inside `waitFor()` confirms this by querying for this element and then waiting for the `expect()` assertion to pass.

The `waitFor()` method can also optionally accept an `options` object as a second argument. This object can be used to control how long to wait for before aborting and much more. Though the details of this `options` object are beyond the scope of the lesson, you can read more about it in the [docs](https://testing-library.com/docs/dom-testing-library/api-async/#waitfor).

## Exercise

1. In the provided test in the **Thought.test.js** file, there is code that mimics a user posting a thought with the text content `'I have to call my mom.'`. The test then attempts to test that the thought will eventually disappear, however it fails (verify this by running `npm test`)! Let’s introduce the `waitFor()` function to fix this test.

   In **Thought.test.js** import waitFor from @testing-library/react

2. Use `waitFor() `to assert that this thought will eventually be removed from the DOM. Your callback should be written using arrow-function syntax.

   Note: We’ve modified the code in the App for this exercise so that thoughts disappear after 250ms instead of 15s (see the `getNewExpirationTime()` function in utils.js). This is because 15s is a long time to wait and see if our test passes!

3. Run npm test in your terminal
