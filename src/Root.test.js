import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rootReducer } from "./redux/store";
import { createStore } from "redux";
import Root from "./Root";

describe("GIVEN a Redux store created from the rootReducer", () => {
  let store;
  beforeEach(() => {
    store = createStore(rootReducer);
  });

  describe("WHEN this is passed to Root", () => {
    let getByLabelText, getByText, container;
    beforeEach(() => {
      ({ getByLabelText, getByText, container } = render(
        <Root store={store} />
      ));
    });

    test("THEN there are no todos shown", () => {
      expect(container).toHaveTextContent(/nada por aquí/i);
    });

    describe("AND when a todo is added", () => {
      beforeEach(() => {
        fireEvent.change(getByLabelText(/enter todo/i), {
          target: { value: "My first todo" }
        });
        fireEvent.click(getByText(/add todo/i));
      });

      test("THEN the todo is visible", () => {
        expect(container).toHaveTextContent("My first todo");
      });

      describe("AND when completed todos are selected", () => {
        beforeEach(() => {
          fireEvent.click(getByText(/completed/i));
        });

        test("THEN the todo is not visible", () => {
          expect(container).not.toHaveTextContent("/My first todo/");
        });
      });

      describe("AND when incomplete todos are selected", () => {
        beforeEach(() => {
          fireEvent.click(getByText(/incomplete/i));
        });

        test("THEN the todo is visible", () => {
          expect(container).toHaveTextContent("My first todo");
        });
      });

      describe("AND when a further todo is added", () => {
        beforeEach(() => {
          fireEvent.change(getByLabelText(/enter todo/i), {
            target: { value: "My second todo" }
          });
          fireEvent.click(getByText(/add todo/i));
        });

        test("THEN both todos are visible", () => {
          expect(container).toHaveTextContent("My first todo");
          expect(container).toHaveTextContent("My second todo");
        });

        describe("AND when the first todo is clicked on", () => {
          beforeEach(() => {
            fireEvent.click(getByText("My first todo"));
          });

          test("THEN both todos are still visible", () => {
            expect(container).toHaveTextContent("My first todo");
            expect(container).toHaveTextContent("My second todo");
          });

          describe("AND when completed todos are selected", () => {
            beforeEach(() => {
              fireEvent.click(getByText(/completed/i));
            });

            test("THEN only the first todo is visible", () => {
              expect(container).toHaveTextContent("My first todo");
              expect(container).not.toHaveTextContent("/My second todo/");
            });
          });

          describe("AND when incomplete todos are selected", () => {
            beforeEach(() => {
              fireEvent.click(getByText(/incomplete/i));
            });

            test("THEN only the second todo is visible", () => {
              expect(container).not.toHaveTextContent("/My first todo/i");
              expect(container).toHaveTextContent("My second todo");
            });
          });
        });
      });
    });
  });
});
