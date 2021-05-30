import React from "react";
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DivForm from ".";

describe("divForm", () => {
  let renderResult: RenderResult;
  beforeEach(() => {
    // 準備処理 テスト対象Componentの描画
    renderResult = render(<DivForm />);
  });
  afterEach(() => {
    // テスト終了後処理 テスト対象のアンマウント
    renderResult.unmount();
  });
  describe("初期状態", () => {
    test("フォームの見出しが表示されている", async () => {
      await waitFor(() => {
        expect(renderResult.getByRole("heading", { name: /Test Form/i }));
      });
    });
    test("submitボタンが非活性状態になっている", async () => {
      const button = renderResult.getByRole("button", { name: /submit/i });
      expect(button).toBeDisabled();
    });
  });
  describe("画面機能", () => {
    describe("nameフィールドに値を入力した時", () => {
      let nameTextField: HTMLElement;
      beforeEach(async () => {
        await waitFor(() => {
          nameTextField = renderResult.getByLabelText("name", {
            selector: "input",
          });
        });
        fireEvent.change(nameTextField, { target: { value: "Kontam" } });
      });
      test("フィールドに値が反映される", async () => {
        await waitFor(() => {
          expect(nameTextField).toHaveValue("Kontam");
        });
      });
      describe("加えて、animalsのtigerをチェックした時", () => {
        let tigerCheckbox: HTMLElement;
        let submitButton: HTMLElement;
        beforeEach(async () => {
          await waitFor(() => {
            tigerCheckbox = renderResult.getByLabelText("Tiger", {
              selector: "input",
            });
          });
          fireEvent.click(tigerCheckbox);
          submitButton = renderResult.getByRole("button", { name: /submit/i });
        });
        test("チェックボックスにチェックが入る", async () => {
          await waitFor(() => {
            expect(tigerCheckbox).toBeChecked();
          });
        });

        test("submitボタンが活性化する", async () => {
          await waitFor(() => expect(submitButton).toBeEnabled());
        });

        test("submitボタンを押下するとSUCCESSが表示される", async () => {
          fireEvent.click(submitButton);
          await waitFor(() =>
            expect(renderResult.getByText(/SUCCESS/i)).toBeInTheDocument()
          );
        });
      });
    });
  });
});
