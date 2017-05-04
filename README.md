Universal Component Testing
----

### Overview
---

React and React Native components cannot be treated in the same way when it comes to testing. React is for creating web apps that run in a web browser. React Native is for creating Native mobile applications that run directly on an android or iOS device. So while there are many similarities, there are also some core differences when it comes to testing.

For testing React and React Native components you could use any testing framework such as mocha, jasmine or tape. Facebook have created their own framework especially for React called [jest](https://facebook.github.io/jest/). It is based on jasmine and this is the framework used throughout this guide.

If we consider the component only as a view with as little logic in it as possible, this will greatly simplify our testing efforts. This is how the app should be designed, especially considering the effort you will have to go for getting React Native testing right.

### React

React is much easier to get up and running with in terms of testing than it's native counterpart. Much of the work around tooling has been done by facebook, and airbnb. All you need to do is simulate a browser dom in the global environment of your node process using a package like [jsdom](https://github.com/tmpvar/jsdom). Used in conjuction with *enzyme*, a library that allows you to interact with React components from a user perspective, you have pretty much all your testing needs covered.

#### Setup
A bit of setup is required to get everything working correctly.

  1. ```npm install jest enzyme babel-jest babel-preset-es2015 babel-preset-react react-test-renderer```
  2. Create a .babelrc file with the following if you haven't already: 
  
  ```
  { "presets": ["es2015", "react"] }
  ```
That's it, you're ready to test!

#### Unit testing

We can use Enzyme's *shallow* function to render only the current component and its children upto one level deep.

Take a look at [the shallow native example](web-example/tests/shallow-example.test.js).

We can also use Snapshot testing, if the component is simple enough. In some cases this will remove the need for any other. We cover this below.

#### Integration Testing

For integration testing we can use Enzyme's *mount* function. We don't need to do any more setup if using jest.

Check out [the web mount example](web-example/tests/mount-example.test.js)

In my opinion this is the only thing we really need when it comes to integration testing in React. We will want to stub and mock out some components.

#### Functional testing

Most functional testing should be done with the mount function and snapshot testing.

Some of it could be done with webdriver. Webdriver testing is well established and doesn't need to be explained here. But unless you need visual validation, it will be a bit superflous.

#### Snapshot testing

Snapshot testing ensures that components do not change unexpectedly. It's not a testing approach you can apply in a TDD way, but it is useful in catching unexpexted changes.

The first time you run a snapshot test it will create and save a snapshot of the component you are testing. On subsequent runs it will compare the saved snapshot to a freshly generated one. If it has changed the test will fail and you will need to approve the new snapshot.

Check out the [web snapshot test example](web-example/tests/snapshot-example.test.js)

Change the value of the props components in the test, rerun the test, and see what happens.

---

### React Native 

Testing React Native components is a bit like dealing with jekyll and hyde. Unit testing and snapshot testing are fairly straightforward. Integration and functional testing require a lot more setup.


#### Unit testing

First, a little setup:

In package.json, add the following: 
```
...
"jest": {
  "preset": "react-native",
  "setupTestFrameworkScriptFile": "./node_modules/jest-enzyme/lib/index.js"
}
...
```

We can use Enzyme's *shallow* function to render only the current component and its children upto one level deep.

Take a look at [the shallow native example](native-example/tests/shallow-example.test.js).

We can also use Snapshot testing, if the component is simple enough. In some cases this will remove the need for any other 

#### Integration Testing

For integration testing we can use Enzyme's *mount* function. To get this working requires some fiddling as Enzyme is designed for web component testing. Fortunately for us, most of this work has been done with [react-native-mock-render](https://github.com/Root-App/react-native-mock-render). This is still a work in progress, which means that *mount* doesn't work as flawlessly as it does with React web components.

The following setup is required:

  1. ```npm install -D react-native-mock-render jsdom```
  2. Create a [test setup](native-example/tests/test-setup.js) file
  3. Add a reference to the setup file in your jest config in package.json: 
  ```
  "jest": {
    ...
    "setupFiles": [
      "./tests/test-setup.js"
    ]
    ...
  }
  ```

Then you can write an integration test using mount, check out [the mount native example](native-example/tests/mount-example.test.js)

For integration testing, it is also useful to mock out components that you are not interested in. Jest makes this easy to do.

#### Functional testing

Functional testing can be performed in one of several ways.

Using Enzyme's mount function, snapshot testing, or through UI automation with a tool such as [appium](http://appium.io/), [cavy](https://github.com/pixielabs/cavy), or native testing tools such as espresso and XCTest.

The mount function and snapshot testing have one major drawback for ReactNative: they do not run within an environment that is really comparable to the system that the component under test will eventually run on: a mobile OS. From what I have read, the most prominent issue with React components is the differences in how they behave on device between screen sizes and platforms. Therefore, at least a small degree of functional testing must be done on the device itself. A React component will be the interface to the user. It is important that components are tested from this perspective.

On the other hand, testing on device is slow. Especially with appium. It is faster with native tools, but that doubles the development overhead. Cavy is a neat solution, but also means that you have to add refs to your components specifically for testing.

Example:

#### Snapshot testing

It works in the same way that it does for web components created with React.

Check out the [native snapshot test example](native-example/tests/snapshot-example.test.js)

Change the value of the props components in the test, rerun the test, and see what happens.

---

### Property based testing
 
Property based testing is a generative testing method. You define properties for your functions, and you define a input generators that will generate randomised inputs within a set of constraints. Then, tests will be created that will verify that each input is valid for the given property. In this way thousands of tests can be generated. It is a good way of catching edge cases that a developer may miss when writing example driven tests.

Property based testing comes from the functional programming paradigm. Quickcheck, a property based testing library developed for haskell, has inspired many implementations in other languages, including javascript.

There are two main implementations in javascript: [jsverify](https://github.com/jsverify/jsverify), and [testcheck](https://github.com/leebyron/testcheck-js). I prefer testcheck as it is simpler to use and easier to read, for me at least.

You can check out the [property based testing example](/web-example/tests/property-based.test.js).

We have a simple component which takes an input property and squares it. Our test checks that the property, that all displayed values are greater than or equal to zero, holds for a range of values between -infinity and inifinity. 

This test  uncovered an input that I hadn't accounted for: NaN.

It is possible to generate far more complex inputs with the input generator. Check out [the docs](http://leebyron.com/testcheck-js/api) for more details.

---

### Model based testing

This is another generative testing method. Not popularised except in safety critical industries and no javascript implementations of this exist. It may be useful for react (and even more general) testing. I will draw up a simple POC of it with a larger React component.

---
references: 
#### react-native integration testing
  - [Root blog about react-native-mock-render: Motivation and Usage](https://blog.joinroot.com/mounting-react-native-components-with-enzyme-and-jsdom/)
  - [Testing the bejeesus out of your react-native apps](https://shift.infinite.red/testing-the-bejeezus-out-of-react-native-apps-with-ava-330f51f8f6c3)