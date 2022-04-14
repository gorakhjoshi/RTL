# Different Query Methods

Now that we know how to perform queries with .getByX methods, it is time for us to move on to the other query method variants. RTL has two other categories of query methods called `.queryByX` and `.findByX`.

Look at the code below. It shows the code for a simple component that renders a header with the text `'Hello World!'` and then changes the text to `'Goodbye!'` 500ms after the user clicks a button. We will be using this App component to demonstrate the different query types.

```jsx
import { useState } from "react";

const App = () => {
  const [text, setText] = useState("Hello World!");

  // Changes header text after interval of 500ms
  const handleClick = () => {
    setTimeout(() => {
      setText("Goodbye!");
    }, 500);
  };

  return (
    <div>
      <h1>{text}</h1>
      <button onClick={handleClick}>click me</button>
    </div>
  );
};

export default App;
```

Let’s start with the `.queryByX` variants. The `.queryByX` methods return null if they don’t find a DOM node, unlike the `.getByX` methods which throw an error and immediately cause the test to fail. This is useful when asserting that an element is NOT present in the DOM.

In this example, we want to confirm that the header does not (yet) contain the text `'Goodbye'`:

```jsx
import App from "./components/App";
import { render, screen } from "@testing-library/react";

test("Header should not show Goodbye yet", () => {
  // Render App
  render(<App />);
  // Attempt to extract the header element
  const header = screen.queryByText("Goodbye!");
  // Assert null as we have not clicked the button
  expect(header).toBeNull();
});
```

By using the `.queryByText()`, variant when there is no element with the text `'Goodbye!'`, the value `null` is returned and we can successfully validate this with `expect(header).toBeNull()`. If the `.getByText()` method were used instead, the test would fail immediately due to the error rather than continuing on to the `expect()` assertion.

Next, let’s discuss the `.findByX` variants. The `.findByX` methods are used to query for asynchronous elements which will eventually appear in the DOM. For example, if the user is waiting for the result of an API call to resolve before data is displayed. The `.findByX` methods work by returning a Promise which resolves when the queried element renders in the DOM. As such, the `async/await` keywords can be used to enable asynchronous logic.

In this example, we want to confirm that the `header` will display the text `'Goodbye'` after the button is clicked. This example uses the `userEvent` library, which will be covered in depth in the next exercise, to simulate clicking on the button.

```jsx
import App from "./components/App";
import { render, screen } from "@testing-library/react";

test("should show text content as Goodbye", async () => {
  // Render App
  render(<App />);
  // Extract button node
  const button = screen.getByRole("button");
  // click button
  userEvent.click(button);
  // Wait for the text 'Goodbye!' to appear
  const header = await screen.findByText("Goodbye!");
  // Assert header to exist in the DOM
  expect(header).toBeInTheDocument();
});
```

In the example above we use `.findByText()` since the `'Goodbye!'` message does not render immediately. This is because our handleClick() function changes the text after an interval of 500ms. So, we have to wait a bit before the new text is rendered in the DOM.

Observe the async and await keywords in the example above. Remember that findBy methods return a Promise and thus the callback function that carries out the unit test must be identified as async while the screen.`findByText()` method must be preceded by `await`.

Note: Before you start the instructions, go to the `AddThoughtForm.js` file and observe the `handleSubmit()` function. For just this exercise, we’ve modified this function slightly with a `setTimeout()`, so that the thoughts get added asynchronously. Go ahead and post a thought in the App. Notice how there is a slight lag when the thought gets posted after you click the Add button.

## Exercise

1. Suppose we wish to post a new thought with the text content `'Oreos are delicious'`. Before we do that though, we want to make sure that this thought isn’t already in our list of thoughts.

   In the first test of `Thought.test.js`, use the `.queryByText()` method and search for a thought with the text content `'Oreos are delicious'`. Assign the result of your query to a variable called `emptyThought`.

2. In the first test of `Thought.test.js`, use an appropriate assertion to check if the result of your query is `null`.

   To confirm that you did this properly, `run npm test` in the terminal. The first test should pass!

3. The second test of the `Thought.test.js` file mimics a user posting a thought with the text content `'Oreos are delicious'` using the `userEvent` library (we’ll cover how you can do this in the next exercise!).

   Below, we use the `.getByText()` method to assert that the thought is present in the DOM. However, since the thought is getting posted asynchronously, `.getByText()` is unable to retrieve it and the test is failing (confirm for yourself by running npm test).

   Replace the `.getByText()` method with a call to the appropriate query variant such that the test waits for the element with the text `'Oreos are delicious'` to appear.

4. Run `npm test` in your terminal
