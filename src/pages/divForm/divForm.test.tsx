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
        // TODO: 見出しはheadingロールで取得する
        expect(renderResult.getByText("Test Form"));
      });
    });
    test("submitボタンが非活性状態になっている", async () => {
      // TODO: ロールでボタンを取得し、toBeDisabledでアサーションする
      const button = renderResult.getByText("submit");
      expect(button.className.includes("disabled")).toBeTruthy();
    });
  });
  describe("画面機能", () => {
    describe("nameフィールドに値を入力した時", () => {
      let nameTextField: HTMLElement;
      beforeEach(async () => {
        await waitFor(() => {
          // TODO: ラベルの文字を読んで対応するテキストボックスを取得する
          nameTextField = renderResult.getByRole("textbox");
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
            // TODO: ラベルの文字を読んで対応するチェックボックスをクリックする
            const checkboxes = renderResult.getAllByRole("checkbox");
            tigerCheckbox = checkboxes[2];
          });
          fireEvent.click(tigerCheckbox);
          submitButton = renderResult.getByText("submit");
        });
        test("チェックボックスにチェックが入る", async () => {
          expect(tigerCheckbox).toBeChecked();
        });

        test("submitボタンが活性化する", async () => {
          // TODO: ロールでボタンを取得し、toBeDisabledでアサーションする
          await waitFor(() =>
            expect(submitButton.className.includes("disabled")).toBeFalsy()
          );
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
