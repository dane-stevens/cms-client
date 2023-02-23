import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Page } from "./Page";

const pageData = {
  // title: "Home",
  // description: "",
  // children: [
  //   {
  //     id: "clee49zej00022v68c0ci36zm",
  //     component: "Button",
  //     data: { to: "/", children: "Click me!" },
  //   },
  // ],
};

describe("Page Components", () => {
  test("should render", () => {
    const { getByTestId } = render(<Page data={pageData} />);

    expect(getByTestId("page")).toBeInTheDocument();
    // screen.debug();
  });
});
