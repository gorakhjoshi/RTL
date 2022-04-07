# Querying with RTL

Now that we know how to set up RTL, we can finally start testing our React components. To do so, we first have to query for and extract the DOM nodes from our virtually rendered components. Then, we can check and see if the extracted DOM nodes were rendered as expected. Fortunately for us, RTL has many built-in query methods that greatly simplify this process. In this exercise, we will cover the `.getByX` query methods.

There are a number of `.getByX` query methods to choose from and they are all accessible as methods on the screen object. Look at the example below, the `.getByText()` method is used to extract a DOM element with text that matches a specified string.

```jsx
import { render, screen } from "@testing-library/react";

const Button = () => {
  return (
    <button type="submit" disabled>
      Submit
    </button>
  );
};

test('A "Submit" button is rendered', () => {
  // Render the Button component
  render(<Button />);
  // Extract the <button>Submit</button> node
  const button = screen.getByText("Submit");
});
```

Similarly, another method is `.getByRole()` that allows us to extract a DOM node by its role type. Look at the example below, it shows us another way we can query for the `<button>` element using `.getByRole()`.

```jsx
import { render } from "@testing-library/react";

const Button = () => {
  return (
    <button type="submit" disabled>
      Submit
    </button>
  );
};

test("extracts the button DOM node", () => {
  // Render the Button component
  render(<Button />);
  // Extract the <button>Submit</button> node
  const button = screen.getByRole("button");
});
```

RTL has a bunch of these `.getByX` methods, but instead of memorizing them all, it is best to look at the [docs](https://testing-library.com/docs/queries/about/) to find the one that best suits your needs.

Now that we know how to query DOM nodes, we can test them using [Jest assertions](https://jestjs.io/docs/expect). Recall that in the first exercise we saw the assertion `expect.toBeChecked()`. This isn’t part of the regular set of Jest matchers, but instead is an extension provided by the `testing-library/jest-dom` library.

You can install this library using the command `npm install --save-dev @testing-library/jest-dom`. The entire library can then be imported into our test file like so:

```jsx
import "@testing-library/jest-dom";
```

Here is an example of the `expect.toBeDisabled()` matcher being used to test a DOM node extracted with the `screen.getByRole()` method.

```jsx
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

const Button = () => {
  return (
    <button type="submit" disabled>
      Submit
    </button>
  );
};

test("should show the button as disabled", () => {
  // render Button component
  render(<Button />);
  // Extract <button>Submit</button> Node
  const button = screen.getByRole("button");
  // Assert button is disabled
  expect(button).toBeDisabled();
});
```

Once again, there are many different jest matchers. In this lesson we’ll get a chance to see a number of the most common ones, however, instead of memorizing all of them, it is best to just follow the [jest-dom docs](https://github.com/testing-library/jest-dom).

## Exercise

1. Let’s start making assertions on the Passing Thoughts application. First, install the @testing-library/jest-dom library as a developer dependency.

2. In Thought.test.js import the @testing-library/jest-dom library.

3. Let’s start by confirming that the static header element with the text “Passing Thoughts” is rendered when the App component is rendered. First, we’ll grab the element using query methods.

   - In the first test of the Thought. test.js file, below the call to `render(<App/>)`:
   - Use the `.getByText()` method from the `screen` object to extract the header node of the `App` component.
   - Assign the returned node to a variable called header.

4. Within the first test, call the `expect().toHaveTextContent()` assertion to confirm that the header node does indeed contain the text `'Passing Thoughts'`.

5. Now, let’s write some tests for the `Thought` component which gets rendered each time the user writes down a new thought. Take a look at app rendered in the browser and try adding a new thought. Notice that an ‘×’ button gets rendered for removing that thought. Let’s confirm that this ‘×’ button gets rendered using the `.getByRole()` query method.

   In the second test of the `Thought.test.js` file, below the call to `render(<Thought .../>)`:

- Use the `.getByRole()` method from `screen` to extract the button node of the `Thought` component.
- Assign the button node to a variable named button.

6. Now, we could just test to see if the button was rendered using the `expect().toBeInTheDocument()` matcher, but for the sake of variety, let’s test to see if the button is “enabled”.

   Use the [docs](https://github.com/testing-library/jest-dom#custom-matchers) to find the appropriate jest assertion for this. Then, below your query for the button node, use a jest assertion to check if the button is enabled.

7. Well done! Let’s run our tests and confirm that our application is working properly. Run `npm test` in your terminal and you should see two passing tests!

   (Optional) To see what happens when the tests fail, try changing a few things:

- In the first test, change your `expect().toHaveTextContent` assertion to:

  ```
  expect(header).toHaveTextContent('Hello World');
  ```

- In the second test, change your .toBeEnabled() matcher to .toBeDisabled()
