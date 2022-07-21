/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "components/Application";
import Appointment from "components/Appointment";

/*
  A test that renders a React Component
*/
// it("renders without crashing", () => {
//   render(<Application />);
// });

//it() and test() are interchangeable
//to skip a test use xit() or test.skip()

describe("Appointment", () => {
  // it("renders without crashing", () => {
  //   render(<Appointment />);
  // });

  test("transitions mode to ERROR", () => {
    let mode = "";
    const fn = jest.fn(newMode => mode = newMode)
    fn("ERROR");
    expect(mode).toBe("ERROR")
  });

  


});