import { render, fireEvent } from "@testing-library/react";
import Pagination from "../components/Pagination";

describe("Pagination Component", () => {
  test("test_onSelectPage_callback_called_with_correct_page_number", () => {
    const onSelectPageMock = jest.fn();
    const { getByText } = render(
      <Pagination
        currentPage={1}
        totalPage={5}
        onSelectPage={onSelectPageMock}
      />
    );
    const pageButton = getByText("3");
    fireEvent.click(pageButton);
    expect(onSelectPageMock).toHaveBeenCalledWith(3);
  });
});
