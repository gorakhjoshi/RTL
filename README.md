# Setting up React Testing Library

In order to use React Testing Library, we will need to include the `@testing-library/react` package in our project by using npm like so:

```
npm install @testing-library/react --save-dev
```

Once we have added `@testing-library/react` to our project, we can import the two essential values, `render` and `screen`, into our tests.

- `render()` is a function that we can use to virtually render components and make them available in our unit tests. Similar to `ReactDOM.render()`, RTL’s `render()` function takes in JSX as an argument.

- `screen` is a special object which can be thought of as a representation of the browser window. We can make sure that our virtually rendered components are available in the test by using the `screen.debug()` method which prints out all the DOM contents.

The `screen` object has a few other useful methods that we’ll cover in the upcoming exercises but for now, let’s look at an example.

Look at the code snippet below, it shows the output of a unit test that prints out the DOM contents of the `Greeting` component.

```jsx
import { render, screen } from '@testing-library/react'

const Greeting = () => {
  return (<h1>Hello World</h1>)
};

test('should prints out the contents of the DOM' () => {
    render(<Greeting />);
    screen.debug();
});

// Output:
<body>
  <div>
    <h1>
      Hello World
    </h1>
  </div>
</body>
```

After importing the `render` and `screen` values from `'@testing-library/react'`, a test is created using the `test()` function from the Jest testing framework. Inside, the `<Greeting>` component is virtually rendered and then the resulting virtual DOM is printed via the `screen.debug()` method.

Notice how the output shows the rendered contents of `<Greeting>` (an `<h1>` element) and not the component itself. As was mentioned in the first exercise, React Testing Library strives to produce a testing environment that is as close to the user’s experience as possible.
