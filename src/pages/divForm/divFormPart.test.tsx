import React from "react";
import { render, RenderResult, waitFor } from "@testing-library/react";
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
        expect(renderResult.getByRole("heading"));
      });
    });
  });
});
