import React from "react";
import Header from "./Header";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";

// Search for react comopnent when using shallow
it("contains 3 NavLinks via shallow", () => {
  const numLinks = shallow(<Header />).find("NavLink").length;
  expect(numLinks).toEqual(3);
});

// Search for actual HTML tag when using mount
// MemoryRouter is also needed as <Header> component needs ract router
it("contains 3 anchors via mount", () => {
  const numOfAnchors = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a").length;
  expect(numOfAnchors).toEqual(3);
});
