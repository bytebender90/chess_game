defmodule SimpleChessWeb.GameView do
  use SimpleChessWeb, :view

  def render("bot.json", %{from: from, to: to}) do
    %{from: from, to: to}
  end
end
