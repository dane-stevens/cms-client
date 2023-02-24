// import { render, screen } from "@testing-library/react";
// import { C, loadable, Page } from "src";
// import Link, { LinkProps } from "../testComponents/Link";
// import { describe, expect, it } from "vitest";

// import ContentedProvider from "./Contented";

// const cms = new C();

// cms.define(Link, {
//   name: "Link",
//   schema: LinkProps,
// });

// const pageData = {
//   title: "Hello world",
//   description: "Hey",
//   children: [{ id: "uniqueid", component: "Link", data: { to: "/", children: "click me" } }],
// };

// describe("Test page rendering", () => {
//   it("should render", () => {
//     const { getByTestId } = render(
//       <ContentedProvider cms={cms}>
//         <Page data={pageData} />
//       </ContentedProvider>
//     );

//     expect(getByTestId("page")).toBeInTheDocument();
//     expect(screen.getByText(/click me/i)).toBeInTheDocument();
//     screen.debug();
//   });
// });
