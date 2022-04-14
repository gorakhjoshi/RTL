# React Testing Library Quiz

### Q1. Which query method variant returns null, if it can’t find a DOM element and is useful for determining if an element is NOT present in the DOM?

- [ ] .queryByX
- [ ] .getByX
- [ ] .findByX

### Q2. Consider the component below. When the user clicks the button the header text is asynchronously replaced with '**Donald Duck**':

```jsx
import { useState } from "react";

const App = () => {
  const [text, setText] = useState("Mickey Mouse");

  const handleClick = () => {
    setTimeout(() => {
      setText("Donald Duck");
    }, 250);
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

Fill in the code such that we properly assert that the text '**Donald Duck**' asynchronously appears in the DOM?

```jsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent '@testing-library/user-event';
import App from './App'

test('Should show text content of Donald Duck', ____ ()=>{
  render(<App/>)
  const button = screen.getByRole('button');
  userEvent.click(button);
  const header = ____ screen ____ ('Donald Duck');
  expect(header).toHaveTextContent('Donald Duck');
})
```

Fill these texts

- .queryByText
- await
- .findByText
- async
- .getByText

### Q3. Consider the component below. It is a simple form which asks the user to enter their name:

```jsx
const App = () => {
  return (
    <div>
      <h1> What is your name? </p>)
      <label htmlFor="name">Enter Name:</label>
      <input id="name">
      <button type = "submit">Submit </button>
    </div>
  );
};

export default App;
```

Fill in the code to assert that the header is present in the document and that the button is enabled:

```jsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("Should display content of Header component", () => {
  render(<App />);
  const header = ___;
  const button = ___;
  // Confirm header is present
  ___;
  // Confirm button is enabled
  ___;
});
```

Fill these texts

- expect(header).toBeEnabled();
- expect(header).ToBeInTheDocument()
- screen.getByText('What is your name?')
- screen.getByRole('button')
- expect(button).toHaveTextContent('What is your name?');
- screen.query('What is your name?');
- screen.query('button');
- expect(button).ToBeEnabled()

### Q4. What is the correct command to install React Testing Library and add it as a developer dependency to your application?

- [ ] npm install react-testing-library

- [ ] npm install --save-dev @testing-library/react

- [ ] npm install @testing-library/react

- [ ] npm install --save-dev

### Q5. Consider the component below. It’s a simple form that asks the user to enter some text:

```jsx
const Form = () => {
  return (
    <div>
    <label htmlFor="name">Enter Text:</label>
    <input id="name">
    <button type = "submit">Submit </button>
    </div>
  );
};
```

Fill in the code such that the unit test mimics a user typing “Hello” and clicking the submit button.

```jsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ___ "@testing-library/user-event";

import Form from "./Form";

test("Should display content of Header component", () => {
  render(<Form />);
  const input = screen.getByRole("textbox");
  ___;
  const button = screen.getByRole("button");
  ___;
});
```

Fill these texts

- interact
- userEvent.click(button)
- type(input, ‘Hello’)
- userEvent
- click(button)
- userEvent.type(input, 'Hello')

### Q6. What is React Testing Library (RTL)?

- [ ] A tool that manages routing in your react applications.

- [ ] A tool that allows one to check the current state and props passed to a React component.

- [ ] A tool that allows one to test React components by checking whether the event handlers associated with a component are updating state as intended.

- [ ] A library for testing React applications. It focuses on testing components from the end-user’s perspective rather than testing the implementation and logic of the underlying React components.

### Q7. Consider the component below which displays the text "How is everybody doing?!" and then removes that text asynchronously after the user clicks on the button:

```jsx
import { useState } from "react";

const App = () => {
  const handleClick = () => {
    setTimeout(() => {
      document.querySelector("h1").remove();
    }, 250);
  };
  return (
    <div>
      <h1>How is everybody doing?!</h1>
      <button onClick={handleClick}>Remove Header</button>
    </div>
  );
};
```

Fill in the code to assert that the header is removed asynchronously after a user clicks the button:

```jsx
import { ___, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent '@testing-library/user-event';
import App from './App';

test('should remove header display', ___  () => {
  render(<App/>);
  const button = screen.getByRole('button');
  userEvent.click(button);
  ___  waitFor(() ___ =>
});
```

Fill these texts

- expect(screen.findByText('How is everybody doing?!')).toBeNull();
- waitFor
- expect(screen.getByText('How is everybody doing?!')).toBeNull();
- expect(screen.queryByText('How is everybody doing?!')).toBeNull());
- async
- wait
- await

8. ### Q1. Which query method variant returns null, if it can’t find a DOM element and is useful for determining if an element is NOT present in the DOM?

```jsx
const Header = () => {
  return <h1>Hello friends</h1>;
};
```

What is the correct code to include this Header component in a React Testing Library (RTL) unit test and then print out its contents?

```jsx
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("Should display content of Header component", () => {
  render();
  screen.debug(Header);
});
```

Not quite. The Header component should be passed to render() and screen.debug() does not take in any arguments.

- [ ] 1.

```jsx
import ReactDOM from "react-dom";
import Header from "./Header";

test("Should display content of Header component", () => {
  ReactDOM.render(<Header />);
  console.log(Header);
});
```

- [ ] 2

```jsx
import Header from "./Header";

test("Should display content of Header component", () => {
  render(<Header />);
  screen.debug();
});
```

- [ ] 3

```jsx
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("Should display content of Header component", () => {
  render(<Header />);
  screen.debug();
});
```
